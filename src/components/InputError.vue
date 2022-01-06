<script lang="ts" setup>
import {ErrorObject} from "@vuelidate/core"
import {PropType} from "vue"
defineProps({errors:{
  type:Array as PropType<ErrorObject[]>,
  default:[]
}})

</script>

<template>
  <div class="input-errors my-4" v-for="error of errors" :key="error.$uid">
    <div class="text-red-500"> {{ error.$message }}</div>
  </div>
</template>