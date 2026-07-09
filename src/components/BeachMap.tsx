import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
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
