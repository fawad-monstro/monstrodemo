import { useAppStore } from '../../store/useAppStore';

const typeColors: Record<string, [string, string]> = {
  Integration: ['#EEF2FF', '#1F4EDC'],
  Document: ['#FFF3E0', '#C77700'],
  Profile: ['#F3EEFF', '#8A38F5'],
};

import { overlayStyle } from './shared';
const overlay = overlayStyle();
const card = (maxW: number) => ({ background: 'var(--c-card)', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });
const closeBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--c-text3)', lineHeight: 1, padding: '4px 8px' };

const btnPrimary = { background: '#1F4EDC', color: 'white', border: 'none', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };
const btnSecondary = { background: 'var(--c-card)', color: 'var(--c-text)', border: '1px solid var(--c-border)', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };

export function RequestModal() {
  const { reqModal, actMsg, closeReq, setReqDraft, sendReq } = useAppStore();

  if (!reqModal) return null;

  const [pillBg, pillColor] = typeColors[reqModal.type] ?? ['#F5F5F7', '#666'];

  return (
    <div style={overlay}>
      <div style={card(480)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span
            title={reqModal.title}
            style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 360 }}
          >
            {reqModal.title}
          </span>
          <button style={closeBtn} onClick={closeReq}>×</button>
        </div>

        {/* Type chip + via */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, background: pillBg, color: pillColor }}>
            {reqModal.type}
          </span>
          <span style={{ fontSize: 11, color: 'var(--c-text3)' }}>via {reqModal.via}</span>
        </div>

        <p style={{ fontSize: 12, color: 'var(--c-text3)', marginBottom: 8 }}>
          Edit the message to send to your client:
        </p>

        <textarea
          value={actMsg}
          onChange={e => setReqDraft(e.target.value)}
          style={{
            width: '100%',
            minHeight: 160,
            borderRadius: 10,
            border: '1px solid var(--c-inputbd)',
            padding: '12px 14px',
            fontSize: 13,
            fontFamily: 'inherit',
            lineHeight: 1.6,
            background: 'var(--c-card)',
            color: 'var(--c-text)',
            resize: 'vertical' as const,
          }}
        />

        {/* Footer */}
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button style={btnSecondary} onClick={closeReq}>Cancel</button>
          <button style={btnPrimary} onClick={sendReq}>Send →</button>
        </div>
      </div>
    </div>
  );
}
