<script setup lang="ts">
import { computed } from 'vue';
import type { FileOrFolder } from '../types';

const props = defineProps<{ currentId: number | null; filesAndFolders: FileOrFolder[] }>();

const breadcrumbs = computed(() => {
  const result: string[] = [];
  let id = props.currentId;
  while (id !== null) {
    const f = props.filesAndFolders.find(f => f.id === id);
    if (!f) break;
    if ('content' in f === false) result.unshift(f.name);
    id = f.parentId ?? null;
  }
  return result;
});

</script>

<template>
     <fieldset>
    <legend>Her er du nå</legend>
    <span v-if="breadcrumbs.length">> {{ breadcrumbs.join(' > ') }}</span>
    <i v-else>rotmappe</i>
  </fieldset>S
  
</template>

<style scoped>

</style>
