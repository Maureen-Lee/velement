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
              
        </template>
        <template #suffix>
              
        </template>
      </Input>
      <Input showPassword>
        
      </Input>
      <Switch v-model="switchValue" activeText="123"></Switch>
     <Select  :options="selectOptions" clearable></Select>
     <div id="testnode">
     <button @click="createNode">创建node</button>
     </div>
     
  </div>
  </div>
</template>

<script  setup lang="ts" >
import { ref,onMounted,inject, h, nextTick,render} from 'vue'
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
import Select from '@/components/Select/Select.vue';
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
const btnRef = ref()
const tipRef= ref()
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
let popperInstance2:Instance|null = null

const selectOptions = [
  {label: 'hello544',value: '1'},
  {label: 'hello2',value: '2'},
  {label: 'hello3',value: '3',disabled: true},
]
     
  const testvnode = h('div',{
      style:{
        color: 'red'
      }
    },'hello vnode')
    console.log("testvnode",testvnode)
    const testvnode2 = 'hello vnode2'
const createNode = ()=>{
  
  const containernode = document.createElement('div')
  const vNode =  h(RenderV,{vNode:"helloDIWndjwuvbiw"})
  console.log("创建的Vnode",vNode)
   render(vNode,containernode)
   document.getElementById('testnode')?.appendChild(containernode)
}
</script>

<style scoped>
#tooltip {
        background: #333;
        color: white;
        font-weight: bold;
        /* width: 200px; */
        padding: 4px 8px;
        font-size: 13px;
        border-radius: 4px;
        display: none;
      }
      #tooltip[data-show] {
        display: block;
      }
     
#arrow,
#arrow::before{
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

#arrow {
  visibility: hidden;
 
}

#arrow::before {
  visibility: visible;
  content: '';
  transform: rotate(45deg);
}

#tooltip[data-popper-placement^='top'] > #arrow {
  bottom: -4px;
}

#tooltip[data-popper-placement^='bottom'] > #arrow {
  top: -4px;
}

#tooltip[data-popper-placement^='left'] > #arrow {
  right: -4px;
}

#tooltip[data-popper-placement^='right'] > #arrow {
  left: -4px;
}
</style>
