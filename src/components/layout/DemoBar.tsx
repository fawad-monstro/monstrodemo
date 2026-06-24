import { useAppStore } from '../../store/useAppStore';
import { PERSONAS } from '../../data/personas';
import type { PersonaId, Fidelity } from '../../types';

const personaOptions: { id: PersonaId; label: string; short: string }[] = [
  { id: 'maya',    label: 'Maya',      short: 'Maya' },
  { id: 'david',   label: 'David',     short: 'David' },
  { id: 'marcus',  label: 'Marcus',    short: 'Marcus' },
  { id: 'patel',   label: 'Raj & Priya', short: 'Raj' },
  { id: 'eleanor', label: 'Eleanor',   short: 'Eleanor' },
];

const fidelityOptions: { id: Fidelity; label: string; short: string }[] = [
  { id: 'dark',  label: 'Dark',      short: 'Dark' },
  { id: 'light', label: 'Light',     short: 'Light' },
  { id: 'wire',  label: 'Wireframe', short: 'Wire' },
];

export function DemoBar() {
  const embedded   = useAppStore(s => s.embedded);
  const view       = useAppStore(s => s.view);
  const fidelity   = useAppStore(s => s.fidelity);
  const persona    = useAppStore(s => s.persona);
  const setEmbedded  = useAppStore(s => s.setEmbedded);
  const setView      = useAppStore(s => s.setView);
  const setFidelity  = useAppStore(s => s.setFidelity);
  const setPersona   = useAppStore(s => s.setPersona);

  const p = PERSONAS[persona];
  const viewBLabel = p.tier === 'Mass market' ? 'Banker' : 'Advisor';

  const active = (on: boolean): React.CSSProperties => ({
    border: 'none',
    background: on ? '#3A3A3A' : 'transparent',
    color: on ? '#fff' : '#9D9D9D',
    fontSize: 12,
    fontWeight: on ? 600 : 400,
    padding: '5px 10px',
    borderRadius: 999,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    WebkitTapHighlightColor: 'transparent',
  });

  const group: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  };

  const lbl: React.CSSProperties = {
    fontSize: 10,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '.04em',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  const pills: React.CSSProperties = {
    display: 'inline-flex',
    background: '#1C1C1F',
    borderRadius: 999,
    padding: 3,
    flexShrink: 0,
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 50,
      background: '#0A0A0A',
      display: 'flex',
      alignItems: 'center',
      padding: '0 14px',
      gap: 12,
      overflowX: 'auto',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
    }}>
      {/* Logo — shrinks last */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0, marginRight: 4 }}>
        <div style={{
          width: 24, height: 24, flexShrink: 0,
          background: 'linear-gradient(135deg,#1F4EDC,#8A38F5)',
          borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 13,
        }}>M</div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'white', whiteSpace: 'nowrap' }}>Monstro</span>
        <span style={{ border: '1px solid #333', color: '#666', fontSize: 10, padding: '1px 6px', borderRadius: 4, whiteSpace: 'nowrap' }}>Demo</span>
      </div>

      {/* MODE */}
      <div style={group}>
        <span style={lbl}>Mode</span>
        <div style={pills}>
          <button style={active(embedded)}  onClick={() => setEmbedded(true)}>Embedded</button>
          <button style={active(!embedded)} onClick={() => setEmbedded(false)}>Standalone</button>
        </div>
      </div>

      {/* VIEW */}
      <div style={group}>
        <span style={lbl}>View</span>
        <div style={pills}>
          <button style={active(view === 'client')}  onClick={() => setView('client')}>Client</button>
          <button style={active(view === 'advisor')} onClick={() => setView('advisor')}>{viewBLabel}</button>
        </div>
      </div>

      {/* FIDELITY */}
      <div style={group}>
        <span style={lbl}>Fidelity</span>
        <div style={pills}>
          {fidelityOptions.map(f => (
            <button key={f.id} style={active(fidelity === f.id)} onClick={() => setFidelity(f.id)}>
              {f.short}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 12, flexShrink: 1 }} />

      {/* PERSONAS */}
      <div style={group}>
        <span style={lbl}>Client</span>
        <div style={pills}>
          {personaOptions.map(opt => (
            <button key={opt.id} style={active(persona === opt.id)} onClick={() => setPersona(opt.id)}>
              {opt.short}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
