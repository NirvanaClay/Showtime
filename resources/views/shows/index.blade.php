@extends('layouts.app')

@section('title', 'Page Title')

@section('content')
  <h1>Yea Yea</h1>
  <h2>Bitch</h2>
  {{-- <section class='show-index'>
    @foreach ($shows as $show)
      <article class='show'>
        <h2>{{$show->title}}</h2>
        <img src='{{$show->image_url}}'>
        <form class='deleteShow' action='/shows/{{$show->id}}' method='POST'>
          <input type="hidden" name="_method" value="DELETE">
          @csrf
          <input type ='hidden' name='id' value='{{$show->id}}'>
          <input type ='hidden' name='title' value='{{$show->title}}'>
          <input type ='hidden' name='image_url' value='{{$show->image_url}}'>
          <input type='submit' value="Remove">
        </form>
      </article> --}}
    @endforeach
  </section>
  <script src={{mix("js/app.js")}}></script>
@endsection
