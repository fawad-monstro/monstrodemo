import { useAppStore } from '../../store/useAppStore';
import { PERSONAS } from '../../data/personas';

export function MonitoringScreen() {
  const { persona, openMon } = useAppStore();
  const p = PERSONAS[persona];

  return (
    <div style={{ padding: '26px 30px', animation: 'mfade 0.18s ease' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--c-text)', marginBottom: 4 }}>Monitoring</h2>
      <p style={{ fontSize: 14, color: 'var(--c-text3)', marginBottom: 24 }}>
        Monstro watches your finances 24/7 and surfaces changes worth acting on.
      </p>

      {p.monitoring.map(([domain, text, status], i) => {
        const isActionable = status !== 'ok';

        let dotBg = '#0E7C5A';
        if (status === 'watch') dotBg = '#C77700';
        if (status === 'flag') dotBg = '#DC1F4E';

        let pillBg = 'var(--tint-green-bg)';
        let pillColor = 'var(--tint-green-fg)';
        if (status === 'watch') { pillBg = 'var(--tint-amber-bg)'; pillColor = 'var(--tint-amber-fg)'; }
        if (status === 'flag') { pillBg = 'var(--tint-red-bg)'; pillColor = 'var(--tint-red-fg)'; }

        return (
          <div
            key={i}
            style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--c-border)', cursor: isActionable ? 'pointer' : 'default', alignItems: 'flex-start' }}
            onClick={isActionable ? () => openMon(domain, text, status as 'watch' | 'flag' | 'ok') : undefined}
          >
            {/* Status dot */}
            <div style={{ width: 9, height: 9, borderRadius: 999, background: dotBg, marginTop: 6, flexShrink: 0 }} />

            {/* Text column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--c-text3)' }}>{domain}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)' }}>{text}</span>
            </div>

            {/* Status pill */}
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', padding: '3px 8px', borderRadius: 999, background: pillBg, color: pillColor, whiteSpace: 'nowrap' }}>
              {status}
            </span>

            {/* Chevron if actionable */}
            {isActionable && (
              <span style={{ fontSize: 20, color: 'var(--c-text3)' }}>›</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
