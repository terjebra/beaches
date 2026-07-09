import { useState } from 'react';
import { BEACHES } from './data/beaches';
import { useForecast } from './hooks/useForecast';
import { cat, explain, scoreBeach } from './lib/score';
import { Hero } from './components/Hero';
import { BestBeach } from './components/BestBeach';
import { BeachList, type ScoredBeach } from './components/BeachList';

function App() {
  const { forecast, isError } = useForecast();
  const [sel, setSel] = useState(0);
  const w = forecast[Math.min(sel, forecast.length - 1)];

  const scored: ScoredBeach[] = BEACHES.map((beach) => {
    const score = scoreBeach(beach, w.from, w.speed);
    return { beach, score, category: cat(score), why: explain(beach, w.from, w.speed) };
  }).sort((a, b) => b.score - a.score);

  const top = scored[0];

  return (
    <>
      <Hero forecast={forecast} sel={sel} onSelectChip={setSel} />
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
