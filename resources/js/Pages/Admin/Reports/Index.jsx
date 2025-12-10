import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    ChartBarIcon,
    CurrencyDollarIcon,
    TicketIcon,
    UserIcon,
    MapPinIcon,
    CalendarIcon,
    ArrowDownTrayIcon,
    FilterIcon,
    ChevronDownIcon,
    EyeIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

export default function ReportsIndex({ reports, filters }) {
    const [startDate, setStartDate] = useState(filters.start_date);
    const [endDate, setEndDate] = useState(filters.end_date);
    const [reportType, setReportType] = useState(filters.report_type);
    const [exportFormat, setExportFormat] = useState('csv');

    const handleFilter = () => {
        router.get(route('admin.reports'), {
            report_type: reportType,
            start_date: startDate,
            end_date: endDate,
        });
    };

    const handleExport = () => {
        router.post(route('admin.reports.export'), {
            report_type: reportType,
            start_date: startDate,
            end_date: endDate,
            format: exportFormat,
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const renderOverviewReport = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 mt-2">
                                {formatCurrency(reports.revenue?.total)}
                            </p>
                            <div className="flex items-center mt-2">
                                {reports.revenue?.current_month > reports.revenue?.last_month ? (
                                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                                ) : (
                                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                                )}
                                <span className={`text-sm ${reports.revenue?.current_month > reports.revenue?.last_month ? 'text-green-600' : 'text-red-600'}`}>
                                    {reports.revenue?.current_month > reports.revenue?.last_month ? '+' : ''}
                                    {(((reports.revenue?.current_month - reports.revenue?.last_month) / reports.revenue?.last_month) * 100 || 0).toFixed(1)}%
                                </span>
                                <span className="text-sm text-gray-500 ml-2">vs last month</span>
                            </div>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Bookings</p>
                            <p className="text-2xl font-bold text-gray-900 mt-2">
                                {reports.bookings?.total || 0}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="inline-flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                    <CheckCircleIcon className="h-3 w-3 mr-1" />
                                    {reports.bookings?.confirmed || 0} confirmed
                                </span>
                                <span className="inline-flex items-center text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                                    <ClockIcon className="h-3 w-3 mr-1" />
                                    {reports.bookings?.pending || 0} pending
                                </span>
                            </div>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <TicketIcon className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Active Users</p>
                            <p className="text-2xl font-bold text-gray-900 mt-2">
                                {reports.users?.total || 0}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                {reports.users?.new_this_month || 0} new this month
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Active Packages</p>
                            <p className="text-2xl font-bold text-gray-900 mt-2">
                                {reports.packages?.active || 0}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                of {reports.packages?.total || 0} total
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <MapPinIcon className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Selling Packages */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Packages</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reports.packages?.top_selling?.map((pkg) => (
                                <tr key={pkg.id}>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-900">{pkg.title}</div>
                                        <div className="text-sm text-gray-500">{pkg.description?.substring(0, 50)}...</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                            {pkg.bookings_count || 0}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {formatCurrency(pkg.revenue || 0)}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {pkg.destination?.name || 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="space-y-4">
                    {reports.recent_bookings?.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <TicketIcon className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">Booking #{booking.booking_code}</div>
                                    <div className="text-sm text-gray-500">
                                        {booking.user?.name} • {booking.package?.title}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium text-gray-900">{formatCurrency(booking.total_amount)}</div>
                                <div className="text-sm text-gray-500">
                                    {formatDate(booking.created_at)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderRevenueReport = () => (
        <div className="space-y-6">
            {/* Revenue Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {formatCurrency(reports.summary?.total_revenue)}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {reports.summary?.total_bookings || 0}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Avg. Revenue per Booking</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {formatCurrency(reports.summary?.average_revenue_per_booking)}
                    </p>
                </div>
            </div>

            {/* Daily Revenue Table */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Revenue</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg. per Booking</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reports.daily_revenue?.map((day) => (
                                <tr key={day.date}>
                                    <td className="px-4 py-3">{formatDate(day.date)}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {formatCurrency(day.revenue)}
                                    </td>
                                    <td className="px-4 py-3">{day.bookings_count}</td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {formatCurrency(day.bookings_count ? day.revenue / day.bookings_count : 0)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderBookingsReport = () => (
        <div className="space-y-6">
            {/* Booking Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {reports.summary?.total_bookings || 0}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Confirmed</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {reports.summary?.confirmed_bookings || 0}
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                        {reports.summary?.conversion_rate?.toFixed(1)}% conversion
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {reports.summary?.pending_bookings || 0}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Cancelled</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {reports.summary?.cancelled_bookings || 0}
                    </p>
                </div>
            </div>

            {/* Booking Status Breakdown */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status Breakdown</h3>
                <div className="space-y-4">
                    {reports.status_breakdown?.map((status) => (
                        <div key={status.status} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`h-3 w-3 rounded-full ${
                                    status.status === 'confirmed' ? 'bg-green-500' :
                                    status.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></div>
                                <span className="capitalize">{status.status}</span>
                            </div>
                            <div className="flex items-center space-x-6">
                                <span className="font-medium">{status.count} bookings</span>
                                <span className="text-gray-500">{formatCurrency(status.revenue)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPackagesReport = () => (
        <div className="space-y-6">
            {/* Package Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Total Packages</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {reports.summary?.total_packages || 0}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Active Packages</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {reports.summary?.active_packages || 0}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {reports.summary?.total_bookings || 0}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {formatCurrency(reports.summary?.total_revenue)}
                    </p>
                </div>
            </div>

            {/* Top Performing Packages */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Performance</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg. Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reports.package_performance?.map((pkg) => (
                                <tr key={pkg.id}>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-900">{pkg.title}</div>
                                        <div className="text-sm text-gray-500">{pkg.destination?.name}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {pkg.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{pkg.bookings_count}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {formatCurrency(pkg.revenue)}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {formatCurrency(pkg.avg_revenue)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderUsersReport = () => (
        <div className="space-y-6">
            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {reports.summary?.total_users || 0}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {reports.summary?.active_users || 0}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                        {formatCurrency(reports.summary?.total_revenue_from_users)}
                    </p>
                </div>
            </div>

            {/* Top Spenders */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Spenders</h3>
                <div className="space-y-4">
                    {reports.summary?.top_spenders?.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <UserIcon className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium text-gray-900">{formatCurrency(user.total_spent)}</div>
                                <div className="text-sm text-gray-500">{user.bookings_count} bookings</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderReportContent = () => {
        switch (reports.type) {
            case 'revenue':
                return renderRevenueReport();
            case 'bookings':
                return renderBookingsReport();
            case 'packages':
                return renderPackagesReport();
            case 'users':
                return renderUsersReport();
            default:
                return renderOverviewReport();
        }
    };

    return (
        <AdminLayout title="Reports">
            <Head title="Reports & Analytics" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
                        <p className="mt-1 text-gray-600">Track performance and analyze data</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleExport}
                            className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                        >
                            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                            Export {exportFormat.toUpperCase()}
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Report Type
                                </label>
                                <select
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="overview">Overview</option>
                                    <option value="revenue">Revenue Report</option>
                                    <option value="bookings">Bookings Report</option>
                                    <option value="packages">Packages Report</option>
                                    <option value="users">Users Report</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={handleFilter}
                                className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 h-10"
                            >
                                <FilterIcon className="h-4 w-4 mr-2" />
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Export Options */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Export Options</h4>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="csv"
                                    checked={exportFormat === 'csv'}
                                    onChange={() => setExportFormat('csv')}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                />
                                <label htmlFor="csv" className="ml-2 block text-sm text-gray-900">
                                    CSV Format
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="pdf"
                                    checked={exportFormat === 'pdf'}
                                    onChange={() => setExportFormat('pdf')}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                />
                                <label htmlFor="pdf" className="ml-2 block text-sm text-gray-900">
                                    PDF Format
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Report Content */}
                {renderReportContent()}
            </div>
        </AdminLayout>
    );
}