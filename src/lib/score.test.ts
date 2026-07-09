import { describe, expect, it } from 'vitest';
import { BEACHES } from '../data/beaches';
import { angDiff, cat, explain, scoreBeach } from './score';

const beach = (id: string) => BEACHES.find((b) => b.id === id)!;

describe('angDiff', () => {
  it('handles wraparound', () => {
    expect(angDiff(350, 10)).toBe(20);
  });
});

describe('scoreBeach', () => {
  it('gives an onshore beach a low (red) score and a lee beach a high (green) score', () => {
    const sjosanden = scoreBeach(beach('sjosanden'), 165, 8);
    const lillebanken = scoreBeach(beach('lillebanken'), 165, 8);
    expect(cat(sjosanden)).toBe('r');
    expect(cat(lillebanken)).toBe('g');
  });

  it('scores every beach 95 in near-calm wind', () => {
    for (const b of BEACHES) {
      expect(scoreBeach(b, 225, 1)).toBe(95);
    }
  });

  it('sorts deterministically and stably', () => {
    const sortOnce = () =>
      BEACHES.map((b) => ({ id: b.id, s: scoreBeach(b, 165, 8) })).sort(
        (x, y) => y.s - x.s,
      );
    expect(sortOnce()).toEqual(sortOnce());
  });
});

describe('explain', () => {
  it('returns Norwegian text for all four angle ranges', () => {
    const b = beach('sjosanden'); // venderMot 165
    expect(explain(b, 165, 8)).toMatch(/Pålandsvind/); // diff 0
    expect(explain(b, 120, 8)).toMatch(/Sidevind/); // diff 45
    expect(explain(b, 75, 8)).toMatch(/skrå bakfra/); // diff 90
    expect(explain(b, 20, 8)).toMatch(/Ligger i le/); // diff 145
  });

  it('returns Norwegian calm-wind text below 2.5 m/s', () => {
    expect(explain(beach('sjosanden'), 165, 1)).toMatch(/vindstille/);
  });
});
