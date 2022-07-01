<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>BlogQL</title>
        <!--FAVICON-->
        <link rel="shorcut icon" href="{{ asset('logomakr.png') }}" type="image/png"/>
        <!--CSS/JS-->
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        <script src="{{ mix('js/app.js') }}" defer></script>
        <!--Fontawesome-->
        <script
        src="https://kit.fontawesome.com/52339f9582.js"
        crossorigin="anonymous"
        ></script>
    </head>
    <body>
        <div id="app">
            <router-view></router-view>
            
        </div>  
    </body>
</html>
