'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar, Users } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useCurrency } from '@/contexts/currency-context';
import { createCheckoutSession } from '@/actions/payments';

interface BookingFormProps {
    listing: {
        id: string;
        price_per_night: number;
        title: string;
        images: string[];
    };
}

export function BookingForm({ listing }: BookingFormProps) {
    const t = useTranslations('Booking');
    const { formatPrice } = useCurrency();
    const locale = useLocale();

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [nights, setNights] = useState(0);

    useEffect(() => {
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                setNights(diffDays);
                setTotalPrice(diffDays * listing.price_per_night);
            } else {
                setNights(0);
                setTotalPrice(0);
            }
        }
    }, [checkIn, checkOut, listing.price_per_night]);

    return (
        <Card className="p-6 sticky top-24 shadow-lg border-primary/10">
            <div className="flex items-baseline justify-between mb-6">
                <div>
                    <span className="text-2xl font-bold">{formatPrice(listing.price_per_night)}</span>
                    <span className="text-muted-foreground ml-1">/ {t('night')}</span>
                </div>
            </div>

            <form action={createCheckoutSession} className="space-y-4">
                <input type="hidden" name="listingId" value={listing.id} />
                <input type="hidden" name="checkIn" value={checkIn} />
                <input type="hidden" name="checkOut" value={checkOut} />
                <input type="hidden" name="guests" value={guests} />
                <input type="hidden" name="locale" value={locale} />

                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">{t('checkIn')}</label>
                        <Input
                            type="date"
                            name="checkInDate"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="bg-muted/50"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">{t('checkOut')}</label>
                        <Input
                            type="date"
                            name="checkOutDate"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="bg-muted/50"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">{t('guests')}</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="number"
                            min="1"
                            max="10"
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="pl-10 bg-muted/50"
                            required
                        />
                    </div>
                </div>

                {nights > 0 && (
                    <div className="pt-4 space-y-3 border-t">
                        <div className="flex justify-between text-sm">
                            <span className="underline">{formatPrice(listing.price_per_night)} x {nights} {t('nights')}</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="underline">{t('cleaningFee')}</span>
                            <span>{formatPrice(0)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold pt-3 border-t">
                            <span>{t('total')}</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90"
                    disabled={!checkIn || !checkOut || nights <= 0}
                >
                    {t('reserve')}
                </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-4">
                {t('noChargePrompt')}
            </p>
        </Card>
    );
}
