import type { Beach } from '../data/beaches';

export type Kategori = 'g' | 'y' | 'r';

const RETNINGER = [
  'N',
  'NNØ',
  'NØ',
  'ØNØ',
  'Ø',
  'ØSØ',
  'SØ',
  'SSØ',
  'S',
  'SSV',
  'SV',
  'VSV',
  'V',
  'VNV',
  'NV',
  'NNV',
];

export const dirName = (d: number): string =>
  RETNINGER[Math.round(d / 22.5) % 16];

export const angDiff = (a: number, b: number): number => {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
};

/* Vind FRA windFrom. Stranda vender mot havet i retning venderMot.
   diff≈0  -> pålandsvind (dårlig). diff≈180 -> le (bra). */
export function scoreBeach(
  beach: Beach,
  windFrom: number,
  windSpeed: number,
): number {
  if (windSpeed < 2.5) return 95; // nesten vindstille: alt er fint
  const diff = angDiff(windFrom, beach.venderMot); // 0..180
  const onshore = 1 - diff / 180; // 1 = rett på, 0 = rett bakfra
  const styrke = Math.min(windSpeed / 12, 1); // 12 m/s+ = full effekt
  return Math.round(Math.max(2, 100 - onshore * styrke * 95 - styrke * 3));
}

export const cat = (s: number): Kategori => (s >= 72 ? 'g' : s >= 45 ? 'y' : 'r');

export function explain(
  beach: Beach,
  windFrom: number,
  windSpeed: number,
): string {
  if (windSpeed < 2.5) return 'Nesten vindstille – fint overalt.';
  const diff = angDiff(windFrom, beach.venderMot);
  const fra = dirName(windFrom);
  if (diff >= 135) return `Ligger i le for ${fra.toLowerCase()}-vinden – vinden kommer bakfra.`;
  if (diff >= 90) return `Vinden fra ${fra} går på skrå bakfra – ganske skjermet.`;
  if (diff >= 45) return `Sidevind fra ${fra} – merkbart, men ok.`;
  return `Pålandsvind fra ${fra} – blåser rett inn med bølger og rusk.`;
}
