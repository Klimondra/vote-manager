<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::prefix('auth')
    ->name('auth.')
    ->group(base_path('routes/auth.php'));

require __DIR__.'/settings.php';
