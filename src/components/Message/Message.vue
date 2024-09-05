<template> 
    <div 
    v-show="isVisible"
    class="message"
    :class="{[`message--${type}`]: type}"
    :style = "cssStyle"
    @mouseover="clearTimer"
    @mouseleave="startTimer"
    ref="messageRef"
    >

      <div class="message__content">
        <slot>
            <RenderVnode :vNode="message" v-if="message"></RenderVnode>
        </slot>
      </div>
      <div class="message-close" @click="isVisible = false"> 
         <Icon icon="xmark"></Icon> 
      </div>
    </div>
</template>
<script setup lang="ts">
import { ref ,watch,onMounted, reactive, nextTick ,computed,watchEffect} from 'vue'
import type { MessageProps } from './types'
import useEventListener from '../../hooks/useEventListener'
import {getLastInstance, getLastBottomOffset } from './method';
import  RenderVnode  from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue'
import { start } from '@popperjs/core';
const messageRef =  ref()

const props = withDefaults(defineProps<MessageProps>(),{
    type: 'info',
    duration: 3000,
    transitionName:'fade-up',
    offset:20,
})

const lastInstance = reactive(getLastInstance())
let lastBottom =  computed(()=>  getLastBottomOffset(props.id))
let bottom = computed(()=> lastBottom.value + props.offset + messageRef.value?.offsetHeight)
const cssStyle = computed(()=>  
  ({
    top: `${props.offset + lastBottom.value}px`,
    zIndex: props.zIndex
 })
  )
const isVisible = ref(true)
let timer:any;
onMounted(async ()=>{
 startTimer()
})
watch(isVisible,(newValue)=>{
  if(!newValue){
    props.onDistory()
  }
})
function startTimer(){
  if(props.duration == 0) return
 timer =  setTimeout(()=>{
    isVisible.value= false
  },props.duration)
}

function clearTimer(){
  clearTimeout(timer)
}

//添加键盘事件
useEventListener(document,'keydown',(e:KeyboardEvent)=>{

  if(e.code === 'Escape'){
    isVisible.value = false
  }
})
function distoryComponent(){
 props.onDistory()
}



defineExpose({
  bottom,
  visible: isVisible
})
</script>
