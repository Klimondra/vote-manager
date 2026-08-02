<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ElectionController;
use App\Http\Middleware\IsAdmin;

Route::middleware(['auth', IsAdmin::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('index');
        Route::resource('elections', ElectionController::class);
    });
