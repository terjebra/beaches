import type { Beach } from '../data/beaches';
import type { Kategori } from '../lib/score';
import { BeachCard } from './BeachCard';

export interface ScoredBeach {
  beach: Beach;
  score: number;
  category: Kategori;
  why: string;
}

interface BeachListProps {
  scored: ScoredBeach[];
}

export function BeachList({ scored }: BeachListProps) {
  return (
    <section className="list">
      <h3>Alle strender, sortert etter forhold</h3>
      <div>
        {scored.map((s, i) => (
          <BeachCard
            key={s.beach.id}
            rank={i + 1}
            beach={s.beach}
            score={s.score}
            category={s.category}
            why={s.why}
          />
        ))}
      </div>
    </section>
  );
}
