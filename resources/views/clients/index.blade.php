@extends('layouts.app')

@section('content')
    <div class="container-fluid content-wrapper">
        <div class="table-client-block"
             id="table-client-block">
        </div>
    </div>
@endsection
@push('css-styles')
    <style>
        .content-wrapper{padding: 0 50px}
        ul.pagination{flex-wrap: wrap}
    </style>
@endpush

@push('script')
    <script>
        window.LaravelApiToken = "{{$token}}";
    </script>
@endpush
