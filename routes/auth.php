<?php

// === DISCORD OAUTH ROUTES === //
use App\Http\Controllers\Auth\DiscordController;

Route::prefix('auth')
    ->name('auth.')
    ->group(function () {
        Route::get('/discord/redirect', [DiscordController::class, 'redirect'])
            ->name('login_with_discord');

        Route::get('/discord/callback', [DiscordController::class, 'callback']);
    });
