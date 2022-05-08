<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Show;

class ShowController extends Controller
{
    public function index(Request $request)
    {
        $shows = Show::all();
        // $shows = Show::where('user_id', $request->user_id)->get();
        // return view('shows/index', ['shows' => $shows]);
        return $shows;
    }
    public function add(Request $request)
    {
        $show = Show::firstOrCreate(
            ['title' => $request->title],
            ['image_url' => $request->image_url, 'user_id' => $request->user_id]
        );
        return $show->id;
    }
    public function edit(Request $request)
    {
        $id = $request->id;
        $rating = $request->rating;
        $show = Show::find($id);
        $show->rating = $rating;
        $show->save();
    }
    public function destroy(Request $request)
    {
        $id = $request->id;
        $show = Show::find($id);
        $show->delete();
        // $shows = Show::all();
        // return view('shows/index', ['shows' => $shows]);
    }
}
