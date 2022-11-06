<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;

use App\Models\User;

use App\Http\Controllers\Auth\ShowController;

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
    return view('welcome');
});

Route::get('/testing', function () {
    return "Testing testing.";
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth:api'])->name('dashboard');

Route::post('/tokens/create', function (Request $request) {
    // if(Auth::User()){
    //     return Auth::User();
    // }
    // else{
    //     return "No user, sorry.";
    // }
    $token = Session::token();
    return $token;
    // $token = $request->user()->createToken($request->token_name);
    // return ['token' => $token->plainTextToken];
});

Route::get('/userShows', function()
{
    $id = Auth::id();
    $user = User::find($id);
    if($user){
        return $user->shows;
    }
    else{
        return "There is not a user";
//     }});
// // }})->middleware(['auth.basic']);
}})->middleware(['auth']);

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

require __DIR__.'/auth.php';
