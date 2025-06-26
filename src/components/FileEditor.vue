<script setup lang="ts">
import { ref, watch } from 'vue';
import type { File } from '../types';

const props = defineProps<{ file: File }>();
const content = ref('');

watch(() => props.file, (newFile) => {
  content.value = newFile?.content || '';
}, { immediate: true });
</script>

<template>
  <fieldset v-if="file">
    <legend>Redigering</legend>
    <textarea v-model="content" id="editArea"></textarea><br />
    <button @click="$emit('save', { id: file.id, content })">Lagre</button>
    <button @click="$emit('cancel')">Avbryt</button>
  </fieldset>
</template>
