export interface Listing {
    id: string;
    title: string;
    description: string;
    price_per_night: number;
    address: string;
    latitude: number;
    longitude: number;
    amenities: string[];
    rating: number;
    reviews_count: number;
    host_name: string;
    images: string[];
}

export const mockListings: Listing[] = [
    {
        id: '1',
        title: 'Luxury Apartment in Downtown',
        description: 'Modern luxury apartment with stunning city views, premium amenities, and walking distance to major attractions.',
        price_per_night: 150,
        address: 'Dubai Marina, Dubai',
        latitude: 25.0772,
        longitude: 55.1395,
        amenities: ['WiFi', 'Parking', 'Pool', 'Gym', 'Air Conditioning'],
        rating: 4.8,
        reviews_count: 124,
        host_name: 'Ahmed Hassan',
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
        ]
    },
    {
        id: '2',
        title: 'Cozy Studio Near Beach',
        description: 'Charming beachfront studio perfect for couples, featuring ocean views and modern amenities.',
        price_per_night: 85,
        address: 'Jumeirah Beach, Dubai',
        latitude: 25.2048,
        longitude: 55.2708,
        amenities: ['WiFi', 'Beach Access', 'Kitchen'],
        rating: 4.6,
        reviews_count: 89,
        host_name: 'Sara Al-Mansoori',
        images: [
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
            'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
        ]
    },
    {
        id: '3',
        title: 'Spacious Family Villa',
        description: 'Beautiful 4-bedroom villa with private pool, garden, and family-friendly amenities in a quiet neighborhood.',
        price_per_night: 300,
        address: 'Arabian Ranches, Dubai',
        latitude: 25.0535,
        longitude: 55.2583,
        amenities: ['WiFi', 'Parking', 'Pool', 'Garden', 'BBQ Area'],
        rating: 4.9,
        reviews_count: 156,
        host_name: 'Mohammed Al-Rashid',
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        ]
    },
    {
        id: '4',
        title: 'Modern Loft in Business Bay',
        description: 'Contemporary loft with industrial design, high ceilings, and panoramic city views.',
        price_per_night: 200,
        address: 'Business Bay, Dubai',
        latitude: 25.1872,
        longitude: 55.2674,
        amenities: ['WiFi', 'Parking', 'Gym', 'Concierge'],
        rating: 4.7,
        reviews_count: 98,
        host_name: 'Fatima Abdullah',
        images: [
            'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80',
            'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
            'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80',
        ]
    },
    {
        id: '5',
        title: 'Penthouse with Burj View',
        description: 'Exclusive penthouse offering breathtaking views of Burj Khalifa, luxury finishes, and premium services.',
        price_per_night: 500,
        address: 'Downtown Dubai',
        latitude: 25.1972,
        longitude: 55.2744,
        amenities: ['WiFi', 'Parking', 'Pool', 'Gym', 'Spa', 'Concierge'],
        rating: 5.0,
        reviews_count: 203,
        host_name: 'Khalid Bin Rashid',
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
        ]
    },
    {
        id: '6',
        title: 'Traditional Arabian House',
        description: 'Authentic Arabian-style house with traditional architecture, courtyard, and modern comforts.',
        price_per_night: 120,
        address: 'Al Fahidi, Dubai',
        latitude: 25.2631,
        longitude: 55.2972,
        amenities: ['WiFi', 'Parking', 'Courtyard', 'Traditional Decor'],
        rating: 4.5,
        reviews_count: 67,
        host_name: 'Layla Hassan',
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
        ]
    },
];
