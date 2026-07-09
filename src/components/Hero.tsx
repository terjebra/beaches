import type { ForecastPoint } from '../lib/met';
import { dirName } from '../lib/score';
import { Compass } from './Compass';

interface HeroProps {
  forecast: ForecastPoint[];
  sel: number;
  onSelectChip: (i: number) => void;
}

export function Hero({ forecast, sel, onSelectChip }: HeroProps) {
  const w = forecast[sel];
  const chips = forecast.slice(0, 4);
  const timeText = w
    ? new Date(w.time).toLocaleDateString('nb-NO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : '';

  return (
    <header className="hero">
      <div className="wrap">
        <div>
          <div className="brand">Strandvind · Mandal</div>
          <div className="now-temp">{Math.round(w.temp)}°</div>
          <div className="now-wind">
            <b>{w.speed.toFixed(0)} m/s</b> fra {dirName(w.from)} ({Math.round(w.from)}°)
            {w.gust ? ` · kast ${w.gust.toFixed(0)}` : ''}
          </div>
          <div className="now-sub">{timeText}</div>
          <div className="chips" role="tablist" aria-label="Velg tidspunkt">
            {chips.map((f, i) => (
              <button
                key={f.time || i}
                type="button"
                className={'chip' + (i === sel ? ' active' : '')}
                role="tab"
                aria-selected={i === sel}
                onClick={() => onSelectChip(i)}
              >
                {i === 0
                  ? 'Nå'
                  : 'kl. ' + String(new Date(f.time).getHours()).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
        <Compass windFrom={w.from} />
      </div>
    </header>
  );
}
