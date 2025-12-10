<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Booking;
use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::where('user_id', Auth::id())
            ->with(['package.destination'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Booking/Index', [
            'bookings' => $bookings,
        ]);
    }

    public function create(Package $package)
    {
        return Inertia::render('Booking/Create', [
            'package' => $package->load('destination'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'package_id' => 'required|exists:packages,id',
            'booking_date' => 'required|date',
            'number_of_people' => 'required|integer|min:1|max:10',
            'special_requests' => 'nullable|string|max:500',
        ]);

        $package = Package::findOrFail($request->package_id);
        
        $booking = Booking::create([
            'user_id' => Auth::id(),
            'package_id' => $request->package_id,
            'booking_date' => $request->booking_date,
            'number_of_people' => $request->number_of_people,
            'total_price' => $package->price * $request->number_of_people,
            'status' => 'pending',
            'payment_status' => 'pending',
            'special_requests' => $request->special_requests,
        ]);

        return redirect()->route('bookings.show', $booking->id)
            ->with('success', 'Booking created successfully!');
    }

    public function show(Booking $booking)
    {
        // Ensure user can only view their own bookings
        if ($booking->user_id !== Auth::id() && !Auth::user()->is_admin) {
            abort(403);
        }

        $booking->load(['package.destination', 'user']);

        return Inertia::render('Booking/Show', [
            'booking' => $booking,
        ]);
    }
}