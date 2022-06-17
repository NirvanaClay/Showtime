<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Show;
use App\Models\User;
use App\Models\User_show;

class ShowController extends Controller
{
    public function userShows(Request $request)
    {
        if(Auth::user()){
            $id = Auth::id();
            $user = User::find($id);
            return $user->shows;
            // $shows = User::find($id)->shows()->orderBy('title')->get();
            // return $shows;
        }
    }
    public function add(Request $request)
    {
        if(Auth::user()){
            $id = Auth::id();
            $user = User::find($id);
        }
        $show = Show::firstOrCreate(
            ['imdb_id' => $request->imdb_id],
            // ['title' => $request->title],
            ['title'=> $request->title, 'image_url' => $request->image_url, 'show_type' => $request->show_type]
        );
        $user->shows()->attach($show->id);
        // $show->users()->attach($id);
    }
    public function edit(Request $request)
    {
        if(Auth::user()){
            $id = Auth::id();
            $user = User::find($id);
        }
        $show_id = $request->id;
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
