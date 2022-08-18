<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

use App\Models\Show;
use App\Models\User;

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

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::post('/login', function(Request $request) {
    return "Trying login route.";
    // $credentials = $request->validate([
    //     'email' => ['required', 'email'],
    //     'password' => ['required'],
    // ]);

    // if (Auth::attempt($credentials)) {
    //     $request->session()->regenerate();
    //     $id = Auth::id();
    //     $user = User::find($id);
    //     return($user);
    // }
    // else{
    //     return "Didn't work.";
    // }
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/user', function() {
//     return "Should be user.";
// });

Route::get('/fuck', function(){
    return "Fuck you!";
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
