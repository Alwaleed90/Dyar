'use client'

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Listing } from '@/lib/data/mockListings';
import { useCurrency } from '@/contexts/currency-context';
import { useTranslations } from 'next-intl';

interface ListingCardProps {
    listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
    const { formatPrice } = useCurrency();
    const t = useTranslations('Listings');

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 relative overflow-hidden">
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4 space-y-3">
                {/* Title and Rating */}
                <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                        <div className="flex items-center gap-1 shrink-0">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{listing.rating}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{listing.address}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {listing.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                    {listing.amenities.slice(0, 3).map((amenity) => (
                        <span
                            key={amenity}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                            {amenity}
                        </span>
                    ))}
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between pt-2">
                    <div>
                        <span className="text-xl font-bold">{formatPrice(listing.price_per_night)}</span>
                        <span className="text-sm text-muted-foreground"> {t('perNight')}</span>
                    </div>
                    <Button size="sm" asChild>
                        <Link href={`/listings/${listing.id}`}>{t('view')}</Link>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
