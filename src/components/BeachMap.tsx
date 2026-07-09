import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import type { Kategori } from '../lib/score';
import type { ScoredBeach } from './BeachList';

const CENTER: [number, number] = [58.018, 7.431];

const CATEGORY_COLOR: Record<Kategori, string> = {
  g: '#3B9B6F',
  y: '#E8A93C',
  r: '#DB5461',
};

function pinIcon(navn: string, category: Kategori, windFrom: number) {
  const rot = (windFrom + 180) % 360;
  return L.divIcon({
    className: '',
    html: `<div class="beach-pin">
             <div class="wind-glyph" style="transform:rotate(${rot}deg)">↑</div>
             <div class="dot" style="background:${CATEGORY_COLOR[category]}"></div>
             <div class="lbl">${navn}</div>
           </div>`,
    iconSize: [90, 46],
    iconAnchor: [45, 30],
  });
}

// react-leaflet mounts the map before layout (web fonts, flex reflow) settles,
// so tiles/markers get positioned against a stale container size — watch the
// container and re-sync whenever its actual size changes.
function InvalidateSizeOnResize() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);
  return null;
}

interface BeachMapProps {
  scored: ScoredBeach[];
  windFrom: number;
}

export function BeachMap({ scored, windFrom }: BeachMapProps) {
  return (
    <MapContainer
      center={CENTER}
      zoom={14}
      scrollWheelZoom={false}
      id="map"
      attributionControl={false}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        maxZoom={18}
        attribution="Esri World Imagery"
      />
      <InvalidateSizeOnResize />
      {scored.map(({ beach, category }) => (
        <Marker
          key={beach.id}
          position={[beach.lat, beach.lon]}
          icon={pinIcon(beach.navn, category, windFrom)}
        />
      ))}
    </MapContainer>
  );
}
