<script lang="ts" setup>
defineProps<{ name?: string, icon: string, style: string, link: string, click: Function }>()

</script>

<template>
  <div class="relative">
    <router-link :to="link" :class="style" @click="() => { click() }">
      <span v-html="icon" class="text-left"></span>
      <span class="mx-2 text-sm font-normal">{{ name }}</span>
    </router-link>
    <slot></slot>
  </div>
</template>
