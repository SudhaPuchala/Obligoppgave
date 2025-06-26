

export interface FileItemBase {
  id: number;
  name: string;
  parentId?: number;
}

export interface Folder extends FileItemBase {
  content?: undefined;
}

export interface File extends FileItemBase {
  content: string;
}

export type FileOrFolder = File | Folder;

export interface AppState {
  currentId: number | null;
}

export interface RootState {
  filesAndFolders: FileOrFolder[];
  app: AppState;
}

export interface ViewState {
  currentId: number | null;
  current: FileOrFolder | null;
  currentFolder: Folder;
  files: File[];
  folders: Folder[];
  selectedFile: File | null;
}
