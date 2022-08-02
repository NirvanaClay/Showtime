<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Show;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/authenticated', function () {
    if(Auth::user()){
        $id = Auth::id();
        $user = User::find($id);
        return($user);
    }
    else{
        return 'guest'; 
    }
});

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::get('/', function () {
    $userCheck = Auth::user();
    return view('welcome', ['userCheck' => $userCheck]);
    if(Auth::user()){
        return 'user';
    }
    else{
        return 'Youza bitch 4 real';
    }
})->name('home');

// Route::get('/{route}', function () {
//     return view('welcome');
// });

// Route::get('/shows', 'App\Http\Controllers\ShowController@index')->name('shows');

// Auth::routes();

Route::post('/login', function(Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        $id = Auth::id();
        $user = User::find($id);
        return($user);
        // return redirect()->intended('dashboard');
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ]);
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

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
