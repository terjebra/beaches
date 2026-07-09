import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { BEACHES } from '../data/beaches';
import type { Kategori } from '../lib/score';
import type { ScoredBeach } from './BeachList';

const BOUNDS = L.latLngBounds(BEACHES.map((b): [number, number] => [b.lat, b.lon]));
const BOUNDS_PADDING: L.PointExpression = [24, 24];

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
// so the initial fit can be computed against a stale container size — watch
// the container and re-fit to the beaches whenever its actual size changes.
function FitToBeaches() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const fit = () => {
      map.invalidateSize();
      map.fitBounds(BOUNDS, { padding: BOUNDS_PADDING });
    };
    fit();
    const observer = new ResizeObserver(fit);
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
      bounds={BOUNDS}
      boundsOptions={{ padding: BOUNDS_PADDING }}
      scrollWheelZoom={false}
      id="map"
      attributionControl={false}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        maxZoom={18}
        attribution="Esri World Imagery"
      />
      <FitToBeaches />
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
