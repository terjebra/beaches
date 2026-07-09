import type { Beach } from '../data/beaches';
import type { Kategori } from '../lib/score';

interface BeachCardProps {
  rank: number;
  beach: Beach;
  score: number;
  category: Kategori;
  why: string;
}

export function BeachCard({ rank, beach, score, category, why }: BeachCardProps) {
  return (
    <div className="card">
      <div className="rank">{rank}</div>
      <div className="info">
        <div className="name">{beach.navn}</div>
        <div className="why">{why}</div>
        {beach.yr && (
          <a href={beach.yr} target="_blank" rel="noopener">
            Fullt varsel på Yr →
          </a>
        )}
      </div>
      <span className={'score-pill ' + category}>{score}</span>
    </div>
  );
}
