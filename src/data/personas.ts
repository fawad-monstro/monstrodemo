import type { Persona, PersonaId, LockedItem } from '../types';

export const PERSONAS: Record<PersonaId, Persona> = {
  maya: {
    id: 'maya', name: 'Maya Chen', short: 'Maya Chen', first: 'Maya',
    tier: 'Mass market', initials: 'MC', avatar: '#1F4EDC',
    netWorth: '$61,200', change: '1.4%',
    hostName: 'Northway Bank', hostKind: 'Mobile banking', hostMark: 'N', hostMarkBg: '#0E7C5A', hostInitials: 'MC',
    accounts: [
      ['Checking · Northway', '$14,800', false],
      ['Savings · Northway', '$8,200', false],
      ['401(k) · Fidelity', '$31,400', false],
      ['Credit card', '−$2,300', true],
    ],
    sources: { Plaid: true, Canopy: false, Attom: false },
    guidance: ['mc_cash', 'mc_ret', 'mc_insure', 'mc_tax'],
    queueTop: ['i_hsa', 'q_household'],
    queueCount: 9,
    monitoring: [
      ['Cash flow', 'Idle cash above your buffer', 'watch'],
      ['Retirement', '401(k) below the full employer match', 'flag'],
      ['Spending', 'No unusual activity this month', 'ok'],
    ],
  },
  david: {
    id: 'david', name: 'David & Sarah Okafor', short: 'David & Sarah', first: 'David & Sarah',
    tier: 'Affluent', initials: 'DO', avatar: '#8A38F5',
    netWorth: '$3.24M', change: '2.1%',
    hostName: 'Summit Private Client', hostKind: 'Wealth portal', hostMark: 'S', hostMarkBg: '#1F4EDC', hostInitials: 'DO',
    accounts: [
      ['Brokerage · Schwab', '$1.41M', false],
      ['401(k) · Vanguard', '$612K', false],
      ['IRA · Vanguard', '$368K', false],
      ['529 plans ×2', '$240K', false],
      ['Home equity', '$620K', false],
    ],
    sources: { Plaid: true, Canopy: true, Attom: false },
    guidance: ['do_tax', 'do_invest', 'do_ret', 'do_estate', 'do_insure', 'do_cash'],
    queueTop: ['i_attom', 'q_household'],
    queueCount: 19,
    monitoring: [
      ['Tax', '3 lots eligible for loss harvesting', 'flag'],
      ['Investments', 'Equity drifted 13% over target', 'flag'],
      ['Retirement', 'On track — funding ratio 0.92', 'watch'],
      ['Estate', 'No will or trust on file', 'watch'],
    ],
  },
  marcus: {
    id: 'marcus', name: 'Marcus Bell', short: 'Marcus Bell', first: 'Marcus',
    tier: 'Affluent', initials: 'MB', avatar: '#0E7C5A',
    netWorth: '$1.84M', change: '3.4%',
    hostName: 'Vantage Wealth', hostKind: 'Wealth portal', hostMark: 'V', hostMarkBg: '#0E7C5A', hostInitials: 'MB',
    accounts: [
      ['Brokerage · Morgan Stanley', '$980K', false],
      ['Employer RSUs (vested)', '$430K', false],
      ['401(k) · Fidelity', '$410K', false],
      ['Roth IRA', '$190K', false],
      ['Checking', '$120K', false],
    ],
    sources: { Plaid: true, Canopy: true, Attom: false },
    guidance: ['mb_invest', 'mb_tax', 'mb_ret', 'mb_insure', 'mb_cash'],
    queueTop: ['i_crypto', 'q_household'],
    queueCount: 12,
    monitoring: [
      ['Investments', '38% of wealth in employer stock', 'flag'],
      ['Tax', 'RSU vesting will spike income', 'flag'],
      ['Retirement', 'Mega-backdoor Roth available, unused', 'watch'],
      ['Insurance', 'No umbrella policy on file', 'watch'],
    ],
  },
  patel: {
    id: 'patel', name: 'Raj & Priya Patel', short: 'Raj & Priya', first: 'Raj & Priya',
    tier: 'HNW', initials: 'RP', avatar: '#C77700',
    netWorth: '$10.9M', change: '2.4%',
    hostName: 'Brightwater Private', hostKind: 'Private bank', hostMark: 'B', hostMarkBg: '#1F4EDC', hostInitials: 'RP',
    accounts: [
      ['Business · dental practice', '$3.2M', false],
      ['Brokerage · Fidelity', '$2.1M', false],
      ['Commercial real estate', '$1.9M', false],
      ['Retirement plans', '$820K', false],
      ['Cash', '$480K', false],
    ],
    sources: { Plaid: true, Canopy: true, Attom: true },
    guidance: ['rp_estate', 'rp_tax', 'rp_invest', 'rp_ret', 'rp_insure'],
    queueTop: ['i_practice', 'q_household'],
    queueCount: 15,
    monitoring: [
      ['Estate', 'Business succession plan not documented', 'flag'],
      ['Tax', 'QBI & entity structure under-optimized', 'flag'],
      ['Investments', 'Concentrated in business + real estate', 'watch'],
      ['Retirement', 'Cash-balance plan opportunity', 'watch'],
    ],
  },
  eleanor: {
    id: 'eleanor', name: 'Eleanor Whitfield', short: 'Eleanor Whitfield', first: 'Eleanor',
    tier: 'UHNW', initials: 'EW', avatar: '#E900B4',
    netWorth: '$59.9M', change: '1.2%',
    hostName: 'Meridian Trust', hostKind: 'Private bank', hostMark: 'M', hostMarkBg: '#0A0A0A', hostInitials: 'EW',
    accounts: [
      ['Legacy stock (single)', '$11.2M', false],
      ['Managed portfolio', '$18.4M', false],
      ['Real estate', '$7.8M', false],
      ['Art & collectibles', '$2.9M', false],
      ['Cash', '$1.7M', false],
    ],
    sources: { Plaid: true, Canopy: true, Attom: true },
    guidance: ['ew_estate', 'ew_invest', 'ew_tax', 'ew_insure', 'ew_cash'],
    queueTop: ['i_custodian', 'q_household'],
    queueCount: 18,
    monitoring: [
      ['Estate', '$13.9M projected estate-tax exposure', 'flag'],
      ['Investments', '27% in a single legacy position', 'flag'],
      ['Tax', 'Charitable gifting window is open', 'watch'],
      ['Liquidity', 'Liquidity light vs. obligations', 'watch'],
    ],
  },
};

export const DOMAIN_DOT: Record<string, string> = {
  'Cash flow': '#1F4EDC',
  'Retirement': '#8A38F5',
  'Estate': '#E900B4',
  'Investments': '#0E7C5A',
  'Tax': '#C77700',
  'Insurance': '#0891B2',
};

export const LOCKED: Record<PersonaId, LockedItem[]> = {
  maya: [
    { domain: 'Tax', headline: 'A triple-tax-advantaged way to save', requires: 'Connect your HSA' },
    { domain: 'Cash flow', headline: 'Pay off debt or invest? A clear answer', requires: 'Link your student loans' },
  ],
  david: [
    { domain: 'Estate', headline: 'A complete net-worth & estate picture', requires: 'Connect property valuation (Attom)' },
    { domain: 'Insurance', headline: 'Right-size your umbrella coverage', requires: 'Link your home & auto insurer' },
  ],
  marcus: [
    { domain: 'Investments', headline: 'Digital-asset diversification', requires: 'Connect Coinbase' },
    { domain: 'Tax', headline: 'AMT planning for your equity comp', requires: 'Upload your ESPP statement' },
  ],
  patel: [
    { domain: 'Cash flow', headline: 'Optimize practice cash flow', requires: 'Connect your merchant processor' },
    { domain: 'Estate', headline: 'Fund your buy-sell efficiently', requires: 'Upload the operating agreement' },
  ],
  eleanor: [
    { domain: 'Investments', headline: 'Alternatives & private-equity exposure analysis', requires: 'Link private-equity capital accounts' },
    { domain: 'Tax', headline: 'Multi-entity gain harvesting', requires: 'Upload partnership K-1s' },
  ],
};
