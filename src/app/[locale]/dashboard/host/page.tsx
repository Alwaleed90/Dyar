import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { mockListings } from '@/lib/data/mockListings';

export default function HostDashboard() {
    // Use first 3 listings as host's properties
    const myListings = mockListings.slice(0, 3);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Listings</h1>
                    <p className="text-muted-foreground">
                        Manage your properties and reservations
                    </p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 me-2" />
                    Add New Listing
                </Button>
            </div>

            <div className="grid gap-6">
                {myListings.map((listing) => (
                    <Card key={listing.id} className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-48 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center shrink-0">
                                <span className="text-sm text-muted-foreground">Property Image</span>
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">{listing.title}</h3>
                                        <p className="text-sm text-muted-foreground">{listing.address}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold">${listing.price_per_night}</p>
                                        <p className="text-sm text-muted-foreground">per night</p>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {listing.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {listing.amenities.slice(0, 4).map((amenity) => (
                                        <span
                                            key={amenity}
                                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4 me-2" />
                                        View
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4 me-2" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Trash2 className="h-4 w-4 me-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Listings</h3>
                    <p className="text-3xl font-bold">{myListings.length}</p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Bookings</h3>
                    <p className="text-3xl font-bold">5</p>
                </Card>
                <Card className="p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold">$12,450</p>
                </Card>
            </div>
        </div>
    );
}
