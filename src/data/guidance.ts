import type { GuidanceItem } from '../types';

export const GUIDANCE: Record<string, GuidanceItem> = {
  mc_cash: { domain: 'Cash flow', status: 'New', headline: 'Put your idle cash to work', teaser: 'You have more cash than your safety net needs.',
    clientBody: 'You\'ve got about $15,000 sitting in checking earning almost nothing, while still keeping a healthy safety net. Moving it into a high-yield savings account earns roughly $640 more a year — same access, no lockup. Want us to set it up?',
    advisorWhy: '$23,000 in checking at 0.01% APY against a 6-month emergency-fund target that is 3.1 months funded. Rates feed shows a 4.35% HYSA available. Moving $15,000 preserves a full buffer while capturing ~$640/yr — a high-certainty, low-risk action appropriate for a mass-market saver.',
    calcs: [['Idle cash above buffer', '$15,000'], ['Rate delta', '4.34% (4.35% vs 0.01%)'], ['Annualized benefit', '~$640 / yr']],
    market: ['Rates'], user: ['Plaid'], action: 'Move to high-yield savings', vid: '0:52' },

  mc_ret: { domain: 'Retirement', status: 'Ready', headline: 'Don\'t leave free money on the table', teaser: 'Your employer match isn\'t fully captured.',
    clientBody: 'Your employer matches 401(k) contributions up to 5%, but you\'re contributing 3% — so you\'re missing part of the match. Bumping to 5% adds about $1,400 a year in free money, plus your own savings. Small change, big long-term difference.',
    advisorWhy: 'Contributing 3% against a 5% match cap. At ~$84k salary, raising to 5% captures the remaining ~$1,400/yr employer match plus tax-deferred growth. No liquidity concern given the cash position.',
    calcs: [['Current vs match cap', '3% vs 5%'], ['Unclaimed match', '~$1,400 / yr'], ['30-yr value at 6%', '~$190,000']],
    market: ['NAVs'], user: ['Plaid'], action: 'Raise contribution to 5%', vid: '1:04' },

  mc_insure: { domain: 'Insurance', status: 'New', headline: 'A low-cost way to protect your income', teaser: 'You have no disability coverage.',
    clientBody: 'If an injury or illness kept you from working, you don\'t have anything to replace your paycheck. A disability policy is inexpensive at your age and protects the income everything else depends on. Want to see options?',
    advisorWhy: 'No long-term disability coverage detected; employer plan is short-term only (~60%). At 29 with limited assets, income protection is the highest-leverage protection gap. Term life is secondary given no dependents — revisit if the household changes.',
    calcs: [['Income at risk', '~$84,000 / yr'], ['LTD coverage', 'None'], ['Est. premium', '~$32 / mo'], ['Priority', 'Income protection']],
    market: ['Rates'], user: ['Plaid'], action: 'See disability options', vid: '0:58' },

  mc_tax: { domain: 'Tax', status: 'Ready', headline: 'You may qualify for the Saver\'s Credit', teaser: 'A tax credit for retirement savers.',
    clientBody: 'Because of your income, the money you put into retirement may earn you a federal tax credit on top of the break you already get — up to $1,000 back. We\'ll make sure you claim it at tax time.',
    advisorWhy: 'AGI within the Saver\'s Credit phase-in. Current 401(k) deferrals qualify for a 10–50% credit on up to $2,000 contributed. Coordinate with the contribution-increase recommendation to optimize the credit tier.',
    calcs: [['Credit rate', '10–50% tier'], ['Eligible contribution', '$2,000'], ['Est. credit', 'up to $1,000'], ['Action', 'Claim on filing']],
    market: ['NAVs'], user: ['Plaid'], action: 'Flag for tax filing', vid: '0:48' },

  do_tax: { domain: 'Tax', status: 'New', headline: 'A way to lower this year\'s tax bill', teaser: 'Three positions are below cost — usable now.',
    clientBody: 'A few of your investments are temporarily down. By realizing those losses now we can offset gains elsewhere — an estimated $11,300 in tax savings — while keeping you fully invested. Nothing for you to do; we\'ll place the trades once you approve.',
    advisorWhy: 'Realized gains of $22,400 YTD plus three equity lots below cost open a harvesting window. Booking $48,200 of losses fully offsets realized gains and carries ~$25,800 forward — est. $11,300 federal benefit at the 37% bracket + 3.8% NIIT. Reinvest VTI→ITOT (0.99 correlation) to hold exposure within the 30-day wash-sale rule.',
    calcs: [['Harvestable losses', '$48,200 across 3 lots'], ['Wash-sale scan', '2 of 3 lots clear'], ['Replacement', 'VTI → ITOT (0.99 corr.)'], ['Est. tax benefit', '$11,300']],
    market: ['Quodd Global Quotes (Delayed)', 'NAVs', 'S&P Capital IQ'], user: ['Plaid', 'Canopy'], action: 'Approve harvest trades', vid: '2:14' },

  do_invest: { domain: 'Investments', status: 'Ready', headline: 'Time to rebalance your portfolio', teaser: 'Your mix has drifted toward stocks.',
    clientBody: 'As the market rose, your investments drifted toward stocks — now about 78% versus your 65% target. A tax-smart adjustment brings it back in line, keeping your risk where you want it. We can use the same loss positions to keep it tax-neutral.',
    advisorWhy: 'Equity at 78% vs 65% policy target — beyond the ±5% band. A tax-aware rebalance trims 13% into fixed income, sequenced with the harvest lots to stay tax-neutral. Drift driven by concentrated large-cap appreciation per Quodd pricing.',
    calcs: [['Equity weight', '78% vs 65% target'], ['Over band', '+13% (band ±5%)'], ['Trade set', 'Sell VTI → buy BND / AGG'], ['Tax impact', 'Neutral (paired w/ harvest)']],
    market: ['Quodd Global Master', 'Quodd Global Quotes (Delayed)', 'S&P Capital IQ'], user: ['Plaid', 'Canopy'], action: 'Review rebalance plan', vid: '1:38' },

  do_ret: { domain: 'Retirement', status: 'Ready', headline: 'Two moves to strengthen retirement', teaser: 'Backdoor Roth + unused catch-up.',
    clientBody: 'You\'re in good shape for retirement, with two easy improvements: a "backdoor" Roth contribution and the catch-up contribution you\'re eligible for at your age. Together they add meaningfully to your tax-free retirement savings.',
    advisorWhy: 'Funding ratio 0.92. Household is backdoor-Roth eligible (income over the direct limit) and David (54) has $7,500 catch-up unused. Executing both improves the ratio toward 1.0 without changing risk posture.',
    calcs: [['Funding ratio', '0.92 vs 1.0'], ['Backdoor Roth', 'Eligible'], ['Catch-up unused', '$7,500'], ['Combined add', '$15,000 / yr tax-advantaged']],
    market: ['NAVs'], user: ['Plaid', 'Canopy'], action: 'Plan contributions', vid: '1:20' },

  do_estate: { domain: 'Estate', status: 'New', headline: 'You don\'t have a will or trust on file', teaser: 'Core estate documents are missing.',
    clientBody: 'Right now there\'s no will or trust on record for your family. Putting these basics in place ensures your wishes are followed and spares your kids a slow, public process. We can connect you with an estate attorney.',
    advisorWhy: 'No will or revocable trust on file for a $3.24M estate with two college-age children. Intestacy and probate exposure. Recommend a revocable living trust, pour-over will, guardianship designations, and beneficiary alignment across accounts.',
    calcs: [['Estate value', '$3.24M'], ['Documents on file', 'None'], ['Dependents', '2'], ['Action', 'RLT + pour-over will']],
    market: ['NAVs'], user: ['Plaid', 'Canopy'], action: 'Connect with estate attorney', vid: '1:16' },

  do_insure: { domain: 'Insurance', status: 'Ready', headline: 'Your coverage hasn\'t kept pace with your wealth', teaser: 'Liability & disability gaps.',
    clientBody: 'As your net worth has grown, your insurance hasn\'t caught up. A larger umbrella policy shields your assets from lawsuits, and as a physician your disability coverage is worth a second look. We\'ll review both.',
    advisorWhy: '$3.24M net worth against a $1M umbrella — liability exposure. Physician own-occupation disability likely underinsured vs. income. Recommend ~$5M umbrella (cost-efficient) and an own-occ disability review; term life sized to income replacement + education funding.',
    calcs: [['Net worth', '$3.24M'], ['Umbrella', '$1M (low)'], ['Recommended', '~$5M umbrella'], ['Disability', 'Own-occ review']],
    market: ['Rates'], user: ['Plaid'], action: 'Review coverage', vid: '1:22' },

  do_cash: { domain: 'Cash flow', status: 'Ready', headline: 'Idle cash could be working harder', teaser: 'Brokerage sweep is earning below market.',
    clientBody: 'A meaningful balance is sitting in your brokerage sweep earning less than it could. We can move part of it into a higher-yield option or toward your goals — without touching what you keep on hand.',
    advisorWhy: '~$140k in brokerage sweep at sub-market yield vs. an available money-market / T-bill ladder. Retain a 6-month reserve and ladder the remainder; weigh incremental mortgage paydown against the current rate.',
    calcs: [['Sweep balance', '~$140,000'], ['Sweep vs MMF', '~3.9% delta'], ['Reserve to hold', '6 months'], ['Action', 'Ladder the excess']],
    market: ['Rates', 'Quodd Global Master'], user: ['Plaid'], action: 'Optimize cash', vid: '1:02' },

  mb_invest: { domain: 'Investments', status: 'New', headline: 'Reduce your employer-stock concentration', teaser: '38% of your wealth is in one stock.',
    clientBody: 'A big share of your wealth — about 38% — is tied up in your employer\'s stock through RSUs. We can unwind it gradually and tax-smartly so a single company\'s swings don\'t put your goals at risk.',
    advisorWhy: 'Employer concentration ~38% ($430K vested RSUs + correlated holdings) of $1.84M. Recommend a 10b5-1-style staged sell-down at each vest, tax-loss paired where possible, redeploying into a diversified core. Watch ordinary-income treatment at vest.',
    calcs: [['Concentration', '38% employer stock'], ['Approach', 'Staged sell at vest'], ['Pairing', 'Tax-loss where available'], ['Target', '<10% single name']],
    market: ['Quodd Global Quotes (Delayed)', 'S&P Capital IQ'], user: ['Plaid', 'Canopy'], action: 'Model diversification', vid: '1:34' },

  mb_tax: { domain: 'Tax', status: 'Ready', headline: 'Plan for your RSU tax hit', teaser: 'Vesting will spike your income.',
    clientBody: 'Your upcoming stock vesting counts as income, and the default withholding usually isn\'t enough — which can mean a surprise bill. We\'ll plan withholding and timing so April holds no surprises.',
    advisorWhy: 'RSU vesting adds ~$180K ordinary income; the statutory 22% supplemental rate underwithholds at the 35% bracket. Recommend an estimated-payment top-up and coordinating vest-year charitable and harvest levers.',
    calcs: [['Vesting income', '~$180,000'], ['Withholding gap', '22% vs 35%'], ['Action', 'Estimated-tax top-up'], ['Lever', 'Bunch deductions']],
    market: ['NAVs'], user: ['Plaid', 'Canopy'], action: 'Plan withholding', vid: '1:12' },

  mb_ret: { domain: 'Retirement', status: 'Ready', headline: 'Unlock the mega-backdoor Roth', teaser: 'You can save far more, tax-free.',
    clientBody: 'Your 401(k) plan allows a powerful extra step — the "mega-backdoor" Roth — that lets you put away thousands more in tax-free retirement savings each year. You\'re not using it yet.',
    advisorWhy: 'Plan permits after-tax contributions plus in-plan Roth conversion. Headroom ~$30K/yr beyond the elective deferral. A high marginal rate and long horizon make Roth treatment of growth attractive.',
    calcs: [['Strategy', 'Mega-backdoor Roth'], ['Annual headroom', '~$30,000'], ['Current use', 'None'], ['Benefit', 'Tax-free growth']],
    market: ['NAVs'], user: ['Plaid'], action: 'Set up contributions', vid: '1:06' },

  mb_insure: { domain: 'Insurance', status: 'New', headline: 'Cover the gaps a single income leaves', teaser: 'No umbrella or disability cover.',
    clientBody: 'With a high income and no dependents yet, two things matter most: protecting that income if you couldn\'t work, and an umbrella policy to shield your growing assets. Both are inexpensive relative to what they protect.',
    advisorWhy: '$1.84M net worth, no umbrella; employer LTD caps below income. Recommend ~$2M umbrella and supplemental own-occupation disability. Life insurance is low priority absent dependents — revisit on household change.',
    calcs: [['Umbrella', 'None vs ~$2M'], ['Disability', 'Employer-capped'], ['Life', 'Low priority (no deps)'], ['Cost', 'Modest vs exposure']],
    market: ['Rates'], user: ['Plaid'], action: 'Review coverage', vid: '1:00' },

  mb_cash: { domain: 'Cash flow', status: 'Ready', headline: 'Put your equity-comp cash to work', teaser: 'Cash builds up between vests.',
    clientBody: 'Cash from your paycheck and stock sales tends to pile up in checking. We can route the excess into a high-yield account and toward your goals automatically, so it\'s always working without you thinking about it.',
    advisorWhy: '$120K checking, well above reserve need. Implement an automated sweep to HYSA/MMF and goal funding; coordinate liquidity around vest dates and estimated-tax payments.',
    calcs: [['Excess cash', '~$90,000'], ['Sweep target', 'HYSA / MMF'], ['Yield pickup', '~4.3%'], ['Action', 'Automate sweep']],
    market: ['Rates'], user: ['Plaid'], action: 'Automate savings', vid: '0:54' },

  rp_estate: { domain: 'Estate', status: 'New', headline: 'Document your business succession plan', teaser: 'No plan for the practice yet.',
    clientBody: 'Your dental practice is a big part of your family\'s wealth, but there\'s no documented plan for what happens to it if something changed. A succession and buy-sell plan protects both your family and the business.',
    advisorWhy: '$3.2M practice interest with no buy-sell or succession documentation. Recommend a life-insurance-funded buy-sell, an entity valuation, and integration with estate documents — coordinated with $8.5M estate planning under the 2026 sunset.',
    calcs: [['Practice value', '$3.2M'], ['Buy-sell', 'None'], ['Funding', 'Life-insurance funded'], ['Action', 'Succession + buy-sell']],
    market: ['NAVs'], user: ['Plaid', 'Canopy', 'Attom'], action: 'Schedule estate review', vid: '1:28' },

  rp_tax: { domain: 'Tax', status: 'Ready', headline: 'Optimize how your business is taxed', teaser: 'QBI & entity structure.',
    clientBody: 'How your practice is structured affects how much tax you pay. A review of your entity choice and the qualified-business-income deduction could save a meaningful amount each year.',
    advisorWhy: 'Pass-through above the QBI threshold; the current entity may forgo S-corp salary optimization and QBI maximization. Model a reasonable-comp split, retirement-plan interplay, and the PTET SALT-cap workaround.',
    calcs: [['Entity', 'Review S-corp election'], ['QBI', 'Phase-out planning'], ['PTET', 'SALT-cap workaround'], ['Est. savings', '5-figure / yr']],
    market: ['NAVs'], user: ['Plaid', 'Canopy'], action: 'Model entity options', vid: '1:18' },

  rp_invest: { domain: 'Investments', status: 'Ready', headline: 'Diversify beyond the business', teaser: 'Wealth concentrated in practice + property.',
    clientBody: 'Most of your wealth sits in your practice and commercial real estate. Building a diversified investment base alongside them gives your family stability that doesn\'t depend on one business or one property market.',
    advisorWhy: '~60% in the business plus directly-held commercial real estate. Recommend systematic diversification of liquid proceeds into a global core, REIT-aware to avoid doubling real-estate beta, sequenced with entity and tax planning.',
    calcs: [['Concentration', '~60% biz + CRE'], ['Liquid core', 'Build global mix'], ['RE overlap', 'Trim REIT beta'], ['Pace', 'Staged']],
    market: ['Quodd Global Master', 'S&P Capital IQ'], user: ['Plaid', 'Canopy'], action: 'Review allocation', vid: '1:24' },

  rp_ret: { domain: 'Retirement', status: 'Ready', headline: 'A bigger tax-advantaged retirement option', teaser: 'Cash-balance plan opportunity.',
    clientBody: 'As practice owners with strong cash flow, you may be able to set aside far more for retirement — and lower this year\'s taxes — through a cash-balance plan layered on your 401(k).',
    advisorWhy: 'Owner profile supports a cash-balance/DB plan stacked on the 401(k), enabling six-figure deductible contributions given census and income. Model the funding range and staff cost.',
    calcs: [['Vehicle', 'Cash-balance + 401(k)'], ['Deductible add', '$150K+ / yr'], ['Constraint', 'Staff census cost'], ['Action', 'Actuarial study']],
    market: ['NAVs'], user: ['Plaid', 'Canopy'], action: 'Run a plan study', vid: '1:20' },

  rp_insure: { domain: 'Insurance', status: 'New', headline: 'Protect the family and the practice', teaser: 'Key-person & liability gaps.',
    clientBody: 'Two protection gaps stand out: coverage that keeps the practice whole if one of you couldn\'t work, and an umbrella policy sized to your wealth. We\'ll review key-person, buy-sell funding, and liability together.',
    advisorWhy: '$8.5M estate with practice dependency on the owners. Recommend key-person and buy-sell life insurance, own-occupation disability for both, and a $5–10M umbrella. ILIT consideration for estate-tax liquidity given the 2026 sunset.',
    calcs: [['Umbrella', '$5–10M rec.'], ['Key-person', 'Practice continuity'], ['Disability', 'Own-occ, both'], ['ILIT', 'Estate liquidity']],
    market: ['NAVs'], user: ['Plaid', 'Canopy', 'Attom'], action: 'Review protection plan', vid: '1:26' },

  ew_estate: { domain: 'Estate', status: 'New', headline: 'A window to pass on more, tax-free', teaser: 'Act before the 2026 exemption sunset.',
    clientBody: 'There\'s a limited window to move more of your wealth to your family without estate tax. Acting before the 2026 rule change could protect millions. We\'d like to walk you and your attorney through the options together.',
    advisorWhy: 'Taxable estate of $42.0M vs a 2026 per-person exemption of $7.0M implies ~$13.9M exposure at 40%. The exemption is scheduled to fall. SLAT capacity modeled to accelerate lifetime gifting now, locking in today\'s higher exemption — time-sensitive, requires estate-counsel coordination.',
    calcs: [['Taxable estate', '$42.0M'], ['Combined exemption', '$14.0M (2026)'], ['Projected estate tax', '~$13.9M at 40%'], ['Action', 'Accelerate gifting + SLAT']],
    market: ['NAVs', 'Quodd Global Master'], user: ['Plaid', 'Canopy', 'Attom'], action: 'Schedule estate review', vid: '1:24' },

  ew_invest: { domain: 'Investments', status: 'Ready', headline: 'Reduce single-stock concentration', teaser: '27% of wealth sits in one position.',
    clientBody: 'A large share of your wealth — about 27% — is concentrated in a single legacy stock. We can reduce that risk gradually and tax-efficiently, using charitable and gifting strategies so you keep more of the value.',
    advisorWhy: 'Legacy position is $11.2M of $42M (27%) — significant idiosyncratic risk. Recommend staged diversification via a charitable remainder trust and annual gifting of low-basis shares to minimize realized gains. Coordinated with the estate plan.',
    calcs: [['Concentration', '27% in 1 position'], ['Est. cost basis', '~$0.9M'], ['Vehicle', 'CRT + gifting low-basis lots'], ['Pace', 'Staged over 3 yrs']],
    market: ['Quodd Global Quotes (Delayed)', 'S&P Capital IQ'], user: ['Plaid', 'Canopy'], action: 'Model diversification', vid: '2:02' },

  ew_tax: { domain: 'Tax', status: 'Ready', headline: 'Make your giving work harder', teaser: 'Charitable gifting window is open.',
    clientBody: 'You can give to the causes you care about in a way that also reduces your taxes — by donating appreciated stock rather than cash. This avoids capital-gains tax and gives you a larger deduction. We\'ll prepare the options.',
    advisorWhy: 'Donating appreciated low-basis shares from the legacy position avoids LTCG on the gifted lots and yields a fair-market-value deduction. Pairs with the concentration-reduction plan. Donor-advised fund recommended for timing flexibility.',
    calcs: [['Vehicle', 'Donor-advised fund'], ['Gift type', 'Appreciated shares'], ['Cap-gains avoided', '~23.8% of gain'], ['Deduction', 'FMV at gift date']],
    market: ['Quodd Global Quotes (Delayed)', 'S&P Capital IQ'], user: ['Plaid', 'Canopy'], action: 'Prepare gifting options', vid: '1:10' },

  ew_insure: { domain: 'Insurance', status: 'New', headline: 'Protect the estate from a liquidity squeeze', teaser: '$10M+ liability gap; ILIT candidate.',
    clientBody: 'Two things to shore up: your personal liability coverage is small relative to your wealth, and life insurance held in the right structure could provide tax-free cash to cover estate taxes — so your family won\'t have to sell assets quickly.',
    advisorWhy: '$42M estate with a $1M umbrella — material liability exposure; recommend $10M+. The projected $13.9M estate tax creates a liquidity need; an ILIT-held survivorship policy provides tax-free liquidity outside the taxable estate. Coordinate with the gifting plan.',
    calcs: [['Umbrella', '$1M vs $10M+ rec.'], ['Estate-tax need', '~$13.9M'], ['Vehicle', 'ILIT survivorship'], ['Benefit', 'Tax-free liquidity']],
    market: ['NAVs'], user: ['Plaid', 'Canopy', 'Attom'], action: 'Review protection plan', vid: '1:30' },

  ew_cash: { domain: 'Cash flow', status: 'Ready', headline: 'Build a liquidity cushion', teaser: 'Liquidity light vs. obligations.',
    clientBody: 'Most of your wealth is in investments, property, and collectibles — not cash. A securities-backed line of credit gives you flexible access to funds without selling assets or triggering taxes when opportunities or obligations arise.',
    advisorWhy: 'Cash $1.7M (4%) against $40M+ illiquid, with upcoming gifting and tax obligations. Recommend a securities-backed line of credit against the managed portfolio for flexible, tax-efficient liquidity rather than forced sales of low-basis or concentrated positions.',
    calcs: [['Cash', '$1.7M (4%)'], ['Illiquid', '~$40M'], ['Vehicle', 'SBLOC'], ['Use', 'Gifting + tax timing']],
    market: ['Quodd Global Quotes (Delayed)', 'Rates'], user: ['Plaid', 'Canopy'], action: 'Set up credit line', vid: '1:08' },
};

export const ACT_STEPS: Record<string, [string, string][]> = {
  'Cash flow': [
    ['Open a Monstro high-yield savings account', 'Takes ~30 seconds — no new login'],
    ['Move the recommended amount', 'We pre-fill $15,000 from checking'],
    ['Confirm the transfer', 'Funds move tonight; you keep full access'],
  ],
  'Retirement': [
    ['Open your contribution settings', 'We deep-link to your plan'],
    ['Raise your contribution to the target', 'Pre-filled to capture the full match'],
    ['Confirm the change', 'Applies next pay period'],
  ],
  'Tax': [
    ['Review the proposed trades', '3 lots, fully explained'],
    ['Authorize tax-loss harvesting', 'You approve before anything trades'],
    ['Confirm', 'Monstro places the trades and reinvests'],
  ],
  'Investments': [
    ['Review the rebalance plan', 'See every buy and sell first'],
    ['Authorize the trades', 'Tax-aware and within your bands'],
    ['Confirm', 'Monstro executes and reports back'],
  ],
  'Estate': [
    ['Review the recommendation', 'Plain-language summary'],
    ['Book time with an estate attorney', 'We coordinate the intro'],
    ['Confirm next steps', 'We prep your documents'],
  ],
  'Insurance': [
    ['Review coverage options', 'Side-by-side, no pressure'],
    ['Request quotes', 'We shop A-rated carriers'],
    ['Confirm to proceed', 'Bind coverage when ready'],
  ],
};
