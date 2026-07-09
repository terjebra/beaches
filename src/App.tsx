import { useState } from 'react';
import { BEACHES } from './data/beaches';
import { useForecast } from './hooks/useForecast';
import { cat, explain, scoreBeach } from './lib/score';
import { Hero } from './components/Hero';
import { BestBeach } from './components/BestBeach';
import { BeachMap } from './components/BeachMap';
import { BeachList, type ScoredBeach } from './components/BeachList';
import { WindOverride } from './components/WindOverride';

interface Override {
  from: number;
  speed: number;
}

function App() {
  const { forecast, isError } = useForecast();
  const [sel, setSel] = useState(0);
  const [override, setOverride] = useState<Override | null>(null);

  const base = forecast[Math.min(sel, forecast.length - 1)];
  const current = override ? { ...base, from: override.from, speed: override.speed } : base;

  const scored: ScoredBeach[] = BEACHES.map((beach) => {
    const score = scoreBeach(beach, current.from, current.speed);
    return {
      beach,
      score,
      category: cat(score),
      why: explain(beach, current.from, current.speed),
    };
  }).sort((a, b) => b.score - a.score);

  const top = scored[0];

  return (
    <>
      <Hero forecast={forecast} sel={sel} onSelectChip={setSel} current={current} />
      <div className="wrap">
        {isError && (
          <div className="notice">
            Fikk ikke hentet værdata fra MET akkurat nå – viser eksempelvind. Prøv å
            laste siden på nytt.
          </div>
        )}

        <BestBeach
          beach={top.beach}
          score={top.score}
          category={top.category}
          why={top.why}
        />

        <BeachMap scored={scored} windFrom={current.from} />

        <WindOverride
          onOverride={(from, speed) => setOverride({ from, speed })}
          onReset={() => setOverride(null)}
        />

        <BeachList scored={scored} />

        <footer>
          Værdata fra{' '}
          <a href="https://www.met.no" target="_blank" rel="noopener">
            Meteorologisk institutt
          </a>{' '}
          (Locationforecast 2.0) · Strandretninger er lest av fra kart og kan
          finjusteres.
        </footer>
      </div>
    </>
  );
}

export default App;
