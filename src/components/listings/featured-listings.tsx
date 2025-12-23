'use client'

import { ListingCard } from '@/components/listings/listing-card';
import { mockListings } from '@/lib/data/mockListings';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function FeaturedListings() {
    const t = useTranslations('HomePage');
    const [startIndex, setStartIndex] = useState(0);
    const itemsToShow = 3;
    const featuredListings = mockListings.slice(0, 6);

    const canScrollLeft = startIndex > 0;
    const canScrollRight = startIndex < featuredListings.length - itemsToShow;

    const scrollLeft = () => {
        if (canScrollLeft) {
            setStartIndex(startIndex - 1);
        }
    };

    const scrollRight = () => {
        if (canScrollRight) {
            setStartIndex(startIndex + 1);
        }
    };

    const visibleListings = featuredListings.slice(startIndex, startIndex + itemsToShow);

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t('featuredTitle')}</h2>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    );
}
