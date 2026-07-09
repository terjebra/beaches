import { useMemo, type CSSProperties } from 'react';
import type { ForecastPoint } from '../lib/met';
import { dirName } from '../lib/score';
import { Compass } from './Compass';

interface Streak {
  top: number;
  width: number;
  rot: number;
  duration: number;
  delay: number;
}

function generateStreaks(from: number, speed: number): Streak[] {
  const n = Math.min(10, Math.max(3, Math.round(speed)));
  const rot = ((from + 180) % 360) - 90;
  return Array.from({ length: n }, () => ({
    top: 8 + Math.random() * 84,
    width: 50 + Math.random() * 90,
    rot,
    duration: 9 - Math.min(speed, 8) * 0.7 + Math.random() * 2,
    delay: -Math.random() * 8,
  }));
}

interface HeroProps {
  forecast: ForecastPoint[];
  sel: number;
  onSelectChip: (i: number) => void;
  current: ForecastPoint;
}

export function Hero({ forecast, sel, onSelectChip, current }: HeroProps) {
  const chips = forecast.slice(0, 4);
  const timeText = forecast[sel]
    ? new Date(forecast[sel].time).toLocaleDateString('nb-NO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : '';
  const streaks = useMemo(
    () => generateStreaks(current.from, current.speed),
    [current.from, current.speed],
  );

  return (
    <header className="hero">
      <div className="streaks" aria-hidden="true">
        {streaks.map((s, i) => (
          <div
            key={i}
            className="streak"
            style={{
              top: `${s.top}%`,
              width: `${s.width}px`,
              '--rot': `${s.rot}deg`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="wrap">
        <div>
          <div className="brand">Strandvind · Mandal</div>
          <div className="now-temp">{Math.round(current.temp)}°</div>
          <div className="now-wind">
            <b>{current.speed.toFixed(0)} m/s</b> fra {dirName(current.from)} (
            {Math.round(current.from)}°)
            {current.gust ? ` · kast ${current.gust.toFixed(0)}` : ''}
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
        <Compass windFrom={current.from} />
      </div>
    </header>
  );
}
