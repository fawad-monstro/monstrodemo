import { useAppStore } from '../../store/useAppStore';
import { PERSONAS, DOMAIN_DOT, LOCKED } from '../../data/personas';
import { GUIDANCE } from '../../data/guidance';

export function GuidanceScreen() {
  const {
    view,
    persona,
    detail,
    openDetail,
    closeDetail,
    openAct,
    openTree,
    openVideo,
  } = useAppStore();

  const p = PERSONAS[persona];

  /* ── DETAIL VIEW ──────────────────────────────────────────────── */
  if (detail !== null) {
    const g = GUIDANCE[detail];
    if (!g) return null;

    const statusBg = g.status === 'New' ? '#EEF2FF' : '#E8F7EC';
    const statusColor = g.status === 'New' ? '#1F4EDC' : '#0E7C5A';

    return (
      <div style={{ padding: '26px 30px', animation: 'mfade 0.18s ease' }}>
        {/* Back link */}
        <button
          style={{ background: 'none', border: 'none', color: '#1F4EDC', fontSize: 13, cursor: 'pointer', marginBottom: 20, padding: 0 }}
          onClick={() => closeDetail()}
        >
          ← Back to guidance
        </button>

        {/* Domain + status row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: DOMAIN_DOT[g.domain], flexShrink: 0 }} />
          <span style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--c-text3)' }}>{g.domain}</span>
          <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', padding: '2px 6px', borderRadius: 4, background: statusBg, color: statusColor }}>
            {g.status}
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--c-text)', marginBottom: 16 }}>{g.headline}</h1>

        {/* Video placeholder */}
        <div
          style={{ width: '100%', height: 160, borderRadius: 16, background: 'linear-gradient(135deg,#1F2A4A 0%,#1F4EDC 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden', marginBottom: 20 }}
          onClick={() => openVideo(detail, 0)}
        >
          <div style={{ width: 56, height: 56, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.6)', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 20, marginLeft: 4 }}>▶</span>
          </div>
          <span style={{ position: 'absolute', bottom: 12, right: 12, color: 'rgba(255,255,255,0.8)', fontSize: 12, background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: 4 }}>
            {g.vid}
          </span>
          <span style={{ position: 'absolute', top: 12, left: 12, color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
            ▸ {g.domain} briefing
          </span>
        </div>

        {view === 'client' ? (
          <>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--c-text)', marginBottom: 24 }}>{g.clientBody}</p>
            <button
              onClick={() => {
                const msg = `Hi Jordan,\n\nI saw the guidance on "${g.headline}". I'd like your help moving forward — could you handle it or walk me through it on our next call?\n\nThanks,\n${p.first.split(' ')[0]}`;
                openAct(detail, msg);
              }}
              style={{ width: '100%', background: '#0A0A0A', color: 'white', border: 'none', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >
              {g.action} →
            </button>
          </>
        ) : (
          <>
            {/* Why it matters */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--c-text3)', marginBottom: 8 }}>WHY IT MATTERS</p>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--c-text)' }}>{g.advisorWhy}</p>
            </div>

            {/* Calculations */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--c-text3)', marginBottom: 8 }}>CALCULATIONS</p>
              <div style={{ borderRadius: 10, border: '1px solid var(--c-border)', overflow: 'hidden' }}>
                {g.calcs.map(([k, v], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 14px', background: i % 2 === 0 ? 'var(--c-card)' : 'var(--c-tint)', borderBottom: i < g.calcs.length - 1 ? '1px solid var(--c-border)' : 'none' }}>
                    <span style={{ fontSize: 13, color: 'var(--c-text3)' }}>{k}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market + Client data */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--c-text3)', marginBottom: 8 }}>MARKET DATA USED</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {g.market.map(m => (
                    <span key={m} style={{ fontSize: 11, background: 'var(--c-tint)', color: 'var(--c-text3)', padding: '4px 10px', borderRadius: 999, border: '1px solid var(--c-border)' }}>{m}</span>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--c-text3)', marginBottom: 8 }}>CLIENT DATA USED</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {g.user.map(u => (
                    <span key={u} style={{ fontSize: 11, background: 'var(--c-tint)', color: 'var(--c-text3)', padding: '4px 10px', borderRadius: 999, border: '1px solid var(--c-border)' }}>{u}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => openAct(detail, '')}
                style={{ flex: 1, border: '1px solid var(--c-border)', background: 'var(--c-card)', color: 'var(--c-text)', borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                Share with client
              </button>
              <button
                onClick={() => openTree(g.domain)}
                style={{ flex: 1, border: '1px solid #8A38F5', background: 'transparent', color: '#8A38F5', borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                Visualize Tree
              </button>
              <button
                onClick={() => {
                  const msg = `Hi ${p.first},\n\nI saw the guidance on "${g.headline}". I'd like your help moving forward — could you handle it or walk me through it on our next call?\n\nThanks,\n${p.first.split(' ')[0]}`;
                  openAct(detail, msg);
                }}
                style={{ flex: 1, background: '#0A0A0A', color: 'white', border: 'none', borderRadius: 10, padding: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                {g.action} →
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  /* ── LIST VIEW ────────────────────────────────────────────────── */
  return (
    <div style={{ padding: '26px 30px', animation: 'mfade 0.18s ease' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--c-text)', marginBottom: 4 }}>Financial guidance</h2>
      <p style={{ fontSize: 14, color: 'var(--c-text3)', marginBottom: 24 }}>
        Across cash flow, retirement, estate, investments &amp; tax.
      </p>

      {p.guidance.map((id) => {
        const g = GUIDANCE[id];
        if (!g) return null;
        const statusBg = g.status === 'New' ? '#EEF2FF' : '#E8F7EC';
        const statusColor = g.status === 'New' ? '#1F4EDC' : '#0E7C5A';
        return (
          <div
            key={id}
            style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--c-border)', cursor: 'pointer' }}
            onClick={() => openDetail(id)}
          >
            {/* Domain circle */}
            <div style={{ width: 44, height: 44, borderRadius: 12, background: DOMAIN_DOT[g.domain] + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 12, height: 12, borderRadius: 999, background: DOMAIN_DOT[g.domain] }} />
            </div>

            {/* Text column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--c-text3)' }}>{g.domain}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)' }}>{g.headline}</span>
              <span style={{ fontSize: 13, color: 'var(--c-text3)', marginTop: 2 }}>{g.teaser}</span>
            </div>

            {/* Status pill */}
            <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', padding: '2px 6px', borderRadius: 4, background: statusBg, color: statusColor, whiteSpace: 'nowrap' }}>
              {g.status}
            </span>

            {/* Open arrow */}
            <span style={{ fontSize: 12, color: '#1F4EDC', marginLeft: 8, whiteSpace: 'nowrap' }}>Open →</span>
          </div>
        );
      })}

      {/* Unlock more */}
      <div style={{ marginTop: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text3)', textTransform: 'uppercase', marginBottom: 12 }}>Unlock more</p>
        {LOCKED[persona].map((locked, i) => (
          <div
            key={i}
            style={{ border: '2px dashed var(--c-border2)', borderRadius: 12, padding: 16, marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center' }}
          >
            <div style={{ width: 32, height: 32, background: '#F5F5F7', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
              🔒
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--c-text3)' }}>{locked.domain}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)' }}>{locked.headline}</span>
              <span style={{ fontSize: 12, color: '#C77700' }}>Requires: {locked.requires}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
