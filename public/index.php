<?php

$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

if ($requestPath === '/submit.php') {
    require __DIR__ . '/submit.php';
    exit;
}

$indexFile = __DIR__ . '/index.html';

if (!is_file($indexFile)) {
    http_response_code(503);
    header('Content-Type: text/plain; charset=UTF-8');
    echo 'Frontend build not found. Run npm run build.';
    exit;
}

readfile($indexFile);
