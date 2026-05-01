<?php

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use ReCaptcha\ReCaptcha;
use ReCaptcha\RequestMethod\CurlPost;
use ReCaptcha\RequestMethod\Post;

header('Content-Type: application/json');

if (is_file(__DIR__ . '/../.env')) {
    Dotenv::createImmutable(__DIR__ . '/..')->safeLoad();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Only POST requests are allowed.',
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid JSON payload.',
    ]);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$practice = trim((string) ($data['practice'] ?? ''));
$practitionerTypes = $data['practitionerTypes'] ?? [];
$recaptchaToken = trim((string) ($data['recaptchaToken'] ?? $data['g-recaptcha-response'] ?? ''));

$recaptchaSecret = trim((string) ($_ENV['RECAPTCHA_SECRET_KEY'] ?? ''));
$recaptchaExpectedHostname = trim((string) ($_ENV['RECAPTCHA_EXPECTED_HOSTNAME'] ?? ''));
$recaptchaVerifyUrl = trim((string) ($_ENV['RECAPTCHA_VERIFY_URL'] ?? 'https://www.google.com/recaptcha/api/siteverify'));
$recaptchaFallbackVerifyUrl = trim((string) ($_ENV['RECAPTCHA_FALLBACK_VERIFY_URL'] ?? 'https://www.recaptcha.net/recaptcha/api/siteverify'));
$recaptchaExpectedAction = trim((string) ($_ENV['RECAPTCHA_EXPECTED_ACTION'] ?? 'submit_demo_form'));
$recaptchaMinScoreRaw = trim((string) ($_ENV['RECAPTCHA_MIN_SCORE'] ?? '0.5'));
$recaptchaMinScore = is_numeric($recaptchaMinScoreRaw) ? (float) $recaptchaMinScoreRaw : 0.5;

if (!class_exists(ReCaptcha::class)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Missing reCAPTCHA backend dependency. Run composer install.',
    ]);
    exit;
}

if ($recaptchaSecret === '') {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Missing server reCAPTCHA configuration.',
    ]);
    exit;
}

if ($recaptchaToken === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please complete reCAPTCHA verification.',
    ]);
    exit;
}

$buildCaptcha = static function (string $verifyUrl) use ($recaptchaSecret, $recaptchaExpectedHostname): ReCaptcha {
    $requestMethod = function_exists('curl_version')
        ? new CurlPost($verifyUrl)
        : new Post($verifyUrl);

    $captcha = new ReCaptcha($recaptchaSecret, $requestMethod);
    if ($recaptchaExpectedHostname !== '') {
        $captcha->setExpectedHostname($recaptchaExpectedHostname);
    }

    return $captcha;
};

$captchaClient = $buildCaptcha($recaptchaVerifyUrl);
if ($recaptchaExpectedAction !== '') {
    $captchaClient->setExpectedAction($recaptchaExpectedAction);
}
$captchaClient->setScoreThreshold($recaptchaMinScore);

$captcha = $captchaClient->verify($recaptchaToken, $_SERVER['REMOTE_ADDR'] ?? null);
$errorCodes = $captcha->getErrorCodes();

if (
    in_array(ReCaptcha::E_CONNECTION_FAILED, $errorCodes, true)
    && $recaptchaFallbackVerifyUrl !== ''
    && $recaptchaFallbackVerifyUrl !== $recaptchaVerifyUrl
) {
    $fallbackCaptchaClient = $buildCaptcha($recaptchaFallbackVerifyUrl);
    if ($recaptchaExpectedAction !== '') {
        $fallbackCaptchaClient->setExpectedAction($recaptchaExpectedAction);
    }
    $fallbackCaptchaClient->setScoreThreshold($recaptchaMinScore);
    $captcha = $fallbackCaptchaClient->verify($recaptchaToken, $_SERVER['REMOTE_ADDR'] ?? null);
    $errorCodes = $captcha->getErrorCodes();
}

if (!$captcha->isSuccess()) {
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

    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'reCAPTCHA verification failed.',
        'errors' => $errorCodes,
        'errorDetails' => $details,
        'recaptcha' => [
            'expectedAction' => $recaptchaExpectedAction,
            'minScore' => $recaptchaMinScore,
            'score' => $captcha->getScore(),
            'action' => $captcha->getAction(),
            'hostname' => $captcha->getHostname(),
        ],
    ]);
    exit;
}

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Name, email, and message are required.',
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid email address.',
    ]);
    exit;
}

$typeList = '';
if (is_array($practitionerTypes) && $practitionerTypes !== []) {
    $safeTypes = array_map(static fn($type) => trim((string) $type), $practitionerTypes);
    $safeTypes = array_filter($safeTypes, static fn($type) => $type !== '');
    $typeList = implode(', ', $safeTypes);
}

/*
 * Optional mail() example.
 * Update $to and make sure your server is configured to send mail.
 */
$mailSent = false;
$to = 'discover@vitel.life';
$subject = 'New Vitel demo request';
$bodyLines = [
    "Name: {$name}",
    "Email: {$email}",
    "Practice: {$practice}",
    "Practitioner Types: {$typeList}",
    '',
    'Message:',
    $message,
];
$body = implode("\n", $bodyLines);
$headers = [
    'From: no-reply@yourdomain.com',
    "Reply-To: {$email}",
    'Content-Type: text/plain; charset=UTF-8',
];

if (function_exists('mail')) {
    $mailSent = @mail($to, $subject, $body, implode("\r\n", $headers));
}

echo json_encode([
    'success' => true,
    'message' => 'Your demo request has been received.',
    'mailSent' => $mailSent,
]);
