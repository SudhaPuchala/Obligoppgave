<script setup lang="ts">
import type { File, Folder, FileOrFolder } from '../types';

const props = defineProps<{ files: File[]; folders: Folder[]; currentId: number | null; current: FileOrFolder | null }>();
const canGoUp = props.currentId !== null && props.current && !('content' in props.current);
</script>
<template>
  <fieldset>
    <legend>Mapper og filer</legend>
    <div v-if="canGoUp">
      📁 <a href="#" @click.prevent="$emit('select-parent')">..</a><br />
    </div>
    <div v-for="folder in folders" :key="folder.id">
      📁 <a href="#" @click.prevent="$emit('select', folder.id)">{{ folder.name }}</a><br />
    </div>
    <div v-for="file in files" :key="file.id">
      🗞 <a href="#" @click.prevent="$emit('select', file.id)">{{ file.name }}</a><br />
    </div>
  </fieldset>
</template>