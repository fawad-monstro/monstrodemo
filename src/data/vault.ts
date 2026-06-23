import type { VaultData, PersonaId } from '../types';

export const VAULT: Record<PersonaId, VaultData> = {
  maya: {
    categories: [
      { key: 'cash', name: 'Cash & banking', items: [
        { name: 'Checking · Northway', value: 14800, source: 'Plaid', sub: 'Everyday account', rows: [['Account', '••• 4821'], ['APY', '0.01%'], ['30-day avg', '$13,900']] },
        { name: 'Savings · Northway', value: 8200, source: 'Plaid', sub: 'High-yield savings', rows: [['Account', '••• 7730'], ['APY', '3.90%'], ['Goal', 'Emergency fund']] },
      ]},
      { key: 'retire', name: 'Retirement', items: [
        { name: '401(k) · Fidelity', value: 31400, source: 'Plaid', sub: 'Employer plan', rows: [['Contribution', '3% of salary'], ['Match', 'up to 5%'], ['Vested', '100%']], positions: [['VFIAX', 'S&P 500 Index', 18600, '+1.2%'], ['VBTLX', 'Total Bond', 7300, '-0.3%'], ['Cash', 'Money market', 5500, '+0.0%']] },
        { name: 'Roth IRA', value: 6800, source: 'Plaid', sub: 'Self-directed', rows: [['YTD contributions', '$2,400'], ['Limit', '$7,000']], positions: [['VT', 'Total World Stock', 6800, '+0.9%']] },
      ]},
      { key: 'personal', name: 'Personal property', items: [
        { name: '2021 Honda Civic', value: 9000, source: 'Manual', manual: true, sub: 'Vehicle · est. value', rows: [['Type', 'Vehicle · sedan'], ['Make / model', '2021 Honda Civic EX'], ['Mileage', '38,400 mi'], ['VIN', '••••• 4821'], ['Value basis', 'MarketCheck'], ['Linked loan', 'None'], ['Linked insurance', 'Auto · $96 / mo']] },
      ]},
    ],
    liabilities: [
      { name: 'Credit card · Northway', value: 2300, source: 'Plaid', sub: 'Revolving', rows: [['APR', '22.9%'], ['Limit', '$6,000'], ['Min due', '$45']] },
      { name: 'Student loan', value: 6700, source: 'Manual', sub: 'Federal', rows: [['Rate', '4.5%'], ['Servicer', 'MOHELA']] },
    ],
    insurance: [
      { name: 'Renters insurance', coverage: 30000, premium: '$14/mo', source: 'Manual', sub: 'Property & liability' },
    ],
    history: [54, 55, 56, 57, 58, 60, 61.2],
  },

  david: {
    categories: [
      { key: 'cash', name: 'Cash & banking', items: [
        { name: 'Checking · Chase', value: 80000, source: 'Plaid', sub: 'Joint household', rows: [['Account', '••• 1180'], ['APY', '0.02%']] },
      ]},
      { key: 'invest', name: 'Investments', items: [
        { name: 'Brokerage · Schwab', value: 1410000, source: 'Plaid + Canopy', sub: 'Taxable · joint', rows: [['Cost basis', '$1.02M'], ['Unrealized gain', '$390K'], ['Realized YTD', '$22,400']], positions: [['VTI', 'US Total Market', 640000, '+2.1%'], ['VXUS', 'Intl Stock', 280000, '+0.8%'], ['NVDA', 'Nvidia', 210000, '+14.2%'], ['AGG', 'US Agg Bond', 180000, '-0.4%'], ['Cash', 'Sweep', 100000, '+0.0%']] },
        { name: '529 plans ×2', value: 240000, source: 'Plaid', sub: 'Education · 2 beneficiaries', rows: [['Beneficiary 1', '$132,000'], ['Beneficiary 2', '$108,000']] },
      ]},
      { key: 'retire', name: 'Retirement', items: [
        { name: '401(k) · Vanguard', value: 612000, source: 'Plaid', sub: 'David · employer plan', rows: [['Funding ratio', '0.92'], ['Catch-up', 'Unused $7,500']], positions: [['VINIX', 'S&P 500', 360000, '+1.2%'], ['VBTLX', 'Total Bond', 152000, '-0.3%'], ['VTSNX', 'Intl Stock', 100000, '+0.7%']] },
        { name: 'IRA · Vanguard', value: 368000, source: 'Plaid', sub: 'Sarah · rollover', rows: [['Backdoor Roth', 'Eligible']], positions: [['VTSAX', 'Total Market', 368000, '+1.1%']] },
      ]},
      { key: 're', name: 'Real estate', items: [
        { name: 'Primary residence', value: 1240000, source: 'Attom', sub: 'Chicago, IL', rows: [['Property type', 'Single-family detached'], ['Address', '1840 N Mohawk St, Chicago IL 60614'], ['Beds / baths', '5 bd · 3.5 ba'], ['Living area', '3,820 sq ft'], ['Lot size', '0.18 acres'], ['Year built', '2004'], ['Purchased', '2016 · $720,000'], ['Attom AVM', '$1,240,000'], ['Equity', '$620,000'], ['Property tax', '$18,400 / yr'], ['Linked mortgage', '−$620,000 · 3.1% fixed'], ['Linked insurance', 'HO-3 · $1,500 / yr']] },
      ]},
      { key: 'personal', name: 'Personal property', items: [
        { name: 'Art collection', value: 30000, source: 'Manual', manual: true, sub: '2 pieces · appraised', rows: [['Type', 'Artwork · 2 pieces'], ['Value basis', 'Appraisal'], ['Last appraisal', '2024'], ['Insured', 'Valuables rider · $35,000'], ['Provenance', 'Documented'], ['Situs', 'IL'], ['Added', 'Manually']] },
      ]},
    ],
    liabilities: [
      { name: 'Mortgage · primary', value: 620000, source: 'Plaid', sub: '30-yr fixed', rows: [['Rate', '3.1%'], ['Maturity', '2046'], ['Payment', '$3,180/mo']] },
      { name: 'HELOC', value: 90000, source: 'Plaid', sub: 'Variable', rows: [['Rate', '7.4%'], ['Limit', '$200,000']] },
      { name: 'Credit cards', value: 30000, source: 'Plaid', sub: '2 cards', rows: [['APR', '19.9%'], ['Utilization', '21%']] },
    ],
    insurance: [
      { name: 'Term life · David', coverage: 2000000, premium: '$140/mo', source: 'Manual', sub: '20-yr term' },
      { name: 'Umbrella liability', coverage: 1000000, premium: '$45/mo', source: 'Manual', sub: 'Personal umbrella' },
    ],
    history: [2.78, 2.9, 3.0, 3.05, 3.12, 3.19, 3.24],
  },

  marcus: {
    categories: [
      { key: 'cash', name: 'Cash & banking', items: [
        { name: 'Checking', value: 120000, source: 'Plaid', sub: 'Primary', rows: [['APY', '0.01%'], ['Excess vs reserve', '~$90K']] },
      ]},
      { key: 'invest', name: 'Investments', items: [
        { name: 'Brokerage · Morgan Stanley', value: 980000, source: 'Plaid + Canopy', sub: 'Taxable', rows: [['Cost basis', '$610K'], ['Unrealized gain', '$370K']], positions: [['AAPL', 'Apple', 180000, '+3.1%'], ['MSFT', 'Microsoft', 150000, '+2.4%'], ['VOO', 'S&P 500 ETF', 420000, '+1.2%'], ['Cash', 'Sweep', 230000, '+0.0%']] },
        { name: 'Employer RSUs (vested)', value: 430000, source: 'Manual', manual: true, sub: 'Single-stock concentration', rows: [['% of net worth', '23%'], ['Next vest', '$60K in Q3'], ['Added', 'Manually']], positions: [['TECHCO', 'Employer stock', 430000, '+5.6%']] },
        { name: 'Roth IRA', value: 190000, source: 'Plaid', sub: 'Self-directed', positions: [['VTI', 'US Total Market', 190000, '+1.2%']] },
      ]},
      { key: 'retire', name: 'Retirement', items: [
        { name: '401(k) · Fidelity', value: 410000, source: 'Plaid', sub: 'After-tax space available', rows: [['Mega-backdoor', '~$30K/yr unused']], positions: [['FXAIX', 'S&P 500', 290000, '+1.2%'], ['FXNAX', 'US Bond', 120000, '-0.3%']] },
      ]},
      { key: 'personal', name: 'Digital assets', items: [
        { name: 'Crypto · Coinbase', value: 60000, source: 'Coinbase', sub: 'Connected exchange', rows: [['BTC', '$38,000'], ['ETH', '$22,000'], ['Synced', 'via Coinbase']] },
      ]},
    ],
    liabilities: [
      { name: 'Mortgage', value: 320000, source: 'Plaid', sub: '30-yr fixed', rows: [['Rate', '4.2%'], ['Payment', '$1,720/mo']] },
      { name: 'Auto loan', value: 30000, source: 'Manual', sub: '48-mo', rows: [['Rate', '5.9%']] },
    ],
    insurance: [
      { name: 'Group disability', coverage: 120000, premium: 'Employer', source: 'Manual', sub: 'Income protection · capped' },
    ],
    history: [1.42, 1.55, 1.62, 1.7, 1.76, 1.8, 1.84],
  },

  patel: {
    categories: [
      { key: 'cash', name: 'Cash & banking', items: [
        { name: 'Business operating · Chase', value: 300000, source: 'Plaid', sub: 'Practice operating account', rows: [['Account', '••• 8841'], ['Avg balance', '$280K'], ['Monthly inflows', '~$200K']] },
        { name: 'Personal checking · Chase', value: 120000, source: 'Plaid', sub: 'Joint household', rows: [['Account', '••• 2207'], ['APY', '0.02%']] },
        { name: 'Personal savings · Marcus Bank', value: 60000, source: 'Plaid', sub: 'High-yield', rows: [['APY', '4.10%']] },
      ]},
      { key: 'biz', name: 'Business', items: [
        { name: 'Dental practice', value: 3200000, source: 'Manual', manual: true, sub: '100% owner · est. valuation', rows: [['Entity', 'Patel Family Dental, P.A.'], ['Structure', 'S-corp · 100% owner'], ['Annual revenue', '$2,400,000'], ['EBITDA', '$1,030,000'], ['Valuation basis', '3.1× EBITDA'], ['Buy-sell agreement', 'Not documented'], ['Key-person insurance', '$2,000,000'], ['Situs', 'FL'], ['Added', 'Manually']] },
        { name: 'Surgical-center JV (25%)', value: 540000, source: 'Manual', manual: true, sub: 'Minority interest', rows: [['Ownership', '25% of LLC'], ['Structure', 'Partnership · K-1'], ['Distributions', '~$70K / yr'], ['Valuation basis', 'Owner estimate'], ['Added', 'Manually']] },
      ]},
      { key: 'invest', name: 'Investments', items: [
        { name: 'Brokerage · Fidelity', value: 2100000, source: 'Plaid + Canopy', sub: 'Taxable', rows: [['Cost basis', '$1.4M']], positions: [['VTI', 'US Total Market', 900000, '+2.1%'], ['VEA', 'Developed Intl', 420000, '+0.6%'], ['BND', 'US Agg Bond', 480000, '-0.4%'], ['Cash', 'Sweep', 300000, '+0.0%']] },
        { name: '529 plans ×3', value: 330000, source: 'Plaid', sub: 'Education · 3 children', rows: [['Child 1', '$140,000'], ['Child 2', '$110,000'], ['Child 3', '$80,000']] },
        { name: 'Private credit fund', value: 400000, source: 'Manual', manual: true, sub: 'Alternative · committed', rows: [['Commitment', '$500,000'], ['Called', '$400,000'], ['Vintage', '2023'], ['Target net IRR', '9–11%'], ['Added', 'Manually']] },
      ]},
      { key: 're', name: 'Real estate', items: [
        { name: 'Practice building', value: 1900000, source: 'Attom', sub: 'Commercial · medical office', rows: [['Property type', 'Commercial · medical office'], ['Address', '55 Brightwater Blvd, Tampa FL 33602'], ['Building area', '6,400 sq ft'], ['Year built', '2009'], ['Occupancy', 'Owner-occupied (practice)'], ['Attom AVM', '$1,900,000'], ['Cap rate', '6.2%'], ['Net operating income', '$118,000 / yr'], ['Equity', '$1,800,000'], ['Property tax', '$31,600 / yr'], ['Linked mortgage', '−$100,000 · 5.5%'], ['Linked insurance', 'Commercial property + GL']] },
        { name: 'Primary residence', value: 1450000, source: 'Attom', sub: 'Tampa, FL', rows: [['Property type', 'Single-family'], ['Address', '910 Bayshore Ct, Tampa FL 33606'], ['Beds / baths', '5 bd · 4.5 ba'], ['Living area', '4,300 sq ft'], ['Year built', '2015'], ['Attom AVM', '$1,450,000'], ['Property tax', '$19,800 / yr'], ['Linked mortgage', '−$520,000 · 4.6%']] },
        { name: 'Rental condo', value: 480000, source: 'Attom', sub: 'Investment property', rows: [['Property type', 'Condo · rented'], ['Address', '300 Beach Dr NE, St. Petersburg FL'], ['Rental income', '$2,900 / mo'], ['Attom AVM', '$480,000'], ['Linked mortgage', '−$210,000 · 6.1%']] },
      ]},
      { key: 'retire', name: 'Retirement', items: [
        { name: '401(k) · practice plan', value: 620000, source: 'Plaid', sub: 'Employer plan', rows: [['Cash-balance plan', 'Opportunity']], positions: [['FXAIX', 'S&P 500', 400000, '+1.2%'], ['FXNAX', 'US Bond', 220000, '-0.3%']] },
        { name: 'Cash-balance plan', value: 200000, source: 'Plaid', sub: 'Defined benefit', rows: [['Funded', '$200,000'], ['Annual add', '$150K+ potential']] },
      ]},
      { key: 'personal', name: 'Personal property', items: [
        { name: 'Jewelry & watches', value: 100000, source: 'Manual', manual: true, sub: 'Appraised', rows: [['Value basis', 'Appraisal'], ['Last appraisal', '2024'], ['Added', 'Manually']] },
        { name: '2023 Range Rover', value: 96000, source: 'Enrichment', sub: 'Vehicle · MarketCheck', rows: [['Year / make', '2023 Land Rover'], ['Model', 'Range Rover HSE'], ['VIN', 'SALGS2RU8PA••••'], ['Market value', 'est. via MarketCheck']] },
      ]},
    ],
    liabilities: [
      { name: 'Practice building mortgage', value: 100000, source: 'Plaid', sub: 'Commercial', rows: [['Rate', '5.5%'], ['Maturity', '2031'], ['Payment', '$4,100/mo']] },
      { name: 'Primary residence mortgage', value: 520000, source: 'Plaid', sub: '30-yr fixed', rows: [['Rate', '4.6%'], ['Payment', '$2,960/mo']] },
      { name: 'Rental condo mortgage', value: 210000, source: 'Plaid', sub: 'Investment', rows: [['Rate', '6.1%'], ['Payment', '$1,420/mo']] },
      { name: 'Practice equipment loan', value: 140000, source: 'Manual', sub: 'Equipment financing', rows: [['Rate', '7.2%'], ['Term', '60-mo']] },
    ],
    insurance: [
      { name: 'Key-person life', coverage: 2000000, premium: '$310/mo', source: 'Manual', sub: 'Practice continuity' },
      { name: 'Own-occupation disability', coverage: 300000, premium: '$240/mo', source: 'Manual', sub: 'Annual benefit' },
      { name: 'Term life · Raj', coverage: 3000000, premium: '$190/mo', source: 'Manual', sub: '20-yr term' },
      { name: 'Term life · Priya', coverage: 1500000, premium: '$95/mo', source: 'Manual', sub: '20-yr term' },
      { name: 'Practice liability (malpractice)', coverage: 3000000, premium: '$1,050/mo', source: 'Manual', sub: 'Professional · per-claim' },
      { name: 'Umbrella liability', coverage: 3000000, premium: '$120/mo', source: 'Manual', sub: 'Personal umbrella' },
    ],
    history: [8.1, 8.6, 9.0, 9.3, 9.6, 9.85, 10.05],
  },

  eleanor: {
    categories: [
      { key: 'cash', name: 'Cash & banking', items: [
        { name: 'T-bill ladder · Meridian', value: 1200000, source: 'Plaid', sub: 'Treasury ladder', rows: [['Rungs', '3 / 6 / 9 / 12 mo'], ['Avg yield', '4.8%']] },
        { name: 'Private-bank deposits', value: 500000, source: 'Plaid', sub: 'Demand + premium MMF', rows: [['APY', '4.2%']] },
        { name: 'Foundation operating cash', value: 180000, source: 'Plaid', sub: 'Whitfield Family Foundation', rows: [['Use', 'Grants & operations']] },
      ]},
      { key: 'invest', name: 'Investments', items: [
        { name: 'Managed portfolio · Meridian', value: 19900000, source: 'Plaid + Canopy', sub: 'Discretionary · multi-asset', rows: [['Manager', 'Meridian'], ['Mandate', 'Balanced growth']], positions: [['Equities', 'Global equity sleeve', 11000000, '+1.4%'], ['Fixed income', 'IG + muni', 5400000, '-0.2%'], ['Alternatives', 'PE + hedge', 2500000, '+0.0%'], ['Cash', 'Sweep', 1000000, '+0.0%']] },
        { name: 'Legacy stock (single)', value: 11200000, source: 'Plaid', sub: 'Concentrated · low basis', rows: [['% of net worth', '24%'], ['Cost basis', '~$0.9M'], ['Unrealized gain', '$10.3M']], positions: [['LEGCO', 'Legacy holding', 11200000, '+0.7%']] },
        { name: 'Private equity — committed funds', value: 4800000, source: 'Manual', manual: true, sub: '5 funds · multiple vintages', rows: [['Total commitment', '$7,500,000'], ['Called to date', '$4,800,000'], ['Distributions', '$2,100,000'], ['Vintages', '2018–2024'], ['Net IRR (blended)', '14.2%'], ['Added', 'Manually']] },
        { name: 'Hedge fund — multi-strategy', value: 3100000, source: 'Manual', manual: true, sub: 'Alternative · quarterly liquidity', rows: [['Strategy', 'Multi-strat'], ['Lock-up', '1 yr'], ['Liquidity', 'Quarterly · 65-day notice'], ['High-water mark', 'Yes'], ['Added', 'Manually']] },
        { name: 'Direct venture & angel', value: 1600000, source: 'Manual', manual: true, sub: '12 private companies', rows: [['Holdings', '12 companies'], ['Stage', 'Seed–Series C'], ['Marks', 'Last-round / 409A'], ['Added', 'Manually']] },
      ]},
      { key: 're', name: 'Real estate', items: [
        { name: 'Greenwich, CT — primary', value: 4200000, source: 'Attom', sub: 'Primary residence', rows: [['Property type', 'Single-family estate'], ['Address', '22 Round Hill Rd, Greenwich CT 06831'], ['Beds / baths', '7 bd · 9 ba'], ['Living area', '12,400 sq ft'], ['Lot size', '4.2 acres'], ['Year built', '2001'], ['Ownership', 'Whitfield Revocable Trust'], ['Attom AVM', '$4,200,000'], ['Property tax', '$58,000 / yr'], ['Mortgage', 'None — owned outright'], ['Insurance', 'Scheduled dwelling + flood']] },
        { name: 'Aspen, CO — second home', value: 2100000, source: 'Attom', sub: 'Vacation residence', rows: [['Property type', 'Mountain chalet'], ['Address', '411 W Hallam St, Aspen CO 81611'], ['Beds / baths', '5 bd · 5.5 ba'], ['Living area', '4,800 sq ft'], ['Year built', '2009'], ['Ownership', 'Whitfield Revocable Trust'], ['Attom AVM', '$2,100,000'], ['Property tax', '$24,000 / yr'], ['Mortgage', 'None'], ['Insurance', 'Scheduled dwelling + wildfire']] },
        { name: 'New York, NY — pied-à-terre', value: 1500000, source: 'Attom', sub: 'Co-op apartment', rows: [['Property type', 'Co-op · 2 BR'], ['Address', '15 Central Park West, New York NY'], ['Beds / baths', '2 bd · 2.5 ba'], ['Living area', '1,950 sq ft'], ['Year built', '2008'], ['Ownership', 'Individual'], ['Attom AVM', '$1,500,000'], ['Maintenance', '$4,200 / mo'], ['Mortgage', 'None'], ['Insurance', 'HO-6 walls-in']] },
        { name: 'Vineyard estate — Napa, CA', value: 6800000, source: 'Attom', sub: 'Operating vineyard', rows: [['Property type', 'Agricultural estate'], ['Address', '1450 Silverado Trail, Napa CA'], ['Acreage', '38 acres · 22 planted'], ['Year built', '1998'], ['Ownership', 'Whitfield Dynasty Trust'], ['Attom AVM', '$6,800,000'], ['Annual yield', '~$420K grape sales'], ['Mortgage', 'None'], ['Insurance', 'Crop + dwelling + liability']] },
      ]},
      { key: 'personal', name: 'Art & collectibles', items: [
        { name: 'Fine art collection', value: 2900000, source: 'Manual', manual: true, sub: 'Appraised · 11 works', rows: [['Type', 'Fine art · 11 works'], ['Value basis', 'Appraisal'], ['Last appraisal', '2025'], ['Insured value', '$3,100,000'], ['Storage', 'Climate-controlled · 2 sites'], ['Provenance', 'Fully documented'], ['Added', 'Manually']] },
        { name: 'Classic car collection', value: 1450000, source: 'Manual', manual: true, sub: '6 vehicles', rows: [['Vehicles', '6 · 1960s–1990s'], ['Value basis', 'Guide + appraisal'], ['Storage', 'Climate-controlled'], ['Insurance', 'Agreed-value collector'], ['Added', 'Manually']] },
        { name: 'Wine cellar', value: 380000, source: 'Manual', manual: true, sub: '~2,400 bottles', rows: [['Bottles', '~2,400'], ['Value basis', 'Auction comps'], ['Added', 'Manually']] },
        { name: 'Jewelry & watches', value: 620000, source: 'Manual', manual: true, sub: 'Scheduled valuables', rows: [['Value basis', 'Appraisal'], ['Insurance', 'Scheduled valuables floater'], ['Added', 'Manually']] },
      ]},
    ],
    liabilities: [
      { name: 'Securities-backed line', value: 1500000, source: 'Plaid', sub: 'Against managed portfolio', rows: [['Rate', '6.1%'], ['Limit', '$8M'], ['Use', 'Liquidity timing']] },
      { name: 'Art-backed credit line', value: 900000, source: 'Manual', sub: 'Against collection', rows: [['Rate', '6.8%'], ['Limit', '$1.5M']] },
      { name: 'Vineyard equipment lease', value: 140000, source: 'Manual', sub: 'Operating lease', rows: [['Term', '60-mo']] },
    ],
    insurance: [
      { name: 'Survivorship life (ILIT)', coverage: 10000000, premium: 'In trust', source: 'Manual', sub: 'Estate liquidity' },
      { name: 'Excess liability (umbrella)', coverage: 10000000, premium: '$680/mo', source: 'Manual', sub: 'Personal umbrella' },
      { name: 'Fine-art / valuables floater', coverage: 3100000, premium: '$420/mo', source: 'Manual', sub: 'Scheduled items' },
      { name: 'Collector-car (agreed value)', coverage: 1450000, premium: '$210/mo', source: 'Manual', sub: '6 vehicles' },
      { name: 'Directors & officers (foundation)', coverage: 2000000, premium: '$180/mo', source: 'Manual', sub: 'Foundation board' },
      { name: 'Vineyard crop & liability', coverage: 1500000, premium: '$390/mo', source: 'Manual', sub: 'Agricultural operations' },
      { name: 'Kidnap & ransom', coverage: 5000000, premium: '$300/mo', source: 'Manual', sub: 'Family · travel' },
    ],
    history: [40.0, 42.5, 44.0, 45.2, 46.4, 47.5, 48.4],
  },
};

export const CAT_COLORS: Record<string, string> = {
  cash: '#1F4EDC', invest: '#0E7C5A', retire: '#8A38F5',
  re: '#C77700', biz: '#0891B2', personal: '#E11D74', other: '#64748B',
};

export const CAT_NAMES: Record<string, string> = {
  cash: 'Cash & banking', invest: 'Investments', retire: 'Retirement',
  re: 'Real estate', biz: 'Business', personal: 'Personal property',
};

export const VIN_SAMPLES: [string, string, string, string, number][] = [
  ['2022', 'Tesla', 'Model Y Long Range', 'AWD', 38400],
  ['2021', 'Toyota', 'RAV4', 'XLE Premium', 27600],
  ['2023', 'BMW', 'X5', 'xDrive40i', 58900],
  ['2020', 'Honda', 'Accord', 'EX-L 2.0T', 24200],
  ['2022', 'Ford', 'F-150', 'Lariat SuperCrew', 46800],
  ['2023', 'Porsche', '911', 'Carrera S', 128500],
];

export const ATTOM_SAMPLES: [string, number, number, number, number, number, number][] = [
  ['Single-family', 4, 3, 2840, 1998, 1240000, 14800],
  ['Condominium', 2, 2, 1320, 2014, 720000, 8600],
  ['Townhouse', 3, 2.5, 2100, 2006, 910000, 10200],
  ['Single-family', 5, 4.5, 3960, 2012, 2150000, 22400],
  ['Single-family', 3, 2, 1760, 1985, 560000, 6800],
  ['Estate', 6, 7, 8200, 2003, 4250000, 41200],
];
