import { useAppStore } from '../../store/useAppStore';

export function Toast() {
  const toast = useAppStore(s => s.toast);
  if (!toast) return null;
  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 300,
      background: '#0A0A0A',
      color: 'white',
      borderRadius: 999,
      padding: '10px 20px',
      fontSize: 13,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      animation: 'mfade 0.18s ease',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    }}>
      {toast}
    </div>
  );
}
