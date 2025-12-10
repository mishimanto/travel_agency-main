import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Cog6ToothIcon,
    GlobeAltIcon,
    EnvelopeIcon,
    CreditCardIcon,
    ShareIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon,
    CloudArrowDownIcon,
    CloudArrowUpIcon,
    CheckCircleIcon,
    XCircleIcon,
    PhotoIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

export default function SettingsIndex({ settings }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [backupFile, setBackupFile] = useState(null);

    const tabs = [
        { id: 'general', name: 'General', icon: Cog6ToothIcon },
        { id: 'site', name: 'Site', icon: GlobeAltIcon },
        { id: 'email', name: 'Email', icon: EnvelopeIcon },
        { id: 'payment', name: 'Payment', icon: CreditCardIcon },
        { id: 'social', name: 'Social', icon: ShareIcon },
        { id: 'seo', name: 'SEO', icon: MagnifyingGlassIcon },
    ];

    useEffect(() => {
        setFormData(settings[activeTab] || {});
    }, [activeTab, settings]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileChange = (field, e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                [field]: file,
                [`remove_${field}`]: false,
            }));
        }
    };

    const handleRemoveFile = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: null,
            [`remove_${field}`]: true,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const data = new FormData();
        
        // Append all form fields
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                if (formData[key] instanceof File) {
                    data.append(key, formData[key]);
                } else {
                    data.append(key, formData[key]);
                }
            }
        });

        // Add section for backend processing
        data.append('section', activeTab);

        router.post(route('admin.settings.update'), data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setLoading(false);
            },
        });
    };

    const handleResetSection = () => {
        if (confirm(`Are you sure you want to reset ${activeTab} settings to defaults?`)) {
            router.post(route('admin.settings.reset'), {
                section: activeTab,
            }, {
                preserveScroll: true,
            });
        }
    };

    const handleBackup = () => {
        window.location.href = route('admin.settings.backup');
    };

    const handleRestore = () => {
        if (!backupFile) {
            alert('Please select a backup file first.');
            return;
        }

        if (confirm('Are you sure you want to restore settings from backup? This will overwrite current settings.')) {
            const data = new FormData();
            data.append('backup_file', backupFile);

            router.post(route('admin.settings.restore'), data, {
                forceFormData: true,
                preserveScroll: true,
            });
        }
    };

    const renderGeneralSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name *
                    </label>
                    <input
                        type="text"
                        value={formData.site_name || ''}
                        onChange={(e) => handleInputChange('site_name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {errors.site_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.site_name}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Email *
                    </label>
                    <input
                        type="email"
                        value={formData.site_email || ''}
                        onChange={(e) => handleInputChange('site_email', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    {errors.site_email && (
                        <p className="mt-1 text-sm text-red-600">{errors.site_email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Phone
                    </label>
                    <input
                        type="text"
                        value={formData.site_phone || ''}
                        onChange={(e) => handleInputChange('site_phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone *
                    </label>
                    <select
                        value={formData.timezone || 'UTC'}
                        onChange={(e) => handleInputChange('timezone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Dhaka">Dhaka</option>
                        <option value="Asia/Dubai">Dubai</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                        <option value="Australia/Sydney">Sydney</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency *
                    </label>
                    <select
                        value={formData.currency || 'USD'}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="GBP">British Pound (GBP)</option>
                        <option value="JPY">Japanese Yen (JPY)</option>
                        <option value="AUD">Australian Dollar (AUD)</option>
                        <option value="CAD">Canadian Dollar (CAD)</option>
                        <option value="BDT">Bangladeshi Taka (BDT)</option>
                        <option value="INR">Indian Rupee (INR)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency Symbol *
                    </label>
                    <input
                        type="text"
                        value={formData.currency_symbol || '$'}
                        onChange={(e) => handleInputChange('currency_symbol', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        maxLength="5"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format *
                    </label>
                    <select
                        value={formData.date_format || 'Y-m-d'}
                        onChange={(e) => handleInputChange('date_format', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="Y-m-d">YYYY-MM-DD</option>
                        <option value="m/d/Y">MM/DD/YYYY</option>
                        <option value="d/m/Y">DD/MM/YYYY</option>
                        <option value="F j, Y">Month Day, Year</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language *
                    </label>
                    <select
                        value={formData.language || 'en'}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="en">English</option>
                        <option value="bn">Bengali</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ar">Arabic</option>
                        <option value="ja">Japanese</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Address
                </label>
                <textarea
                    value={formData.site_address || ''}
                    onChange={(e) => handleInputChange('site_address', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>
        </div>
    );

    const renderSiteSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hero Title *
                    </label>
                    <input
                        type="text"
                        value={formData.hero_title || ''}
                        onChange={(e) => handleInputChange('hero_title', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email *
                    </label>
                    <input
                        type="email"
                        value={formData.contact_email || ''}
                        onChange={(e) => handleInputChange('contact_email', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                    </label>
                    <input
                        type="text"
                        value={formData.contact_phone || ''}
                        onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Working Hours
                    </label>
                    <input
                        type="text"
                        value={formData.working_hours || ''}
                        onChange={(e) => handleInputChange('working_hours', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Subtitle
                </label>
                <input
                    type="text"
                    value={formData.hero_subtitle || ''}
                    onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Text
                </label>
                <textarea
                    value={formData.about_text || ''}
                    onChange={(e) => handleInputChange('about_text', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </div>

            {/* Logo Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Logo
                </label>
                <div className="flex items-start space-x-6">
                    {formData.logo && !formData.remove_logo && typeof formData.logo === 'string' ? (
                        <div className="relative">
                            <img
                                src={formData.logo}
                                alt="Site Logo"
                                className="h-32 w-auto object-contain border rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFile('logo')}
                                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    ) : formData.logo instanceof File ? (
                        <div className="relative">
                            <img
                                src={URL.createObjectURL(formData.logo)}
                                alt="New Logo"
                                className="h-32 w-auto object-contain border rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFile('logo')}
                                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="h-32 w-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            <PhotoIcon className="h-12 w-12 text-gray-400" />
                        </div>
                    )}
                    <div>
                        <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                            <input
                                type="file"
                                className="sr-only"
                                onChange={(e) => handleFileChange('logo', e)}
                                accept="image/*"
                            />
                            Choose Logo
                        </label>
                        <p className="mt-2 text-xs text-gray-500">
                            Recommended: 200x60px, PNG or SVG format
                        </p>
                    </div>
                </div>
            </div>

            {/* Favicon Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon
                </label>
                <div className="flex items-start space-x-6">
                    {formData.favicon && !formData.remove_favicon && typeof formData.favicon === 'string' ? (
                        <div className="relative">
                            <img
                                src={formData.favicon}
                                alt="Favicon"
                                className="h-16 w-16 object-contain border rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFile('favicon')}
                                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    ) : formData.favicon instanceof File ? (
                        <div className="relative">
                            <img
                                src={URL.createObjectURL(formData.favicon)}
                                alt="New Favicon"
                                className="h-16 w-16 object-contain border rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFile('favicon')}
                                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="h-16 w-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            <PhotoIcon className="h-8 w-8 text-gray-400" />
                        </div>
                    )}
                    <div>
                        <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                            <input
                                type="file"
                                className="sr-only"
                                onChange={(e) => handleFileChange('favicon', e)}
                                accept="image/x-icon,image/png"
                            />
                            Choose Favicon
                        </label>
                        <p className="mt-2 text-xs text-gray-500">
                            Recommended: 32x32px, ICO or PNG format
                        </p>
                    </div>
                </div>
            </div>

            {/* Toggle Settings */}
            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="enable_registration"
                        checked={formData.enable_registration || false}
                        onChange={(e) => handleInputChange('enable_registration', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enable_registration" className="ml-2 block text-sm text-gray-900">
                        Enable User Registration
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="enable_booking"
                        checked={formData.enable_booking || false}
                        onChange={(e) => handleInputChange('enable_booking', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enable_booking" className="ml-2 block text-sm text-gray-900">
                        Enable Booking System
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="maintenance_mode"
                        checked={formData.maintenance_mode || false}
                        onChange={(e) => handleInputChange('maintenance_mode', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="maintenance_mode" className="ml-2 block text-sm text-gray-900">
                        Maintenance Mode
                    </label>
                </div>
            </div>
        </div>
    );

    const renderEmailSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mail Driver *
                    </label>
                    <select
                        value={formData.mail_driver || 'smtp'}
                        onChange={(e) => handleInputChange('mail_driver', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="smtp">SMTP</option>
                        <option value="mailgun">Mailgun</option>
                        <option value="ses">Amazon SES</option>
                        <option value="postmark">Postmark</option>
                        <option value="log">Log (Testing)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mail Host *
                    </label>
                    <input
                        type="text"
                        value={formData.mail_host || ''}
                        onChange={(e) => handleInputChange('mail_host', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mail Port *
                    </label>
                    <input
                        type="number"
                        value={formData.mail_port || ''}
                        onChange={(e) => handleInputChange('mail_port', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mail Encryption
                    </label>
                    <select
                        value={formData.mail_encryption || 'tls'}
                        onChange={(e) => handleInputChange('mail_encryption', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="tls">TLS</option>
                        <option value="ssl">SSL</option>
                        <option value="starttls">STARTTLS</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mail Username
                    </label>
                    <input
                        type="text"
                        value={formData.mail_username || ''}
                        onChange={(e) => handleInputChange('mail_username', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mail Password
                    </label>
                    <input
                        type="password"
                        value={formData.mail_password || ''}
                        onChange={(e) => handleInputChange('mail_password', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Address *
                    </label>
                    <input
                        type="email"
                        value={formData.mail_from_address || ''}
                        onChange={(e) => handleInputChange('mail_from_address', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Name *
                    </label>
                    <input
                        type="text"
                        value={formData.mail_from_name || ''}
                        onChange={(e) => handleInputChange('mail_from_name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Booking Confirmation Subject *
                    </label>
                    <input
                        type="text"
                        value={formData.booking_confirmation_subject || ''}
                        onChange={(e) => handleInputChange('booking_confirmation_subject', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Welcome Email Subject *
                    </label>
                    <input
                        type="text"
                        value={formData.welcome_email_subject || ''}
                        onChange={(e) => handleInputChange('welcome_email_subject', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Booking Confirmation Template
                    </label>
                    <textarea
                        value={formData.booking_confirmation_template || ''}
                        onChange={(e) => handleInputChange('booking_confirmation_template', e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Welcome Email Template
                    </label>
                    <textarea
                        value={formData.welcome_email_template || ''}
                        onChange={(e) => handleInputChange('welcome_email_template', e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    );

    const renderPaymentSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Payment Method *
                    </label>
                    <select
                        value={formData.default_payment_method || 'stripe'}
                        onChange={(e) => handleInputChange('default_payment_method', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="stripe">Stripe</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank_transfer">Bank Transfer</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax Rate (%) *
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={formData.tax_rate || 0}
                        onChange={(e) => handleInputChange('tax_rate', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Stripe Settings */}
            <div className="border-t pt-6">
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="enable_stripe"
                        checked={formData.enable_stripe || false}
                        onChange={(e) => handleInputChange('enable_stripe', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enable_stripe" className="ml-2 block text-sm font-medium text-gray-900">
                        Enable Stripe Payments
                    </label>
                </div>

                {formData.enable_stripe && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stripe Public Key *
                            </label>
                            <input
                                type="text"
                                value={formData.stripe_public_key || ''}
                                onChange={(e) => handleInputChange('stripe_public_key', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stripe Secret Key *
                            </label>
                            <input
                                type="password"
                                value={formData.stripe_secret_key || ''}
                                onChange={(e) => handleInputChange('stripe_secret_key', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* PayPal Settings */}
            <div className="border-t pt-6">
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="enable_paypal"
                        checked={formData.enable_paypal || false}
                        onChange={(e) => handleInputChange('enable_paypal', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enable_paypal" className="ml-2 block text-sm font-medium text-gray-900">
                        Enable PayPal Payments
                    </label>
                </div>

                {formData.enable_paypal && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                PayPal Client ID *
                            </label>
                            <input
                                type="text"
                                value={formData.paypal_client_id || ''}
                                onChange={(e) => handleInputChange('paypal_client_id', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                PayPal Secret *
                            </label>
                            <input
                                type="password"
                                value={formData.paypal_secret || ''}
                                onChange={(e) => handleInputChange('paypal_secret', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                PayPal Mode *
                            </label>
                            <select
                                value={formData.paypal_mode || 'sandbox'}
                                onChange={(e) => handleInputChange('paypal_mode', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="sandbox">Sandbox (Testing)</option>
                                <option value="live">Live (Production)</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Bank Transfer Settings */}
            <div className="border-t pt-6">
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="enable_bank_transfer"
                        checked={formData.enable_bank_transfer || false}
                        onChange={(e) => handleInputChange('enable_bank_transfer', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enable_bank_transfer" className="ml-2 block text-sm font-medium text-gray-900">
                        Enable Bank Transfer
                    </label>
                </div>

                {formData.enable_bank_transfer && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bank Account Name *
                            </label>
                            <input
                                type="text"
                                value={formData.bank_account_name || ''}
                                onChange={(e) => handleInputChange('bank_account_name', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bank Account Number *
                            </label>
                            <input
                                type="text"
                                value={formData.bank_account_number || ''}
                                onChange={(e) => handleInputChange('bank_account_number', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bank Name *
                            </label>
                            <input
                                type="text"
                                value={formData.bank_name || ''}
                                onChange={(e) => handleInputChange('bank_name', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bank Branch
                            </label>
                            <input
                                type="text"
                                value={formData.bank_branch || ''}
                                onChange={(e) => handleInputChange('bank_branch', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderSocialSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facebook URL
                    </label>
                    <input
                        type="url"
                        value={formData.facebook_url || ''}
                        onChange={(e) => handleInputChange('facebook_url', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter URL
                    </label>
                    <input
                        type="url"
                        value={formData.twitter_url || ''}
                        onChange={(e) => handleInputChange('twitter_url', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram URL
                    </label>
                    <input
                        type="url"
                        value={formData.instagram_url || ''}
                        onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn URL
                    </label>
                    <input
                        type="url"
                        value={formData.linkedin_url || ''}
                        onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        YouTube URL
                    </label>
                    <input
                        type="url"
                        value={formData.youtube_url || ''}
                        onChange={(e) => handleInputChange('youtube_url', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pinterest URL
                    </label>
                    <input
                        type="url"
                        value={formData.pinterest_url || ''}
                        onChange={(e) => handleInputChange('pinterest_url', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        TripAdvisor URL
                    </label>
                    <input
                        type="url"
                        value={formData.tripadvisor_url || ''}
                        onChange={(e) => handleInputChange('tripadvisor_url', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="enable_sharing"
                    checked={formData.enable_sharing || false}
                    onChange={(e) => handleInputChange('enable_sharing', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="enable_sharing" className="ml-2 block text-sm text-gray-900">
                    Enable Social Sharing Buttons
                </label>
            </div>
        </div>
    );

    const renderSeoSettings = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title *
                    </label>
                    <input
                        type="text"
                        value={formData.meta_title || ''}
                        onChange={(e) => handleInputChange('meta_title', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Google Analytics ID
                    </label>
                    <input
                        type="text"
                        value={formData.google_analytics_id || ''}
                        onChange={(e) => handleInputChange('google_analytics_id', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="UA-XXXXXXXXX-X"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description *
                </label>
                <textarea
                    value={formData.meta_description || ''}
                    onChange={(e) => handleInputChange('meta_description', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    maxLength="500"
                />
                <p className="mt-1 text-sm text-gray-500">
                    {formData.meta_description?.length || 0}/500 characters
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords
                </label>
                <input
                    type="text"
                    value={formData.meta_keywords || ''}
                    onChange={(e) => handleInputChange('meta_keywords', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="travel, packages, vacation, tourism"
                />
            </div>

            {/* OG Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Image
                </label>
                <div className="flex items-start space-x-6">
                    {formData.og_image && !formData.remove_og_image && typeof formData.og_image === 'string' ? (
                        <div className="relative">
                            <img
                                src={formData.og_image}
                                alt="OG Image"
                                className="h-32 w-auto object-contain border rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFile('og_image')}
                                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    ) : formData.og_image instanceof File ? (
                        <div className="relative">
                            <img
                                src={URL.createObjectURL(formData.og_image)}
                                alt="New OG Image"
                                className="h-32 w-auto object-contain border rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFile('og_image')}
                                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="h-32 w-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            <PhotoIcon className="h-12 w-12 text-gray-400" />
                        </div>
                    )}
                    <div>
                        <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                            <input
                                type="file"
                                className="sr-only"
                                onChange={(e) => handleFileChange('og_image', e)}
                                accept="image/*"
                            />
                            Choose Image
                        </label>
                        <p className="mt-2 text-xs text-gray-500">
                            Recommended: 1200x630px, JPG or PNG format
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Google Site Verification
                    </label>
                    <input
                        type="text"
                        value={formData.google_site_verification || ''}
                        onChange={(e) => handleInputChange('google_site_verification', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bing Webmaster Tools
                    </label>
                    <input
                        type="text"
                        value={formData.bing_webmaster_tools || ''}
                        onChange={(e) => handleInputChange('bing_webmaster_tools', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sitemap Frequency
                    </label>
                    <select
                        value={formData.sitemap_frequency || 'weekly'}
                        onChange={(e) => handleInputChange('sitemap_frequency', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="enable_sitemap"
                        checked={formData.enable_sitemap || false}
                        onChange={(e) => handleInputChange('enable_sitemap', e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enable_sitemap" className="ml-2 block text-sm text-gray-900">
                        Enable Sitemap Generation
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Robots.txt Content
                </label>
                <textarea
                    value={formData.robots_txt || ''}
                    onChange={(e) => handleInputChange('robots_txt', e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                />
            </div>
        </div>
    );

    const renderSettingsForm = () => {
        switch (activeTab) {
            case 'general':
                return renderGeneralSettings();
            case 'site':
                return renderSiteSettings();
            case 'email':
                return renderEmailSettings();
            case 'payment':
                return renderPaymentSettings();
            case 'social':
                return renderSocialSettings();
            case 'seo':
                return renderSeoSettings();
            default:
                return null;
        }
    };

    return (
        <AdminLayout title="Settings">
            <Head title="Settings" />

            <div className="space-y-6">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="h-5 w-5 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {flash?.error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <XCircleIcon className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{flash.error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900"></h2>
                        <p className="mt-1 text-gray-600"></p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleResetSection}
                            className="inline-flex items-center rounded-md bg-info-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500"
                        >
                            <ArrowPathIcon className="h-4 w-4 mr-2" />
                            Reset to Defaults
                        </button>
                    </div>
                </div>

                {/* Backup/Restore Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup & Restore</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Backup Settings</h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Download all settings as a JSON backup file.
                            </p>
                            <button
                                onClick={handleBackup}
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                            >
                                <CloudArrowDownIcon className="h-4 w-4 mr-2" />
                                Download Backup
                            </button>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Restore Settings</h4>
                            <p className="text-sm text-gray-600 mb-4">
                                Upload a backup file to restore settings.
                            </p>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={(e) => setBackupFile(e.target.files[0])}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <button
                                    onClick={handleRestore}
                                    className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 whitespace-nowrap"
                                >
                                    <CloudArrowUpIcon className="h-4 w-4 mr-2" />
                                    Restore
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Tabs */}
                <div className="bg-white rounded-xl shadow-sm">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            py-4 px-1 border-b-2 font-medium text-sm flex items-center
                                            ${activeTab === tab.id
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        <Icon className="h-5 w-5 mr-2" />
                                        {tab.name}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Settings Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        {renderSettingsForm()}

                        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}