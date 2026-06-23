import { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { GUIDANCE } from '../../data/guidance';

const overlay = { position: 'fixed' as const, inset: 0, background: 'var(--c-scrim)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 };
const card = (maxW: number) => ({ background: '#1C1B1F', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });

export function VideoPlayerModal() {
  const { videoId, vplay, vprog, closeVideo, setVProg, setVPlay } = useAppStore();

  useEffect(() => {
    if (!vplay) return;
    const id = setInterval(() => {
      const cur = useAppStore.getState().vprog;
      if (cur >= 100) { useAppStore.getState().setVPlay(false); return; }
      useAppStore.getState().setVProg(Math.min(cur + 1.2, 100));
    }, 90);
    return () => clearInterval(id);
  }, [vplay]);

  if (!videoId) return null;

  const guidance = GUIDANCE[videoId];

  return (
    <div style={overlay}>
      <div style={card(520)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 12, textTransform: 'uppercase' as const, color: '#9D9D9D', letterSpacing: '.06em' }}>
            Video Briefing
          </span>
          <button
            style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#9D9D9D', lineHeight: 1, padding: '4px 8px' }}
            onClick={closeVideo}
          >
            ×
          </button>
        </div>

        {/* Poster area */}
        <div
          style={{
            width: '100%',
            height: 180,
            borderRadius: 12,
            position: 'relative',
            cursor: 'pointer',
            marginBottom: 16,
            overflow: 'hidden',
            background: 'linear-gradient(135deg,#1F2A4A,#1F4EDC)',
          }}
          onClick={() => setVPlay(!vplay)}
        >
          {/* Play/pause button */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 64,
            height: 64,
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            color: 'white',
          }}>
            {vplay
              ? '⏸'
              : <span style={{ marginLeft: 4 }}>▶</span>
            }
          </div>

          {/* Duration label */}
          <div style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            color: 'rgba(255,255,255,0.7)',
            fontSize: 11,
            background: 'rgba(0,0,0,0.5)',
            padding: '2px 8px',
            borderRadius: 4,
          }}>
            {guidance?.vid || '—'}
          </div>

          {/* Domain badge */}
          {guidance && (
            <div style={{
              position: 'absolute',
              top: 10,
              left: 10,
              fontSize: 10,
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(0,0,0,0.4)',
              padding: '2px 8px',
              borderRadius: 4,
            }}>
              {guidance.domain} briefing
            </div>
          )}
        </div>

        {/* Title & domain */}
        {guidance && (
          <>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4 }}>{guidance.headline}</p>
            <p style={{ fontSize: 11, color: '#9D9D9D', marginBottom: 16, textTransform: 'uppercase' as const, letterSpacing: '.06em' }}>
              {guidance.domain}
            </p>
          </>
        )}

        {/* Progress slider */}
        <input
          type="range"
          min={0}
          max={100}
          value={vprog}
          onChange={e => setVProg(Number(e.target.value))}
          style={{ width: '100%', marginBottom: 8, accentColor: '#1F4EDC', cursor: 'pointer' }}
        />

        {/* Row: watched % + close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#9D9D9D' }}>{Math.round(vprog)}% watched</span>
          <button
            style={{ background: 'none', border: '1px solid #333', color: '#9D9D9D', borderRadius: 999, padding: '7px 16px', fontSize: 12, cursor: 'pointer' }}
            onClick={closeVideo}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
