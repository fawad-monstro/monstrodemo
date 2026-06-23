import { create } from 'zustand';
import { qpackKeyFor } from '../data/qpacks';
import { PERSONAS } from '../data/personas';
import type {
  PersonaId, View, Fidelity, Tab,
  ConnectModal, QModal, ReqModal, MonModal, SrcModal, ArticleModal,
  AddAssetData, ActMode, AllocLens, ManualAdd,
} from '../types';

export interface AppState {
  /* ── demo toggles ──────────────────────────────────────── */
  embedded: boolean;
  view: View;
  fidelity: Fidelity;
  persona: PersonaId;

  /* ── navigation ────────────────────────────────────────── */
  tab: Tab;
  detail: string | null;
  vaultReturn: Tab;
  vaultCat: string | null;
  vaultItem: number | null;
  vaultPos: number | null;

  /* ── transient overlays ────────────────────────────────── */
  connect: ConnectModal | null;
  connectStep: number;
  qmodal: QModal | null;
  reqModal: ReqModal | null;
  actModal: string | null;
  actMode: ActMode;
  actStep: number;
  actMsg: string;
  monModal: MonModal | null;
  srcModal: SrcModal | null;
  article: ArticleModal | null;
  videoId: string | null;
  vplay: boolean;
  vprog: number;
  toast: string;
  goalModal: number | null;
  personModal: number | null;
  treeOpen: boolean;
  treeDomain: string | null;

  /* ── add-asset wizard ──────────────────────────────────── */
  addOpen: boolean;
  addStep: number;
  addCat: string | null;
  addName: string;
  addValue: string;
  addVIN: string;
  addAddr: string;
  addBasis: string;
  addPct: string;
  addData: AddAssetData | null;
  addLooking: boolean;

  /* ── per-question answers ──────────────────────────────── */
  qans: Record<string, Record<string, string>>;
  qDone: Record<string, boolean>;

  /* ── allocation lens ───────────────────────────────────── */
  allocLens: AllocLens;

  /* ── manual vault adds ─────────────────────────────────── */
  manualAdds: Record<PersonaId, ManualAdd[]>;

  /* ── actions ───────────────────────────────────────────── */
  setEmbedded: (v: boolean) => void;
  setView: (v: View) => void;
  setFidelity: (v: Fidelity) => void;
  setPersona: (id: PersonaId) => void;
  setTab: (t: Tab) => void;
  openDetail: (id: string) => void;
  closeDetail: () => void;

  openVault: () => void;
  vaultExit: () => void;
  vaultOpenCat: (k: string) => void;
  vaultOpenItem: (i: number) => void;
  vaultBack: () => void;

  openConnect: (kind: 'Integration' | 'Document', via: string, title: string, onBehalf: boolean) => void;
  connectNext: () => void;
  closeConnect: () => void;
  finishConnect: () => void;

  openQ: (title: string, onBehalf: boolean) => void;
  closeQ: () => void;
  setQ: (qid: string, val: string, key: string) => void;
  submitQ: () => void;

  openRequest: (item: { title: string; type: string; why: string; via?: string }) => void;
  closeReq: () => void;
  setReqDraft: (v: string) => void;
  sendReq: () => void;

  openAct: (detail: string | null, msg: string) => void;
  closeAct: () => void;
  actSelf: () => void;
  actToMsg: () => void;
  actNext: (stepsLen: number) => void;
  setActMsg: (v: string) => void;

  openMon: (domain: string, text: string, status: 'watch' | 'flag' | 'ok') => void;
  closeMon: () => void;

  openSource: (n: string, d: string, fields: string[], status: string, kind: 'market' | 'user') => void;
  closeSource: () => void;

  openArticle: (a: ArticleModal) => void;
  closeArticle: () => void;

  openVideo: (id: string, savedProg: number) => void;
  closeVideo: () => void;
  setVProg: (p: number) => void;
  setVPlay: (v: boolean) => void;

  openGoal: (i: number) => void;
  closeGoal: () => void;
  openPerson: (i: number) => void;
  closePerson: () => void;

  openTree: (domain: string) => void;
  closeTree: () => void;

  openAdd: () => void;
  closeAdd: () => void;
  pickAddCat: (k: string) => void;
  addBackCat: () => void;
  setAddField: (f: string, v: string) => void;
  setAddBasis: (b: string) => void;
  setAddData: (d: AddAssetData | null, name: string, value: string) => void;
  setAddLooking: (v: boolean) => void;
  submitAdd: (pid: PersonaId, add: ManualAdd) => void;

  setAllocLens: (l: AllocLens) => void;
  markDone: (title: string, persona: PersonaId) => void;
  toastMsg: (m: string) => void;
}

let _toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useAppStore = create<AppState>((set, get) => ({
  /* ── initial state ─────────────────────────────────────── */
  embedded: true,
  view: 'client',
  fidelity: 'light',
  persona: 'david',

  tab: 'today',
  detail: null,
  vaultReturn: 'today',
  vaultCat: null,
  vaultItem: null,
  vaultPos: null,

  connect: null,
  connectStep: 0,
  qmodal: null,
  reqModal: null,
  actModal: null,
  actMode: 'choose',
  actStep: 0,
  actMsg: '',
  monModal: null,
  srcModal: null,
  article: null,
  videoId: null,
  vplay: false,
  vprog: 0,
  toast: '',
  goalModal: null,
  personModal: null,
  treeOpen: false,
  treeDomain: null,

  addOpen: false,
  addStep: 0,
  addCat: null,
  addName: '',
  addValue: '',
  addVIN: '',
  addAddr: '',
  addBasis: 'Appraisal',
  addPct: '100',
  addData: null,
  addLooking: false,

  qans: {},
  qDone: {},
  allocLens: 'class',
  manualAdds: { maya: [], david: [], marcus: [], patel: [], eleanor: [] },

  /* ── actions ───────────────────────────────────────────── */
  setEmbedded: (v) => set({ embedded: v }),
  setView: (v) => set({ view: v }),
  setFidelity: (v) => set({ fidelity: v }),
  setPersona: (id) => set({ persona: id, tab: 'today', detail: null, vaultCat: null, vaultItem: null }),
  setTab: (t) => set({ tab: t, detail: null }),
  openDetail: (id) => set({ detail: id, tab: 'guidance' }),
  closeDetail: () => set({ detail: null }),

  openVault: () => set((s) => ({ vaultReturn: s.tab === 'vault' ? s.vaultReturn : s.tab, tab: 'vault', vaultCat: null, vaultItem: null, detail: null })),
  vaultExit: () => set((s) => ({ tab: s.vaultReturn || 'today', vaultCat: null, vaultItem: null })),
  vaultOpenCat: (k) => set({ vaultCat: k, vaultItem: null }),
  vaultOpenItem: (i) => set({ vaultItem: i, vaultPos: null }),
  vaultBack: () => set((s) => s.vaultItem != null ? { vaultItem: null } : { vaultCat: null }),

  openConnect: (kind, via, title, onBehalf) => set({ connect: { kind, via, title, onBehalf }, connectStep: 0 }),
  connectNext: () => set((s) => ({ connectStep: s.connectStep + 1 })),
  closeConnect: () => set({ connect: null, connectStep: 0 }),
  finishConnect: () => {
    const { connect, persona } = get();
    const via = connect?.via ?? 'Plaid';
    const title = connect?.title ?? '';
    const isDoc = connect?.kind === 'Document';
    const onBehalf = connect?.onBehalf ?? false;
    if (title) get().markDone(title, persona);
    set({ connect: null, connectStep: 0 });
    get().toastMsg(isDoc
      ? (onBehalf ? `Uploaded on behalf of client` : 'Uploaded — Monstro is reading it')
      : `Connected via ${via} — Monstro is syncing`);
  },

  openQ: (title, onBehalf) => {
    const key = qpackKeyFor(title);
    set({ qmodal: { key, title, onBehalf } });
  },
  closeQ: () => set({ qmodal: null }),
  setQ: (qid, val, key) => set((s) => {
    const cur = s.qans[key] || {};
    return { qans: { ...s.qans, [key]: { ...cur, [qid]: val } } };
  }),
  submitQ: () => {
    const { qmodal, persona } = get();
    if (!qmodal) return;
    get().markDone(qmodal.title, persona);
    set({ qmodal: null });
    get().toastMsg(qmodal.onBehalf ? 'Recorded on behalf of client' : 'Saved — guidance will update');
  },

  openRequest: (item) => {
    const { persona } = get();
    const p = PERSONAS[persona];
    const first = p.first;
    const why = (item.why || '').replace(/\.$/, '');
    let ask = '';
    if (item.type === 'Integration') ask = 'securely connect ' + item.title.replace(/^Connect (your )?/i, '').replace(/ — .*/, '');
    else if (item.type === 'Document') ask = 'upload ' + item.title.replace(/^Upload (your )?/i, '');
    else ask = 'confirm a couple of quick details';
    const via = item.type === 'Integration' ? (' through ' + (item.via || 'Plaid')) : '';
    const draft = `Hi ${first},\n\nTo keep your financial guidance accurate and personalized, it would help if you could ${ask}${via}. This lets Monstro ${why ? why.toLowerCase() : 'complete your picture'}.\n\nIt takes about a minute, and your credentials are never shared with me or anyone on the team — everything stays encrypted in your Vault. Thank you!\n\n— Jordan Lee, your advisor`;
    set({ reqModal: { title: item.title, type: item.type as 'Integration' | 'Document' | 'Profile', why: item.why, via: item.via || 'Plaid' }, actMsg: draft });
  },
  closeReq: () => set({ reqModal: null }),
  setReqDraft: (v) => set({ actMsg: v }),
  sendReq: () => {
    const { persona } = get();
    const first = PERSONAS[persona].first;
    set({ reqModal: null });
    get().toastMsg(`Request sent to ${first} · email + in-app`);
  },

  openAct: (detail, msg) => set({ actModal: detail, actMode: 'choose', actStep: 0, actMsg: msg }),
  closeAct: () => set({ actModal: null }),
  actSelf: () => set({ actMode: 'steps', actStep: 0 }),
  actToMsg: () => set({ actMode: 'message' }),
  actNext: (stepsLen) => set((s) => s.actStep >= stepsLen - 1 ? { actMode: 'done' } : { actStep: s.actStep + 1 }),
  setActMsg: (v) => set({ actMsg: v }),

  openMon: (domain, text, status) => set({ monModal: { domain, text, status } }),
  closeMon: () => set({ monModal: null }),

  openSource: (n, d, fields, status, kind) => set({ srcModal: { n, d, fields, status, kind } }),
  closeSource: () => set({ srcModal: null }),

  openArticle: (a) => set({ article: a }),
  closeArticle: () => set({ article: null }),

  openVideo: (id, savedProg) => set({ videoId: id, vprog: savedProg, vplay: false }),
  closeVideo: () => set({ videoId: null, vplay: false }),
  setVProg: (p) => set({ vprog: p }),
  setVPlay: (v) => set({ vplay: v }),

  openGoal: (i) => set({ goalModal: i }),
  closeGoal: () => set({ goalModal: null }),
  openPerson: (i) => set({ personModal: i }),
  closePerson: () => set({ personModal: null }),

  openTree: (domain) => set({ treeOpen: true, treeDomain: domain }),
  closeTree: () => set({ treeOpen: false, treeDomain: null }),

  openAdd: () => set({ addOpen: true, addStep: 0, addCat: null, addName: '', addValue: '', addVIN: '', addAddr: '', addBasis: 'Appraisal', addPct: '100', addData: null, addLooking: false }),
  closeAdd: () => set({ addOpen: false }),
  pickAddCat: (k) => set({ addCat: k, addStep: 1, addName: '', addValue: '', addVIN: '', addAddr: '', addData: null, addLooking: false }),
  addBackCat: () => set({ addStep: 0, addCat: null, addData: null, addLooking: false }),
  setAddField: (f, v) => set({ [f]: v } as Partial<AppState>),
  setAddBasis: (b) => set({ addBasis: b }),
  setAddData: (d, name, value) => set({ addData: d, addLooking: false, addName: name, addValue: value }),
  setAddLooking: (v) => set({ addLooking: v }),
  submitAdd: (pid, add) => {
    set((s) => {
      const cur = (s.manualAdds[pid] || []).slice();
      cur.push(add);
      return { manualAdds: { ...s.manualAdds, [pid]: cur }, addOpen: false };
    });
    const { addData } = get();
    get().toastMsg(addData ? `Enriched via ${addData.provider} — added to Vault` : 'Added to Vault');
  },

  setAllocLens: (l) => set({ allocLens: l }),
  markDone: (title, persona) => set((s) => ({ qDone: { ...s.qDone, [`${persona}|${title}`]: true } })),
  toastMsg: (m) => {
    if (_toastTimer) clearTimeout(_toastTimer);
    set({ toast: m });
    _toastTimer = setTimeout(() => set({ toast: '' }), 2200);
  },
}));
