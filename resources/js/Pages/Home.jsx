import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import PackageCard from '@/Components/PackageCard';
import { 
    MagnifyingGlassIcon,
    CalendarDaysIcon,
    MapPinIcon,
    BanknotesIcon,
    CheckCircleIcon,
    ShieldCheckIcon,
    TruckIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';

export default function Home({ featuredPackages, destinations }) {
    return (
        <AppLayout title="Home">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            Discover Your Next Adventure
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-200">
                            Explore breathtaking destinations with our expertly curated travel packages. 
                            Your dream vacation is just a click away.
                        </p>
                        <div className="mt-10">
                            <Link
                                href={route('packages.index')}
                                className="rounded-md bg-white px-8 py-3 text-lg font-semibold text-indigo-600 hover:bg-gray-100"
                            >
                                Browse Packages
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="bg-white py-8 shadow-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Trip</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search destinations..."
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div className="relative">
                                <CalendarDaysIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="date"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div className="relative">
                                <BanknotesIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <select className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                    <option>Any Price</option>
                                    <option>Under $1000</option>
                                    <option>$1000 - $3000</option>
                                    <option>Over $3000</option>
                                </select>
                            </div>
                            <button className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
                                Search Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Packages */}
            <div className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Packages</h2>
                        <p className="mt-4 text-lg text-gray-600">Our most popular travel experiences</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredPackages.map((pkg) => (
                            <PackageCard key={pkg.id} package={pkg} />
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <Link
                            href={route('packages.index')}
                            className="inline-flex items-center rounded-md bg-white px-6 py-3 text-lg font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-gray-50"
                        >
                            View All Packages
                            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
                        <p className="mt-4 text-lg text-gray-600">We make your travel dreams come true</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                                <CheckCircleIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
                            <p className="text-gray-600">We guarantee the best prices for all our packages</p>
                        </div>
                        
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                                <ShieldCheckIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
                            <p className="text-gray-600">Your security and privacy are our top priority</p>
                        </div>
                        
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                                <TruckIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                            <p className="text-gray-600">Round-the-clock customer support for all your needs</p>
                        </div>
                        
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-4">
                                <HeartIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Happy Travelers</h3>
                            <p className="text-gray-600">Join thousands of satisfied travelers worldwide</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Destinations */}
            {/* <div className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2>
                        <p className="mt-4 text-lg text-gray-600">Explore our most sought-after locations</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinations.map((destination) => (
                            <div key={destination.id} className="relative rounded-xl overflow-hidden shadow-lg group">
                                <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-600"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                                    <p className="text-gray-200 line-clamp-2">{destination.description}</p>
                                    <Link
                                        href={route('packages.index', { destination: destination.id })}
                                        className="inline-flex items-center mt-4 text-white font-semibold hover:text-gray-200"
                                    >
                                        Explore Packages
                                        <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-14">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready for Your Next Adventure?</h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        Join thousands of happy travelers who have experienced unforgettable journeys with us.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={route('packages.index')}
                            className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition text-lg"
                        >
                            Start Exploring
                        </Link>
                        <Link
                            href={route('register')}
                            className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition text-lg"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}