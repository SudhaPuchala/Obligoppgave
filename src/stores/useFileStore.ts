
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { FileOrFolder, RootState, File, Folder, ViewState } from '../types';

export const useFileStore = defineStore('fileStore', () => {
  const state = ref<RootState>({
    filesAndFolders: [
      { id: 1, name: 'Emne 1' },
      { id: 2, name: 'Emne 2' },
      { id: 3, name: 'Emne 3' },
      { id: 4, name: 'Semesterplan.md', content: 'Semesterplan' },
      { id: 5, name: 'Uke 1', parentId: 1 },
      { id: 6, name: 'Uke 2', parentId: 1 },
      { id: 7, name: 'Plan for emne 1.md', content: 'Emneplan', parentId: 1 },
      { id: 8, name: 'Plan for emne 2.md', content: 'Emneplan', parentId: 2 },
      { id: 9, name: 'Plan for emne 3.md', content: 'Emneplan', parentId: 3 }
    ],
    app: {
      currentId: null
    }
  });

  function find(id: number): FileOrFolder | null {
    return state.value.filesAndFolders.find(f => f.id === id) ?? null;
  }

  function getCurrentFolder(current: FileOrFolder | null): Folder {
    const root: Folder = { id: null as unknown as number, name: 'Rotmappe' };
    if (!current) return root;
    return 'content' in current ? 
      (state.value.filesAndFolders.find(f => f.id === current.parentId && !('content' in f)) as Folder ?? root) :
      current as Folder;
  }

  const viewState = computed<ViewState>(() => {
    const currentId = state.value.app.currentId;
    const current = find(currentId ?? -1);
    const currentFolder = getCurrentFolder(current);
    const isInFolder = (item: FileOrFolder) => (item.parentId ?? null) === currentFolder.id;
    const files = state.value.filesAndFolders.filter(f => 'content' in f && isInFolder(f)) as File[];
    const folders = state.value.filesAndFolders.filter(f => !('content' in f) && isInFolder(f)) as Folder[];
    const selectedFile = current && 'content' in current ? current as File : null;

    return {
      currentId,
      current,
      currentFolder,
      files,
      folders,
      selectedFile
    };
  });

  function setCurrentId(id: number | null) {
    state.value.app.currentId = id;
  }

  function selectParent() {
    const current = find(state.value.app.currentId ?? -1);
    const folder = getCurrentFolder(current);
    setCurrentId(folder.parentId ?? null);
  }

  function clearCurrentId() {
    const file = find(state.value.app.currentId ?? -1);
    setCurrentId(file?.parentId ?? null);
  }

  function saveFile({ id, content }: { id: number; content: string }) {
    const file = find(id);
    if (file && 'content' in file) {
      file.content = content;
      clearCurrentId();
    }
  }

  function createNew({ name, parentId, isFolder }: { name: string; parentId: number | null; isFolder: boolean }) {
    const id = Date.now();
    const newItem: FileOrFolder = isFolder
      ? { id, name, parentId }
      : { id, name, parentId, content: '' };
    state.value.filesAndFolders.push(newItem);
  }

  function deleteItem(id: number) {
    const deleteRecursive = (id: number) => {
      const children = state.value.filesAndFolders.filter(f => f.parentId === id);
      for (const child of children) deleteRecursive(child.id);
      state.value.filesAndFolders = state.value.filesAndFolders.filter(f => f.id !== id);
    };
    deleteRecursive(id);
    setCurrentId(null);
  }

  return {
    state,
    viewState,
    setCurrentId,
    selectParent,
    clearCurrentId,
    saveFile,
    createNew,
    deleteItem
  };
});
