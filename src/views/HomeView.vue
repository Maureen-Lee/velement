<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Button type="primary" ref="buttonRef">Test Button</Button>
  </div>
</template>

<script  setup lang="ts" >
import { Vue } from 'vue-class-component';
import { ref,onMounted } from 'vue'
import  Button  from '../components/Button/Button.vue'

const buttonRef = ref()
onMounted(()=>{
  console.log("ref",buttonRef)
})
//export default class HomeView extends Vue {}
</script>
