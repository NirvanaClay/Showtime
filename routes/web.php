<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\User;

use App\Http\Controllers\Auth\ShowController;

use Illuminate\Validation\Rules;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes floor your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return Inertia::render('YourComponentName');
    return view('welcome');
    // return "Hello?";
});

Route::get('/testing', function () {
    return "Testing.";
});

Route::get('sanctum/csrf-cookie', function () {
    $response = new \Illuminate\Http\Response('Set CSRF cookie');
    $response->cookie(
      'XSRF-TOKEN', csrf_token(), 999999, '/', null, false, true
    );
    return $response;
  });
  

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        $id = Auth::id();
        $user = User::find($id);
        return $user->shows;
        // return $user;
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ]);
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth:api'])->name('dashboard');

Route::get('/userShows', function()
{
    $id = Auth::id();
    $user = User::find($id);
    if($user){
        return $user->shows;
    }
    else{
        return "There is not a user";
}})->middleware(['auth:sanctum']);

Route::post('/shows', 'App\Http\Controllers\ShowController@add')->middleware(['auth.basic']);
;

Route::put('/shows/{id}', 'App\Http\Controllers\ShowController@edit')->middleware(['auth.basic']);

Route::delete('/shows/{id}', 'App\Http\Controllers\ShowController@destroy')->middleware(['auth.basic']);

Route::get('/checkAuth', function() {
    if(Auth::check()){
        return Auth::User();
    }
    else{
        return false;
    }
});
// })->middleware(['auth']);
// })->middleware(['auth.basic']);

// require __DIR__.'/auth.php';
