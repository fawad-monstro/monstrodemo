import { useAppStore } from '../../store/useAppStore';

import { overlayStyle } from './shared';
const overlay = overlayStyle();
const card = (maxW: number) => ({ background: 'var(--c-card)', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });
const closeBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--c-text3)', lineHeight: 1, padding: '4px 8px' };

export function NewsArticleModal() {
  const { article, closeArticle } = useAppStore();

  if (!article) return null;

  return (
    <div style={overlay}>
      <div style={card(560)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ background: 'var(--tint-violet-bg)', color: 'var(--tint-violet-fg)', fontSize: 10, padding: '3px 8px', borderRadius: 999, fontWeight: 600 }}>
            {article.tag}
          </span>
          <button style={closeBtn} onClick={closeArticle}>×</button>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--c-text)', marginBottom: 8, lineHeight: 1.3 }}>
          {article.title}
        </h2>
        <p style={{ fontSize: 12, color: 'var(--c-text3)', marginBottom: 20 }}>
          {article.src} · {article.when}
        </p>

        {/* Body paragraphs */}
        {article.body.map((para, i) => (
          <p key={i} style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--c-text)', marginBottom: 16 }}>{para}</p>
        ))}

        {/* Footer callout */}
        <div style={{ background: 'var(--c-bluetint)', borderRadius: 12, padding: 16, marginTop: 4 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.06em', color: 'var(--c-text3)', marginBottom: 6 }}>
            Why Monstro surfaced this
          </p>
          <p style={{ fontSize: 13, color: 'var(--c-text)', lineHeight: 1.6 }}>{article.why}</p>
        </div>
      </div>
    </div>
  );
}
