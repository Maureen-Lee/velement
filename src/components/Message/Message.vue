<template> 
    <div 
    v-show="isVisible"
    class="message"
    :class="{ [`message--${type}`]: type}"
    :style = "cssStyle"
    ref="messageRef"
    >

      <div class="message__content">
        <slot>
            <RenderVnode :vNode="message" v-if="message"></RenderVnode>
        </slot>
      </div>
      <div class="message-close" @click="clickMark"> 
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
//const lastInstance = computed(()=> getLastInstance())
console.log("lastInstance",lastInstance)
let lastBottom =  computed(()=>  getLastBottomOffset(props.id))
let bottom = computed(()=> lastBottom.value + props.offset + messageRef.value?.offsetHeight)
console.log("lastBottom:",lastBottom.value,"props.id:",props.id)
const cssStyle = computed(()=>  ({top: `${props.offset + lastBottom.value}px` }))
console.log("cssStyle",cssStyle)




const isVisible = ref(false)
let timer:any;
onMounted(async ()=>{
  isVisible.value = true
})

console.log("lastInstance", lastInstance);
console.log("lastBottom", lastBottom.value);
console.log("cssStyle", cssStyle.value);
function clickMark(){
  console.log("点击销毁")
  props.onDistory()
}

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
<style scoped>
.message.fade-up-enter-from,
.message.fade-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
.message{
  display: flex;
  width: 100%;
  height: 50px;
  border: 2px solid black;
  align-items: center;
}
</style>