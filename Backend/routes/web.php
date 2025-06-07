<?php

use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $data = ['name' => 'Tên của bạn'];
    return view('demo', compact('data'));
});
Route::get('/test-mail', [TestController::class,'testMail']);
Route::get('/kich-hoat', [TestController::class,'kichHoatMail']);
