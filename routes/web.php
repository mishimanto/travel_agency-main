<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\PackageController as AdminPackageController;
use App\Http\Controllers\Admin\DestinationController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\SettingsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');

// Package Routes
Route::get('/packages', [PackageController::class, 'index'])->name('packages.index');
Route::get('/packages/{package}', [PackageController::class, 'show'])->name('packages.show');
Route::get('/search', [PackageController::class, 'search'])->name('packages.search');

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    // Password Reset Routes
    Route::get('forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword');
    })->name('password.request');

    Route::get('reset-password/{token}', function ($token) {
        return Inertia::render('Auth/ResetPassword', ['token' => $token]);
    })->name('password.reset');
});

// Authenticated User Routes
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
    
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // User Bookings
    Route::get('/user/bookings', [BookingController::class, 'index'])->name('user.bookings');
    Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::get('/bookings/create/{package}', [BookingController::class, 'create'])->name('bookings.create');
});

// Admin Routes
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Packages Management
    Route::get('/packages', [AdminPackageController::class, 'index'])->name('packages.index');
    Route::get('/packages/create', [AdminPackageController::class, 'create'])->name('packages.create');
    Route::post('/packages', [AdminPackageController::class, 'store'])->name('packages.store');
    Route::get('/packages/{package}/edit', [AdminPackageController::class, 'edit'])->name('packages.edit');
    Route::put('/packages/{package}', [AdminPackageController::class, 'update'])->name('packages.update');
    Route::delete('/packages/{package}', [AdminPackageController::class, 'destroy'])->name('packages.destroy');
    
    // Destinations Management
    Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations.index');
    Route::post('/destinations', [DestinationController::class, 'store'])->name('destinations.store');
    Route::get('/destinations/create', [DestinationController::class, 'create'])->name('destinations.create');
    Route::get('/destinations/{destination}/edit', [DestinationController::class, 'edit'])->name('destinations.edit');
    Route::put('/destinations/{destination}', [DestinationController::class, 'update'])->name('destinations.update');
    Route::delete('/destinations/{destination}', [DestinationController::class, 'destroy'])->name('destinations.destroy');
    
    // Bookings Management
    Route::get('/bookings', [AdminBookingController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{booking}', [AdminBookingController::class, 'show'])->name('bookings.show');
    Route::put('/bookings/{booking}/status', [AdminBookingController::class, 'updateStatus'])->name('bookings.updateStatus');
    Route::delete('/bookings/{booking}', [AdminBookingController::class, 'destroy'])->name('bookings.destroy');
    
    // Reports
    Route::get('/reports', [AdminDashboardController::class, 'reports'])->name('reports');
    
    // Settings
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');
    Route::post('/settings/backup', [SettingsController::class, 'backup'])->name('settings.backup');
    Route::post('/settings/restore', [SettingsController::class, 'restore'])->name('settings.restore');
    Route::post('/settings/reset', [SettingsController::class, 'reset'])->name('settings.reset');
});

// Import Laravel Breeze authentication routes (password reset, email verification, etc.)
require __DIR__.'/auth.php';