<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

use Illuminate\Http\Request;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Show;
use App\Models\User;

use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

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

Auth::routes();

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

Route::get('/fuck', function(){
    return "Fuck you!";
});

Route::get('/allShows', function() {
    $shows = Show::all();
    return $shows;
});

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

// Route::get('/{route}', function () {
//     return view('welcome');
// });

// Route::get('/shows', 'App\Http\Controllers\ShowController@index')->name('shows');

Route::post('/login', function(Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return Auth::user();
        // $id = Auth::id();
        // $user = User::find($id);
        // Auth::attempt($user);
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ]);
});

Route::get('/user', function (Request $request) {
    if(Auth::user()){
        return "USING .THEN WITH NEW SESSION DOMAIN, User.";
    }
    else{
        return "USING .THEN WITH NEW SESSION DOMAIN, Guest.";
    }
    // if(Auth::user()){
    //     return Auth::user();
    //     // $id = Auth::id();
    //     // $user = User::find($id);
    //     // return($user);
    // }
    // else{
    //     return 'guest'; 
    // }
});

// Route::get('/user', function() {
//     return "Should be user.";
// });

Route::post('/logout', function(Request $request){
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect()->route('home');
});

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
