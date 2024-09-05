<template> 
    <div 
    v-show="isVisible"
    class="message"
    :class="{[`message--${type}`]: type}"
    :style = "cssStyle"
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
import {getLastInstance, getLastBottomOffset } from './method';
import  RenderVnode  from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue'
const messageRef =  ref()

const props = withDefaults(defineProps<MessageProps>(),{
    type: 'info',
    duration: 3000,
    transitionName:'fade-up',
    offset:20,
})

const lastInstance = reactive(getLastInstance())
console.log("lastInstance",lastInstance)
let lastBottom =  computed(()=>  getLastBottomOffset(props.id))
let bottom = computed(()=> lastBottom.value + props.offset + messageRef.value?.offsetHeight)
console.log("lastBottom:",lastBottom.value,"props.id:",props.id)
const cssStyle = computed(()=>  
  ({
    top: `${props.offset + lastBottom.value}px`,
    zIndex: props.zIndex
 })
  )
console.log("cssStyle",cssStyle)




const isVisible = ref(false)
let timer:any;
onMounted(async ()=>{
  isVisible.value = true
})

console.log("lastInstance", lastInstance);
console.log("lastBottom", lastBottom.value);
console.log("cssStyle", cssStyle.value);


watch(isVisible,(newValue)=>{
  if(!newValue){
    props.onDistory()
    console.log("销毁dom",isVisible)
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
