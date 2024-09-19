<template>
  <div class="home">
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
  
  <Button  loading>Loading</Button>
  <Button icon="house" >Icon</Button>
  {{ activeNames }}
  <Button @click="closeToolTip()">close Tooltip</Button>
  <Button @click="showTooltip()">Open Tooltip</Button>
  <Tooltip  content="tooltip content" trigger="hover" ref="tooltipRef" placement="right" manual>
    <div><Button>Test manual Tooltip</Button></div>
  </Tooltip>
  <Tooltip  content="toolcontent2222" trigger="hover"  placement="right" :openDelay="1000" :close-delay="1000">
    <div>tpfdnvpeo</div>
  </Tooltip>
  <DropDown v-bind:menu-options="menuOptions">下拉菜单</DropDown>
  <Button @click="createMessage({message :'hello world',type: 'danger'})">创建message</Button>
  <div>
      <Input clearable>
        <template #prefix>
               prefix
        </template>
        <template #suffix>
              
        </template>
      </Input>
      <Input showPassword>
        
      </Input>
      <Switch v-model="switchValue" activeText="123"></Switch>
  </div>
  </div>
</template>

<script  setup lang="ts" >
import { ref,onMounted,inject, h, nextTick} from 'vue'
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core'
import { TooltipInstance } from '@/components/Tooltip/type';
import  Button  from '@/components/Button/Button.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue';
import Collapse from '@/components/Collapse/Collapse.vue';
import Icon from '@/components/Icon/Icon.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import DropDown from '@/components/DropDown/DropDown.vue';
import Input from '@/components/Input/Input.vue'
import Switch from '@/components/Switch/Switch.vue';
import { createMessage } from '@/components/Message/method'
import parent from '@/components/model/parent'
const activeNames = ref(['1'])
const buttonRef = ref()
onMounted(()=>{
  console.log("ref",buttonRef)
})
const overlayNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const switchValue = ref("122")
const tooltipRef = ref<TooltipInstance | null>(null)
let popperInstance:Instance|null = null
// if(overlayNode.value && triggerNode.value){
//   console.log("生成")
onMounted(()=>{
  
  popperInstance = createPopper(triggerNode.value,overlayNode.value,{
  placement: 'left'
})

let instance = createMessage({message :'hello mu world'})
setTimeout(()=>{
  console.log("创建的instance",instance)
  instance.distory()
  console.log("3秒后销毁")
 
},3000)
})



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
    label: h('b','this is bold'),
    key: 1,
    disabled: true,
  },
  {
    label: 'string2',
    key: 2,
    disabled: false,
  },
  {
    label: 'string3',
    key: 3,
    disabled: false,
  },

]
</script>
