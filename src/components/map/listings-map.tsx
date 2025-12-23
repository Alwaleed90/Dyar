'use client'

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Listing } from '@/lib/data/mockListings';
import { Link } from '@/i18n/routing';

const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface ListingsMapProps {
    listings: Listing[];
    center?: [number, number];
    zoom?: number;
}

export function ListingsMap({ listings, center, zoom = 11 }: ListingsMapProps) {
    useEffect(() => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
    }, []);

    const mapCenter = center || (listings.length > 0
        ? [listings[0].latitude, listings[0].longitude]
        : [25.2048, 55.2708]); // Dubai default

    return (
        <div className="h-96 w-full rounded-lg overflow-hidden border">
            <MapContainer
                center={mapCenter as [number, number]}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {listings.map((listing) => (
                    <Marker
                        key={listing.id}
                        position={[listing.latitude, listing.longitude]}
                        icon={icon}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-semibold mb-1">{listing.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">${listing.price_per_night}/night</p>
                                <Link
                                    href={`/listings/${listing.id}`}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    View Details
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
