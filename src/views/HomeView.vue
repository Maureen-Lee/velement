<template>
  <div class="home">
    <img  ref="triggerNode" alt="Vue logo" src="../assets/logo.png" >
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
  <Button @click="closeToolTip()">close Tooltip</Button>
  <Button @click="showTooltip()">Open Tooltip</Button>
  <Tooltip  content="tooltip content" trigger="hover" ref="tooltipRef" placement="right" manual>
    <div><Button>Test manual Tooltip</Button></div>
  </Tooltip>
  <Tooltip  content="toolcontent2222" trigger="hover"  placement="right" >
    <div>tpfdnvpeo</div>
  </Tooltip>
  <DropDown v-bind:menu-options="menuOptions">下拉菜单</DropDown>

  </div>
</template>

<script  setup lang="ts" >
import { ref,onMounted,inject} from 'vue'
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core'
import { TooltipInstance } from '@/components/Tooltip/type';
import  Button  from '@/components/Button/Button.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue';
import Collapse from '@/components/Collapse/Collapse.vue';
import Icon from '@/components/Icon/Icon.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import DropDown from '@/components/DropDown/DropDown.vue';
const activeNames = ref(['1'])
const buttonRef = ref()
onMounted(()=>{
  console.log("ref",buttonRef)
})
const overlayNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const tooltipRef = ref<TooltipInstance | null>(null)
let popperInstance:Instance|null = null
// if(overlayNode.value && triggerNode.value){
//   console.log("生成")
onMounted(()=>{
  popperInstance = createPopper(triggerNode.value,overlayNode.value,{
  placement: 'left'
})
})

//}

const showTooltip = ()=>{
  console.log("tooltipRef",tooltipRef)
  if(tooltipRef.value)
  tooltipRef.value.show()
}
const closeToolTip =()=>{
  console.log("tooltipRef",tooltipRef.value)
  if(tooltipRef.value)
  tooltipRef.value.hide()
}
const menuOptions = [
  {
    label: 'string1',
    key: 1,
    disabled: false,
    divided: false
  },
  {
    label: 'string2',
    key: 2,
    disabled: false,
    divided: false
  },

]
</script>
