import { useAppStore } from '../../store/useAppStore';
import { PERSONAS } from '../../data/personas';
import { MARKET_SOURCES, USER_SOURCES } from '../../data/sources';

export function DataSourcesScreen() {
  const { view, persona, openSource } = useAppStore();

  if (view === 'client') {
    return (
      <div style={{ padding: '60px 30px', textAlign: 'center', color: 'var(--c-text3)', fontSize: 14 }}>
        This view is available for advisors.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '26px 30px', animation: 'mfade 0.18s ease' }}>

      {/* Section 1 — Market data feeds */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--c-text)', marginBottom: 4 }}>Market data feeds</h2>
        <p style={{ fontSize: 14, color: 'var(--c-text3)', marginBottom: 16 }}>
          Always-on market data powering Monstro guidance.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 12 }}>
          {MARKET_SOURCES.map(([name, desc, fields]) => (
            <div
              key={name}
              style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 16, cursor: 'pointer' }}
              onClick={() => openSource(name, desc, fields, 'Connected', 'market')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)' }}>{name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0E7C5A' }} />
                  <span style={{ fontSize: 10, color: '#0E7C5A', fontWeight: 600 }}>Connected</span>
                </div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--c-text3)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 — Client-linked sources */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--c-text)', marginBottom: 4 }}>Client-linked sources</h2>
        <p style={{ fontSize: 14, color: 'var(--c-text3)', marginBottom: 16 }}>
          Connections established by the client to share their personal financial data.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 12 }}>
          {USER_SOURCES.map(([name, desc, fields]) => {
            const isConnected = !!PERSONAS[persona].sources[name];
            return (
              <div
                key={name}
                style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', borderRadius: 12, padding: 16, cursor: 'pointer' }}
                onClick={() => openSource(name, desc, fields, isConnected ? 'Connected' : 'Not linked', 'user')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)' }}>{name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: isConnected ? '#0E7C5A' : '#9D9D9D' }} />
                    <span style={{ fontSize: 10, color: isConnected ? '#0E7C5A' : '#9D9D9D', fontWeight: 600 }}>
                      {isConnected ? 'Connected' : 'Not linked'}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'var(--c-text3)' }}>{desc}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
