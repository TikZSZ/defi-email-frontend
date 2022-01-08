<script setup lang="ts">
import { useStore } from "@/store";
import { ref, toRefs } from "vue";
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";


const route = useRoute()
const store = toRefs(useStore())
const message = store.message.value

</script>

<template>
  <div v-if="message" class="relative min-h-screen" >
    <div class>
      <div class="py-5 px-2 sm:px-5 relative">
        <div class="relative rounded-xl border-gray-300 shadow-xl p-5 border">
          <h1 class="text-2xl mb-10">{{ message.subject }}</h1>
          <div class>
            <p
              class="date absolute top-16 right-5"
            >{{ new Date(message.date).toString().split(' ').splice(0, 5).join(' ') }}</p>
            <p
              class="w-full rounded-md p-4 whitespace-pre-line mt-20 overflow-auto"
            >{{ message.body }}</p>
          </div>
        </div>
        <div v-if="message.topicId" class="mt-5 w-full mx-auto">
          <router-link class="mt-2 inline-block focus:outline-none text-center rounded w-2/12 shadow text-white hover:bg-rose-600 bg-rose-500 py-2 px-4" :to="`/dashboard/compose?key=${message.x25519_public_key}&topicId=${message.topicId}`">Reply</router-link>
        </div>
        
      </div>
    </div>
  </div>
</template>
