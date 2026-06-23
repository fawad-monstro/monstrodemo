import { useAppStore } from '../../store/useAppStore';
import { MON_DETAIL } from '../../data/monitoring';

const overlay = { position: 'fixed' as const, inset: 0, background: 'var(--c-scrim)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 };
const card = (maxW: number) => ({ background: 'var(--c-card)', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });
const closeBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--c-text3)', lineHeight: 1, padding: '4px 8px' };

const btnPrimary = { background: '#1F4EDC', color: 'white', border: 'none', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };
const btnSecondary = { background: 'var(--c-card)', color: 'var(--c-text)', border: '1px solid var(--c-border)', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };

export function MonitoringDetailModal() {
  const { monModal, closeMon, openDetail } = useAppStore();

  if (!monModal) return null;

  const detail = MON_DETAIL[monModal.text];

  const statusStyle = monModal.status === 'flag'
    ? { background: '#FDECEF', color: '#DC1F4E', fontSize: 11, fontWeight: 700 as const, padding: '4px 10px', borderRadius: 999 }
    : { background: '#FFF3E0', color: '#C77700', fontSize: 11, fontWeight: 700 as const, padding: '4px 10px', borderRadius: 999 };

  return (
    <div style={overlay}>
      <div style={card(460)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={statusStyle}>
            {monModal.status === 'flag' ? '⚑ Flag' : '◎ Watch'}
          </span>
          <button style={closeBtn} onClick={closeMon}>×</button>
        </div>

        <p style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase' as const, color: 'var(--c-text3)', marginBottom: 8 }}>
          {monModal.domain}
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--c-text)', marginBottom: 16, lineHeight: 1.3 }}>
          {monModal.text}
        </h2>

        {detail ? (
          <>
            {/* Why section */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, color: 'var(--c-text3)', marginBottom: 8 }}>
                Why Monstro flagged this
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--c-text)' }}>{detail.why}</p>
            </div>

            {/* Signals table */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, color: 'var(--c-text3)', marginBottom: 8 }}>
                Signals
              </p>
              <div style={{ borderRadius: 10, border: '1px solid var(--c-border)', overflow: 'hidden' }}>
                {detail.signals.map(([k, v], i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '9px 14px',
                      background: i % 2 === 0 ? 'var(--c-card)' : 'var(--c-tint)',
                      borderBottom: i < detail.signals.length - 1 ? '1px solid var(--c-border)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: 13, color: 'var(--c-text3)' }}>{k}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              {detail.guide ? (
                <button
                  style={btnPrimary}
                  onClick={() => { openDetail(detail.guide!); closeMon(); }}
                >
                  Open related guidance →
                </button>
              ) : (
                <button style={btnSecondary} onClick={closeMon}>Close</button>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button style={btnSecondary} onClick={closeMon}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
