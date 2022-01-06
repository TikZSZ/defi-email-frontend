<script lang="ts" setup>
import api from "@/misc/request/api";
import { ref, toRefs } from "vue";
import Loading from "@/components/Loading.vue";
import LoadingButtonVue from "@/components/LoadingButton.vue";
import { useRouter } from "vue-router";
import Option from "./Option.vue";
import { useStore } from "@/store";
import { Topics } from "./Sidebar.vue";

defineProps<{ topics: Topics[] | null }>()
const { currentPath } = toRefs(useStore());

</script>

<template>
  <div>
    <div>
      <Option
        v-if="topics"
        v-for="topic of topics"
        :link="`/dashboard/emails/${topic.topicId}/`"
        :name="topic.topic_name"
        :click="() => {
          $router.push(`/dashboard/emails/${topic.topicId}/`)
        }"
        :style="`ml-2 w-full flex items-center pl-6 p-2 transition-colors duration-200 justify-start border-l-4 ${`/dashboard/emails/${topic.topicId}`.split('/')[3] === currentPath.split('/')[3]
          ? ' border-purple-300 text-gray-800 '
          : 'hover:text-gray-800 border-transparent text-gray-400'
        } `"
        :icon="''"
        class="relative left-5"
      ></Option>
      <div v-else class="relative left-7 -top-4">
        No Topics
      </div>
    </div>
  </div>
</template>

