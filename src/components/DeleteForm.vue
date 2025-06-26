<script setup lang="ts">
import { ref } from 'vue';
import type { FileOrFolder } from '../types';

const props = defineProps<{ current: FileOrFolder | null }>();
const confirming = ref(false);
</script>
<template>
  <fieldset v-if="current">
    <legend>Slette</legend>
    <div v-if="!confirming">
      <button @click="confirming = true">Slett {{ current.name }}</button>
    </div>
    <div v-else>
      <div>Er du sikker på at du vil slette <strong>{{ current.name }}</strong>?</div>
      <button @click="$emit('delete-item', current.id)">Ja, slett</button>
      <button @click="confirming = false">Avbryt</button>
    </div>
  </fieldset>
</template>