<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Button type="primary" ref="buttonRef">Test Button</Button>
    <Collapse v-model="activeNames" >
    <CollapseItem title="hello collapse" name="1">
      <div>name1</div>
      <div>name2</div>
    </CollapseItem>
    <CollapseItem name="2" >
       <template #title>
        <h1>Hee</h1>
       </template>
      <div>name1</div>
      <div>name2</div>
    </CollapseItem>
  </Collapse>
  <font-awesome-icon :icon="['fas', 'user-secret']" />
  {{ activeNames }}
  </div>
</template>

<script  setup lang="ts" >
import { Vue } from 'vue-class-component';
import { ref,onMounted,inject} from 'vue'
import  Button  from '@/components/Button/Button.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue';
import Collapse from '@/components/Collapse/Collapse.vue';

const activeNames = ref(['1'])
const buttonRef = ref()
onMounted(()=>{
  console.log("ref",buttonRef)
})

// setTimeout(()=>{
//    activeNames.value = ['1','2']
// },2000)

//export default class HomeView extends Vue {}
</script>
