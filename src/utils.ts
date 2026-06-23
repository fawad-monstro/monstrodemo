/* Money formatting */
export function mc(n: number): string {
  const neg = n < 0;
  const abs = Math.abs(n);
  let s: string;
  if (abs >= 1e9) s = '$' + (abs / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'B';
  else if (abs >= 1e6) s = '$' + (abs / 1e6).toFixed(2).replace(/\.?0+$/, '') + 'M';
  else s = '$' + abs.toLocaleString('en-US');
  return neg ? '−' + s : s;
}

export function mcFull(n: number): string {
  const neg = n < 0;
  const abs = Math.abs(n);
  const s = '$' + abs.toLocaleString('en-US');
  return neg ? '−' + s : s;
}

/* Simple deterministic hash for seeded pseudo-random */
export function addHash(str: string): number {
  let n = 0;
  for (const c of String(str)) n += c.charCodeAt(0);
  return n;
}

/* Vault: derive provider tag from source string */
export function viaFromTitle(title: string): string {
  const t = (title || '').toLowerCase();
  if (t.includes('attom') || t.includes('property') || t.includes('real-estate') || t.includes('real estate') || t.includes('deed') || t.includes('appraisal')) return 'Attom';
  if (t.includes('canopy') || t.includes('tax aggregation') || t.includes('1099') || t.includes('k-1') || t.includes('tax return') || t.includes('gift-tax')) return 'Canopy';
  if (t.includes('crypto') || t.includes('coinbase') || t.includes('wallet') || t.includes('digital')) return 'Coinbase';
  return 'Plaid';
}

/* Vault: derive allocation class from ticker/name */
export function classOf(tic: string, nm: string): string {
  const s = (tic + ' ' + nm).toLowerCase();
  if (/bond|agg|fixed|bnd|treasur|muni|fixed income|fxnax|vbtlx/.test(s)) return 'Fixed income';
  if (/cash|sweep|money market|t-bill/.test(s)) return 'Cash';
  if (/alt|private|hedge|pe |\bpe\b|carry|venture/.test(s)) return 'Alternatives';
  return 'Equities';
}

/* Generate deterministic pseudo-transactions for a vault item */
export function genTxns(itemName: string, kind: string, value: number) {
  const seed = addHash(itemName);
  const r = (n: number) => { const x = Math.sin(seed * 9301 + n * 49297) * 233280; return x - Math.floor(x); };
  const days = ['Jun 21', 'Jun 18', 'Jun 14', 'Jun 9', 'Jun 3', 'May 28', 'May 22', 'May 15'];
  let sets: [string, number][];
  if (kind === 'card') sets = [['Amazon Marketplace', -1], ['Whole Foods Market', -1], ['Shell — fuel', -1], ['United Airlines', -1], ['CVS Pharmacy', -1], ['Netflix', -1], ['Statement payment', 1], ['Apple Store', -1]];
  else if (kind === 'invest' || kind === 'retire') sets = [['Contribution — ACH', 1], ['Dividend reinvestment', 1], ['Buy — index fund', -1], ['Advisory fee', -1], ['Rebalance — sell', 1], ['Buy — ETF', -1], ['Interest', 1], ['Capital gain distribution', 1]];
  else sets = [['Payroll deposit', 1], ['Transfer to savings', -1], ['Mortgage payment', -1], ['Whole Foods Market', -1], ['Electric — ComEd', -1], ['Zelle — received', 1], ['ATM withdrawal', -1], ['Coffee', -1]];
  const base = Math.max(40, Math.round(value * 0.012));
  return sets.map((row, i) => {
    const mag = Math.round(base * (0.3 + r(i) * 1.9));
    const amt = row[1] * mag;
    return { date: days[i], desc: row[0], amt: (amt < 0 ? '−$' : '+$') + Math.abs(amt).toLocaleString('en-US'), positive: amt > 0 };
  });
}

/* Generate deterministic tax lots */
export function genLots(tic: string, nm: string, val: number) {
  const seed = addHash(tic + nm);
  const r = (n: number) => { const x = Math.sin(seed * 7 + n * 131) * 9973; return x - Math.floor(x); };
  const n = 2 + Math.floor(r(0) * 2);
  const lots = [];
  let remain = val;
  const yrs = ['2018', '2019', '2021', '2022', '2023'];
  for (let i = 0; i < n; i++) {
    const share = i === n - 1 ? remain : Math.round(val * (0.25 + r(i) * 0.3));
    remain -= share;
    if (share <= 0) continue;
    const gainPct = r(i + 5) * 0.6 - 0.15;
    const cost = Math.round(share / (1 + gainPct));
    const gain = share - cost;
    lots.push({
      acq: yrs[(seed + i) % yrs.length] + ' · ' + (1 + Math.floor(r(i + 2) * 12)) + '/' + (1 + Math.floor(r(i + 3) * 27)),
      qty: 10 + Math.floor(r(i + 1) * 400),
      cost: mc(cost), mv: mc(share),
      gain: (gain < 0 ? '−' : '+') + mc(Math.abs(gain)).replace('−', ''),
      positive: gain >= 0,
      term: Number(yrs[(seed + i) % yrs.length]) < 2024 ? 'LT' : 'ST',
    });
  }
  return lots;
}

/* Vault provenance chip */
export function provChip(source: string, manual?: boolean) {
  const sl = (source || '').toLowerCase();
  if (/managed portfolio/.test(sl)) return { source: 'Linked', detail: source, confidence: 'Verified', asOf: 'Updated today', managed: 'Managed', freshColor: '#0E7C5A' };
  if (/plaid/.test(sl)) return { source: 'Linked', detail: source, confidence: 'High', asOf: 'Updated 2 min ago', managed: 'Held-away', freshColor: '#0E7C5A' };
  if (/canopy/.test(sl)) return { source: 'Linked', detail: source, confidence: 'High', asOf: 'Updated 30 min ago', managed: 'Held-away', freshColor: '#0E7C5A' };
  if (/attom|marketcheck|enrichment/.test(sl)) return { source: 'Enrichment', detail: source, confidence: 'Medium', asOf: 'Valued today', managed: 'Held-away', freshColor: '#C77700' };
  if (manual) return { source: 'Manual', detail: 'Client / advisor entered', confidence: 'Medium', asOf: 'As of last edit', managed: 'Held-away', freshColor: '#C77700' };
  return { source: 'Manual', detail: 'Client / advisor entered', confidence: 'Medium', asOf: 'As of last edit', managed: 'Held-away', freshColor: '#C77700' };
}
