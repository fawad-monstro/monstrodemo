import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAppStore } from '../store/useAppStore';

beforeEach(() => {
  useAppStore.setState({
    persona: 'david',
    tab: 'today',
    detail: null,
    vaultCat: null,
    vaultItem: null,
    qDone: {},
    toast: '',
  });
});

describe('persona switch', () => {
  it('resets tab and detail', () => {
    useAppStore.getState().openDetail('do_tax');
    expect(useAppStore.getState().detail).toBe('do_tax');
    useAppStore.getState().setPersona('maya');
    expect(useAppStore.getState().persona).toBe('maya');
    expect(useAppStore.getState().tab).toBe('today');
    expect(useAppStore.getState().detail).toBeNull();
  });

  it('resets vault navigation', () => {
    useAppStore.setState({ vaultCat: 'cash', vaultItem: 0 });
    useAppStore.getState().setPersona('marcus');
    expect(useAppStore.getState().vaultCat).toBeNull();
    expect(useAppStore.getState().vaultItem).toBeNull();
  });
});

describe('markDone', () => {
  it('sets qDone key for persona+title', () => {
    useAppStore.getState().markDone('Connect your HSA', 'maya');
    expect(useAppStore.getState().qDone['maya|Connect your HSA']).toBe(true);
  });

  it('does not affect other persona keys', () => {
    useAppStore.getState().markDone('Connect your HSA', 'maya');
    expect(useAppStore.getState().qDone['david|Connect your HSA']).toBeUndefined();
  });
});

describe('vault navigation', () => {
  it('vaultOpenCat sets cat and clears item', () => {
    useAppStore.setState({ vaultCat: 'invest', vaultItem: 1 });
    useAppStore.getState().vaultOpenCat('cash');
    expect(useAppStore.getState().vaultCat).toBe('cash');
    expect(useAppStore.getState().vaultItem).toBeNull();
  });

  it('vaultBack from item returns to cat list', () => {
    useAppStore.setState({ vaultCat: 'invest', vaultItem: 0 });
    useAppStore.getState().vaultBack();
    expect(useAppStore.getState().vaultItem).toBeNull();
    expect(useAppStore.getState().vaultCat).toBe('invest');
  });

  it('vaultBack from cat list returns to home', () => {
    useAppStore.setState({ vaultCat: 'invest', vaultItem: null });
    useAppStore.getState().vaultBack();
    expect(useAppStore.getState().vaultCat).toBeNull();
  });
});

describe('toastMsg', () => {
  it('sets toast and clears after timeout', async () => {
    vi.useFakeTimers();
    useAppStore.getState().toastMsg('Hello');
    expect(useAppStore.getState().toast).toBe('Hello');
    vi.advanceTimersByTime(2200);
    expect(useAppStore.getState().toast).toBe('');
    vi.useRealTimers();
  });
});

describe('openQ', () => {
  it('resolves household pack for relevant titles', () => {
    useAppStore.getState().openQ('About your household', false);
    expect(useAppStore.getState().qmodal?.key).toBe('household');
    expect(useAppStore.getState().qmodal?.onBehalf).toBe(false);
  });

  it('sets onBehalf correctly', () => {
    useAppStore.getState().openQ('About your household', true);
    expect(useAppStore.getState().qmodal?.onBehalf).toBe(true);
  });
});

describe('fidelity', () => {
  it('can be set to all three modes', () => {
    useAppStore.getState().setFidelity('dark');
    expect(useAppStore.getState().fidelity).toBe('dark');
    useAppStore.getState().setFidelity('wire');
    expect(useAppStore.getState().fidelity).toBe('wire');
    useAppStore.getState().setFidelity('light');
    expect(useAppStore.getState().fidelity).toBe('light');
  });
});
