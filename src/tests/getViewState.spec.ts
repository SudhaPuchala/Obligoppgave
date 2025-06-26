import { setActivePinia, createPinia } from 'pinia';
import { useFileStore } from '../stores/useFileStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ViewState from Pinia', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('returns root folder when no currentId', () => {
    const store = useFileStore();
    store.setCurrentId(null);
    expect(store.viewState.currentFolder.name).toBe('Rotmappe');
  });

  it('returns selected file when currentId is a file', () => {
    const store = useFileStore();
    store.setCurrentId(4);
    expect(store.viewState.selectedFile?.name).toBe('Semesterplan.md');
  });

  it('returns folders and files correctly inside a parent folder', () => {
    const store = useFileStore();
    store.setCurrentId(1); // Emne 1
    const { files, folders } = store.viewState;
    expect(folders.map(f => f.name)).toContain('Uke 1');
    expect(files.map(f => f.name)).toContain('Plan for emne 1.md');
  });
});
