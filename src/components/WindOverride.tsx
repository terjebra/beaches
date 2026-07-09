import { useRef, useState } from 'react';
import { dirName } from '../lib/score';

interface WindOverrideProps {
  onOverride: (from: number, speed: number) => void;
  onReset: () => void;
}

export function WindOverride({ onOverride, onReset }: WindOverrideProps) {
  const [dir, setDir] = useState(225);
  const [speed, setSpeed] = useState(6);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleDir = (value: number) => {
    setDir(value);
    onOverride(value, speed);
  };

  const handleSpeed = (value: number) => {
    setSpeed(value);
    onOverride(dir, value);
  };

  const handleReset = () => {
    setDir(225);
    setSpeed(6);
    if (detailsRef.current) detailsRef.current.open = false;
    onReset();
  };

  return (
    <details className="override" ref={detailsRef}>
      <summary>Test en annen vindretning</summary>
      <div className="row">
        <span>Retning</span>
        <input
          type="range"
          min={0}
          max={359}
          step={5}
          value={dir}
          onChange={(e) => handleDir(Number(e.target.value))}
        />
        <output>
          {dir}° {dirName(dir)}
        </output>
      </div>
      <div className="row">
        <span>Styrke</span>
        <input
          type="range"
          min={0}
          max={18}
          step={0.5}
          value={speed}
          onChange={(e) => handleSpeed(Number(e.target.value))}
        />
        <output>{speed} m/s</output>
      </div>
      <div className="row" style={{ justifyContent: 'flex-end' }}>
        <button
          type="button"
          className="chip"
          style={{ borderColor: 'var(--hav)', color: 'var(--hav)' }}
          onClick={handleReset}
        >
          Tilbake til varselet
        </button>
      </div>
    </details>
  );
}
