import { useAppStore } from '../../store/useAppStore';
import { QPACKS } from '../../data/qpacks';

const overlay = { position: 'fixed' as const, inset: 0, background: 'var(--c-scrim)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 };
const card = (maxW: number) => ({ background: 'var(--c-card)', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });
const closeBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--c-text3)', lineHeight: 1, padding: '4px 8px' };

const btnPrimary = { background: '#1F4EDC', color: 'white', border: 'none', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };
const btnSecondary = { background: 'var(--c-card)', color: 'var(--c-text)', border: '1px solid var(--c-border)', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };

export function QuestionPackModal() {
  const { qmodal, persona, qans, closeQ, setQ, submitQ } = useAppStore();

  if (!qmodal) return null;

  const pack = QPACKS[qmodal.key];
  if (!pack) return null;

  const ansKey = `${persona}|${qmodal.key}`;
  const answers = qans[ansKey] || {};

  const visibleQs = pack.qs.filter(q => q.depends ? answers[q.depends.id] === q.depends.eq : true);
  const allAnswered = visibleQs.every(q => !!answers[q.id]);

  return (
    <div style={overlay}>
      <div style={card(480)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)' }}>{pack.title}</span>
            {qmodal.onBehalf && (
              <span style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--c-text3)', marginLeft: 6 }}>(on behalf of client)</span>
            )}
          </div>
          <button style={closeBtn} onClick={closeQ}>×</button>
        </div>

        {/* Questions */}
        {visibleQs.map(q => (
          <div key={q.id} style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)', marginBottom: 10 }}>{q.q}</p>

            {q.type === 'yesno' && (
              <div>
                {['Yes', 'No'].map(opt => (
                  <button
                    key={opt}
                    style={{
                      border: '1px solid var(--c-border)',
                      borderRadius: 999,
                      padding: '8px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginRight: 8,
                      background: answers[q.id] === opt ? '#1F4EDC' : 'var(--c-card)',
                      color: answers[q.id] === opt ? 'white' : 'var(--c-text)',
                    }}
                    onClick={() => setQ(q.id, opt, ansKey)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {q.type === 'choice' && q.options && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {q.options.map(opt => (
                  <button
                    key={opt}
                    style={{
                      border: '1px solid var(--c-border)',
                      borderRadius: 999,
                      padding: '8px 20px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: answers[q.id] === opt ? '#1F4EDC' : 'var(--c-card)',
                      color: answers[q.id] === opt ? 'white' : 'var(--c-text)',
                    }}
                    onClick={() => setQ(q.id, opt, ansKey)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {(q.type === 'text' || q.type === 'number') && (
              <input
                type={q.type}
                value={answers[q.id] || ''}
                onChange={e => setQ(q.id, e.target.value, ansKey)}
                style={{ width: '100%', border: '1px solid var(--c-inputbd)', borderRadius: 10, padding: '10px 14px', fontSize: 13, fontFamily: 'inherit', background: 'var(--c-card)', color: 'var(--c-text)' }}
              />
            )}
          </div>
        ))}

        {/* Footer */}
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button style={btnSecondary} onClick={closeQ}>Cancel</button>
          <button
            style={{ ...btnPrimary, opacity: allAnswered ? 1 : 0.5 }}
            disabled={!allAnswered}
            onClick={submitQ}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
