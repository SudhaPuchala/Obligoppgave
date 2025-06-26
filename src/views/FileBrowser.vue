<script setup lang="ts">
import { useFileStore } from '../stores/useFileStore';
import { storeToRefs } from 'pinia';

import BreadcrumbPath from '../components/BreadcrumbPath.vue';
import FileAndFolderList from '../components/FileAndFolderList.vue';
import FileEditor from '../components/FileEditor.vue';
import DeleteForm from '../components/DeleteForm.vue';
import NewForm from '../components/NewForm.vue';

const store = useFileStore();
const {
  setCurrentId, selectParent, clearCurrentId,
  saveFile, createNew, deleteItem
} = store;

const { viewState: vs, state } = storeToRefs(store);
</script>
<template>
  <div>
    <h1>Filer og mapper</h1>
    <BreadcrumbPath :currentId="vs.currentId" :filesAndFolders="state.filesAndFolders" />
    <FileAndFolderList
      :files="vs.files"
      :folders="vs.folders"
      :currentId="vs.currentId"
      :current="vs.current"
      @select="setCurrentId"
      @select-parent="selectParent"
    />
    <FileEditor v-if="vs.selectedFile" :file="vs.selectedFile"
      @save="saveFile"
      @cancel="clearCurrentId" />
    <DeleteForm :current="vs.current" @delete-item="deleteItem" />
    <NewForm :currentFolder="vs.currentFolder" @create-new="createNew" />
  </div>
</template>