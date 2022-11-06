<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Show;
use App\Models\User;
use App\Models\User_show;

class ShowController extends Controller
{
    // public function userShows(Request $request)
    // {
    //     $id = Auth::id();
    //     $user = User::find($id);
    //     if($user){
    //         return "There is a user.";
    //     }
    //     else{
    //         return "There is not a user";
    //     }
    // }
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
    
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::User();
            return $user;
            // $shows = $user->shows;
            // return [$user, $shows];
        }
    }
    public function add(Request $request)
    {
        $id = Auth::id();
        $user = User::find($id);
        $show = Show::firstOrCreate(
            ['imdb_id' => $request->imdb_id],
            // ['title' => $request->title],
            ['title'=> $request->title, 'image_url' => $request->image_url, 'show_type' => $request->show_type]
        );
        $user->shows()->syncWithoutDetaching($show->id);
        return $show->id;
    }
    public function edit(Request $request)
    {
        $id = Auth::id();
        $user = User::find($id);
        $show_id = $request->id;
        $show = Show::find($show_id);
        $show->show_type = $request->showType;
        $show->save();
        $rating = $request->rating;
        $user->shows()->updateExistingPivot($show_id, ['rating' => $rating]);        
    }
    public function destroy(Request $request)
    {
        if(Auth::user()){
            $id = Auth::id();
            $user = User::find($id);
        }
        $show_id = $request->id;
        $user->shows()->detach($show_id);
        // $shows = Show::all();
        // return view('shows/index', ['shows' => $shows]);
    }
}
