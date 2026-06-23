import { useAppStore } from '../../store/useAppStore';

export function StandaloneBar() {
  const setTab = useAppStore(s => s.setTab);
  const openVault = useAppStore(s => s.openVault);

  return (
    <div style={{
      padding: '10px 18px',
      background: 'var(--c-card)',
      borderBottom: '1px solid var(--c-border)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        onClick={() => setTab('today')}
      >
        <div style={{
          width: 22,
          height: 22,
          background: 'linear-gradient(135deg,#1F4EDC,#8A38F5)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: 11,
        }}>M</div>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--c-text)' }}>Monstro</span>
      </div>

      <div style={{ flex: 1 }} />

      <button
        onClick={() => openVault()}
        style={{
          background: 'none',
          border: 'none',
          color: '#1F4EDC',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >Vault</button>
    </div>
  );
}
