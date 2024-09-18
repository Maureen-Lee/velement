<script setup>
import { ref } from 'vue'
import child from './child.vue';
const countModel = ref(0)
</script>

<template>
    <div>
        <div>父组件中的 {{ countModel }}</div>
  
   <child v-model="countModel"> </Child>
</div>
</template>
