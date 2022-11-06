<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use Laravel\Sanctum\Contracts\HasApiTokens;

class AuthenticatedSessionController extends Controller
{
    // /**
    //  * Display the login view.
    //  *
    //  * @return \Illuminate\View\View
    //  */
    public function create()
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = $request->user();
            return $user;
            // $token = $user->createToken($request->token_name);
            // $token = $user->createToken('My_App');

            // return ['token' => $token->plainTextToken];
            // return $token;
            // $shows = $user->shows;
            // return [$user, $shows];
        }
 
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
        // $request->authenticate();

        // $request->session()->regenerate();
    }

    // public function userShows(Request $request)
    // {
    //     $request->authenticate();
    //     $id = Auth::id();
    //     $user = User::find($id);
    //     if($user){
    //         return "There is a user.";
    //     }
    //     else{
    //         return "There is not a user";
    //     }
    // }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
