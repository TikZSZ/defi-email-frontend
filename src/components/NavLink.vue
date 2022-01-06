<template>
  <router-link class="text-md text-gray-600 inline-block w-full py-2 mx-0 ml-6 font-semibold text-left lg:ml-0 lg:w-auto lg:px-0 lg:mx-2  lg:text-center"
  :to="to"
  :class="{'text-indigo-700':(`/${currentPath.split('/')[1]}` === props.to),'hover:text-indigo-700':!(`/${currentPath.split('/')[1]}` === props.to)}"
  @click="currentPath = to"
  >
    {{name}}
  </router-link>
  <!-- text-sm font-semibold text-indigo-700 -->
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { computed, toRefs } from 'vue';

const props = defineProps({
  name:String,
  to:{
    required:true,
    default:'/home',
    type:String || Object 
  },
})
const {currentPath} = toRefs(useStore())

const style = computed(()=>{
  const isActive = currentPath.value === props.to
  return isActive?'text-indigo-700':'hover:text-indigo-700'
})


</script>