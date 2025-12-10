import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    UserCircleIcon,
    CameraIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Profile({ user }) {
    const [imagePreview, setImagePreview] = useState(user.avatar || null);
    
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: null,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout title="Profile">
            <Head title="Profile" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Profile Information Card */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
                                
                                <div className="space-y-6">
                                    {/* Avatar Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Profile Picture
                                        </label>
                                        <div className="flex items-center space-x-6">
                                            <div className="relative">
                                                {imagePreview ? (
                                                    <img
                                                        src={imagePreview}
                                                        alt="Profile"
                                                        className="h-24 w-24 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <UserCircleIcon className="h-12 w-12 text-gray-400" />
                                                    </div>
                                                )}
                                                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer">
                                                    <CameraIcon className="h-4 w-4" />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Upload a new profile picture. JPG, PNG or GIF, max 2MB.
                                                </p>
                                                {imagePreview && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImagePreview(null);
                                                            setData('avatar', null);
                                                        }}
                                                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                                                    >
                                                        Remove photo
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {errors.avatar && (
                                            <p className="mt-2 text-sm text-red-600">{errors.avatar}</p>
                                        )}
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                        {errors.phone && (
                                            <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Address
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="123 Main St, City, State, ZIP"
                                        />
                                        {errors.address && (
                                            <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Password Update Card */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Update Password</h2>
                                
                                <div className="space-y-6">
                                    <p className="text-sm text-gray-600">
                                        Ensure your account is using a long, random password to stay secure.
                                    </p>

                                    {/* Current Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            value={data.current_password}
                                            onChange={(e) => setData('current_password', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.current_password && (
                                            <p className="mt-2 text-sm text-red-600">{errors.current_password}</p>
                                        )}
                                    </div>

                                    {/* New Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.password && (
                                            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.password_confirmation && (
                                            <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Account Summary */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Member Since</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Account Type</p>
                                    <p className="font-medium text-gray-900">
                                        {user.is_admin ? 'Administrator' : 'Standard User'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email Verified</p>
                                    <p className="font-medium text-gray-900">
                                        {user.email_verified_at ? 'Verified' : 'Not Verified'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                            <div className="space-y-3">
                                <Link
                                    href={route('user.bookings')}
                                    className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                                >
                                    <span className="font-medium text-gray-900">My Bookings</span>
                                    <p className="text-sm text-gray-500 mt-1">View and manage your travel bookings</p>
                                </Link>
                                <Link
                                    href={route('dashboard')}
                                    className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                                >
                                    <span className="font-medium text-gray-900">Dashboard</span>
                                    <p className="text-sm text-gray-500 mt-1">Back to your dashboard</p>
                                </Link>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-red-50 rounded-xl p-6">
                            <button
                                type="button"
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                        // Handle account deletion
                                    }
                                }}
                                className="w-full bg-white text-red-600 border border-red-300 py-2 px-4 rounded-md hover:bg-red-50 font-medium"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}