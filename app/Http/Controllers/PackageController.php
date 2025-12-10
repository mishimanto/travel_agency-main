<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    /**
     * Display a listing of the packages.
     */
    public function index(Request $request)
    {
        $query = Package::with('destination')
            ->where('is_active', true);

        // ---------------------------
        // 🔍 SEARCH
        // ---------------------------
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('destination', function ($d) use ($search) {
                      $d->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                  });
            });
        }

        // ---------------------------
        // 🎯 DESTINATION FILTER
        // ---------------------------
        if ($request->has('destinations')) {

    $destinations = $request->destinations;

    if (!is_array($destinations)) {
        $destinations = json_decode($destinations, true);
    }

    if (is_array($destinations) && count($destinations) > 0) {
        $query->whereIn('destination_id', $destinations);
    }
}


        // ---------------------------
        // 💸 PRICE RANGE FILTER
        // ---------------------------
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // ---------------------------
        // ⏳ DURATION FILTER
        // ---------------------------
        if ($request->filled('duration')) {
            switch ($request->duration) {
                case '1-3':
                    $query->whereBetween('duration_days', [1, 3]);
                    break;

                case '4-7':
                    $query->whereBetween('duration_days', [4, 7]);
                    break;

                case '8-14':
                    $query->whereBetween('duration_days', [8, 14]);
                    break;

                case '15+':
                    $query->where('duration_days', '>=', 15);
                    break;
            }
        }

        // ---------------------------
        // 🧭 SORTING
        // ---------------------------
        if ($request->filled('sort_by')) {
            switch ($request->sort_by) {
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;

                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;

                case 'duration_asc':
                    $query->orderBy('duration_days', 'asc');
                    break;

                case 'duration_desc':
                    $query->orderBy('duration_days', 'desc');
                    break;

                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;

                case 'featured':
                    $query->orderBy('is_featured', 'desc')
                          ->orderBy('created_at', 'desc');
                    break;
            }
        } else {
            // Default sorting
            $query->orderBy('is_featured', 'desc')
                  ->orderBy('created_at', 'desc');
        }

        // ---------------------------
        // 📦 PAGINATE RESULTS
        // ---------------------------
        $packages = $query->paginate(12)
            ->withQueryString(); // keep filters during pagination

        // ---------------------------
        // 🎯 DESTINATION FILTER OPTIONS
        // ---------------------------
        $destinations = Destination::where('is_active', true)->get();

        return Inertia::render('Packages/Index', [
            'packages' => $packages,

            // Return all active filters to frontend
            'filters' => [
                'search' => $request->search,
                'destinations' => $destinations->toArray(),  
                'selected' => $request->destinations ?? [],
                'min_price' => $request->min_price,
                'max_price' => $request->max_price,
                'duration' => $request->duration,
                'sort_by' => $request->sort_by,
            ],

            'destinationOptions' => $destinations,
        ]);
    }

    /**
     * Show a single package.
     */
    public function show(Package $package)
    {
        $package->load('destination');

        // Fix JSON fields:
        $package->available_dates = $this->fixJsonData($package->available_dates);
        $package->inclusions      = $this->fixJsonData($package->inclusions);
        $package->itinerary       = $this->fixJsonData($package->itinerary);

        return Inertia::render('Packages/Show', [
            'package' => $package,
        ]);
    }

    /**
     * Fix JSON fields
     */
    private function fixJsonData($data)
    {
        if (is_array($data)) return $data;
        if (is_null($data)) return [];

        if (is_string($data)) {
            $decoded = json_decode($data, true);
            return $decoded ?: [];
        }

        return [];
    }
}
