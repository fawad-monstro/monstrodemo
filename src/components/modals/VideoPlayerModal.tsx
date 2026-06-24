import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { GUIDANCE } from '../../data/guidance';

const LS_KEY = (id: string) => `mev_${id}`;

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, background: 'var(--c-scrim)', zIndex: 200,
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
  animation: 'mfade 0.18s ease',
};

export function VideoPlayerModal() {
  const { videoId, closeVideo } = useAppStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(0);          // 0–100
  const [duration, setDuration] = useState(0);   // seconds
  const fakeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const guidance = videoId ? GUIDANCE[videoId] : null;

  // Restore progress from localStorage on open
  useEffect(() => {
    if (!videoId) return;
    const saved = Number(localStorage.getItem(LS_KEY(videoId)) || 0);
    setProg(saved);
    setPlaying(false);
    setHasVideo(false);
  }, [videoId]);

  // Persist progress to localStorage on change
  useEffect(() => {
    if (videoId) localStorage.setItem(LS_KEY(videoId), String(prog));
  }, [prog, videoId]);

  // Fake timer for placeholder mode (no actual video file yet)
  useEffect(() => {
    if (hasVideo) return;
    if (!playing) { if (fakeTimer.current) { clearInterval(fakeTimer.current); fakeTimer.current = null; } return; }
    fakeTimer.current = setInterval(() => {
      setProg(p => {
        if (p >= 100) { setPlaying(false); return 100; }
        return Math.min(p + 1.2, 100);
      });
    }, 90);
    return () => { if (fakeTimer.current) clearInterval(fakeTimer.current); };
  }, [playing, hasVideo]);

  // Sync real <video> element when prog changes via scrubber
  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setProg(v);
    if (videoRef.current && duration > 0) {
      videoRef.current.currentTime = (v / 100) * duration;
    }
  };

  // Real video event handlers
  const onLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      // Seek to saved position
      const saved = Number(localStorage.getItem(LS_KEY(videoId!)) || 0);
      if (saved > 0) videoRef.current.currentTime = (saved / 100) * videoRef.current.duration;
    }
  };
  const onTimeUpdate = () => {
    if (videoRef.current && duration > 0) {
      setProg((videoRef.current.currentTime / duration) * 100);
    }
  };
  const onEnded = () => setPlaying(false);

  const togglePlay = () => {
    if (hasVideo && videoRef.current) {
      if (playing) { videoRef.current.pause(); setPlaying(false); }
      else { videoRef.current.play(); setPlaying(true); }
    } else {
      setPlaying(p => !p);
    }
  };

  const formatTime = (pct: number) => {
    if (!guidance) return '0:00';
    const parts = (guidance.vid || '1:00').split(':').map(Number);
    const total = parts[0] * 60 + (parts[1] || 0);
    const cur = Math.round((pct / 100) * total);
    return `${Math.floor(cur / 60)}:${String(cur % 60).padStart(2, '0')}`;
  };

  if (!videoId) return null;

  const videoSrc = `/videos/${videoId}.mp4`;

  return (
    <div style={overlay} onClick={closeVideo}>
      <div
        style={{ background: '#1C1B1F', borderRadius: 20, padding: 28, width: '100%', maxWidth: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.4)', animation: 'mpop 0.25s ease' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#9D9D9D', letterSpacing: '.06em' }}>
            Video Briefing
          </span>
          <button style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#9D9D9D', lineHeight: 1, padding: '4px 8px' }} onClick={closeVideo}>×</button>
        </div>

        {/* Video area */}
        <div
          style={{ width: '100%', height: 200, borderRadius: 12, position: 'relative', cursor: 'pointer', marginBottom: 16, overflow: 'hidden', background: 'linear-gradient(135deg,#1F2A4A,#1F4EDC)' }}
          onClick={togglePlay}
        >
          {/* Real video element — hidden until file confirmed loadable */}
          <video
            ref={videoRef}
            src={videoSrc}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: hasVideo ? 'block' : 'none' }}
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
            onEnded={onEnded}
            onCanPlay={() => setHasVideo(true)}
            onError={() => setHasVideo(false)}
            playsInline
          />

          {/* Play/pause overlay — always shown */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 64, height: 64, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', pointerEvents: 'none' }}>
            {playing ? '⏸' : <span style={{ marginLeft: 4 }}>▶</span>}
          </div>

          {/* Domain badge */}
          {guidance && (
            <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 10, color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: 4 }}>
              {guidance.domain} briefing
            </div>
          )}

          {/* Duration */}
          <div style={{ position: 'absolute', bottom: 10, right: 10, color: 'rgba(255,255,255,0.7)', fontSize: 11, background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: 4 }}>
            {guidance?.vid || '—'}
          </div>
        </div>

        {/* Title */}
        {guidance && (
          <>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4 }}>{guidance.headline}</p>
            <p style={{ fontSize: 11, color: '#9D9D9D', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em' }}>{guidance.domain}</p>
          </>
        )}

        {/* Progress */}
        <input type="range" min={0} max={100} value={prog} onChange={onScrub} style={{ width: '100%', marginBottom: 6, accentColor: '#1F4EDC', cursor: 'pointer' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#9D9D9D', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(prog)} / {guidance?.vid || '—'}
          </span>
          <button style={{ background: 'none', border: '1px solid #333', color: '#9D9D9D', borderRadius: 999, padding: '7px 16px', fontSize: 12, cursor: 'pointer' }} onClick={closeVideo}>
            Close
          </button>
        </div>

        {/* Placeholder note — shown when no real file is found */}
        {!hasVideo && (
          <p style={{ fontSize: 11, color: '#555', marginTop: 12, textAlign: 'center' }}>
            Drop <code style={{ fontFamily: 'monospace', fontSize: 10 }}>/videos/{videoId}.mp4</code> to enable playback
          </p>
        )}
      </div>
    </div>
  );
}
