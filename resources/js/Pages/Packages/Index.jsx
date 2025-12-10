import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { 
    FunnelIcon, 
    Squares2X2Icon, 
    ListBulletIcon,
    ChevronDownIcon,
    XMarkIcon,
    MapPinIcon,
    ClockIcon,
    StarIcon,
    CurrencyDollarIcon,
    PhotoIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';

export default function PackagesIndex({ packages, filters = {}, search: initialSearch = '' }) {
    const { url } = usePage();

    const safePackages = packages || {};
    const safeData = safePackages.data || [];
    const safeLinks = safePackages.links || [];
    const safeDestinations = filters.destinations || [];

    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);

    const [search, setSearch] = useState(initialSearch);
    const [selectedDestinations, setSelectedDestinations] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [durationFilter, setDurationFilter] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);

        if (query.get('destinations')) {
            try {
                setSelectedDestinations(JSON.parse(query.get('destinations')));
            } catch {}
        }

        if (query.get('min_price')) setPriceRange([parseInt(query.get('min_price')), priceRange[1]]);
        if (query.get('max_price')) setPriceRange([priceRange[0], parseInt(query.get('max_price'))]);
        if (query.get('duration')) setDurationFilter(query.get('duration'));
        if (query.get('sort_by')) setSortBy(query.get('sort_by'));
    }, []);

    const formatPrice = (price) => {
        const num = parseFloat(price || 0);
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(num);
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `/storage/${imagePath}`;
    };

    const applyFilters = () => {
        router.get(route('packages.index'), {
            search,
            destinations: selectedDestinations,
            min_price: priceRange[0],
            max_price: priceRange[1],
            duration: durationFilter,
            sort_by: sortBy
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        applyFilters();
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedDestinations([]);
        setPriceRange([0, 5000]);
        setDurationFilter('');
        setSortBy('featured');

        router.get(route('packages.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const PackageCard = ({ pkg }) => {
        const imageUrl = getImageUrl(pkg.image);

        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                    {imageUrl ? (
                        <img src={imageUrl} alt={pkg.title} className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                            <PhotoIcon className="h-16 w-16 text-gray-400" />
                        </div>
                    )}

                    {pkg.is_featured && (
                        <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-yellow-200 text-yellow-800">
                                <StarIcon className="h-3 w-3 mr-1" /> Featured
                            </span>
                        </div>
                    )}

                    <div className="absolute bottom-3 right-3">
                        <span className="px-3 py-1 bg-white text-gray-800 rounded-full font-bold shadow">
                            {formatPrice(pkg.price)}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{pkg.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {pkg.destination?.name ?? 'Unknown Destination'}
                    </div>

                    <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                        {pkg.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {pkg.duration_days || 0} days
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link
                            href={route('packages.show', pkg.id)}
                            className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AppLayout title="Travel Packages">
            <Head>
                <meta name="description" content="Browse travel packages..." />
            </Head>

            {/* SEARCH BAR */}
            <div className="mx-auto max-w-2xl px-4 py-2">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search packages..."
                        className="w-full pl-10 pr-40 py-3 border rounded-lg"
                    />

                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 text-gray-400" />

                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </form>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 flex gap-8">
                
                {/* FILTER SIDEBAR */}
                <div className={`w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-white p-6 rounded-lg shadow sticky top-4">
                        <h2 className="font-semibold text-lg mb-4">Filters</h2>

                        {/* DESTINATIONS */}
                        <h3 className="font-medium mb-2">Destinations</h3>
                        {safeDestinations.map((dest) => (
                            <label key={dest.id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={selectedDestinations.includes(dest.id)}
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            setSelectedDestinations([...selectedDestinations, dest.id]);
                                        else
                                            setSelectedDestinations(selectedDestinations.filter((x) => x !== dest.id));
                                    }}
                                />
                                <span className="ml-2 text-sm">{dest.name}</span>
                            </label>
                        ))}

                        {/* PRICE */}
                        <h3 className="font-medium mt-4 mb-2">
                            Price: ${priceRange[0]} - ${priceRange[1]}
                        </h3>
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="w-full"
                        />
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full mt-3"
                        />

                        {/* DURATION */}
                        <h3 className="font-medium mt-4 mb-2">Duration</h3>
                        <select
                            className="w-full border rounded px-2 py-2"
                            value={durationFilter}
                            onChange={(e) => setDurationFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="1-3">1–3 days</option>
                            <option value="4-7">4–7 days</option>
                            <option value="8-14">8–14 days</option>
                            <option value="15+">15+ days</option>
                        </select>

                        {/* SORT */}
                        <h3 className="font-medium mt-4 mb-2">Sort by</h3>
                        <select
                            className="w-full border rounded px-2 py-2"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price_asc">Price: Low → High</option>
                            <option value="price_desc">Price: High → Low</option>
                            <option value="duration_asc">Duration: Short → Long</option>
                            <option value="duration_desc">Duration: Long → Short</option>
                            <option value="newest">Newest</option>
                        </select>

                        <button
                            onClick={applyFilters}
                            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded"
                        >
                            Apply Filters
                        </button>

                        <button
                            onClick={clearFilters}
                            className="mt-2 w-full border py-2 rounded"
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                {/* PACKAGE LIST */}
                <div className="w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {safeData.map((pkg) => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
