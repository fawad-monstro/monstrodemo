/* ── App state types ─────────────────────────────────────────────── */

export type PersonaId = 'maya' | 'david' | 'marcus' | 'patel' | 'eleanor';
export type View = 'client' | 'advisor';
export type Fidelity = 'light' | 'dark' | 'wire';
export type Tab = 'today' | 'guidance' | 'monitoring' | 'queue' | 'connected' | 'vault';

/* ── Persona ─────────────────────────────────────────────────────── */
export interface Persona {
  id: PersonaId;
  name: string;
  short: string;
  first: string;
  tier: 'Mass market' | 'Affluent' | 'HNW' | 'UHNW';
  initials: string;
  avatar: string;
  netWorth: string;
  change: string;
  hostName: string;
  hostKind: string;
  hostMark: string;
  hostMarkBg: string;
  hostInitials: string;
  accounts: [string, string, boolean][];
  sources: Record<string, boolean>;
  guidance: string[];
  queueTop: string[];
  queueCount: number;
  monitoring: [string, string, 'watch' | 'flag' | 'ok'][];
}

/* ── Guidance ────────────────────────────────────────────────────── */
export type GuidanceDomain = 'Cash flow' | 'Retirement' | 'Estate' | 'Investments' | 'Tax' | 'Insurance';

export interface GuidanceItem {
  domain: GuidanceDomain;
  status: 'New' | 'Ready';
  headline: string;
  teaser: string;
  clientBody: string;
  advisorWhy: string;
  calcs: [string, string][];
  market: string[];
  user: string[];
  action: string;
  vid: string;
}

export interface LockedItem {
  domain: string;
  headline: string;
  requires: string;
}

/* ── Queue ───────────────────────────────────────────────────────── */
export type QueueItemType = 'Integration' | 'Document' | 'Profile';

export interface QueueItem {
  title: string;
  type: QueueItemType;
  why: string;
  via?: string;
  pack?: boolean;
  unlocks?: string;
}

export type QueueFullRow =
  | { id: string }
  | { k: string; t: QueueItemType; w: string };

/* ── Question packs ──────────────────────────────────────────────── */
export type QuestionType = 'yesno' | 'choice' | 'text' | 'number';

export interface Question {
  id: string;
  q: string;
  type: QuestionType;
  options?: string[];
  depends?: { id: string; eq: string };
}

export interface QPack {
  title: string;
  qs: Question[];
}

/* ── Vault ───────────────────────────────────────────────────────── */
export interface VaultPosition {
  tic: string;
  name: string;
  value: number;
  chg: string;
}

export interface VaultItem {
  name: string;
  value: number;
  source: string;
  sub?: string;
  manual?: boolean;
  rows?: [string, string][];
  positions?: [string, string, number, string][];
}

export interface VaultCategory {
  key: string;
  name: string;
  items: VaultItem[];
}

export interface VaultLiability {
  name: string;
  value: number;
  source: string;
  sub?: string;
  rows?: [string, string][];
}

export interface VaultInsurance {
  name: string;
  coverage: number;
  premium: string;
  source: string;
  sub?: string;
}

export interface VaultData {
  categories: VaultCategory[];
  liabilities: VaultLiability[];
  insurance: VaultInsurance[];
  history: number[];
}

/* ── Goals ───────────────────────────────────────────────────────── */
export type GoalRow = [string, string, number, string, string, number, number, string];

/* ── People ──────────────────────────────────────────────────────── */
export type PersonRow = [string, string, string, string, string, string];

/* ── News ────────────────────────────────────────────────────────── */
export type NewsRow = [string, string, string, string, string, string[]];

/* ── Monitoring detail ───────────────────────────────────────────── */
export interface MonDetail {
  why: string;
  signals: [string, string][];
  guide: string | null;
}

/* ── Data sources ────────────────────────────────────────────────── */
export type MarketSourceRow = [string, string, string[]];
export type UserSourceRow = [string, string, string[]];

/* ── Decision tree ───────────────────────────────────────────────── */
export interface TreeMeta {
  title: string;
  id: string;
  pr: string;
  leaves: number;
  inputs: number;
}

export interface TreeNodeSkeleton {
  id: string;
  x: number;
  y: number;
  kind: 'decision' | 'leaf';
}

export interface TreeEdgeSkeleton {
  from: string;
  to: string;
  label: string;
  executed: boolean;
}

/* ── App store state ─────────────────────────────────────────────── */
export interface ManualAdd {
  name: string;
  value: number;
  cat: string;
  source: string;
  sub: string;
  rows: [string, string][];
}

export interface ConnectModal {
  kind: 'Integration' | 'Document';
  via: string;
  title: string;
  onBehalf: boolean;
}

export interface QModal {
  key: string;
  title: string;
  onBehalf: boolean;
}

export interface ReqModal {
  title: string;
  type: QueueItemType;
  why: string;
  via: string;
}

export interface MonModal {
  domain: string;
  text: string;
  status: 'watch' | 'flag' | 'ok';
}

export interface SrcModal {
  n: string;
  d: string;
  fields: string[];
  status: string;
  kind: 'market' | 'user';
}

export interface ArticleModal {
  title: string;
  src: string;
  when: string;
  tag: string;
  why: string;
  body: string[];
}

export interface AddAssetData {
  kind: 'auto' | 're';
  provider: string;
  rows: [string, string][];
  value: number;
  // auto
  year?: string;
  make?: string;
  model?: string;
  trim?: string;
  // re
  ptype?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  year_built?: number;
  tax?: number;
}

export type ActMode = 'choose' | 'steps' | 'message' | 'done' | 'sent';
export type AllocLens = 'class' | 'type' | 'tax';
