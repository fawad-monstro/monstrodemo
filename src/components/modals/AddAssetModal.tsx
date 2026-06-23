import { useAppStore } from '../../store/useAppStore';
import { VIN_SAMPLES, ATTOM_SAMPLES } from '../../data/vault';
import { addHash } from '../../utils';
import type { AddAssetData } from '../../types';

const overlay = { position: 'fixed' as const, inset: 0, background: 'var(--c-scrim)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 };
const card = (maxW: number) => ({ background: 'var(--c-card)', borderRadius: 20, padding: 28, width: '100%', maxWidth: maxW, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', overflowY: 'auto' as const });
const closeBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--c-text3)', lineHeight: 1, padding: '4px 8px' };

const btnPrimary = { background: '#1F4EDC', color: 'white', border: 'none', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };
const btnBlack = { background: '#0A0A0A', color: 'white', border: 'none', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 600 as const, cursor: 'pointer' };

const catOptions = [
  { key: 're', label: 'Real estate', icon: '🏠', desc: 'Home, rental, commercial' },
  { key: 'auto', label: 'Vehicle', icon: '🚗', desc: 'Car, truck, boat, RV' },
  { key: 'art', label: 'Art & valuables', icon: '🖼', desc: 'Art, jewelry, watches, wine' },
  { key: 'biz', label: 'Business interest', icon: '🏢', desc: 'Ownership stake, practice' },
  { key: 'other', label: 'Other asset', icon: '📦', desc: 'Anything else' },
];

export function AddAssetModal() {
  const {
    addOpen,
    addStep,
    addCat,
    addName,
    addValue,
    addVIN,
    addAddr,
    addBasis,
    addPct,
    addData,
    addLooking,
    persona,
    closeAdd,
    pickAddCat,
    addBackCat,
    setAddField,
    setAddBasis,
    setAddData,
    setAddLooking,
    submitAdd,
  } = useAppStore();

  if (!addOpen) return null;

  const inputStyle = {
    width: '100%',
    border: '1px solid var(--c-inputbd)',
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 13,
    fontFamily: 'inherit',
    background: 'var(--c-card)',
    color: 'var(--c-text)',
  };
  const labelStyle = {
    fontSize: 12,
    fontWeight: 600 as const,
    color: 'var(--c-text3)' as const,
    marginBottom: 4,
    display: 'block' as const,
  };

  const catMap: Record<string, string> = { re: 're', auto: 'personal', art: 'personal', biz: 'biz', other: 'personal' };
  const canSubmit = !!addName && !!addValue;

  const headerTitle = addStep === 0
    ? 'Add asset to Vault'
    : (catOptions.find(c => c.key === addCat)?.label || 'Add asset');

  return (
    <div style={overlay}>
      <div style={card(480)}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-text)' }}>{headerTitle}</span>
          <button style={closeBtn} onClick={closeAdd}>×</button>
        </div>

        {/* Step 0 — category picker */}
        {addStep === 0 && (
          <>
            <p style={{ fontSize: 13, color: 'var(--c-text3)', marginBottom: 16 }}>What type of asset?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {catOptions.map(opt => (
                <div
                  key={opt.key}
                  style={{ border: '1px solid var(--c-border)', borderRadius: 12, padding: 16, cursor: 'pointer', textAlign: 'center', background: 'var(--c-card)' }}
                  onClick={() => pickAddCat(opt.key)}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{opt.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)', marginBottom: 2 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--c-text3)' }}>{opt.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 1 — details */}
        {addStep === 1 && (
          <>
            {/* Back link */}
            <button
              style={{ background: 'none', border: 'none', color: '#1F4EDC', fontSize: 13, cursor: 'pointer', marginBottom: 16, padding: 0 }}
              onClick={addBackCat}
            >
              ← Back
            </button>

            {/* Real estate */}
            {addCat === 're' && (
              <>
                <label style={labelStyle}>Property address</label>
                <input
                  value={addAddr}
                  onChange={e => setAddField('addAddr', e.target.value)}
                  placeholder="123 Main St, City, State"
                  style={inputStyle}
                />
                <button
                  onClick={() => {
                    setAddLooking(true);
                    setTimeout(() => {
                      const idx = addHash(addAddr) % ATTOM_SAMPLES.length;
                      const [ptype, beds, baths, sqft, year_built, value, tax] = ATTOM_SAMPLES[idx];
                      const rows: [string, string][] = [
                        ['Property type', ptype],
                        ['Beds / baths', `${beds} bd · ${baths} ba`],
                        ['Living area', `${sqft.toLocaleString()} sq ft`],
                        ['Year built', String(year_built)],
                        ['Attom AVM', '$' + value.toLocaleString()],
                        ['Property tax', '$' + tax.toLocaleString() + ' / yr'],
                        ['Address', addAddr || '(entered above)'],
                      ];
                      const d: AddAssetData = { kind: 're', provider: 'Attom', rows, value, ptype, beds, baths, sqft, year_built, tax };
                      setAddData(d, addAddr.split(',')[0] || 'Property', String(value));
                    }, 1100);
                  }}
                  disabled={!addAddr || addLooking}
                  style={{ ...btnPrimary, marginTop: 10, marginBottom: 16, width: '100%', opacity: !addAddr || addLooking ? 0.6 : 1, borderRadius: 10, padding: '10px 0', fontSize: 13 }}
                >
                  {addLooking ? 'Looking up...' : 'Look up address →'}
                </button>
                {addData?.kind === 're' && (
                  <div style={{ border: '1px solid var(--c-border)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
                    {addData.rows.map(([k, v], i) => (
                      <div
                        key={i}
                        style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', background: i % 2 === 0 ? 'var(--c-card)' : 'var(--c-tint)', borderBottom: i < addData.rows.length - 1 ? '1px solid var(--c-border)' : 'none' }}
                      >
                        <span style={{ fontSize: 12, color: 'var(--c-text3)' }}>{k}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-text)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Vehicle */}
            {addCat === 'auto' && (
              <>
                <label style={labelStyle}>VIN (Vehicle Identification Number)</label>
                <input
                  value={addVIN}
                  onChange={e => setAddField('addVIN', e.target.value.slice(0, 17).toUpperCase())}
                  placeholder="1HGBH41JXMN109186"
                  maxLength={17}
                  style={inputStyle}
                />
                <button
                  onClick={() => {
                    setAddLooking(true);
                    setTimeout(() => {
                      const idx = addHash(addVIN) % VIN_SAMPLES.length;
                      const [year, make, model, trim, value] = VIN_SAMPLES[idx];
                      const rows: [string, string][] = [
                        ['Year', year],
                        ['Make', make],
                        ['Model', model],
                        ['Trim', trim],
                        ['Market value', '$' + value.toLocaleString()],
                        ['VIN', addVIN || '(entered above)'],
                      ];
                      const d: AddAssetData = { kind: 'auto', provider: 'MarketCheck', rows, value, year, make, model, trim };
                      setAddData(d, `${year} ${make} ${model}`, String(value));
                    }, 1100);
                  }}
                  disabled={addVIN.length < 5 || addLooking}
                  style={{ ...btnPrimary, marginTop: 10, marginBottom: 16, width: '100%', opacity: addVIN.length < 5 || addLooking ? 0.6 : 1, borderRadius: 10, padding: '10px 0', fontSize: 13 }}
                >
                  {addLooking ? 'Looking up...' : 'Look up VIN →'}
                </button>
                {addData?.kind === 'auto' && (
                  <div style={{ border: '1px solid var(--c-border)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
                    {addData.rows.map(([k, v], i) => (
                      <div
                        key={i}
                        style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', background: i % 2 === 0 ? 'var(--c-card)' : 'var(--c-tint)', borderBottom: i < addData.rows.length - 1 ? '1px solid var(--c-border)' : 'none' }}
                      >
                        <span style={{ fontSize: 12, color: 'var(--c-text3)' }}>{k}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-text)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Art & valuables */}
            {addCat === 'art' && (
              <>
                <label style={labelStyle}>Item name / description</label>
                <input
                  value={addName}
                  onChange={e => setAddField('addName', e.target.value)}
                  placeholder="e.g. Original oil painting — Basquiat"
                  style={inputStyle}
                />
                <label style={{ ...labelStyle, marginTop: 12 }}>Estimated value</label>
                <input
                  value={addValue}
                  onChange={e => setAddField('addValue', e.target.value)}
                  placeholder="$0"
                  type="number"
                  style={inputStyle}
                />
                <label style={{ ...labelStyle, marginTop: 12 }}>Value basis</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  {['Appraisal', 'Guide', 'Estimate'].map(b => (
                    <button
                      key={b}
                      onClick={() => setAddBasis(b)}
                      style={{
                        border: '1px solid var(--c-border)',
                        borderRadius: 999,
                        padding: '7px 14px',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: addBasis === b ? '#1F4EDC' : 'var(--c-card)',
                        color: addBasis === b ? 'white' : 'var(--c-text)',
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Business interest */}
            {addCat === 'biz' && (
              <>
                <label style={labelStyle}>Business name</label>
                <input
                  value={addName}
                  onChange={e => setAddField('addName', e.target.value)}
                  placeholder="e.g. Acme Dental, P.A."
                  style={inputStyle}
                />
                <label style={{ ...labelStyle, marginTop: 12 }}>Ownership %</label>
                <input
                  value={addPct}
                  onChange={e => setAddField('addPct', e.target.value)}
                  placeholder="100"
                  type="number"
                  min={1}
                  max={100}
                  style={inputStyle}
                />
                <label style={{ ...labelStyle, marginTop: 12 }}>Estimated value</label>
                <input
                  value={addValue}
                  onChange={e => setAddField('addValue', e.target.value)}
                  placeholder="$0"
                  type="number"
                  style={inputStyle}
                />
              </>
            )}

            {/* Other */}
            {addCat === 'other' && (
              <>
                <label style={labelStyle}>Asset name</label>
                <input
                  value={addName}
                  onChange={e => setAddField('addName', e.target.value)}
                  placeholder="e.g. Collectibles collection"
                  style={inputStyle}
                />
                <label style={{ ...labelStyle, marginTop: 12 }}>Estimated value</label>
                <input
                  value={addValue}
                  onChange={e => setAddField('addValue', e.target.value)}
                  placeholder="$0"
                  type="number"
                  style={inputStyle}
                />
              </>
            )}

            {/* Footer */}
            <div style={{ marginTop: 24 }}>
              <button
                disabled={!canSubmit}
                style={{ ...btnBlack, width: '100%', borderRadius: 12, padding: 14, fontSize: 14, opacity: canSubmit ? 1 : 0.5 }}
                onClick={() => {
                  const val = Math.round(parseFloat(addValue.replace(/[^0-9.]/g, '')) || 0);
                  let rows: [string, string][] = [];
                  let source = 'Manual';
                  let sub = 'Manually added';
                  if (addData?.kind === 'auto') {
                    rows = addData.rows;
                    source = 'Enrichment';
                    sub = 'Vehicle · MarketCheck';
                  } else if (addData?.kind === 're') {
                    rows = addData.rows;
                    source = 'Enrichment';
                    sub = (addData.ptype || 'Property') + ' · Attom AVM';
                  } else if (addCat === 'art') {
                    rows = [['Value basis', addBasis], ['Added', 'Manually']];
                    sub = 'Valuable · ' + addBasis;
                  } else if (addCat === 'biz') {
                    rows = [['Ownership', addPct + '%'], ['Added', 'Manually']];
                    sub = 'Business interest';
                  } else {
                    rows = [['Added', 'Manually']];
                  }
                  submitAdd(persona, {
                    name: addName,
                    value: val,
                    cat: catMap[addCat || 'other'] || 'personal',
                    source,
                    sub,
                    rows,
                  });
                }}
              >
                Add to Vault
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
