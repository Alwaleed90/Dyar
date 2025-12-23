import { getListings } from '@/lib/db/queries';
import { FilteredListings } from '@/components/listings/filtered-listings';
import { mockListings } from '@/lib/data/mockListings'; // Fallback if DB is empty for demo

export default async function ListingsPage() {
    let listings = await getListings();

    // Fallback to mock data for first-time use or if DB query fails during dev
    if (!listings || listings.length === 0) {
        listings = mockListings as any;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <FilteredListings initialListings={listings} />
        </div>
    );
}
