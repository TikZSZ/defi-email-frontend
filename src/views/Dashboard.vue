<script lang="ts" setup>
import { toRefs, ref } from "vue";
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar.vue";
import { useClickOutside } from "@/components/useOutsideClick";

const { currentPath } = toRefs(useStore())
const isOpen = ref(false)

const toggle = (val: boolean) => {
  isOpen.value = val
}

const router = useRouter()
const route = useRoute()
const sideBarRef = ref()
useClickOutside(sideBarRef, isOpen)
currentPath.value = route.name === "Dashboard" ? "/dashboard/topics" : route.path

router.push({ path: currentPath.value })

</script>


<template>
  <main class="bg-white overflow-hidden relative">
    <div class="flex items-start justify-between ">
      <!-- SideBar -->
      <Sidebar :is-open="isOpen" :toggle="toggle" ref="sideBarRef" />
      <!-- Main -->
      <div class="flex flex-col w-full">
        <header class="w-full md:hidden h-16 flex items-center justify-between">
          <!-- Mobile Sidebar Button -->
          <div class="block lg:hidden ml-6">
            <button
              @click="toggle(true)"
              :class="{ hidden: isOpen }"
              class="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md"
            >
              <svg
                width="20"
                height="20"
                class="text-gray-400"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"
                />
              </svg>
            </button>
          </div>
        </header>
        <router-view class="border-l-2"></router-view>
      </div>
    </div>
  </main>
</template>

          