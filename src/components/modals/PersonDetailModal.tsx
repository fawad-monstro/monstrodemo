import { useAppStore } from '../../store/useAppStore';
import { PEOPLE } from '../../data/people';

import { overlayStyle } from './shared';
const overlay = overlayStyle();
const card = (maxW: number) => ({ background: 'var(--c-card)', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });
const closeBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--c-text3)', lineHeight: 1, padding: '4px 8px' };

export function PersonDetailModal() {
  const { personModal, persona, closePerson } = useAppStore();

  if (personModal === null) return null;

  const row = PEOPLE[persona][personModal];
  if (!row) return null;

  const [pname, rel, roles, pdetail, benType, benShare] = row;
  const initials = pname.split(' ').filter(Boolean).map((s: string) => s[0]).slice(0, 2).join('');

  const rows: [string, string][] = [
    ['Relationship', rel],
    ['Role(s)', roles],
    ['Detail', pdetail],
    ['Beneficiary type', benType || '—'],
    ['Beneficiary share', benShare || '—'],
  ];

  return (
    <div style={overlay}>
      <div style={card(400)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, background: 'var(--avatar-bg)', color: 'var(--avatar-fg)', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
              {initials}
            </div>
            <div>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--c-text)' }}>{pname}</p>
              <span style={{ background: 'var(--c-tint)', color: 'var(--c-text3)', fontSize: 11, padding: '3px 10px', borderRadius: 999, display: 'inline-block', marginTop: 4 }}>
                {rel}
              </span>
            </div>
          </div>
          <button style={closeBtn} onClick={closePerson}>×</button>
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
