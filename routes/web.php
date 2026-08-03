<?php

use App\Http\Controllers\Frontend\ElectionController;
use App\Http\Controllers\Frontend\VoteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ElectionController::class, 'index'])->name('home');
Route::get('/elections/{election}', [ElectionController::class, 'show'])->name('elections.show');
Route::post('/vote/{candidate}', VoteController::class)->middleware('auth')->name('vote');

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
