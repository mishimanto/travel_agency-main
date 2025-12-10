<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Package;
use App\Models\Destination;

class HomeController extends Controller
{
    public function index()
    {
        $featuredPackages = Package::where('is_featured', true)
            ->where('is_active', true)
            ->with('destination')
            ->take(6)
            ->get();

        $destinations = Destination::where('is_active', true)
            ->take(6)
            ->get();

        return Inertia::render('Home', [
            'featuredPackages' => $featuredPackages,
            'destinations' => $destinations,
        ]);
    }
}