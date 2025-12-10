<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Booking;
use App\Models\Package;
use App\Models\User;
use App\Models\Destination;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'totalBookings' => Booking::count(),
            'totalRevenue' => Booking::sum('total_price') ?? 0,
            'activeUsers' => User::count(),
            'avgBookingValue' => Booking::avg('total_price') ?? 0,
        ];

        // Eager load user and package relationships with null checks
        $recentBookings = Booking::with(['user', 'package.destination'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'user' => $booking->user ? [
                        'name' => $booking->user->name,
                        'email' => $booking->user->email,
                    ] : null,
                    'package' => $booking->package ? [
                        'title' => $booking->package->title,
                        'destination' => $booking->package->destination,
                    ] : null,
                    'booking_date' => $booking->booking_date,
                    'status' => $booking->status,
                ];
            });

        $topPackages = Package::with(['destination'])
            ->withCount('bookings')
            ->orderBy('bookings_count', 'desc')
            ->take(5)
            ->get()
            ->map(function ($package) {
                return [
                    'id' => $package->id,
                    'title' => $package->title,
                    'price' => $package->price,
                    'bookings_count' => $package->bookings_count,
                    'destination' => $package->destination,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentBookings' => $recentBookings,
            'topPackages' => $topPackages,
        ]);
    }
}