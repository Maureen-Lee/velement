<template>
    <div
      class="vk-tooltip"
      ref="popperContainerNode"
      v-on="outerEvents"
    >
    
      <div
      ref="triggerNode"
      class="vk-tooltip__trigger"
      v-on="events"
      >
        <slot></slot>
      </div>
      <Transition>
      <div
      v-show="isOpen"
      ref="popperNode"
      class="vk-tooltip__popper" 
      v-on="events"
      >
      <slot name="content">
        {{ content }}    
      </slot>
     <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
        
    </div>
</template>

<script setup lang="ts">
import {ref,watch,reactive,computed} from 'vue'
import { useClickOutside } from '../../hooks/useClickOutside'
import { createPopper, popper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import { debounce } from "lodash";
import type { TooltipProps ,TooltipEmits,TooltipInstance} from './type'
import { onMounted } from 'vue';
const props = withDefaults(defineProps<TooltipProps>(),{
    placement: 'left',
    trigger:'hover',
    transition:'fade',
    manual: false,
    openDelay:150,
    closeDelay:150
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events:Record<string,any> = reactive({})
let outerEvents:Record<string,any> = reactive({})

const popperOptions = computed(()=>{
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      }
    ],
    ...props.popperOptions
  }
})
const togglePopper = () => {
    isOpen.value = !isOpen.value;
    emits('visible-change', isOpen.value);
}
const open = ()=>{
    isOpen.value = true;
    emits('visible-change', true)
}
const close = ()=>{
    isOpen.value = false;
    emits('visible-change', false)
}
const openDebounce = debounce(open,props.openDelay)
const closeDebounce = debounce(close,props.closeDelay)

const openFinal = ()=>{
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = ()=>{
  openDebounce.cancel()
  closeDebounce()
}
useClickOutside(triggerNode,()=>{
  if(!props.manual)
  {
  if(props.trigger == 'click' && isOpen.value && !props.manual)
  closeDebounce()
  }
  if(isOpen.value) {
    emits('click-outside', true)
  }
})
const attachEvents = ()=>{
    if(props.trigger === 'hover'){
      events['mouseenter'] = openFinal;
      outerEvents['mouseleave'] = closeFinal;
    }
    else if (props.trigger === 'click'){
        events['click'] = togglePopper;
    }
}
if(!props.manual) {
  attachEvents()
}

watch(()=>props.manual,(isManual)=>{
  if(isManual){
    events = {}
    outerEvents = {}
  }
  else{
    attachEvents()
  }
})

watch(isOpen,(newValue)=>{ 
  console.log("isOpen数值变化",isOpen)
  if(newValue){
      if(triggerNode.value && popperNode.value ){
        popperInstance =  createPopper(triggerNode.value, popperNode.value, popperOptions.value);
    }else{
    popperInstance?.destroy();
     }
    }
})
defineExpose<TooltipInstance>({
  'show': openFinal,
  'hide': closeFinal
})
</script>
