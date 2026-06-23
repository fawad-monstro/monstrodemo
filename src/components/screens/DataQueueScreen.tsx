import { useAppStore } from '../../store/useAppStore';
import { QUEUE_ITEMS, QUEUE_FULL } from '../../data/queue';
import { viaFromTitle } from '../../utils';
import type { QueueItemType } from '../../types';

const typeColors: Record<string, [string, string]> = {
  Integration: ['#EEF2FF', '#1F4EDC'],
  Document: ['#FFF3E0', '#C77700'],
  Profile: ['#F3EEFF', '#8A38F5'],
};

export function DataQueueScreen() {
  const {
    view,
    persona,
    qDone,
    openConnect,
    openQ,
    openRequest,
  } = useAppStore();

  const rawRows = QUEUE_FULL[persona] || [];

  type ResolvedItem = { title: string; type: QueueItemType; why: string; via: string; unlocks?: string };

  const resolved: ResolvedItem[] = rawRows.map(r => {
    if ('id' in r) {
      const it = QUEUE_ITEMS[r.id];
      return { title: it.title, type: it.type, why: it.why, via: it.via || '', unlocks: (it as unknown as { unlocks?: string }).unlocks };
    }
    return { title: r.k, type: r.t, why: r.w, via: '' };
  });

  const integCount = resolved.filter(r => r.type === 'Integration').length;
  const docCount = resolved.filter(r => r.type === 'Document').length;
  const profCount = resolved.filter(r => r.type === 'Profile').length;

  const btnPrimary = { background: '#1F4EDC', color: 'white', border: 'none', borderRadius: 999, padding: '7px 14px', fontSize: 12, fontWeight: 600 as const, cursor: 'pointer', whiteSpace: 'nowrap' as const };
  const btnSecondary = { background: 'var(--c-card)', color: 'var(--c-text)', border: '1px solid var(--c-border)', borderRadius: 999, padding: '7px 13px', fontSize: 12, fontWeight: 600 as const, cursor: 'pointer', marginLeft: 6 };

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '26px 30px', animation: 'mfade 0.18s ease' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--c-text)', marginBottom: 4 }}>Data Queue</h2>
      <p style={{ fontSize: 14, color: 'var(--c-text3)', marginBottom: 16 }}>
        {resolved.length} open requests, ranked by how much guidance each unlocks.
      </p>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <span style={{ fontSize: 12, background: '#EEF2FF', color: '#1F4EDC', padding: '5px 12px', borderRadius: 999, fontWeight: 600 }}>
          {integCount} Integrations
        </span>
        <span style={{ fontSize: 12, background: '#FFF3E0', color: '#C77700', padding: '5px 12px', borderRadius: 999, fontWeight: 600 }}>
          {docCount} Documents
        </span>
        <span style={{ fontSize: 12, background: '#F3EEFF', color: '#8A38F5', padding: '5px 12px', borderRadius: 999, fontWeight: 600 }}>
          {profCount} Profile questions
        </span>
      </div>

      {/* Queue rows */}
      {resolved.map((item, i) => {
        const doneKey = `${persona}|${item.title}`;
        const isDone = !!qDone[doneKey];

        let iconBg = '#EEF2FF';
        let iconColor = '#1F4EDC';
        let iconText = '⇄';
        if (item.type === 'Document') { iconBg = '#FFF3E0'; iconColor = '#C77700'; iconText = '▤'; }
        if (item.type === 'Profile') { iconBg = '#F3EEFF'; iconColor = '#8A38F5'; iconText = '?'; }

        const [pillBg, pillColor] = typeColors[item.type] ?? ['#F5F5F7', '#666'];

        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--c-border)' }}>
            {/* Rank */}
            <span style={{ fontSize: 16, fontWeight: 700, color: '#1F4EDC', width: 28, flexShrink: 0, textAlign: 'right' as const }}>
              #{i + 1}
            </span>

            {/* Type icon */}
            <div style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, background: iconBg, color: iconColor, flexShrink: 0 }}>
              {iconText}
            </div>

            {/* Text col */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)' }}>{item.title}</span>
              <div style={{ marginTop: 2 }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, padding: '2px 6px', borderRadius: 4, display: 'inline-block', background: pillBg, color: pillColor }}>
                  {item.type}
                </span>
                <span style={{ fontSize: 12, color: 'var(--c-text3)', marginLeft: 6, display: 'inline' }}>{item.why}</span>
              </div>
              {item.unlocks && (
                <span style={{ fontSize: 11, color: '#0E7C5A', marginTop: 2, display: 'block' }}>
                  → Unlocks: {item.unlocks}
                </span>
              )}
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Action area */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {isDone ? (
                <span style={{ color: '#0E7C5A', fontSize: 13, fontWeight: 600 }}>✓ Done</span>
              ) : item.type === 'Integration' && view === 'client' ? (
                <button style={btnPrimary} onClick={() => openConnect('Integration', viaFromTitle(item.title), item.title, false)}>
                  Connect
                </button>
              ) : item.type === 'Integration' && view === 'advisor' ? (
                <button style={btnSecondary} onClick={() => openRequest({ title: item.title, type: 'Integration', why: item.why, via: viaFromTitle(item.title) })}>
                  Request
                </button>
              ) : item.type === 'Document' && view === 'client' ? (
                <button style={btnPrimary} onClick={() => openConnect('Document', viaFromTitle(item.title), item.title, false)}>
                  Upload
                </button>
              ) : item.type === 'Document' && view === 'advisor' ? (
                <>
                  <button style={btnPrimary} onClick={() => openConnect('Document', viaFromTitle(item.title), item.title, true)}>
                    Upload for client
                  </button>
                  <button style={btnSecondary} onClick={() => openRequest({ title: item.title, type: 'Document', why: item.why })}>
                    Request
                  </button>
                </>
              ) : item.type === 'Profile' && view === 'client' ? (
                <button style={btnPrimary} onClick={() => openQ(item.title, false)}>
                  Answer
                </button>
              ) : item.type === 'Profile' && view === 'advisor' ? (
                <>
                  <button style={btnPrimary} onClick={() => openQ(item.title, true)}>
                    Answer for client
                  </button>
                  <button style={btnSecondary} onClick={() => openRequest({ title: item.title, type: 'Profile', why: item.why })}>
                    Request
                  </button>
                </>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
