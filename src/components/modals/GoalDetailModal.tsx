import { useAppStore } from '../../store/useAppStore';
import { GOALS } from '../../data/goals';
import { mc } from '../../utils';

import { overlayStyle } from './shared';
const overlay = overlayStyle();
const card = (maxW: number) => ({ background: 'var(--c-card)', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });
const closeBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--c-text3)', lineHeight: 1, padding: '4px 8px' };

export function GoalDetailModal() {
  const { goalModal, persona, closeGoal } = useAppStore();

  if (goalModal === null) return null;

  const g = GOALS[persona][goalModal];
  if (!g) return null;

  const [type, name, target, date, priority, funded, monthly, forWhom] = g;
  const pct = Math.round(Math.min(1, funded / target) * 100);
  const shortfall = Math.max(0, target - funded);

  const priorityStyle =
    priority === 'Must-have' ? { background: 'var(--tint-red-bg)', color: 'var(--tint-red-fg)' } :
    priority === 'Want' ? { background: 'var(--tint-amber-bg)', color: 'var(--tint-amber-fg)' } :
    { background: 'var(--tint-green-bg)', color: 'var(--tint-green-fg)' };

  const progressColor = pct >= 80 ? '#0E7C5A' : pct >= 40 ? '#C77700' : '#DC1F4E';

  const rows: [string, string][] = [
    ['Goal type', type],
    ['Target amount', mc(target)],
    ['Target date', date],
    ['Priority', priority],
    ['Funded', mc(funded) + ' (' + pct + '%)'],
    ['Monthly contribution', monthly > 0 ? mc(monthly) + '/mo' : '—'],
    ['Projected shortfall', shortfall > 0 ? mc(shortfall) : 'On track ✓'],
    ['Goal for', forWhom || 'Household'],
  ];

  return (
    <div style={overlay}>
      <div style={card(440)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--c-text)' }}>{name}</h2>
          <button style={closeBtn} onClick={closeGoal}>×</button>
        </div>

        {/* Chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <span style={{ background: 'var(--c-tint)', color: 'var(--c-text3)', fontSize: 11, padding: '3px 10px', borderRadius: 999 }}>
            {type}
          </span>
          <span style={{ ...priorityStyle, fontSize: 11, padding: '3px 10px', borderRadius: 999 }}>
            {priority}
          </span>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ height: 8, background: 'var(--track-bg)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ width: pct + '%', height: 8, background: progressColor, borderRadius: 6, transition: 'width 0.3s' }} />
          </div>
          <p style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 4 }}>{pct}% funded</p>
        </div>

        {/* Detail rows */}
        <div style={{ borderRadius: 10, border: '1px solid var(--c-border)', overflow: 'hidden' }}>
          {rows.map(([k, v], i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '9px 14px',
                background: i % 2 === 0 ? 'var(--c-card)' : 'var(--c-tint)',
                borderBottom: i < rows.length - 1 ? '1px solid var(--c-border)' : 'none',
              }}
            >
              <span style={{ fontSize: 13, color: 'var(--c-text3)' }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
