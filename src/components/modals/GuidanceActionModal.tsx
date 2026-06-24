import { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { GUIDANCE, ACT_STEPS } from '../../data/guidance';
import { PERSONAS } from '../../data/personas';

import { overlayStyle } from './shared';
const overlay = overlayStyle();
const card = (maxW: number) => ({ background: 'var(--c-card)', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });
const closeBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--c-text3)', lineHeight: 1, padding: '4px 8px' };

const btnPrimary = { background: '#1F4EDC', color: 'white', border: 'none', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };
const btnSecondary = { background: 'var(--c-card)', color: 'var(--c-text)', border: '1px solid var(--c-border)', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };

export function GuidanceActionModal() {
  const {
    actModal,
    actMode,
    actStep,
    actMsg,
    persona,
    closeAct,
    actSelf,
    actToMsg,
    actNext,
    setActMsg,
    toastMsg,
  } = useAppStore();

  const guidance = actModal ? GUIDANCE[actModal] : null;
  const isMass = PERSONAS[persona].tier === 'Mass market';

  useEffect(() => {
    if (actModal && guidance && isMass && actMode === 'choose') {
      actSelf();
    }
  }, [actModal, guidance, isMass, actMode, actSelf]);

  if (!actModal) return null;
  if (!guidance) return null;

  const steps = ACT_STEPS[guidance.domain] || ACT_STEPS['Cash flow'];

  return (
    <div style={overlay}>
      <div style={card(460)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginRight: 12 }}>
            <span style={{ fontSize: 11, textTransform: 'uppercase' as const, color: 'var(--c-text3)', letterSpacing: '.06em' }}>
              {guidance.domain}
            </span>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {guidance.headline}
            </span>
          </div>
          <button style={closeBtn} onClick={closeAct}>×</button>
        </div>

        {/* Choose mode */}
        {actMode === 'choose' && (
          <>
            <p style={{ fontSize: 14, color: 'var(--c-text3)', marginBottom: 16 }}>How would you like to proceed?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Do this myself */}
              <div
                style={{ border: '1px solid var(--c-border)', borderRadius: 16, padding: 20, cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center', background: 'var(--c-card)' }}
                onClick={actSelf}
              >
                <div style={{ width: 36, height: 36, background: '#EEF2FF', color: '#1F4EDC', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  ⚡
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)' }}>Do this myself</span>
                  <span style={{ fontSize: 12, color: 'var(--c-text3)' }}>Step by step — takes 2 minutes</span>
                </div>
              </div>

              {/* Message advisor */}
              <div
                style={{ border: '1px solid var(--c-border)', borderRadius: 16, padding: 20, cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center', background: 'var(--c-card)' }}
                onClick={actToMsg}
              >
                <div style={{ width: 36, height: 36, background: '#F3EEFF', color: '#8A38F5', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  ✉
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)' }}>Message my advisor</span>
                  <span style={{ fontSize: 12, color: 'var(--c-text3)' }}>Jordan will handle it for you</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Steps mode */}
        {actMode === 'steps' && (
          <div style={{ marginBottom: 20 }}>
            {steps.map(([title, desc], i) => {
              const isCurrentStep = i === actStep;
              const isDone = i < actStep;

              let circleBg = '#ECECEC';
              let circleColor = '#9D9D9D';
              let circleText = String(i + 1);
              if (isDone) { circleBg = '#0E7C5A'; circleColor = 'white'; circleText = '✓'; }
              else if (isCurrentStep) { circleBg = '#1F4EDC'; circleColor = 'white'; }

              return (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--c-border)', opacity: isDone || isCurrentStep ? 1 : 0.4 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, background: circleBg, color: circleColor }}>
                    {circleText}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{title}</span>
                    <span style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 2 }}>{desc}</span>
                    {isCurrentStep && i < steps.length - 1 && (
                      <button
                        style={{ marginTop: 8, ...btnPrimary, padding: '7px 16px', fontSize: 12 }}
                        onClick={() => actNext(steps.length)}
                      >
                        Continue
                      </button>
                    )}
                    {isCurrentStep && i === steps.length - 1 && (
                      <button
                        style={{ marginTop: 8, ...btnPrimary, background: '#0E7C5A', padding: '7px 16px', fontSize: 12 }}
                        onClick={() => actNext(steps.length)}
                      >
                        Confirm ✓
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Message mode */}
        {actMode === 'message' && (
          <>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)', marginBottom: 12 }}>Message your advisor</p>
            <textarea
              value={actMsg}
              onChange={e => setActMsg(e.target.value)}
              style={{
                width: '100%',
                minHeight: 160,
                borderRadius: 10,
                border: '1px solid var(--c-inputbd)',
                padding: '12px 14px',
                fontSize: 13,
                fontFamily: 'inherit',
                lineHeight: 1.6,
                background: 'var(--c-card)',
                color: 'var(--c-text)',
                resize: 'vertical' as const,
              }}
            />
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button style={btnSecondary} onClick={closeAct}>Cancel</button>
              <button
                style={btnPrimary}
                onClick={() => { closeAct(); toastMsg('Message sent to your advisor'); }}
              >
                Send message →
              </button>
            </div>
          </>
        )}

        {/* Done mode */}
        {actMode === 'done' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 56, height: 56, background: '#E8F7EC', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 16px', color: '#0E7C5A' }}>
              ✓
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>
              Done — Monstro will update your guidance.
            </p>
            <p style={{ fontSize: 13, color: 'var(--c-text3)', marginBottom: 24 }}>
              Your next steps will reflect this action.
            </p>
            <button style={btnPrimary} onClick={closeAct}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
