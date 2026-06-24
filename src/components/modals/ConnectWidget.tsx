import { useAppStore } from '../../store/useAppStore';

import { overlayStyle } from './shared';
const overlay = overlayStyle();
const card = (maxW: number) => ({ background: 'var(--c-card)', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });
const closeBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--c-text3)', lineHeight: 1, padding: '4px 8px' };

export function ConnectWidget() {
  const { connect, connectStep, closeConnect, connectNext, finishConnect } = useAppStore();

  if (!connect) return null;

  const brand = connect.via;
  const accentColor =
    brand === 'Plaid' ? '#1F4EDC' :
    brand === 'Canopy' ? '#0E7C5A' :
    brand === 'Attom' ? '#C77700' :
    brand === 'Coinbase' ? '#0052FF' :
    '#1F4EDC';

  const isDoc = connect.kind === 'Document';
  const isInteg = connect.kind === 'Integration';

  return (
    <div style={overlay}>
      <div style={card(440)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, background: accentColor, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>
              {brand[0]}
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--c-text)' }}>{connect.title}</span>
          </div>
          <button style={closeBtn} onClick={closeConnect}>×</button>
        </div>

        {/* Step 0 */}
        {connectStep === 0 && (
          <>
            <p style={{ fontSize: 14, color: 'var(--c-text3)', marginBottom: 20 }}>
              {isDoc ? 'Upload your document securely.' : `Connect via ${brand} — read-only, encrypted.`}
            </p>
            {connect.onBehalf && (
              <p style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--c-text3)', marginBottom: 16 }}>
                Acting on behalf of client.
              </p>
            )}
            <button
              style={{ background: accentColor, color: 'white', border: 'none', width: '100%', borderRadius: 12, padding: 14, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              onClick={connectNext}
            >
              {isDoc ? 'Choose file →' : `Connect with ${brand} →`}
            </button>
          </>
        )}

        {/* Step 1 */}
        {connectStep === 1 && (
          <>
            {isDoc && (
              <>
                <div style={{ border: '2px dashed var(--c-inputbd)', borderRadius: 12, padding: 40, textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 32 }}>📎</div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)', marginTop: 8 }}>Drop your file here</p>
                  <p style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 4 }}>(PDF, JPG, PNG — up to 20 MB)</p>
                </div>
                <button
                  style={{ background: accentColor, color: 'white', border: 'none', width: '100%', borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
                  onClick={connectNext}
                >
                  Choose file
                </button>
              </>
            )}

            {isInteg && (brand === 'Plaid' || brand === 'Coinbase') && (
              <>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text3)', marginBottom: 12 }}>Select your institution:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(brand === 'Plaid'
                    ? ['Chase', 'Bank of America', 'Wells Fargo', 'Fidelity']
                    : ['Coinbase', 'Coinbase Pro', 'Gemini', 'Kraken']
                  ).map(inst => (
                    <button
                      key={inst}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--c-border)', borderRadius: 10, padding: '11px 13px', cursor: 'pointer', background: 'var(--c-card)' }}
                      onClick={connectNext}
                    >
                      <div style={{ width: 28, height: 28, background: accentColor + '22', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentColor, fontWeight: 700, flexShrink: 0 }}>
                        {inst[0]}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{inst}</span>
                      <span style={{ marginLeft: 'auto', color: 'var(--c-text3)' }}>→</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {isInteg && brand !== 'Plaid' && brand !== 'Coinbase' && (
              <>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>
                  Authorize {brand}
                </p>
                <p style={{ fontSize: 13, color: 'var(--c-text3)', marginBottom: 20 }}>
                  Grant read-only access to retrieve your data securely.
                </p>
                <button
                  style={{ background: accentColor, color: 'white', border: 'none', width: '100%', borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
                  onClick={connectNext}
                >
                  Connect {brand} →
                </button>
              </>
            )}
          </>
        )}

        {/* Step 2 */}
        {connectStep === 2 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, background: accentColor, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24, margin: '0 auto 16px' }}>
              ✓
            </div>
            <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--c-text)', marginBottom: 8 }}>
              {isDoc ? 'Document received!' : `Connected via ${brand}!`}
            </p>
            <p style={{ fontSize: 14, color: 'var(--c-text3)', marginBottom: 24 }}>
              {isDoc
                ? 'Monstro is reading it — guidance will update.'
                : 'Monstro is syncing your data — guidance will update shortly.'}
            </p>
            <button
              style={{ background: accentColor, color: 'white', border: 'none', borderRadius: 999, padding: '9px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              onClick={finishConnect}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
