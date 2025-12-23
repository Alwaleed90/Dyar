import { createClient } from '@/lib/supabase/server';

export interface DatabaseListing {
    id: string;
    title: string;
    description: string;
    price_per_night: number;
    address: string;
    latitude: number;
    longitude: number;
    amenities: string[];
    images: string[];
    host_id: string;
    host_name?: string;
    rating?: number;
    reviews_count?: number;
    created_at: string;
}

export interface DatabaseBooking {
    id: string;
    listing_id: string;
    user_id: string;
    check_in: string;
    check_out: string;
    guests: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    created_at: string;
}

/**
 * Fetch all listings from Supabase
 */
export async function getListings() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching listings:', error);
        return [];
    }

    return data as DatabaseListing[];
}

/**
 * Fetch a single listing by ID
 */
export async function getListingById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching listing:', error);
        return null;
    }

    return data as DatabaseListing;
}

/**
 * Fetch user's bookings
 */
export async function getUserBookings(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('bookings')
        .select(`
      *,
      listings (
        title,
        address,
        images
      )
    `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }

    return data;
}

/**
 * Create a new booking
 */
export async function createBooking(booking: Omit<DatabaseBooking, 'id' | 'created_at'>) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();

    if (error) {
        console.error('Error creating booking:', error);
        return { success: false, error: error.message };
    }

    return { success: true, data };
}

/**
 * Fetch host's listings
 */
export async function getHostListings(hostId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('host_id', hostId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching host listings:', error);
        return [];
    }

    return data as DatabaseListing[];
}
