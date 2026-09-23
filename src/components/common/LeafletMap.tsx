import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  title: string;
  address?: string;
  zoom?: number;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  latitude,
  longitude,
  title,
  address,
  zoom = 14,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix default marker icons in Leaflet for bundlers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapContainerRef.current).setView([latitude, longitude], zoom);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px;">
        <strong style="color: #ea580c;">${title}</strong>
        ${address ? `<p style="margin: 4px 0 0 0; color: #555;">${address}</p>` : ''}
      </div>
    `).openPopup();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [latitude, longitude, title, address, zoom]);

  return (
    <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-200 shadow-inner relative z-10">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
