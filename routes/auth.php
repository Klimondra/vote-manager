<?php

// === DISCORD OAUTH ROUTES === //
use App\Http\Controllers\Auth\DiscordController;

Route::get('/discord/redirect', [DiscordController::class, 'redirect'])
    ->name('login_with_discord');

Route::get('/discord/callback', [DiscordController::class, 'callback']);
