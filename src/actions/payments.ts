'use server'

import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import { getListingById } from '@/lib/db/queries';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia' as any,
});

export async function createCheckoutSession(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const listingId = formData.get('listingId') as string;
    const checkIn = formData.get('checkIn') as string;
    const checkOut = formData.get('checkOut') as string;
    const guests = parseInt(formData.get('guests') as string);
    const locale = formData.get('locale') as string || 'en';

    const listing = await getListingById(listingId);
    if (!listing) {
        throw new Error('Listing not found');
    }

    // Calculate nights
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.price_per_night;

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: listing.title,
                        description: `${nights} nights from ${checkIn} to ${checkOut}`,
                        images: [listing.images[0]],
                    },
                    unit_amount: totalPrice * 100, // Stripe expects amount in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/dashboard/guest?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/listings/${listingId}`,
        metadata: {
            listingId,
            userId: user.id,
            checkIn,
            checkOut,
            guests: guests.toString(),
            totalPrice: totalPrice.toString(),
        },
    });

    if (session.url) {
        redirect(session.url);
    }
}
