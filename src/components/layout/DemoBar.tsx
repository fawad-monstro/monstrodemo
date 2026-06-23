import { useAppStore } from '../../store/useAppStore';
import { PERSONAS } from '../../data/personas';
import type { PersonaId, Fidelity } from '../../types';

const personaOptions: { id: PersonaId; label: string }[] = [
  { id: 'maya', label: 'Maya' },
  { id: 'david', label: 'David' },
  { id: 'marcus', label: 'Marcus' },
  { id: 'patel', label: 'Raj & Priya' },
  { id: 'eleanor', label: 'Eleanor' },
];

const label: React.CSSProperties = {
  fontSize: 11,
  color: '#9D9D9D',
  textTransform: 'uppercase' as const,
  letterSpacing: '.04em',
  whiteSpace: 'nowrap' as const,
};

const group: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const pillContainer: React.CSSProperties = {
  display: 'inline-flex',
  background: '#1C1C1F',
  borderRadius: 999,
  padding: 3,
};

function activePill(): React.CSSProperties {
  return {
    border: 'none',
    background: '#3A3A3A',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 600,
    padding: '5px 12px',
    borderRadius: 999,
    cursor: 'pointer',
  };
}

function inactivePill(): React.CSSProperties {
  return {
    border: 'none',
    background: 'transparent',
    color: '#9D9D9D',
    fontSize: 12,
    fontWeight: 500,
    padding: '5px 12px',
    borderRadius: 999,
    cursor: 'pointer',
  };
}

export function DemoBar() {
  const embedded = useAppStore(s => s.embedded);
  const view = useAppStore(s => s.view);
  const fidelity = useAppStore(s => s.fidelity);
  const persona = useAppStore(s => s.persona);
  const setEmbedded = useAppStore(s => s.setEmbedded);
  const setView = useAppStore(s => s.setView);
  const setFidelity = useAppStore(s => s.setFidelity);
  const setPersona = useAppStore(s => s.setPersona);

  // Determine advisor/banker label based on persona tier
  const p = PERSONAS[persona];
  const viewBLabel = p.tier === 'Mass market' ? 'Banker' : 'Advisor';

  const fidelityOptions: { id: Fidelity; label: string }[] = [
    { id: 'dark', label: 'Dark' },
    { id: 'light', label: 'Light' },
    { id: 'wire', label: 'Wireframe' },
  ];

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
      padding: '0 18px',
      gap: 20,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          width: 24,
          height: 24,
          background: 'linear-gradient(135deg,#1F4EDC,#8A38F5)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: -0.5,
        }}>M</div>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'white', marginLeft: 8 }}>Monstro</span>
        <span style={{
          border: '1px solid #3A3A3A',
          color: '#9D9D9D',
          fontSize: 11,
          padding: '2px 7px',
          borderRadius: 999,
          marginLeft: 8,
        }}>Sales demo</span>
      </div>

      {/* MODE */}
      <div style={group}>
        <span style={label}>MODE</span>
        <div style={pillContainer}>
          <button style={embedded ? activePill() : inactivePill()} onClick={() => setEmbedded(true)}>Embedded</button>
          <button style={!embedded ? activePill() : inactivePill()} onClick={() => setEmbedded(false)}>Standalone</button>
        </div>
      </div>

      {/* VIEW */}
      <div style={group}>
        <span style={label}>VIEW</span>
        <div style={pillContainer}>
          <button style={view === 'client' ? activePill() : inactivePill()} onClick={() => setView('client')}>Client</button>
          <button style={view === 'advisor' ? activePill() : inactivePill()} onClick={() => setView('advisor')}>{viewBLabel}</button>
        </div>
      </div>

      {/* FIDELITY */}
      <div style={group}>
        <span style={label}>FIDELITY</span>
        <div style={pillContainer}>
          {fidelityOptions.map(opt => (
            <button
              key={opt.id}
              style={fidelity === opt.id ? activePill() : inactivePill()}
              onClick={() => setFidelity(opt.id)}
            >{opt.label}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* CLIENT */}
      <div style={group}>
        <span style={label}>CLIENT</span>
        <div style={pillContainer}>
          {personaOptions.map(opt => (
            <button
              key={opt.id}
              style={persona === opt.id ? activePill() : inactivePill()}
              onClick={() => setPersona(opt.id)}
            >{opt.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
