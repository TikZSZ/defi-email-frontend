<script setup lang="ts">
import ButtonSpinner from './ButtonSpinner.vue';
defineProps<{disabled:boolean,name:string}>()
</script>

<template>
  <button
    :disabled="disabled"
    class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
  >
    <span v-if="disabled" class="mx-auto"><ButtonSpinner /></span>
    <slot  v-else :text="name">
      <span>{{name}}</span>
    </slot>
  </button>
</template>