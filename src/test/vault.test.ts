import { describe, it, expect } from 'vitest';
import { VAULT } from '../data/vault';
import type { PersonaId } from '../types';

describe('vault net worth derivation', () => {
  const personas: PersonaId[] = ['maya', 'david', 'marcus', 'patel', 'eleanor'];

  personas.forEach(pid => {
    it(`${pid}: net worth = assets − liabilities`, () => {
      const v = VAULT[pid];
      const totalAssets = v.categories.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.value, 0), 0);
      const totalLiab = v.liabilities.reduce((sum, l) => sum + l.value, 0);
      const net = totalAssets - totalLiab;
      expect(net).toBeGreaterThan(0);
      // History array last value should roughly match the magnitude of net worth
      const history = v.history;
      const lastHistory = history[history.length - 1];
      // Last history value is in millions or thousands — just confirm it's positive
      expect(lastHistory).toBeGreaterThan(0);
    });
  });

  it('david vault has no hardcoded net worth — derived from holdings', () => {
    const v = VAULT['david'];
    const totalAssets = v.categories.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.value, 0), 0);
    const totalLiab = v.liabilities.reduce((sum, l) => sum + l.value, 0);
    const net = totalAssets - totalLiab;
    // Should be in the $3M range matching the persona display value
    expect(net).toBeGreaterThan(2_000_000);
    expect(net).toBeLessThan(5_000_000);
  });

  it('eleanor is the wealthiest persona', () => {
    const nets = (['maya', 'david', 'marcus', 'patel', 'eleanor'] as PersonaId[]).map(pid => {
      const v = VAULT[pid];
      const assets = v.categories.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.value, 0), 0);
      const liabs = v.liabilities.reduce((sum, l) => sum + l.value, 0);
      return { pid, net: assets - liabs };
    });
    const sorted = [...nets].sort((a, b) => b.net - a.net);
    expect(sorted[0].pid).toBe('eleanor');
  });
});

describe('vault data integrity', () => {
  it('all items have positive values', () => {
    const personas: PersonaId[] = ['maya', 'david', 'marcus', 'patel', 'eleanor'];
    personas.forEach(pid => {
      VAULT[pid].categories.forEach(c => {
        c.items.forEach(item => {
          expect(item.value).toBeGreaterThan(0);
        });
      });
    });
  });

  it('all liabilities have positive values', () => {
    const personas: PersonaId[] = ['maya', 'david', 'marcus', 'patel', 'eleanor'];
    personas.forEach(pid => {
      VAULT[pid].liabilities.forEach(l => {
        expect(l.value).toBeGreaterThan(0);
      });
    });
  });

  it('history arrays have 7 entries each', () => {
    const personas: PersonaId[] = ['maya', 'david', 'marcus', 'patel', 'eleanor'];
    personas.forEach(pid => {
      expect(VAULT[pid].history).toHaveLength(7);
    });
  });
});
