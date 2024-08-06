<template>
    <div
      class="vk-collapse-item"
     >
    <div 
      class="vk-collapse-item__header"
     @click="handleClick(props.name)">
        <slot name="title">{{ title }}</slot>
    </div>
    <transition name="slide" v-on="transitionEvents">
    <div class="vk-collapse-item__wrapper" v-show="activeNames.includes(props.name)">
    <div 
      class="vk-collapse-item__content"
      >
        <slot></slot>
    </div>    
    </div>
   </transition>
    </div>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import type { CollapseItemProp } from "./type"
import { collapseKey }  from './type'
const props = defineProps<CollapseItemProp>()
const key = inject(collapseKey)
const activeNames = key?.activeNames
const handleClick = (type: string | number) => {
            
   key?.handleClick(type)
}

const transitionEvents:Record<string,(el:HTMLElement)=>void> = {
   beforeEnter:(el)=>{
    el.style.height = '0px'
    el.style.overflow = 'hidden'
   },
   Enter:(el)=>{
    el.style.height =  `${el.scrollHeight}px`
    
   },

   afterEnter:(el)=>{
    el.style.height = ''
    el.style.overflow = ''
   },
   beforeLeave(el) { 
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }

}

</script>

<style scoped>

/* .v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  height: 2px;
 
}
 */



</style>

