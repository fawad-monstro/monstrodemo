import { describe, it, expect } from 'vitest';
import { PERSONAS, DOMAIN_DOT } from '../data/personas';
import { GUIDANCE, ACT_STEPS } from '../data/guidance';
import { QUEUE_ITEMS, QUEUE_FULL } from '../data/queue';
import { GOALS } from '../data/goals';
import { PEOPLE } from '../data/people';
import { MON_DETAIL } from '../data/monitoring';
import type { PersonaId } from '../types';

const ALL_PERSONAS: PersonaId[] = ['maya', 'david', 'marcus', 'patel', 'eleanor'];

describe('personas', () => {
  it('all five personas are defined', () => {
    ALL_PERSONAS.forEach(id => expect(PERSONAS[id]).toBeDefined());
  });

  it('each persona guidance array references valid GUIDANCE keys', () => {
    ALL_PERSONAS.forEach(pid => {
      PERSONAS[pid].guidance.forEach(id => {
        expect(GUIDANCE[id], `Missing guidance: ${id}`).toBeDefined();
      });
    });
  });

  it('mass market persona is maya', () => {
    expect(PERSONAS['maya'].tier).toBe('Mass market');
  });

  it('UHNW persona is eleanor', () => {
    expect(PERSONAS['eleanor'].tier).toBe('UHNW');
  });
});

describe('guidance', () => {
  it('all guidance items have required fields', () => {
    Object.entries(GUIDANCE).forEach(([id, g]) => {
      expect(g.domain, id).toBeTruthy();
      expect(g.headline, id).toBeTruthy();
      expect(g.action, id).toBeTruthy();
      expect(g.calcs.length, id).toBeGreaterThan(0);
    });
  });

  it('ACT_STEPS covers all 6 domains', () => {
    const domains = ['Cash flow', 'Retirement', 'Estate', 'Investments', 'Tax', 'Insurance'];
    domains.forEach(d => {
      expect(ACT_STEPS[d], `Missing ACT_STEPS for ${d}`).toBeDefined();
      expect(ACT_STEPS[d]).toHaveLength(3);
    });
  });

  it('all guidance domains have a DOMAIN_DOT color', () => {
    Object.values(GUIDANCE).forEach(g => {
      expect(DOMAIN_DOT[g.domain], `Missing dot for ${g.domain}`).toBeTruthy();
    });
  });
});

describe('data queue', () => {
  it('all QUEUE_FULL id references resolve to QUEUE_ITEMS', () => {
    ALL_PERSONAS.forEach(pid => {
      (QUEUE_FULL[pid] || []).forEach(row => {
        if ('id' in row) {
          expect(QUEUE_ITEMS[row.id], `Missing queue item: ${row.id}`).toBeDefined();
        }
      });
    });
  });

  it('each persona has at least 2 queue items', () => {
    ALL_PERSONAS.forEach(pid => {
      expect((QUEUE_FULL[pid] || []).length).toBeGreaterThanOrEqual(2);
    });
  });
});

describe('monitoring detail', () => {
  it('all persona monitoring texts have a MON_DETAIL entry', () => {
    ALL_PERSONAS.forEach(pid => {
      PERSONAS[pid].monitoring.forEach(([, text]) => {
        expect(MON_DETAIL[text], `Missing MON_DETAIL for: "${text}"`).toBeDefined();
      });
    });
  });

  it('guide references in MON_DETAIL resolve to GUIDANCE', () => {
    Object.entries(MON_DETAIL).forEach(([text, d]) => {
      if (d.guide) {
        expect(GUIDANCE[d.guide], `MON_DETAIL "${text}" guide "${d.guide}" not in GUIDANCE`).toBeDefined();
      }
    });
  });
});

describe('goals and people', () => {
  it('all personas have goals', () => {
    ALL_PERSONAS.forEach(pid => expect(GOALS[pid].length).toBeGreaterThan(0));
  });

  it('all personas have people', () => {
    ALL_PERSONAS.forEach(pid => expect(PEOPLE[pid].length).toBeGreaterThan(0));
  });

  it('each goal has positive target', () => {
    ALL_PERSONAS.forEach(pid => {
      GOALS[pid].forEach(g => expect(g[2]).toBeGreaterThan(0));
    });
  });
});
