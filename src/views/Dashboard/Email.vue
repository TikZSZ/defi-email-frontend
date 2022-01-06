<script setup lang="ts">
import { Client } from "@tikz/hedera-mirror-node-ts";
import { ref } from "vue";
const props = defineProps<{ 
  body:string,
  subject:string,
  date:string,
}>();
const client = new Client("https://testnet.mirrornode.hedera.com/");
// const loading = ref(true)

console.log(props)
const msgs = ref<{ body: string; subject: string; date: string }[]|null>([]);
</script>

<template>
  <div class="min-h-screen relative">
    <div >
      <div class="py-5 px-5 relative">
        <div class="relative mx-2 md:mx-10">
          <h1 class="text-2xl mb-10">{{ props.subject }}</h1>
          <div class="">
            <p class="date absolute top-16 sm:top-12 right-0">{{ new Date(props.date).toString() }}</p>
            <p class="w-full whitespace-pre-line   mt-20">{{ props.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
