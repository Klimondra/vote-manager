<?php

use App\Http\Controllers\Admin\ElectionController;

Route::middleware(['auth', 'is_admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('elections', ElectionController::class);
    });
