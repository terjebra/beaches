import type { Beach } from '../data/beaches';
import type { Kategori } from '../lib/score';

const BORDER_COLOR: Record<Kategori, string> = {
  g: '#3B9B6F',
  y: '#E8A93C',
  r: '#DB5461',
};

interface BestBeachProps {
  beach: Beach;
  score: number;
  category: Kategori;
  why: string;
}

export function BestBeach({ beach, score, category, why }: BestBeachProps) {
  return (
    <div
      className="best"
      style={{ marginTop: 18, borderLeftColor: BORDER_COLOR[category] }}
    >
      <span className={'score-pill ' + category}>{score}</span>
      <div className="eyebrow">Beste strand nå</div>
      <h2>{beach.navn}</h2>
      <p>{why}</p>
    </div>
  );
}
