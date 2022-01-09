<script setup lang="ts">
defineProps<{msg:string,active:boolean}>()
</script>

<template>
    <div v-if="active">
        <div v-bind="$attrs" class="bg-red-700 flex items-center rounded-t-xl text-white w-full px-5 h-16">
            <p class="">{{msg}}</p>
        </div>
    </div>
</template>