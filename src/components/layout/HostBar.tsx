import { useAppStore } from '../../store/useAppStore';
import { PERSONAS } from '../../data/personas';

export function HostBar() {
  const persona = useAppStore(s => s.persona);
  const setTab = useAppStore(s => s.setTab);
  const openVault = useAppStore(s => s.openVault);

  const p = PERSONAS[persona];

  let navItems: string[];
  if (p.hostKind === 'Mobile banking') {
    navItems = ['Accounts', 'Move money', 'Cards'];
  } else if (p.hostKind === 'Private bank') {
    navItems = ['Holdings', 'Reports', 'Contacts'];
  } else {
    navItems = ['Portfolio', 'Documents', 'Team'];
  }

  return (
    <div>
      {/* Bar 1 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '11px 18px',
        background: 'var(--c-host)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        alignItems: 'center',
        gap: 12,
      }}>
        {/* Left cluster */}
        <div
          style={{ display: 'flex', flexDirection: 'row', gap: 8, cursor: 'pointer', alignItems: 'center' }}
          onClick={() => setTab('today')}
        >
          <div style={{
            width: 26,
            height: 26,
            background: p.hostMarkBg,
            borderRadius: 7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 700,
            fontSize: 13,
          }}>{p.hostMark}</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)', lineHeight: 1.2 }}>{p.hostName}</span>
            <span style={{ fontSize: 11, color: 'var(--c-text3)', lineHeight: 1.2 }}>{p.hostKind}</span>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Nav items */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
          {navItems.map(item => (
            <span key={item} style={{ fontSize: 12, color: 'var(--c-text3)', cursor: 'default' }}>{item}</span>
          ))}
        </div>

        {/* Vault button */}
        <button
          onClick={() => openVault()}
          style={{
            border: '1px solid #1F4EDC',
            background: 'var(--c-bluetint)',
            color: '#1F4EDC',
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 999,
            padding: '6px 13px',
            cursor: 'pointer',
          }}
        >🔒 Vault</button>

        {/* Avatar */}
        <div style={{
          width: 30,
          height: 30,
          borderRadius: 999,
          background: 'rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--c-text3)',
        }}>{p.hostInitials}</div>
      </div>

      {/* Bar 2 */}
      <div style={{
        padding: '5px 18px',
        background: 'var(--c-bluetint)',
        borderBottom: '1px solid #E3E8FB',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{
          width: 15,
          height: 15,
          background: 'linear-gradient(135deg,#1F4EDC,#8A38F5)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 9,
          fontWeight: 700,
        }}>M</div>
        <span style={{ fontSize: 11, color: '#1F4EDC', fontWeight: 600 }}>
          Powered by Monstro — embedded in {p.hostName}
        </span>
      </div>
    </div>
  );
}
