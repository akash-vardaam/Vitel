<?php

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestMethod\CurlPost;
use ReCaptcha\RequestMethod\Post;
use Aws\Exception\AwsException;
use Aws\Ses\SesClient;

header('Content-Type: application/json');
header('Cache-Control: no-store');

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

if (is_file(__DIR__ . '/../.env')) {
    Dotenv::createImmutable(__DIR__ . '/..')->safeLoad();
}

function envValue(string $key): string
{
    return trim((string) ($_ENV[$key] ?? ''));
}

/**
 * @return array<int, string>
 */
function parseOrigins(string $raw): array
{
    if ($raw === '') {
        return [];
    }

    $parts = array_map(static fn($item): string => trim($item), explode(',', $raw));
    return array_values(array_filter($parts, static fn($item): bool => $item !== ''));
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = parseOrigins(envValue('CORS_ALLOWED_ORIGINS'));
if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Vary: Origin');
}
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/**
 * @param array<string, mixed> $payload
 */
function jsonResponse(int $status, array $payload): void
{
    if (!array_key_exists('status', $payload)) {
        $payload['status'] = $status;
    }
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * @param array<string, mixed> $extra
 */
function errorResponse(int $status, string $code, string $message, array $extra = []): void
{
    jsonResponse($status, array_merge([
        'success' => false,
        'code' => $code,
        'message' => $message,
    ], $extra));
}

/**
 * @return array<string, mixed>
 */
function readRequestBody(): array
{
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput ?: '', true);

    if (!is_array($data)) {
        errorResponse(400, 'INVALID_JSON', 'Invalid JSON payload.');
    }

    return $data;
}

/**
 * @param array<string, mixed> $data
 * @return array{0:string,1:string,2:string,3:string,4:array<int, string>,5:string}
 */
function validatePayload(array $data): array
{
    $name = trim((string) ($data['name'] ?? ''));
    $email = trim((string) ($data['email'] ?? ''));
    $message = trim((string) ($data['message'] ?? ''));
    $practice = trim((string) ($data['practice'] ?? ''));
    $practitionerTypes = $data['practitionerTypes'] ?? [];
    $recaptchaToken = trim((string) ($data['recaptchaToken'] ?? $data['g-recaptcha-response'] ?? ''));

    if ($name === '' || $email === '' || $message === '') {
        errorResponse(422, 'VALIDATION_REQUIRED_FIELDS', 'Name, email, and message are required.');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        errorResponse(422, 'VALIDATION_EMAIL', 'Please provide a valid email address.');
    }

    if ($recaptchaToken === '') {
        errorResponse(422, 'VALIDATION_RECAPTCHA', 'Please complete reCAPTCHA verification.');
    }

    $safeTypes = [];
    if (is_array($practitionerTypes)) {
        $safeTypes = array_values(array_filter(
            array_map(static fn($type): string => trim((string) $type), $practitionerTypes),
            static fn($type): bool => $type !== ''
        ));
    }

    return [$name, $email, $message, $practice, $safeTypes, $recaptchaToken];
}

/**
 * @return array{0:string,1:string,2:string,3:string,4:float}
 */
function readRecaptchaConfig(): array
{
    if (!class_exists(ReCaptcha::class)) {
        errorResponse(500, 'RECAPTCHA_DEPENDENCY_MISSING', 'Missing reCAPTCHA backend dependency. Run composer install.');
    }

    $secret = envValue('RECAPTCHA_SECRET_KEY');
    if ($secret === '') {
        errorResponse(500, 'RECAPTCHA_SERVER_CONFIG_MISSING', 'Missing server reCAPTCHA configuration.');
    }

    $expectedHostname = envValue('RECAPTCHA_EXPECTED_HOSTNAME');
    $expectedAction = envValue('RECAPTCHA_EXPECTED_ACTION');
    if ($expectedAction === '') {
        $expectedAction = 'submit_demo_form';
    }

    $minScoreRaw = envValue('RECAPTCHA_MIN_SCORE');
    $minScore = is_numeric($minScoreRaw) ? (float) $minScoreRaw : 0.5;

    return [$secret, $expectedHostname, $expectedAction, RECAPTCHA_VERIFY_URL, $minScore];
}

/**
 * @return array{0:string,1:string,2:string,3:string,4:string}
 */
function readSesConfig(): array
{
    $region = envValue('AWS_REGION');
    $accessKey = envValue('AWS_ACCESS_KEY_ID');
    $secretKey = envValue('AWS_SECRET_ACCESS_KEY');
    $fromEmail = envValue('AWS_SES_FROM_EMAIL');
    $toEmail = envValue('AWS_SES_TO_EMAIL');

    if ($region === '' || $accessKey === '' || $secretKey === '' || $fromEmail === '' || $toEmail === '') {
        errorResponse(500, 'SES_CONFIG_MISSING', 'Missing SES configuration on server.');
    }

    return [$region, $accessKey, $secretKey, $fromEmail, $toEmail];
}

/**
 * @param array<int, string> $errorCodes
 * @return array<int, array{code:string, message:string}>
 */
function recaptchaErrorDetails(array $errorCodes): array
{
    $errorMessages = [
        'missing-input-secret' => 'Server reCAPTCHA secret is missing.',
        'invalid-input-secret' => 'Server reCAPTCHA secret is invalid.',
        'missing-input-response' => 'Missing reCAPTCHA token from browser.',
        'invalid-input-response' => 'Invalid or malformed reCAPTCHA token.',
        'bad-request' => 'Invalid verification request sent to reCAPTCHA.',
        'timeout-or-duplicate' => 'reCAPTCHA token expired or was already used.',
        ReCaptcha::E_CONNECTION_FAILED => 'Server could not connect to the reCAPTCHA verify endpoint.',
        ReCaptcha::E_BAD_RESPONSE => 'reCAPTCHA verify endpoint returned a bad response.',
        ReCaptcha::E_INVALID_JSON => 'reCAPTCHA verify endpoint returned invalid JSON.',
        ReCaptcha::E_HOSTNAME_MISMATCH => 'reCAPTCHA hostname does not match expected hostname.',
        ReCaptcha::E_ACTION_MISMATCH => 'reCAPTCHA action mismatch.',
        ReCaptcha::E_SCORE_THRESHOLD_NOT_MET => 'reCAPTCHA score is below configured threshold.',
        ReCaptcha::E_CHALLENGE_TIMEOUT => 'reCAPTCHA challenge timed out.',
        ReCaptcha::E_UNKNOWN_ERROR => 'Unknown reCAPTCHA verification error.',
    ];

    $details = [];
    foreach ($errorCodes as $code) {
        $details[] = [
            'code' => $code,
            'message' => $errorMessages[$code] ?? 'Unknown reCAPTCHA verification error.',
        ];
    }

    return $details;
}

function verifyRecaptcha(string $token, string $secret, string $expectedHostname, string $expectedAction, string $verifyUrl, float $minScore): void
{
    $requestMethod = function_exists('curl_version') ? new CurlPost($verifyUrl) : new Post($verifyUrl);
    $captchaClient = new ReCaptcha($secret, $requestMethod);

    if ($expectedHostname !== '') {
        $captchaClient->setExpectedHostname($expectedHostname);
    }
    if ($expectedAction !== '') {
        $captchaClient->setExpectedAction($expectedAction);
    }
    $captchaClient->setScoreThreshold($minScore);

    $captcha = $captchaClient->verify($token, $_SERVER['REMOTE_ADDR'] ?? null);
    if ($captcha->isSuccess()) {
        return;
    }

    $errorCodes = $captcha->getErrorCodes();
    if (in_array(ReCaptcha::E_CONNECTION_FAILED, $errorCodes, true)) {
        // When verify endpoint is unreachable, action/score checks are secondary noise.
        jsonResponse(502, [
            'success' => false,
            'code' => 'RECAPTCHA_UPSTREAM_UNREACHABLE',
            'message' => 'reCAPTCHA verification failed: server could not reach Google verify endpoint.',
            'errors' => [ReCaptcha::E_CONNECTION_FAILED],
            'errorDetails' => recaptchaErrorDetails([ReCaptcha::E_CONNECTION_FAILED]),
            'recaptcha' => [
                'expectedAction' => $expectedAction,
                'minScore' => $minScore,
                'score' => null,
                'action' => null,
                'hostname' => null,
            ],
        ]);
    }

    jsonResponse(422, [
        'success' => false,
        'code' => 'RECAPTCHA_VERIFICATION_FAILED',
        'message' => 'reCAPTCHA verification failed.',
        'errors' => $errorCodes,
        'errorDetails' => recaptchaErrorDetails($errorCodes),
        'recaptcha' => [
            'expectedAction' => $expectedAction,
            'minScore' => $minScore,
            'score' => $captcha->getScore(),
            'action' => $captcha->getAction(),
            'hostname' => $captcha->getHostname(),
        ],
    ]);
}

function sanitizeLine(string $value): string
{
    return preg_replace('/[\r\n]+/', ' ', $value) ?? $value;
}

function sanitizeEmail(string $value): string
{
    return preg_replace('/[\r\n]+/', '', $value) ?? $value;
}

function normalizeMessage(string $value): string
{
    return str_replace(["\r\n", "\r"], "\n", $value);
}

function sendSesEmail(
    string $region,
    string $accessKey,
    string $secretKey,
    string $fromEmail,
    string $toEmail,
    string $replyToEmail,
    string $subject,
    string $body
): string {
    $ses = new SesClient([
        'version' => '2010-12-01',
        'region' => $region,
        'credentials' => [
            'key' => $accessKey,
            'secret' => $secretKey,
        ],
    ]);

    try {
        $result = $ses->sendEmail([
            'Source' => $fromEmail,
            'Destination' => [
                'ToAddresses' => [$toEmail],
            ],
            'ReplyToAddresses' => [$replyToEmail],
            'Message' => [
                'Subject' => [
                    'Data' => $subject,
                    'Charset' => 'UTF-8',
                ],
                'Body' => [
                    'Text' => [
                        'Data' => $body,
                        'Charset' => 'UTF-8',
                    ],
                ],
            ],
        ]);
    } catch (AwsException $exception) {
        $response = [
            'success' => false,
            'code' => 'SES_SEND_FAILED',
            'message' => 'Failed to send email via SES.',
            'sesError' => $exception->getAwsErrorMessage() ?: $exception->getMessage(),
            'sesErrorCode' => $exception->getAwsErrorCode(),
            'sesRequestId' => $exception->getAwsRequestId(),
        ];

        jsonResponse(502, $response);
    }

    return (string) $result->get('MessageId');
}

if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    errorResponse(403, 'ORIGIN_NOT_ALLOWED', 'Origin is not allowed for this endpoint.');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse(405, 'METHOD_NOT_ALLOWED', 'Only POST requests are allowed.');
}

$requestData = readRequestBody();
[$name, $email, $message, $practice, $types, $recaptchaToken] = validatePayload($requestData);
[$recaptchaSecret, $recaptchaExpectedHostname, $recaptchaExpectedAction, $recaptchaVerifyUrl, $recaptchaMinScore] = readRecaptchaConfig();
verifyRecaptcha(
    $recaptchaToken,
    $recaptchaSecret,
    $recaptchaExpectedHostname,
    $recaptchaExpectedAction,
    $recaptchaVerifyUrl,
    $recaptchaMinScore
);

[$awsRegion, $awsAccessKey, $awsSecretKey, $fromEmail, $toEmail] = readSesConfig();

$typeList = implode(', ', $types);
$cleanName = sanitizeLine($name);
$cleanEmail = sanitizeEmail($email);
$cleanPractice = sanitizeLine($practice);
$cleanMessage = normalizeMessage($message);

$subject = 'New Vitel demo request';
$body = implode("\n", [
    "Name: {$cleanName}",
    "Email: {$cleanEmail}",
    "Practice: " . ($cleanPractice !== '' ? $cleanPractice : 'Not provided'),
    "Practitioner Types: " . ($typeList !== '' ? $typeList : 'Not provided'),
    '',
    'Message:',
    $cleanMessage,
]);

$messageId = sendSesEmail(
    $awsRegion,
    $awsAccessKey,
    $awsSecretKey,
    $fromEmail,
    $toEmail,
    $cleanEmail,
    $subject,
    $body
);

jsonResponse(200, [
    'success' => true,
    'code' => 'REQUEST_ACCEPTED',
    'message' => 'Your request has been received.',
    'mailSent' => true,
    'provider' => 'aws_ses',
    'messageId' => $messageId,
]);
