<?php

header('Content-Type: application/json');

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
