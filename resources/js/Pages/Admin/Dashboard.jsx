import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import {
    ChartBarIcon,
    UserGroupIcon,
    TicketIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';

export default function AdminDashboard({ stats, recentBookings, topPackages }) {
    // Ensure stats have default values
    const safeStats = {
        totalBookings: stats?.totalBookings || 0,
        totalRevenue: stats?.totalRevenue || 0,
        activeUsers: stats?.activeUsers || 0,
        avgBookingValue: stats?.avgBookingValue || 0,
    };

    // Ensure arrays exist
    const safeRecentBookings = recentBookings || [];
    const safeTopPackages = topPackages || [];

    const statCards = [
        {
            name: 'Total Bookings',
            value: safeStats.totalBookings,
            change: '+12%',
            changeType: 'increase',
            icon: TicketIcon,
            color: 'bg-blue-500',
        },
        {
            name: 'Total Revenue',
            value: `$${safeStats.totalRevenue.toLocaleString()}`,
            change: '+8.2%',
            changeType: 'increase',
            icon: CurrencyDollarIcon,
            color: 'bg-green-500',
        },
        {
            name: 'Active Users',
            value: safeStats.activeUsers,
            change: '+3.2%',
            changeType: 'increase',
            icon: UserGroupIcon,
            color: 'bg-purple-500',
        },
        {
            name: 'Avg. Booking Value',
            value: `$${parseFloat(safeStats.avgBookingValue).toFixed(2)}`,
            change: '-2.1%',
            changeType: 'decrease',
            icon: ChartBarIcon,
            color: 'bg-yellow-500',
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Stats */}
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((stat) => (
                            <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                        <div className="flex items-center mt-2">
                                            {stat.changeType === 'increase' ? (
                                                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                                            ) : (
                                                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                                            )}
                                            <span className={`text-sm font-medium ${
                                                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {stat.change}
                                            </span>
                                            <span className="text-gray-500 text-sm ml-2">from last month</span>
                                        </div>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Bookings & Top Packages */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Bookings */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">View all</a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {safeRecentBookings.length > 0 ? (
                                        safeRecentBookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <span className="text-sm font-medium">
                                                                {booking.user?.name?.charAt(0) || 'U'}
                                                            </span>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {booking.user?.name || 'Unknown User'}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {booking.user?.email || 'No email'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {booking.package?.title || 'Package not found'}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <p className="text-sm text-gray-900">
                                                        {booking.booking_date || 'No date'}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {booking.status || 'unknown'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                                No recent bookings found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top Packages */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Top Packages</h3>
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">View all</a>
                        </div>
                        <div className="space-y-4">
                            {safeTopPackages.length > 0 ? (
                                safeTopPackages.map((pkg) => (
                                    <div key={pkg.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500"></div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {pkg.title || 'Untitled Package'}
                                                </p>
                                                {/* FIXED LINE: Added optional chaining */}
                                                <p className="text-sm text-gray-500">
                                                    {pkg.destination?.name || 'No destination assigned'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-gray-900">
                                                ${pkg.price ? parseFloat(pkg.price).toFixed(2) : '0.00'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {pkg.bookings_count || 0} bookings
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No top packages found
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                        <h4 className="text-lg font-semibold mb-2">Monthly Revenue</h4>
                        <p className="text-2xl font-bold">$42,580</p>
                        <p className="text-sm opacity-80 mt-2">+18% from last month</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                        <h4 className="text-lg font-semibold mb-2">New Customers</h4>
                        <p className="text-2xl font-bold">124</p>
                        <p className="text-sm opacity-80 mt-2">+12% from last month</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                        <h4 className="text-lg font-semibold mb-2">Conversion Rate</h4>
                        <p className="text-2xl font-bold">3.8%</p>
                        <p className="text-sm opacity-80 mt-2">+0.4% from last month</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}