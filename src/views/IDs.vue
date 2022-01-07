<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import LoadingButton from '@/components/LoadingButton.vue';
import api from '@/misc/request/api';
import { ref,watch } from 'vue';

const topics = ref<Topic[]|null>(null)
const topicId = ref('')
const topic_id = ref(0)
const disabled = ref(false)
interface Topic {
  topicId: string;
  topic_id: number;
  user: User;
}

interface User {
  public_key: string;
  x25519_public_key: string;
}

const fetch = async () => {
  const response = await api.get(`/api/getTopics?topicId=${topicId.value}&id=${topic_id.value}`)
  topics.value = response.data 
}
fetch()
let id:any = ref()

watch(topicId,()=>{
  topics.value = []
  clearTimeout(id.value)
  id.value = setTimeout(()=>{
    topic_id.value = 0
    fetch()
  },1000)
})

async function getNext(){
  disabled.value = true
  topic_id.value = topics.value!.slice(-1)[0].topic_id
  const response = await api.get(`/api/getTopics?topicId=${topicId.value}&id=${topic_id.value}`)
  topics.value!.push(...response.data)  
  disabled.value = false
}

</script>


<template>
  <div class="p-10 bg-gray-100 shadow-2xl" style="min-height: 87vh;">
    <div class="mb-4 ">
      <div class="flex flex-col w-1/4 mx-auto">
        <label for="">Search by Topic ID</label>
        <input type="text" placeholder="Topic ID"
          class="px-4 py-2 mt-2 rounded-lg ring focus:outline-none"
          @input="(e)=>{
            topicId = (e.target as any).value
          }"
        >
      </div>
    </div>
    <div class="mx-auto w-1/4 mb-5">
      <LoadingButton name="Fetch More" @click="getNext"
      class=" mx-auto"
      v-if="topics !== null"
      :disabled="disabled"/>
    </div>
    <Loading :active="topics === null || topics.length === 0" />
    <div class="grid  grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-4">
      <div class="bg-white p-3 shadow-xl  selection:text-white selection:rounded-xl selection:bg-rose-500  transition-shadow  hover:shadow-2xl border-1 border-gray-100 rounded-xl"
      v-for="topic of topics"
      :key="topic.topic_id"
      >
        <p class="mt-3">
          Topic ID:
          <span class="break-all cursor-pointer select-all ">{{topic.topicId}}</span>
        </p>
        <p class="mt-3">
          X25519 Public Key:
          <span
            span
            class="break-all select-all cursor-pointer "
          >{{topic.user.x25519_public_key}}</span>
        </p>
        <p class="mt-3">
          Ed25519 PublicKey:
          <span
            class="break-all select-all cursor-pointer"
          >{{topic.user.public_key}}</span>
        </p>
      </div>
      <Loading :active="disabled" class="w-full mt-0 h-auto" style="" />
    </div>
  </div>
</template>

<style>

p{
  color: #f43f5e;

}

span{
  color:black;
}

</style>
