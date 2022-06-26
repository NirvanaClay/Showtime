<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Auth::routes();

Route::post('/login', function(Request $request) {
    // $credentials = $request->validate([
    //     'email' => ['required', 'email'],
    //     'password' => ['required'],
    // ]);

    // if (Auth::attempt($credentials)) {
    //     $request->session()->regenerate();
    // };

    // return back()->withErrors([
    //     'email' => 'The provided credentials do not match our records.',
    // ]);
    return "Fuck you!";
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/logout', function(Request $request){
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect()->route('home');
});

Route::get('/userShows', 'App\Http\Controllers\ShowController@userShows');

Route::get('/passwordReset', function() {
    return 'This should be view for password reset form.';
})->name('password.reset');

Route::post('/shows', 'App\Http\Controllers\ShowController@add');

Route::put('/shows/{id}', 'App\Http\Controllers\ShowController@edit');

Route::delete('/shows/{id}', 'App\Http\Controllers\ShowController@destroy');
