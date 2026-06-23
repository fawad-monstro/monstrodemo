import { useAppStore } from '../../store/useAppStore';

const overlay = { position: 'fixed' as const, inset: 0, background: 'var(--c-scrim)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 };
const card = (maxW: number) => ({ background: 'var(--c-card)', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });
const closeBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--c-text3)', lineHeight: 1, padding: '4px 8px' };

const btnSecondary = { background: 'var(--c-card)', color: 'var(--c-text)', border: '1px solid var(--c-border)', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };

export function SourceDetailModal() {
  const { srcModal, closeSource } = useAppStore();

  if (!srcModal) return null;

  const kindStyle = srcModal.kind === 'market'
    ? { background: '#EEF2FF', color: '#1F4EDC' }
    : { background: '#F3EEFF', color: '#8A38F5' };

  const statusStyle = srcModal.status === 'Connected'
    ? { background: '#E8F7EC', color: '#0E7C5A' }
    : { background: '#F5F5F7', color: '#9D9D9D' };

  const chipBase = { fontSize: 11, fontWeight: 700 as const, textTransform: 'uppercase' as const, padding: '3px 8px', borderRadius: 999 };

  return (
    <div style={overlay}>
      <div style={card(440)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--c-text)' }}>{srcModal.n}</h2>
          <button style={closeBtn} onClick={closeSource}>×</button>
        </div>

        {/* Chips */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
          <span style={{ ...chipBase, ...kindStyle }}>
            {srcModal.kind === 'market' ? 'Market data' : 'Client data'}
          </span>
          <span style={{ ...chipBase, ...statusStyle }}>
            {srcModal.status}
          </span>
        </div>

        <p style={{ fontSize: 14, color: 'var(--c-text3)', marginBottom: 20, lineHeight: 1.5 }}>{srcModal.d}</p>

        <p style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, color: 'var(--c-text3)', marginBottom: 8 }}>
          Representative fields
        </p>
        <ul style={{ listStyle: 'none', borderRadius: 10, border: '1px solid var(--c-border)', overflow: 'hidden' }}>
          {srcModal.fields.map((f, i) => (
            <li
              key={i}
              style={{
                padding: '9px 14px',
                fontSize: 13,
                color: 'var(--c-text)',
                borderBottom: i < srcModal.fields.length - 1 ? '1px solid var(--c-border)' : 'none',
                background: i % 2 === 0 ? 'var(--c-card)' : 'var(--c-tint)',
              }}
            >
              {f}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 20, textAlign: 'right' as const }}>
          <button style={btnSecondary} onClick={closeSource}>Close</button>
        </div>
      </div>
    </div>
  );
}
