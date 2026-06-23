import type { TreeMeta } from '../types';

export const TREE_META: Record<string, TreeMeta> = {
  'Tax': { title: 'Roth IRA Contribution Eligibility · Tax Year 2026', id: 'bc273a88-f029-4b51-ae64-67a4fe43b5d0', pr: '288', leaves: 14, inputs: 9 },
  'Retirement': { title: '401(k) Match & Catch-up · Plan Year 2026', id: 'a91f44c2-7d18-4e0a-9b6c-2f1e88d4c700', pr: '241', leaves: 11, inputs: 7 },
  'Cash flow': { title: 'Idle-Cash Optimization · Liquidity Engine', id: '4e7d20b9-1c3a-4f55-8a90-d6b2e9f01a33', pr: '196', leaves: 9, inputs: 6 },
  'Estate': { title: 'Lifetime Exemption & Gifting · 2026 Sunset', id: 'f0c98a71-5b46-4d22-be83-7a1c44e90b58', pr: '312', leaves: 16, inputs: 11 },
  'Investments': { title: 'Allocation Drift & Tax-Aware Rebalance', id: '7b2e6650-9af1-43c8-a7d4-0e5c81b3f9aa', pr: '274', leaves: 12, inputs: 8 },
  'Insurance': { title: 'Protection-Gap Analysis · Household', id: '2d81fce4-6a07-49b3-bb15-3c9e7d20a481', pr: '205', leaves: 10, inputs: 7 },
};

type NodeLabels = Record<string, [string, string, string?]>;

export const TREE_LABELS: Record<string, NodeLabels> = {
  'Tax': {
    A: ['Filing MFS?', 'mfs_phaseout'], B: ['MAGI ≤ limit?', 'magi_within_limit'],
    LA: ['Reduced — MFS phaseout', 'MFS_REDUCED', 'OTHER'], C: ['Earned income ≥ limit?', 'earned_income_sufficient'],
    LB: ['Backdoor Roth available', 'BACKDOOR_AVAILABLE', 'BACKDOOR'], D: ['Age 50+?', 'catchup_eligible'],
    LC: ['Capped at earned income', 'EARNED_INCOME_CAPPED', 'OTHER'], F: ['Full + $1k catch-up', 'FULL_PLUS_CATCHUP', 'ELIGIBLE'],
    LD: ['Standard contribution', 'STANDARD_LIMIT', 'ELIGIBLE'],
  },
  'Retirement': {
    A: ['Enrolled in plan?', 'plan_enrolled'], B: ['At full match?', 'meets_match_cap'],
    LA: ['Prompt enrollment', 'NUDGE_ENROLL', 'OTHER'], C: ['Age 50+?', 'catchup_eligible'],
    LB: ['Full match captured', 'MATCH_OPTIMAL', 'ELIGIBLE'], D: ['After-tax room?', 'mega_backdoor_room'],
    LC: ['Raise to match cap', 'RAISE_TO_MATCH', 'ACTION'], F: ['Mega-backdoor Roth', 'MEGA_BACKDOOR', 'ACTION'],
    LD: ['Standard deferral', 'STANDARD_DEFERRAL', 'ELIGIBLE'],
  },
  'Cash flow': {
    A: ['Emergency buffer set?', 'buffer_funded'], B: ['Idle cash > threshold?', 'idle_cash_detected'],
    LA: ['Build buffer first', 'BUILD_BUFFER', 'OTHER'], C: ['HYSA rate > current?', 'better_rate_available'],
    LB: ['No action', 'NO_ACTION', 'OTHER'], D: ['Liquidity need < 30d?', 'liquidity_ok'],
    LC: ['Keep liquid', 'KEEP_LIQUID', 'OTHER'], F: ['Move to HYSA', 'MOVE_TO_HYSA', 'ACTION'],
    LD: ['Ladder T-bills', 'TBILL_LADDER', 'ACTION'],
  },
  'Estate': {
    A: ['Estate > exemption?', 'above_exemption'], B: ['Before 2026 sunset?', 'pre_sunset'],
    LA: ['Monitor annually', 'MONITOR', 'OTHER'], C: ['SLAT capacity?', 'slat_capacity'],
    LB: ['Annual gifting only', 'ANNUAL_GIFTING', 'OTHER'], D: ['Liquidity for gift?', 'gift_liquidity'],
    LC: ['Defer & review', 'DEFER', 'OTHER'], F: ['Accelerate gifting + SLAT', 'ACCELERATE_GIFTING', 'ACTION'],
    LD: ['ILIT for liquidity', 'ILIT_FUND', 'ACTION'],
  },
  'Investments': {
    A: ['Drift > band?', 'drift_breached'], B: ['Realized gains YTD?', 'has_realized_gains'],
    LA: ['Within band', 'NO_REBAL', 'OTHER'], C: ['Loss lots available?', 'harvest_lots'],
    LB: ['Standard rebalance', 'REBALANCE_STD', 'ACTION'], D: ['Concentration > 10%?', 'single_name_risk'],
    LC: ['Tax-aware rebalance', 'REBALANCE_TAXAWARE', 'ACTION'], F: ['Trim concentration (staged)', 'TRIM_CONCENTRATION', 'ACTION'],
    LD: ['Hold', 'HOLD', 'OTHER'],
  },
  'Insurance': {
    A: ['Liability exposure?', 'has_exposure'], B: ['Coverage ≥ need?', 'coverage_sufficient'],
    LA: ['No gap', 'NO_GAP', 'OTHER'], C: ['Umbrella ≥ net worth?', 'umbrella_sufficient'],
    LB: ['Adequate', 'ADEQUATE', 'OTHER'], D: ['Estate liquidity need?', 'estate_liquidity'],
    LC: ['Add umbrella', 'ADD_UMBRELLA', 'ACTION'], F: ['ILIT + disability', 'ILIT_DISABILITY', 'ACTION'],
    LD: ['Add disability', 'ADD_DISABILITY', 'ACTION'],
  },
};

export interface TreeNode {
  id: string;
  x: number;
  y: number;
  kind: 'decision' | 'leaf';
}

export interface TreeEdge {
  from: string;
  to: string;
  label: string;
  executed: boolean;
}

export const TREE_NODES: TreeNode[] = [
  { id: 'A', x: 60, y: 90, kind: 'decision' },
  { id: 'B', x: 660, y: 160, kind: 'decision' },
  { id: 'LA', x: 60, y: 320, kind: 'leaf' },
  { id: 'C', x: 430, y: 360, kind: 'decision' },
  { id: 'LB', x: 1030, y: 320, kind: 'leaf' },
  { id: 'D', x: 210, y: 580, kind: 'decision' },
  { id: 'LC', x: 760, y: 520, kind: 'leaf' },
  { id: 'F', x: 500, y: 740, kind: 'leaf' },
  { id: 'LD', x: 80, y: 770, kind: 'leaf' },
];

export const TREE_EDGES: TreeEdge[] = [
  { from: 'A', to: 'B', label: 'no', executed: true },
  { from: 'A', to: 'LA', label: 'yes', executed: false },
  { from: 'B', to: 'C', label: 'yes', executed: true },
  { from: 'B', to: 'LB', label: 'no', executed: false },
  { from: 'C', to: 'D', label: 'yes', executed: true },
  { from: 'C', to: 'LC', label: 'no', executed: false },
  { from: 'D', to: 'F', label: 'yes', executed: true },
  { from: 'D', to: 'LD', label: 'no', executed: false },
];
