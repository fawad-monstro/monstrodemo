import { useAppStore } from '../../store/useAppStore';
import { PERSONAS, DOMAIN_DOT, LOCKED } from '../../data/personas';
import { GUIDANCE } from '../../data/guidance';
import { QUEUE_ITEMS } from '../../data/queue';
import { NEWS } from '../../data/news';

const typeColors: Record<string, [string, string]> = {
  Integration: ['var(--tint-blue-bg)', 'var(--tint-blue-fg)'],
  Document: ['var(--tint-amber-bg)', 'var(--tint-amber-fg)'],
  Profile: ['var(--tint-violet-bg)', 'var(--tint-violet-fg)'],
};

export function TodayScreen() {
  const {
    view,
    persona,
    qDone,
    setTab,
    openConnect,
    openQ,
    openDetail,
    openArticle,
  } = useAppStore();

  const p = PERSONAS[persona];

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '26px 30px', animation: 'mfade 0.18s ease' }}>

      {/* Section 1 — Greeting */}
      {view === 'advisor' ? (
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--c-text3)', marginBottom: 4 }}>
          {p.tier === 'Mass market' ? 'SERVICING VIEW' : 'CLIENT OVERVIEW'}
        </p>
      ) : (
        <p style={{ fontSize: 12, color: 'var(--c-text3)', marginBottom: 4 }}>Good morning</p>
      )}
      <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--c-text)', marginBottom: 24 }}>
        {view === 'advisor' ? p.name : p.first}
      </h1>

      {/* Section 2 — Net-worth + Accounts */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        {/* Net-worth card */}
        <div style={{ background: 'var(--c-card)', borderRadius: 16, boxShadow: 'var(--c-shadow)', padding: 20, flex: 1, minWidth: 220 }}>
          <p style={{ fontSize: 12, color: 'var(--c-text3)', marginBottom: 6 }}>Net worth</p>
          <p style={{ fontSize: 30, fontWeight: 700, color: 'var(--c-text)', letterSpacing: '-0.02em' }}>{p.netWorth}</p>
          <p style={{ fontSize: 13, color: '#0E7C5A', marginTop: 6 }}>▲ {p.change} this quarter</p>
        </div>

        {/* Accounts card */}
        <div style={{ background: 'var(--c-card)', borderRadius: 16, boxShadow: 'var(--c-shadow)', padding: 20, flex: 1, minWidth: 220 }}>
          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Accounts</p>
          {p.accounts.map(([name, value, isNeg], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--c-border)' }}>
              <span style={{ fontSize: 13, color: 'var(--c-text2)' }}>{name}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: isNeg ? '#DC1F4E' : 'var(--c-text)' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 — Data queue preview */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ background: 'var(--c-card)', borderRadius: 16, boxShadow: 'var(--c-shadow)', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)' }}>Needs your attention</span>
            <button
              style={{ background: 'none', border: 'none', fontSize: 13, color: '#1F4EDC', cursor: 'pointer', fontWeight: 500 }}
              onClick={() => setTab('queue')}
            >
              View all {p.queueCount} →
            </button>
          </div>

          {p.queueTop.map((topId) => {
            const item = QUEUE_ITEMS[topId];
            if (!item) return null;
            const doneKey = `${persona}|${item.title}`;

            let iconBg = 'var(--tint-blue-bg)';
            let iconColor = 'var(--tint-blue-fg)';
            let iconText = '⇄';
            if (item.type === 'Document') { iconBg = 'var(--tint-amber-bg)'; iconColor = 'var(--tint-amber-fg)'; iconText = '▤'; }
            if (item.type === 'Profile') { iconBg = 'var(--tint-violet-bg)'; iconColor = 'var(--tint-violet-fg)'; iconText = '?'; }

            const [pillBg, pillColor] = typeColors[item.type] ?? ['#F5F5F7', '#666'];

            return (
              <div key={topId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--c-border)' }}>
                {/* Icon box */}
                <div style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, background: iconBg, color: iconColor, flexShrink: 0 }}>
                  {iconText}
                </div>

                {/* Text column */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)' }}>{item.title}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', padding: '2px 6px', borderRadius: 4, background: pillBg, color: pillColor, alignSelf: 'flex-start', marginTop: 2 }}>
                    {item.type}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 2 }}>{item.why}</span>
                  {(item as QueueItem & { unlocks?: string }).unlocks && (
                    <span style={{ fontSize: 11, color: '#0E7C5A', marginTop: 2 }}>
                      Unlocks: {(item as QueueItem & { unlocks?: string }).unlocks}
                    </span>
                  )}
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Action */}
                {qDone[doneKey] ? (
                  <span style={{ color: '#0E7C5A', fontSize: 13, fontWeight: 600 }}>✓ Done</span>
                ) : item.type === 'Integration' ? (
                  <button
                    style={{ background: '#1F4EDC', color: 'white', border: 'none', borderRadius: 999, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    onClick={() => openConnect('Integration', item.via || 'Plaid', item.title, false)}
                  >
                    Connect
                  </button>
                ) : item.type === 'Document' ? (
                  <button
                    style={{ background: '#1F4EDC', color: 'white', border: 'none', borderRadius: 999, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    onClick={() => openConnect('Document', item.via || '', item.title, false)}
                  >
                    Upload
                  </button>
                ) : (
                  <button
                    style={{ background: '#1F4EDC', color: 'white', border: 'none', borderRadius: 999, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    onClick={() => openQ(item.title, false)}
                  >
                    Answer
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 4 — Guidance teasers */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-text)' }}>
            {view === 'advisor' ? 'Guidance for this client' : 'Your guidance'}
          </span>
          <button
            style={{ background: 'none', border: 'none', fontSize: 13, color: '#1F4EDC', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => setTab('guidance')}
          >
            See all →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 12 }}>
          {p.guidance.slice(0, 3).map((id) => {
            const g = GUIDANCE[id];
            if (!g) return null;
            const statusBg = g.status === 'New' ? 'var(--tint-blue-bg)' : 'var(--tint-green-bg)';
            const statusColor = g.status === 'New' ? 'var(--tint-blue-fg)' : 'var(--tint-green-fg)';
            return (
              <div
                key={id}
                style={{ border: '1px solid var(--c-border)', borderRadius: 12, padding: 16, cursor: 'pointer', background: 'var(--c-card)' }}
                onClick={() => openDetail(id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: DOMAIN_DOT[g.domain], flexShrink: 0 }} />
                    <span style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--c-text3)', marginLeft: 4 }}>{g.domain}</span>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', padding: '2px 6px', borderRadius: 4, background: statusBg, color: statusColor }}>
                    {g.status}
                  </span>
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)', marginBottom: 4 }}>{g.headline}</p>
                <p style={{ fontSize: 13, color: 'var(--c-text3)' }}>{g.teaser}</p>
                <span style={{ fontSize: 12, color: '#1F4EDC', marginTop: 8, display: 'block' }}>Open →</span>
              </div>
            );
          })}

          {/* Locked cards */}
          {LOCKED[persona].slice(0, 2).map((locked, i) => (
            <div
              key={i}
              style={{ border: '2px dashed var(--c-border2)', borderRadius: 12, padding: 16, opacity: 0.65 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                <span>🔒</span>
                <span style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--c-text3)' }}>{locked.domain}</span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)', marginBottom: 4 }}>{locked.headline}</p>
              <p style={{ fontSize: 11, color: '#C77700' }}>{locked.requires}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5 — News */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-text)' }}>Latest news</span>
          <span style={{ fontSize: 12, color: 'var(--c-text3)' }}>Curated to your finances · Quodd News</span>
        </div>

        {NEWS[persona].map(([title, src, when, tag, why, body], i) => (
          <div
            key={i}
            style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--c-border)', cursor: 'pointer' }}
            onClick={() => openArticle({ title, src, when, tag, why, body })}
          >
            {/* Thumbnail placeholder */}
            <div style={{ width: 40, height: 40, background: 'var(--c-tint)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
              📰
            </div>

            {/* Text column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{title}</span>
              <span style={{ fontSize: 11, color: 'var(--c-text3)', marginTop: 2 }}>{src} · {when}</span>
              <div style={{ marginTop: 4, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 10, background: 'var(--tint-violet-bg)', color: 'var(--tint-violet-fg)', padding: '2px 6px', borderRadius: 4 }}>{tag}</span>
                <span style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--c-text3)' }}>{why}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// QueueItem type augment for unlocks access
type QueueItem = {
  title: string;
  type: string;
  why: string;
  via?: string;
  pack?: boolean;
  unlocks?: string;
};
