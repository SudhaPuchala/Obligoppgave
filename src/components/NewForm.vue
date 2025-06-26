<script setup lang="ts">
import { ref } from 'vue';
import type { Folder } from '../types';

const props = defineProps<{ currentFolder: Folder }>();
const emit = defineEmits<{ (e: 'create-new', payload: { name: string; parentId: number | null; isFolder: boolean }): void }>();

const name = ref('');

function create(isFolder: boolean) {
  if (name.value.trim()) {
    emit('create-new', {
      name: name.value.trim(),
      parentId: props.currentFolder.id,
      isFolder
    });
    name.value = '';
  }
}
</script>
<template>
  <fieldset>
    <legend>Opprette mappe eller fil</legend>
    <input v-model="name" placeholder="Skriv inn navn" />
    <button @click="create(true)">Ny mappe</button>
    <button @click="create(false)">Ny fil</button>
  </fieldset>
</template>
