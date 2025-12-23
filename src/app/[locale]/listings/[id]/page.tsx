import { notFound } from 'next/navigation';
import { getListingById } from '@/lib/db/queries';
import { mockListings } from '@/lib/data/mockListings';
import { Star, MapPin, Shield, Check, Info } from 'lucide-react';
import { BookingForm } from '@/components/booking/booking-form';
import { PropertyMapWrapper } from '@/components/map/property-map-wrapper';
import { getTranslations } from 'next-intl/server';

export default async function PropertyDetailsPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
    const t = await getTranslations('PropertyDetails');

    let listing = await getListingById(id);

    if (!listing) {
        listing = mockListings.find(l => l.id === id) as any;
    }

    if (!listing) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] mb-8 overflow-hidden rounded-2xl shadow-lg">
                <div className="h-full relative overflow-hidden group">
                    <img
                        src={listing.images[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt={listing.title}
                    />
                </div>
                <div className="hidden md:grid grid-rows-2 gap-4 h-full">
                    <div className="relative overflow-hidden group">
                        <img
                            src={listing.images[1] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            alt={listing.title}
                        />
                    </div>
                    <div className="relative overflow-hidden group">
                        <img
                            src={listing.images[2] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            alt={listing.title}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Information */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded tracking-wide uppercase">Property</span>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{listing.rating || '4.8'}</span>
                                <span className="text-muted-foreground text-sm">({listing.reviews_count || 12} {t('reviews')})</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold mb-3">{listing.title}</h1>
                        <p className="flex items-center gap-1 text-muted-foreground text-lg">
                            <MapPin className="h-5 w-5" />
                            {listing.address}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 py-6 border-y">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-lg text-primary">
                            {listing.host_name?.[0] || 'H'}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{t('hostedBy')} {listing.host_name || 'Host'}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Shield className="h-3 w-3" /> {t('superhost')}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{t('aboutPlace')}</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {listing.description}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{t('amenities')}</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {listing.amenities.map((amenity) => (
                                <div key={amenity} className="flex items-center gap-3 text-muted-foreground bg-muted/30 p-4 rounded-xl border border-primary/5">
                                    <Check className="h-5 w-5 text-primary" />
                                    <span className="text-sm font-medium">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">{t('location')}</h2>
                        <PropertyMapWrapper latitude={listing.latitude} longitude={listing.longitude} title={listing.title} />
                    </div>
                </div>

                {/* Booking Sidebar */}
                <div className="relative">
                    <BookingForm listing={listing as any} />
                    <div className="mt-6 flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl text-sm text-primary">
                        <Info className="h-5 w-5 shrink-0" />
                        <p>{t('wontBeCharged')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
