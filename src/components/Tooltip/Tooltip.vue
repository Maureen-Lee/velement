<template>
    <div
      class="vk-tooltip"
      ref="popperContainerNode"
      v-on="events"
    >
    
      <div
      ref="triggerNode"
        class="vk-tooltip__trigger"
        
      >
        <slot></slot>
      </div>
      <div
      v-if="isOpen"
      ref="popperNode"
      class="vk-tooltip__popper" 
      >
     {{ content }}
    </div>
        
    </div>
</template>

<script setup lang="ts">
import {ref,watch,reactive} from 'vue'
import { useClickOutside } from '../../hooks/useClickOutside'
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import type { TooltipProps ,TooltipEmits} from './type'
const props = withDefaults(defineProps<TooltipProps>(),{
    placement: 'bottom',
    trigger:'click',
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events:Record<string,any> = reactive({})

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
useClickOutside(triggerNode,()=>{
  if(props.trigger == 'click' && isOpen.value)
  close()
})
const attachEvents = ()=>{
    if(props.trigger === 'hover'){
       events['mouseenter'] = open;
       events['mouseleave'] = close;
    }
    else if (props.trigger === 'click'){
        events['click'] = togglePopper;
    }
}
attachEvents()
watch(isOpen,(newValue)=>{ 
  if(newValue){
     if(triggerNode.value && popperNode.value){
        popperInstance =  createPopper(triggerNode.value, popperNode.value, {
          placement: props.placement,
        });
     }
  }else{
    popperInstance?.destroy();
     }
})

</script>
