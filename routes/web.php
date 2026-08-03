<?php

use App\Http\Controllers\Frontend\ElectionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ElectionController::class, 'index'])->name('home');
Route::get('/elections/{election}', [ElectionController::class, 'show'])->name('elections.show');

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
