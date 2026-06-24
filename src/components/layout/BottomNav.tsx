import { useAppStore } from '../../store/useAppStore';
import { QUEUE_FULL } from '../../data/queue';
import type { Tab } from '../../types';

type NavKey = 'today' | 'guidance' | 'monitoring' | 'queue' | 'connected';

const items: { key: NavKey; label: string; icon: string }[] = [
  { key: 'today',      label: 'Today',      icon: '▦' },
  { key: 'guidance',   label: 'Guidance',   icon: '✦' },
  { key: 'monitoring', label: 'Monitor',    icon: '◎' },
  { key: 'queue',      label: 'Queue',      icon: '≡' },
  { key: 'connected',  label: 'Sources',    icon: '◈' },
];

export function BottomNav() {
  const persona  = useAppStore(s => s.persona);
  const tab      = useAppStore(s => s.tab);
  const view     = useAppStore(s => s.view);
  const setTab   = useAppStore(s => s.setTab);
  const queueCount = (QUEUE_FULL[persona] || []).length;

  const visibleItems = view === 'advisor' ? items : items.filter(i => i.key !== 'connected');

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'var(--c-card)',
      borderTop: '1px solid var(--c-border)',
      display: 'flex',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {visibleItems.map(item => {
        const active = tab === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setTab(item.key as Tab)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              padding: '10px 4px',
              minHeight: 56,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: active ? '#1F4EDC' : 'var(--c-text3)',
              position: 'relative',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div style={{
              fontSize: 18,
              lineHeight: 1,
              position: 'relative',
            }}>
              {item.icon}
              {item.key === 'queue' && queueCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -5,
                  right: -8,
                  background: '#DC1F4E',
                  color: 'white',
                  fontSize: 9,
                  fontWeight: 700,
                  borderRadius: 999,
                  padding: '1px 4px',
                  lineHeight: 1.4,
                }}>{queueCount}</span>
              )}
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{item.label}</span>
            {active && (
              <div style={{
                position: 'absolute',
                top: 0, left: '20%', right: '20%',
                height: 2,
                borderRadius: 1,
                background: '#1F4EDC',
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
