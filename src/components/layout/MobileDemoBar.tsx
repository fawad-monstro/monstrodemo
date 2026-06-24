import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { PERSONAS } from '../../data/personas';
import type { PersonaId, Fidelity } from '../../types';

const personas: { id: PersonaId; label: string }[] = [
  { id: 'maya',    label: 'Maya' },
  { id: 'david',   label: 'David' },
  { id: 'marcus',  label: 'Marcus' },
  { id: 'patel',   label: 'Raj' },
  { id: 'eleanor', label: 'Eleanor' },
];

export function MobileDemoBar() {
  const [open, setOpen] = useState(false);
  const embedded  = useAppStore(s => s.embedded);
  const view      = useAppStore(s => s.view);
  const fidelity  = useAppStore(s => s.fidelity);
  const persona   = useAppStore(s => s.persona);
  const setEmbedded  = useAppStore(s => s.setEmbedded);
  const setView      = useAppStore(s => s.setView);
  const setFidelity  = useAppStore(s => s.setFidelity);
  const setPersona   = useAppStore(s => s.setPersona);

  const p = PERSONAS[persona];
  const viewBLabel = p.tier === 'Mass market' ? 'Banker' : 'Advisor';

  const pill = (active: boolean): React.CSSProperties => ({
    border: 'none',
    background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
    color: active ? '#fff' : '#9D9D9D',
    fontSize: 12,
    fontWeight: active ? 600 : 400,
    padding: '5px 11px',
    borderRadius: 999,
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  });

  const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 6 };
  const lbl: React.CSSProperties = { fontSize: 10, color: '#9D9D9D', textTransform: 'uppercase', letterSpacing: '.04em', width: 52, flexShrink: 0 };
  const pillGroup: React.CSSProperties = { display: 'flex', background: '#1C1C1F', borderRadius: 999, padding: 2 };

  return (
    <>
      {/* Collapsed strip */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        height: 44,
        paddingTop: 'env(safe-area-inset-top)',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flex: 1 }}>
          <div style={{ width: 22, height: 22, background: 'linear-gradient(135deg,#1F4EDC,#8A38F5)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 12 }}>M</div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Monstro</span>
          <span style={{ fontSize: 10, color: '#666', border: '1px solid #333', borderRadius: 4, padding: '1px 5px' }}>Demo</span>
        </div>

        {/* Active persona pill */}
        <div style={{ display: 'flex', gap: 5 }}>
          {personas.map(opt => (
            <button
              key={opt.id}
              onClick={() => setPersona(opt.id)}
              style={{
                ...pill(persona === opt.id),
                padding: '4px 9px',
                fontSize: 11,
              }}
            >{opt.label}</button>
          ))}
        </div>

        {/* Settings toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', color: open ? '#fff' : '#9D9D9D', fontSize: 18, cursor: 'pointer', padding: '4px 6px', WebkitTapHighlightColor: 'transparent' }}
        >⚙</button>
      </div>

      {/* Expanded panel */}
      {open && (
        <div style={{
          position: 'fixed', top: 44, left: 0, right: 0, zIndex: 59,
          background: '#111',
          borderBottom: '1px solid #222',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          animation: 'mfade 0.15s ease',
        }} onClick={e => e.stopPropagation()}>
          <div style={row}>
            <span style={lbl}>Mode</span>
            <div style={pillGroup}>
              <button style={pill(embedded)} onClick={() => setEmbedded(true)}>Embedded</button>
              <button style={pill(!embedded)} onClick={() => setEmbedded(false)}>Standalone</button>
            </div>
          </div>
          <div style={row}>
            <span style={lbl}>View</span>
            <div style={pillGroup}>
              <button style={pill(view === 'client')} onClick={() => setView('client')}>Client</button>
              <button style={pill(view === 'advisor')} onClick={() => setView('advisor')}>{viewBLabel}</button>
            </div>
          </div>
          <div style={row}>
            <span style={lbl}>Fidelity</span>
            <div style={pillGroup}>
              {(['dark', 'light', 'wire'] as Fidelity[]).map(f => (
                <button key={f} style={pill(fidelity === f)} onClick={() => setFidelity(f)}>
                  {f === 'wire' ? 'Wireframe' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tap outside to close panel */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 58 }} onClick={() => setOpen(false)} />
      )}
    </>
  );
}
