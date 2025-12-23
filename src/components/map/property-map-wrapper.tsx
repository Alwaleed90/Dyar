'use client'

import dynamic from 'next/dynamic';

const PropertyMap = dynamic(
    () => import('./property-map').then((mod) => mod.PropertyMap),
    { ssr: false, loading: () => <div className="h-64 bg-muted animate-pulse rounded-lg" /> }
);

interface PropertyMapWrapperProps {
    latitude: number;
    longitude: number;
    title: string;
}

export function PropertyMapWrapper({ latitude, longitude, title }: PropertyMapWrapperProps) {
    return (
        <div className="h-[400px] rounded-2xl overflow-hidden shadow-inner bg-muted relative border">
            <PropertyMap latitude={latitude} longitude={longitude} title={title} />
        </div>
    );
}
