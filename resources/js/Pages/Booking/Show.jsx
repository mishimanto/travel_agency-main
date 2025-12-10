// resources/js/Pages/Booking/Show.jsx
import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    CheckCircleIcon,
    CalendarDaysIcon,
    UserIcon,
    CurrencyDollarIcon,
    MapPinIcon,
    ClockIcon,
    TicketIcon
} from '@heroicons/react/24/outline';

export default function BookingShow({ booking }) {
    return (
        <AppLayout title="Booking Details">
            <Head>
                <meta name="description" content="View your booking details" />
            </Head>

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                            <li>
                                <Link href={route('home')} className="text-gray-400 hover:text-gray-500">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="text-gray-400 mx-2">›</span>
                                    <Link href={route('dashboard')} className="text-gray-400 hover:text-gray-500">
                                        Dashboard
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="text-gray-400 mx-2">›</span>
                                    <Link href={route('user.bookings')} className="text-gray-400 hover:text-gray-500">
                                        My Bookings
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="text-gray-400 mx-2">›</span>
                                    <span className="text-gray-900 font-medium">Booking #{booking.id}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Success Message */}
                    <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-center">
                            <CheckCircleIcon className="h-12 w-12 text-green-500 mr-4" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
                                <p className="text-gray-600 mt-2">
                                    Your booking has been confirmed. We've sent a confirmation email to your registered email address.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Booking Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center">
                                        <TicketIcon className="h-6 w-6 text-gray-400 mr-4" />
                                        <div>
                                            <div className="text-sm text-gray-500">Booking ID</div>
                                            <div className="font-semibold">#{booking.id}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <CalendarDaysIcon className="h-6 w-6 text-gray-400 mr-4" />
                                        <div>
                                            <div className="text-sm text-gray-500">Booking Date</div>
                                            <div className="font-semibold">
                                                {new Date(booking.created_at).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <CalendarDaysIcon className="h-6 w-6 text-gray-400 mr-4" />
                                        <div>
                                            <div className="text-sm text-gray-500">Trip Date</div>
                                            <div className="font-semibold">
                                                {new Date(booking.booking_date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <UserIcon className="h-6 w-6 text-gray-400 mr-4" />
                                        <div>
                                            <div className="text-sm text-gray-500">Travelers</div>
                                            <div className="font-semibold">{booking.number_of_people} {booking.number_of_people === 1 ? 'Person' : 'People'}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <CurrencyDollarIcon className="h-6 w-6 text-gray-400 mr-4" />
                                        <div>
                                            <div className="text-sm text-gray-500">Total Price</div>
                                            <div className="text-2xl font-bold text-indigo-600">${booking.total_price}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <div className="h-6 w-6 mr-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                booking.status === 'confirmed' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : booking.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : booking.status === 'completed'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </div>
                                        {/* <div>
                                            <div className="text-sm text-gray-500">Status</div>
                                            <div className="font-semibold">{booking.status}</div>
                                        </div> */}
                                    </div>
                                    
                                    {booking.special_requests && (
                                        <div>
                                            <div className="text-sm text-gray-500 mb-2">Special Requests</div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                {booking.special_requests}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Package Details */}
                            {booking.package && (
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Package Details</h3>
                                    
                                    <div className="flex items-start mb-6">
                                        {booking.package.image && (
                                            <div className="w-32 h-24 rounded-lg overflow-hidden mr-4">
                                                <img 
                                                    src={`/storage/${booking.package.image}`} 
                                                    alt={booking.package.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">{booking.package.title}</h4>
                                            <div className="flex items-center mt-2 text-gray-600">
                                                <MapPinIcon className="h-4 w-4 mr-1" />
                                                <span>{booking.package.destination?.name}</span>
                                            </div>
                                            <div className="flex items-center mt-1 text-gray-600">
                                                <ClockIcon className="h-4 w-4 mr-1" />
                                                <span>{booking.package.duration_days} days</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <Link 
                                        href={route('packages.show', booking.package.id)}
                                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                                    >
                                        View Package Details
                                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Actions & Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Next Steps</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <span className="text-indigo-600 font-bold">1</span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-medium text-gray-900">Check Your Email</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                We've sent a confirmation email with all the details.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <span className="text-indigo-600 font-bold">2</span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-medium text-gray-900">Prepare Documents</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Make sure you have valid passports and necessary visas.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <span className="text-indigo-600 font-bold">3</span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-medium text-gray-900">Contact Support</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Need help? Our support team is available 24/7.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-8 space-y-3">
                                    <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition font-medium">
                                        Download Invoice
                                    </button>
                                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition font-medium">
                                        Modify Booking
                                    </button>
                                    <button className="w-full border border-red-300 text-red-600 py-3 px-4 rounded-lg hover:bg-red-50 transition font-medium">
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                            
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                                <p className="text-gray-600 text-sm mb-4">
                                    Our travel experts are here to help you with any questions.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">017XXXXXXXX</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        <span className="text-sm">support@travelagency.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}