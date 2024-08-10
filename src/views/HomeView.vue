<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" ref="triggerNode">
    <div ref="overlayNode"><h1>Hello tooltip</h1></div>
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
  
  <Icon icon="user-secret" type="primary"/>  
  <Icon icon="lock" /> 
  <Button  loading>Loading</Button>
  <Button icon="house" >Icon</Button>
  {{ activeNames }}
  <Tooltip  content="tooltip content">
    <div><Button>Test Tooltip</Button></div>
  </Tooltip>
  </div>
</template>

<script  setup lang="ts" >
import { ref,onMounted,inject} from 'vue'
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core'
import  Button  from '@/components/Button/Button.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue';
import Collapse from '@/components/Collapse/Collapse.vue';
import Icon from '@/components/Icon/Icon.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue';
const activeNames = ref(['1'])
const buttonRef = ref()
onMounted(()=>{
  console.log("ref",buttonRef)
})
const overlayNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
let popperInstance:Instance|null = null
if(overlayNode.value && triggerNode.value){
popperInstance = createPopper(triggerNode.value,overlayNode.value,{
  placement:'top',
})
}
setTimeout(()=>{
   activeNames.value = ['1','2']
   popperInstance?.setOptions({placement:"bottom"})
},2000)

//export default class HomeView extends Vue {}
</script>
