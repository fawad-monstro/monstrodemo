import type { MarketSourceRow, UserSourceRow } from '../types';

export const MARKET_SOURCES: MarketSourceRow[] = [
  ['Quodd Global Master', 'Reference & security master', ['Symbol / CUSIP / ISIN / SEDOL', 'Security name & type', 'Exchange & MIC', 'Currency & country', 'Sector / industry (GICS)', 'Shares outstanding', 'Lot size & tick size', 'Listing & delisting dates']],
  ['Quodd Global Quotes (Delayed)', 'Equity & ETF pricing · 15-min', ['Last / bid / ask', 'Open · high · low · close', 'Volume & VWAP', '% change & net change', '52-week high / low', 'Previous close', 'Market-cap', 'Quote timestamp']],
  ['Quodd Corporate Actions', 'Splits, dividends & events', ['Ex-date / record / pay date', 'Dividend amount & frequency', 'Split ratio', 'Spin-offs & mergers', 'Return of capital', 'Special distributions']],
  ['Quodd Crypto', 'Digital-asset pricing', ['Spot price (USD)', '24h volume', '24h % change', 'Market-cap', 'Circulating supply', 'Pair / venue']],
  ['Xignite (Quodd legacy)', 'FX, rates & fund-data feeds', ['FX spot & cross rates', 'Reference interest rates', 'Fund NAV & metadata', 'Historical time series']],
  ['S&P Capital IQ', 'Company fundamentals & estimates', ['Income statement & balance sheet', 'EPS & consensus estimates', 'Valuation multiples', 'Credit ratings', 'Ownership & filings', 'Industry benchmarks']],
  ['S&P Global Market Intelligence', 'Credit, sector & market data', ['Issuer credit ratings', 'Sector & market indices', 'Supply-chain & ownership', 'RatingsDirect commentary']],
  ['LSEG / Refinitiv', 'Premium market data & analytics', ['Real-time & reference pricing', 'Estimates & ownership', 'ESG scores', 'Fixed-income analytics']],
  ['PitchBook', 'Private-market, PE & VC data', ['Company profiles (4.8M+)', 'Deals & rounds', 'Investors & funds', 'Cap tables & valuations', 'Comps & multiples']],
  ['MarketCheck', 'Vehicle market valuations', ['Year / make / model / trim', 'VIN decode', 'Market value & price range', 'Mileage-adjusted value', 'Days-on-market', 'Dealer listing comps']],
  ['NAVs', 'Mutual-fund net asset values', ['Daily NAV', 'Fund name & CUSIP', 'Expense ratio', 'Distribution yield', 'Share-class detail']],
  ['Rates', 'Deposit, treasury & lending rates', ['Treasury yield curve', 'SOFR / Fed funds', 'Deposit & HYSA rates', 'Mortgage & lending rates', 'Muni & corporate benchmarks']],
];

export const USER_SOURCES: UserSourceRow[] = [
  ['Plaid', 'Bank & brokerage account links', ['Account balances (live)', 'Holdings & positions', 'Transactions & categories', 'Account & routing (tokenized)', 'Account type & registration', 'Owner identity']],
  ['Canopy', 'Tax lots & account aggregation', ['Tax lots & cost basis', 'Realized & unrealized gains', 'Wash-sale flags', 'Income & dividends', '1099 reconciliation', 'Carryforwards']],
  ['Attom', 'Property & real-estate valuation', ['AVM market value', 'Beds / baths / living area', 'Lot size & year built', 'Assessed value & property tax', 'Sale & deed history', 'Owner of record']],
];
