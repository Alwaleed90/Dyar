import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

export default function GuestDashboard() {
    // Mock bookings data
    const bookings = [
        {
            id: '1',
            property: 'Luxury Apartment in Downtown',
            location: 'Dubai Marina, Dubai',
            checkIn: '2025-01-15',
            checkOut: '2025-01-20',
            total: 750,
            status: 'confirmed'
        },
        {
            id: '2',
            property: 'Cozy Studio Near Beach',
            location: 'Jumeirah Beach, Dubai',
            checkIn: '2025-02-10',
            checkOut: '2025-02-15',
            total: 425,
            status: 'pending'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
                <p className="text-muted-foreground">
                    Manage your reservations and upcoming stays
                </p>
            </div>

            <div className="grid gap-6">
                {bookings.map((booking) => (
                    <Card key={booking.id} className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-3 flex-1">
                                <h3 className="text-xl font-semibold">{booking.property}</h3>

                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">{booking.location}</span>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>Check-in: {booking.checkIn}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>Check-out: {booking.checkOut}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span className="font-semibold">${booking.total} total</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className={`px-3 py-1 rounded-full text-sm text-center ${booking.status === 'confirmed'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                    }`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                                <Button variant="outline" size="sm">View Details</Button>
                                <Button variant="ghost" size="sm">Cancel</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {bookings.length === 0 && (
                <Card className="p-12 text-center">
                    <p className="text-muted-foreground mb-4">You don't have any bookings yet</p>
                    <Button asChild>
                        <a href="/listings">Browse Properties</a>
                    </Button>
                </Card>
            )}
        </div>
    );
}
