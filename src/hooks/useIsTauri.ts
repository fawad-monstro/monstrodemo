// Returns true when running inside a Tauri native window
export function useIsTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}
