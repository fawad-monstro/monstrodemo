import type React from 'react';

// On phones, modals slide up as a bottom sheet. On larger screens they float centered.
export function overlayStyle(): React.CSSProperties {
  return {
    position: 'fixed',
    inset: 0,
    background: 'var(--c-scrim)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'flex-end',  // bottom-sheet anchor on mobile
    justifyContent: 'center',
    padding: 0,
    animation: 'mfade 0.18s ease',
  };
}

export function cardStyle(maxW = 480): React.CSSProperties {
  return {
    background: 'var(--c-card)',
    borderRadius: '20px 20px 0 0',   // rounded top only (bottom sheet)
    padding: '20px 20px calc(20px + env(safe-area-inset-bottom))',
    width: '100%',
    maxWidth: maxW,
    boxShadow: '0 -4px 30px rgba(0,0,0,0.15)',
    maxHeight: '90vh',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch' as unknown as undefined,
    animation: 'mpop 0.25s ease',
  } as React.CSSProperties;
}

// Pill handle for bottom sheets
export const SHEET_HANDLE = (
  `<div style="width:36px;height:4px;background:var(--c-border2);borderRadius:2px;margin:0 auto 16px"></div>`
);
