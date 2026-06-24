import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { VAULT, CAT_COLORS, CAT_NAMES } from '../../data/vault';
import { GOALS } from '../../data/goals';
import { PEOPLE } from '../../data/people';
import { PERSONAS } from '../../data/personas';
import { mc, genTxns, genLots, provChip } from '../../utils';
import type { VaultItem } from '../../types';

/* ── Allocation segment type ─────────────────────────────────────── */
type AllocSegment = { name: string; value: number; color: string };

/* ── Donut SVG ───────────────────────────────────────────────────── */
function DonutChart({ segments }: { segments: AllocSegment[] }) {
  const R = 46;
  const C = 2 * Math.PI * R;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) {
    return (
      <svg width={120} height={120} viewBox="0 0 120 120">
        <circle cx={60} cy={60} r={R} fill="none" stroke="var(--c-border2)" strokeWidth={16} />
      </svg>
    );
  }
  let cumulative = 0;
  return (
    <svg width={120} height={120} viewBox="0 0 120 120">
      <circle cx={60} cy={60} r={R} fill="none" stroke="var(--c-border2)" strokeWidth={16} />
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * C;
        const strokeDashoffset = C * 0.25 - cumulative * C;
        cumulative += pct;
        return (
          <circle
            key={i}
            cx={60} cy={60} r={R}
            fill="none"
            stroke={seg.color}
            strokeWidth={16}
            strokeDasharray={`${dash} ${C - dash}`}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 60 60)"
          />
        );
      })}
    </svg>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export function VaultScreen() {
  const {
    persona, view,
    vaultCat, vaultItem,
    vaultOpenCat, vaultOpenItem, vaultBack,
    openAdd, openGoal, openPerson,
    allocLens, setAllocLens,
    manualAdds,
  } = useAppStore();

  /* expandedPos must be before any early returns */
  const [expandedPos, setExpandedPos] = useState<string | null>(null);

  /* ── Shared data computation ─────────────────────────────────── */
  const vaultData = VAULT[persona];

  const baseCats = vaultData.categories;
  const manuals = manualAdds[persona] || [];

  const cats: Array<{ key: string; name: string; items: VaultItem[] }> = baseCats.map(c => ({
    ...c,
    items: [
      ...c.items,
      ...manuals.filter(a => a.cat === c.key).map(a => ({
        name: a.name, value: a.value, source: a.source,
        sub: a.sub, manual: true as const, rows: a.rows,
      })),
    ],
  }));

  const existingKeys = new Set(baseCats.map(c => c.key));
  const extraKeys = [...new Set(manuals.filter(a => !existingKeys.has(a.cat)).map(a => a.cat))];
  for (const k of extraKeys) {
    cats.push({
      key: k, name: CAT_NAMES[k] || k,
      items: manuals.filter(a => a.cat === k).map(a => ({
        name: a.name, value: a.value, source: a.source,
        sub: a.sub, manual: true as const, rows: a.rows,
      })),
    });
  }

  const catTotals = cats.map(c => ({
    key: c.key, name: c.name,
    total: c.items.reduce((s, i) => s + i.value, 0),
    count: c.items.length,
  }));

  const totalAssets = catTotals.reduce((s, c) => s + c.total, 0);
  const totalLiab = vaultData.liabilities.reduce((s, l) => s + l.value, 0);
  const net = totalAssets - totalLiab;

  const cashTotal = catTotals.find(c => c.key === 'cash')?.total || 0;
  const investTotal = catTotals.find(c => c.key === 'invest')?.total || 0;
  const retireTotal = catTotals.find(c => c.key === 'retire')?.total || 0;
  const investable = cashTotal + investTotal + retireTotal;
  const liquid = cashTotal + investTotal - totalLiab;

  /* ── Allocation computation ──────────────────────────────────── */
  function computeAlloc(lens: 'class' | 'type' | 'tax'): AllocSegment[] {
    const map: Record<string, number> = {};

    if (lens === 'type') {
      cats.forEach(c => {
        const v = c.items.reduce((s, i) => s + i.value, 0);
        if (v > 0) map[c.name] = (map[c.name] || 0) + v;
      });
      const typeColorMap: Record<string, string> = {
        'Cash & banking': '#C77700', 'Investments': '#1F4EDC', 'Retirement': '#8A38F5',
        'Real estate': '#C77700', 'Business': '#0891B2', 'Personal property': '#E11D74',
        'Art & collectibles': '#E11D74', 'Digital assets': '#0891B2',
      };
      return Object.entries(map).filter(([, v]) => v > 0).map(([name, value]) => ({
        name, value, color: typeColorMap[name] || '#64748B',
      }));
    }

    if (lens === 'tax') {
      cats.forEach(c => {
        c.items.forEach(item => {
          let bucket = 'Taxable';
          if (c.key === 'retire') {
            const isRoth = item.name.toLowerCase().includes('roth');
            bucket = isRoth ? 'Tax-free' : 'Tax-deferred';
          } else if (['re', 'biz', 'personal'].includes(c.key)) {
            bucket = 'Non-financial';
          }
          map[bucket] = (map[bucket] || 0) + item.value;
        });
      });
      const taxColors: Record<string, string> = {
        'Taxable': '#1F4EDC', 'Tax-deferred': '#8A38F5', 'Tax-free': '#0E7C5A', 'Non-financial': '#64748B',
      };
      return Object.entries(map).filter(([, v]) => v > 0).map(([name, value]) => ({
        name, value, color: taxColors[name] || '#64748B',
      }));
    }

    // lens === 'class'
    cats.forEach(c => {
      c.items.forEach(item => {
        if (item.positions && item.positions.length > 0) {
          item.positions.forEach(([tic, nm, val]) => {
            let cls = 'Equities';
            const s = (tic + ' ' + nm).toLowerCase();
            if (/bond|agg|fixed|bnd|treasur|muni|fxnax|vbtlx/.test(s)) cls = 'Fixed income';
            else if (/cash|sweep|money market/.test(s)) cls = 'Cash';
            else if (/alt|private|hedge|pe |\bpe\b|venture/.test(s)) cls = 'Alternatives';
            map[cls] = (map[cls] || 0) + val;
          });
        } else {
          let cls = 'Equities';
          if (['cash'].includes(c.key)) cls = 'Cash';
          else if (['re'].includes(c.key)) cls = 'Real assets';
          else if (['biz'].includes(c.key)) cls = 'Business';
          else if (['personal'].includes(c.key)) cls = 'Other';
          map[cls] = (map[cls] || 0) + item.value;
        }
      });
    });
    const classColors: Record<string, string> = {
      'Equities': '#1F4EDC', 'Fixed income': '#0E7C5A', 'Cash': '#C77700',
      'Alternatives': '#8A38F5', 'Real assets': '#E11D74', 'Business': '#0891B2', 'Other': '#64748B',
    };
    return Object.entries(map).filter(([, v]) => v > 0).map(([name, value]) => ({
      name, value, color: classColors[name] || '#64748B',
    }));
  }

  /* ══════════════════════════════════════════════════════════════
     VIEW 3: ITEM DETAIL
  ══════════════════════════════════════════════════════════════ */
  if (vaultItem !== null) {
    type DetailItem = {
      name: string;
      value: number;
      source: string;
      sub?: string;
      manual?: boolean;
      rows?: [string, string][];
      positions?: [string, string, number, string][];
      coverage?: number;
      premium?: string;
      isLiab?: boolean;
      isIns?: boolean;
    };

    let detailItem: DetailItem | undefined;
    let detailCatName = '';
    let isLiabView = false;
    let isInsView = false;

    if (vaultCat === 'liabilities') {
      const raw = vaultData.liabilities[vaultItem];
      if (raw) detailItem = { ...raw, isLiab: true };
      detailCatName = 'Liabilities';
      isLiabView = true;
    } else if (vaultCat === 'insurance') {
      const ins = vaultData.insurance[vaultItem];
      if (ins) {
        detailItem = {
          name: ins.name, value: ins.coverage, source: ins.source,
          sub: ins.sub, coverage: ins.coverage, premium: ins.premium, isIns: true,
        };
      }
      detailCatName = 'Insurance';
      isInsView = true;
    } else {
      const cat = cats.find(c => c.key === vaultCat);
      detailItem = cat?.items[vaultItem];
      detailCatName = cat?.name || '';
    }

    if (!detailItem) {
      return <div style={{ padding: 24 }}>Not found</div>;
    }

    const chip = provChip(detailItem.source, detailItem.manual);

    const showTxns = vaultCat && ['cash', 'invest', 'retire', 'card'].includes(vaultCat);
    const txns = showTxns ? genTxns(detailItem.name, vaultCat === 'card' ? 'card' : vaultCat || '', detailItem.value) : [];

    return (
      <div style={{ padding: '24px 28px', animation: 'mfade 0.18s ease' }}>
        {/* Back link */}
        <button
          onClick={() => vaultBack()}
          style={{ background: 'none', border: 'none', color: '#1F4EDC', fontSize: 13, cursor: 'pointer', marginBottom: 16, padding: 0 }}
        >
          ← {detailCatName}
        </button>

        {/* Title */}
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: 'var(--c-text)', margin: '0 0 4px' }}>
          {detailItem.name}
        </h2>

        {/* Value */}
        {isInsView ? (
          <>
            <p style={{ fontSize: 28, fontWeight: 500, color: 'var(--c-text)', marginBottom: 2, margin: '8px 0 2px' }}>
              {mc(detailItem.value)} coverage
            </p>
            <p style={{ fontSize: 14, color: 'var(--c-text3)', marginBottom: 16, margin: '0 0 16px' }}>
              {detailItem.premium} premium
            </p>
          </>
        ) : (
          <p style={{ fontSize: 28, fontWeight: 500, color: isLiabView ? '#DC1F4E' : 'var(--c-text)', margin: '8px 0 16px' }}>
            {mc(detailItem.value)}
          </p>
        )}

        {/* Provenance chip */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 600, background: 'var(--c-tint)', padding: '4px 10px', borderRadius: 999, color: 'var(--c-text3)' }}>
            Source: {chip.detail}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 600, background: 'var(--c-tint)', padding: '4px 10px', borderRadius: 999,
            color: chip.confidence === 'High' || chip.confidence === 'Verified' ? '#0E7C5A' : '#C77700',
          }}>
            {chip.confidence}
          </span>
          <span style={{ fontSize: 11, color: 'var(--c-text3)' }}>{chip.asOf}</span>
        </div>

        {/* Key-value rows */}
        {detailItem.rows && detailItem.rows.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--c-text3)', marginBottom: 8, letterSpacing: '0.05em' }}>
              Details
            </div>
            <div style={{ borderRadius: 10, border: '1px solid var(--c-border)', overflow: 'hidden' }}>
              {detailItem.rows.map(([k, v], i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', justifyContent: 'space-between', padding: '9px 14px',
                    background: i % 2 === 0 ? 'var(--c-card)' : 'var(--c-tint)',
                    borderBottom: i < detailItem!.rows!.length - 1 ? '1px solid var(--c-border)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 13, color: 'var(--c-text3)' }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Positions */}
        {detailItem.positions && detailItem.positions.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Positions</div>
            {detailItem.positions.map(([tic, name, val, chg]) => {
              const isExpanded = expandedPos === tic;
              const lots = isExpanded ? genLots(tic, name, val) : [];
              return (
                <div key={tic}>
                  <div
                    onClick={() => setExpandedPos(isExpanded ? null : tic)}
                    style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--c-border)', cursor: 'pointer' }}
                  >
                    <span style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 700, color: '#1F4EDC', width: 60, flexShrink: 0 }}>
                      {tic}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--c-text)', flex: 1 }}>{name}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)', marginRight: 8 }}>{mc(val)}</span>
                    <span style={{ fontSize: 12, color: chg.startsWith('+') ? '#0E7C5A' : '#DC1F4E' }}>{chg}</span>
                    <span style={{ fontSize: 12, color: 'var(--c-text3)', marginLeft: 8 }}>{isExpanded ? '▴' : '▾'}</span>
                  </div>
                  {isExpanded && lots.length > 0 && (
                    <div style={{ marginLeft: 60, paddingLeft: 12, borderLeft: '2px solid var(--c-border2)' }}>
                      {lots.map((lot, li) => (
                        <div key={li} style={{ display: 'flex', gap: 12, padding: '6px 0', fontSize: 12, borderBottom: '1px solid var(--c-border2)' }}>
                          <span style={{ color: 'var(--c-text3)', flex: 1 }}>{lot.acq}</span>
                          <span style={{ color: 'var(--c-text3)' }}>{lot.qty} sh</span>
                          <span style={{ color: 'var(--c-text3)' }}>{lot.cost} cost</span>
                          <span style={{ fontWeight: 600, color: 'var(--c-text)' }}>{lot.mv}</span>
                          <span style={{ color: lot.positive ? '#0E7C5A' : '#DC1F4E' }}>{lot.gain}</span>
                          <span style={{
                            fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                            padding: '1px 5px', borderRadius: 3,
                            background: lot.term === 'LT' ? 'var(--tint-green-bg)' : 'var(--tint-amber-bg)',
                            color: lot.term === 'LT' ? '#0E7C5A' : '#C77700',
                          }}>
                            {lot.term}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Transactions */}
        {txns.length > 0 && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 12 }}>Recent transactions</div>
            {txns.map((txn, i) => (
              <div key={i} style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid var(--c-border)', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--c-text3)', width: 50, flexShrink: 0 }}>{txn.date}</span>
                <span style={{ fontSize: 13, color: 'var(--c-text)', flex: 1 }}>{txn.desc}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: txn.positive ? '#0E7C5A' : 'var(--c-text)', textAlign: 'right', flexShrink: 0 }}>
                  {txn.amt}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════
     VIEW 2: CATEGORY LIST
  ══════════════════════════════════════════════════════════════ */
  if (vaultCat !== null) {
    type ListItem = {
      name: string;
      value: number;
      source: string;
      sub?: string;
      manual?: boolean;
      rows?: [string, string][];
      coverage?: number;
      premium?: string;
      isLiab?: boolean;
      isIns?: boolean;
    };

    let listName = '';
    let listItems: ListItem[] = [];

    if (vaultCat === 'liabilities') {
      listName = 'Liabilities';
      listItems = vaultData.liabilities.map(l => ({ ...l, isLiab: true as const }));
    } else if (vaultCat === 'insurance') {
      listName = 'Insurance';
      listItems = vaultData.insurance.map(ins => ({
        name: ins.name, value: ins.coverage, source: ins.source,
        sub: ins.sub, coverage: ins.coverage, premium: ins.premium, isIns: true as const,
      }));
    } else {
      const cat = cats.find(c => c.key === vaultCat);
      listName = cat?.name || vaultCat || '';
      listItems = (cat?.items || []).map(i => ({ ...i }));
    }

    return (
      <div style={{ padding: '24px 28px', animation: 'mfade 0.18s ease' }}>
        <button
          onClick={() => vaultBack()}
          style={{ background: 'none', border: 'none', color: '#1F4EDC', fontSize: 13, cursor: 'pointer', marginBottom: 16, padding: 0 }}
        >
          ← Vault
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, margin: '0 0 20px' }}>{listName}</h2>
        {listItems.map((item, i) => (
          <div
            key={i}
            onClick={() => vaultOpenItem(i)}
            style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--c-border)', cursor: 'pointer', gap: 12 }}
          >
            {item.manual && (
              <span style={{ fontSize: 10, background: 'var(--c-tint)', color: 'var(--c-text4)', padding: '2px 8px', borderRadius: 999, flexShrink: 0 }}>
                manual
              </span>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)' }}>{item.name}</div>
              {item.isIns && item.premium ? (
                <div style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 2 }}>{item.premium} premium</div>
              ) : item.sub ? (
                <div style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 2 }}>{item.sub}</div>
              ) : null}
            </div>
            <div style={{ textAlign: 'right' as const, flexShrink: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: item.isLiab ? '#DC1F4E' : 'var(--c-text)' }}>
                {item.isIns ? mc(item.value) + ' coverage' : mc(item.value)}
              </div>
              <span style={{ fontSize: 10, background: 'var(--c-tint)', color: 'var(--c-text3)', padding: '2px 8px', borderRadius: 999, display: 'block', marginTop: 4 }}>
                {item.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════
     VIEW 1: VAULT HOME
  ══════════════════════════════════════════════════════════════ */

  /* Net-worth sparkline */
  const h = vaultData.history;
  const mn = Math.min(...h);
  const mx = Math.max(...h);
  const W = 300, H = 70, pad = 6;
  const pts = h.map((v, i) => {
    const x = pad + (W - 2 * pad) * (h.length < 2 ? 0 : i / (h.length - 1));
    const y = pad + (H - 2 * pad) * (mx === mn ? 0.5 : 1 - (v - mn) / (mx - mn));
    return [x, y] as [number, number];
  });
  const lineD = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const areaD = `${lineD} L${pts[pts.length - 1][0]},${H - pad} L${pad},${H - pad} Z`;

  /* Metrics strip */
  const p = PERSONAS[persona];
  const metrics: [string, string][] = [
    ['Net worth', mc(net)],
    ['Liquid net worth', mc(liquid)],
    ['Investable assets', mc(investable)],
    ['Total liabilities', mc(totalLiab)],
    p.tier === 'UHNW' ? ['Est. estate-tax exposure', '$13.9M'] :
    p.tier === 'HNW' ? ['Est. estate-tax exposure', '$1.2M'] :
    p.tier === 'Mass market' ? ['Emergency fund', '3.1 mo'] :
    ['Effective tax rate', '~24%'],
  ];

  return (
    <div style={{ padding: '24px 28px', animation: 'mfade 0.18s ease' }}>

      {/* Title row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--c-text)', margin: 0 }}>
          {view === 'advisor' ? PERSONAS[persona].first + "'s Vault" : 'Your Vault'}
        </h2>
        <button
          onClick={() => openAdd()}
          style={{ background: '#0A0A0A', color: 'white', border: 'none', borderRadius: 999, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          + Add asset
        </button>
      </div>

      {/* Net-worth hero */}
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--c-text)', display: 'block' }}>
          {mc(net)}
        </span>
        <span style={{ fontSize: 13, color: 'var(--c-text3)', marginTop: 4, display: 'block' }}>
          Total net worth
        </span>
        <svg width={W} height={H} style={{ display: 'block', marginTop: 16 }}>
          <path d={areaD} fill="#1F4EDC" fillOpacity={0.08} />
          <path d={lineD} fill="none" stroke="#1F4EDC" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          {pts.map(([px, py], i) => (
            <circle key={i} cx={px} cy={py} r={3} fill="#1F4EDC" />
          ))}
        </svg>
      </div>

      {/* Allocation donut */}
      <div style={{ marginTop: 24, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {/* Left: donut + lens tabs */}
        <div>
          <DonutChart segments={computeAlloc(allocLens)} />
          <div style={{ display: 'flex', gap: 4, marginTop: 12, justifyContent: 'center' }}>
            {(['class', 'type', 'tax'] as const).map(l => (
              <button
                key={l}
                onClick={() => setAllocLens(l)}
                style={{
                  border: allocLens === l ? 'none' : '1px solid var(--c-border)',
                  background: allocLens === l ? '#1F4EDC' : 'var(--c-card)',
                  color: allocLens === l ? 'white' : 'var(--c-text3)',
                  fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999, cursor: 'pointer',
                }}
              >
                {l === 'class' ? 'Asset class' : l === 'type' ? 'Account type' : 'Tax treatment'}
              </button>
            ))}
          </div>
        </div>

        {/* Right: legend */}
        <div style={{ flex: 1 }}>
          {computeAlloc(allocLens).map(seg => {
            const pct = Math.round(100 * seg.value / totalAssets);
            return (
              <div key={seg.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: seg.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--c-text2)', flex: 1 }}>{seg.name}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-text)' }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metrics strip */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
        {metrics.map(([label, value]) => (
          <div key={label} style={{ padding: '12px 16px', background: 'var(--c-card)', borderRadius: 12, boxShadow: 'var(--c-shadow)', minWidth: 140 }}>
            <div style={{ fontSize: 12, color: 'var(--c-text3)', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: 'var(--c-text)' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Balance sheet grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginTop: 24 }}>
        {catTotals.map(ct => (
          <div
            key={ct.key}
            onClick={() => vaultOpenCat(ct.key)}
            style={{ display: 'flex', alignItems: 'stretch', background: 'var(--c-card)', borderRadius: 12, boxShadow: 'var(--c-shadow)', cursor: 'pointer', overflow: 'hidden' }}
          >
            <div style={{ width: 4, flexShrink: 0, background: CAT_COLORS[ct.key] || '#64748B' }} />
            <div style={{ flex: 1, padding: '14px 14px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{ct.name}</div>
              <div style={{ fontSize: 11, color: 'var(--c-text3)', marginTop: 2 }}>{ct.count} holdings</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--c-text)', marginTop: 6 }}>{mc(ct.total)}</div>
            </div>
          </div>
        ))}

        {/* Liabilities card */}
        <div
          onClick={() => vaultOpenCat('liabilities')}
          style={{ display: 'flex', alignItems: 'stretch', background: 'var(--c-card)', borderRadius: 12, boxShadow: 'var(--c-shadow)', cursor: 'pointer', overflow: 'hidden' }}
        >
          <div style={{ width: 4, flexShrink: 0, background: '#DC1F4E' }} />
          <div style={{ flex: 1, padding: '14px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>Liabilities</div>
            <div style={{ fontSize: 11, color: 'var(--c-text3)', marginTop: 2 }}>{vaultData.liabilities.length} items</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#DC1F4E', marginTop: 6 }}>{mc(totalLiab)}</div>
          </div>
        </div>

        {/* Insurance card */}
        <div
          onClick={() => vaultOpenCat('insurance')}
          style={{ display: 'flex', alignItems: 'stretch', background: 'var(--c-card)', borderRadius: 12, boxShadow: 'var(--c-shadow)', cursor: 'pointer', overflow: 'hidden' }}
        >
          <div style={{ width: 4, flexShrink: 0, background: '#0891B2' }} />
          <div style={{ flex: 1, padding: '14px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>Insurance</div>
            <div style={{ fontSize: 11, color: 'var(--c-text3)', marginTop: 2 }}>{vaultData.insurance.length} policies</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--c-text)', marginTop: 6 }}>
              {mc(vaultData.insurance.reduce((s, ins) => s + ins.coverage, 0))} coverage
            </div>
          </div>
        </div>
      </div>

      {/* Goals section */}
      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Goals &amp; planning</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {GOALS[persona].map((goal, i) => {
            const [gtype, gname, gtarget, gdate, gpriority, gfunded] = goal;
            const gpct = Math.round(Math.min(1, gfunded / gtarget) * 100);
            return (
              <div
                key={i}
                onClick={() => openGoal(i)}
                style={{ padding: 16, background: 'var(--c-card)', borderRadius: 12, boxShadow: 'var(--c-shadow)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--c-text3)', background: 'var(--c-tint)', padding: '2px 8px', borderRadius: 999 }}>
                    {gtype}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--c-text4)', marginLeft: 'auto' }}>{gpriority}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--c-text)', marginTop: 6 }}>{gname}</div>
                <div style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 2 }}>{gdate}</div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ height: 7, background: 'var(--track-bg)', borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{
                      width: gpct + '%', height: 7, borderRadius: 5,
                      background: gpct >= 80 ? '#0E7C5A' : gpct >= 40 ? '#C77700' : '#DC1F4E',
                    }} />
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 4 }}>{gpct}% funded</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* People section */}
      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>People &amp; beneficiaries</div>
        {PEOPLE[persona].map((person, i) => {
          const [ppname, , proles, , pbenType, pbenShare] = person;
          const pinitials = ppname.split(' ').filter(Boolean).slice(0, 2).map((s: string) => s[0]).join('');
          return (
            <div
              key={i}
              onClick={() => openPerson(i)}
              style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--c-border)', cursor: 'pointer', alignItems: 'center' }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 999,
                background: 'var(--avatar-bg)', color: 'var(--avatar-fg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, flexShrink: 0,
              }}>
                {pinitials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-text)' }}>{ppname}</div>
                <div style={{ fontSize: 11, color: 'var(--c-text3)' }}>{proles}</div>
              </div>
              {pbenType ? (
                <span style={{ background: '#F0F4FF', color: '#1F4EDC', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999 }}>
                  {pbenType}{pbenShare ? ' · ' + pbenShare : ''}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

    </div>
  );
}
