<script setup lang="ts">
import { useWindowSize, useResizeObserver } from "@vueuse/core"
import { ref, toRefs } from "vue"
import NavbarVue from './components/Navbar.vue';
import { useStore } from './store';

const { width } = useWindowSize()
const store = toRefs(useStore())
store.isMobile.value = width.value < 640

const el = ref(null)
useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  store.isMobile.value = width < 768
})

const d = (async () => {
  useStore().checkAuth()
})()


</script>

<template>
  <div ref="el">
    <NavbarVue />
    <div class = 'transition-all'>
      <router-view />
    </div>
  </div>
</template>


