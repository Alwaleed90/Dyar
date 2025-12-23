'use client'

import { useState } from 'react';
import { ListingCard } from '@/components/listings/listing-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Map as MapIcon, SlidersHorizontal } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// Dynamically import map to avoid SSR issues
const ListingsMap = dynamic(
    () => import('@/components/map/listings-map').then(mod => ({ default: mod.ListingsMap })),
    { ssr: false, loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg" /> }
);

interface FilteredListingsProps {
    initialListings: any[];
}

export function FilteredListings({ initialListings }: FilteredListingsProps) {
    const t = useTranslations('Listings');
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showMap, setShowMap] = useState(false);

    const filteredListings = initialListings.filter((listing) => {
        const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMinPrice = !minPrice || listing.price_per_night >= parseInt(minPrice);
        const matchesMaxPrice = !maxPrice || listing.price_per_night <= parseInt(maxPrice);

        return matchesSearch && matchesMinPrice && matchesMaxPrice;
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
                    <p className="text-muted-foreground mt-1">
                        {filteredListings.length} {t('propertiesFound')}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant={showMap ? "default" : "outline"}
                        onClick={() => setShowMap(!showMap)}
                        className="rounded-full shadow-sm"
                    >
                        <MapIcon className="h-4 w-4 mr-2" />
                        {showMap ? t('hideMap') : t('showMap')}
                    </Button>
                </div>
            </div>

            {/* Map View */}
            {showMap && (
                <div className="rounded-2xl overflow-hidden border shadow-xl">
                    <ListingsMap listings={filteredListings} />
                </div>
            )}

            {/* Filters */}
            <Card className="p-4 bg-muted/30 border-none shadow-none rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={t('searchPlaceholder')}
                            className="pl-10 h-12 bg-background border-none shadow-sm rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Input
                            type="number"
                            placeholder={t('minPrice')}
                            className="h-12 bg-background border-none shadow-sm rounded-xl"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Input
                            type="number"
                            placeholder={t('maxPrice')}
                            className="h-12 bg-background border-none shadow-sm rounded-xl"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>

                {(searchTerm || minPrice || maxPrice) && (
                    <div className="mt-4 flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setSearchTerm('');
                                setMinPrice('');
                                setMaxPrice('');
                            }}
                            className="text-muted-foreground hover:text-primary"
                        >
                            {t('clearFilters')}
                        </Button>
                    </div>
                )}
            </Card>

            {/* Results */}
            {filteredListings.length === 0 ? (
                <div className="py-20 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t('noResultsTitle')}</h3>
                    <p className="text-muted-foreground">{t('noResultsDesc')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {filteredListings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            )}
        </div>
    );
}
