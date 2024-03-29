<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta id="token" name="csrf-token" content="{{ csrf_token() }}">

        <link rel="stylesheet" href="{{ asset('styles/reset.css') }}"> 
        <link rel="stylesheet" href="{{ asset('styles/app.css') }}"> 
        <link rel="stylesheet" href="{{ asset('styles/home.css') }}"> 
        <link rel="stylesheet" href="{{ asset('styles/login.css') }}"> 
        <link rel="stylesheet" href="{{ asset('styles/form.css') }}"> 
        <link rel="stylesheet" href="{{ asset('styles/header.css') }}"> 
        <link rel="stylesheet" href="{{ asset('styles/shows.css') }}"> 
        <link rel="stylesheet" href="{{ asset('styles/register.css') }}"> 

        <title>Laravel SRC QQQ</title>

    </head>
    <body class="antialiased">
        <div id='root'></div>
        <script src="https://kit.fontawesome.com/93227efa85.js" crossorigin="anonymous"></script>
        {{-- <script src={{mix("/js/app.jsx")}}></script> --}}
        <script src="{{ asset("/js/app.js")}}"></script>
    </body>
</html>
