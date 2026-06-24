import { useAppStore } from '../../store/useAppStore';
import { PERSONAS } from '../../data/personas';
import { QUEUE_FULL } from '../../data/queue';
import type { Tab } from '../../types';

type NavKey = 'today' | 'guidance' | 'monitoring' | 'queue' | 'connected';

const clientNav: NavKey[] = ['today', 'guidance', 'monitoring', 'queue'];
const advisorNav: NavKey[] = ['today', 'guidance', 'monitoring', 'queue', 'connected'];

const navItems: Record<NavKey, { label: string; icon: string }> = {
  today: { label: 'Today', icon: '▦' },
  guidance: { label: 'Guidance', icon: '✦' },
  monitoring: { label: 'Monitoring', icon: '◎' },
  queue: { label: 'Data Queue', icon: '≡' },
  connected: { label: 'Data sources', icon: '◈' },
};

export function Sidebar() {
  const persona = useAppStore(s => s.persona);
  const tab = useAppStore(s => s.tab);
  const view = useAppStore(s => s.view);
  const setTab = useAppStore(s => s.setTab);

  const p = PERSONAS[persona];
  const queueCount = (QUEUE_FULL[persona] || []).length;
  const keys = view === 'advisor' ? advisorNav : clientNav;

  const viewLabel = view === 'client'
    ? 'Client'
    : (p.tier === 'Mass market' ? 'Banker' : 'Advisor');

  return (
    <div style={{
      width: 220,
      background: 'var(--c-side)',
      borderRight: '1px solid var(--c-border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 8px',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Avatar */}
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        background: p.avatar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 700,
        margin: '8px auto 6px',
      }}>{p.initials}</div>

      {/* Name */}
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text)', textAlign: 'center', marginBottom: 4 }}>
        {p.short}
      </div>

      {/* Tier chip */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <span style={{
          fontSize: 10,
          color: 'var(--c-text3)',
          background: 'var(--c-tint)',
          padding: '3px 9px',
          borderRadius: 999,
        }}>{p.tier}</span>
      </div>

      {/* Nav */}
      {keys.map(k => {
        const active = tab === k;
        const item = navItems[k];
        return (
          <div
            key={k}
            onClick={() => setTab(k as Tab)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 11px',
              borderRadius: 9,
              fontSize: 13,
              fontWeight: active ? 700 : 500,
              color: active ? 'var(--c-text)' : 'var(--c-text3)',
              background: active ? 'var(--c-card)' : 'transparent',
              border: active ? '1px solid var(--c-border)' : '1px solid transparent',
              boxShadow: active ? 'var(--c-shadow)' : 'none',
              cursor: 'pointer',
              marginBottom: 2,
              position: 'relative',
              minHeight: 44,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {/* Icon box with optional badge */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                flexShrink: 0,
                background: active ? 'var(--tint-blue-bg)' : 'var(--c-tint)',
                color: active ? 'var(--tint-blue-fg)' : 'var(--c-text4)',
              }}>{item.icon}</div>
              {k === 'queue' && queueCount > 0 && (
                <div style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: '#DC1F4E',
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>{queueCount}</div>
              )}
            </div>
            {item.label}
          </div>
        );
      })}

      {/* Bottom chip */}
      <div style={{ marginTop: 'auto', paddingTop: 12 }}>
        <div style={{
          background: 'var(--c-tint)',
          color: 'var(--c-text3)',
          fontSize: 11,
          padding: '5px 10px',
          borderRadius: 999,
          textAlign: 'center',
        }}>{viewLabel}</div>
      </div>
    </div>
  );
}
