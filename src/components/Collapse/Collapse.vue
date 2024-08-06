<template>
    <div class="vk-collapse">
        <slot></slot>
    </div>

</template>

<script setup lang="ts">
import { provide ,ref ,watch} from 'vue'
import type { CollapseProp } from './type'
import { collapseKey } from "./type"
const props = defineProps<CollapseProp>()

const activeNames = ref<Array<number | string>>(props.modelValue)

 function handleClick(type: number| string){
    if(props.accordion) activeNames.value = activeNames.value[0] == type ? [""] : [type];
    else {
     if (activeNames.value.includes(type)) {
        const index = activeNames.value.indexOf(type)
        activeNames.value.splice(index, 1);
      } else {
        activeNames.value.push(type);
      }       
    }
 }

 watch(()=>props.modelValue,()=>{
    activeNames.value = props.modelValue
    console.log("监听到了")
 },
 {deep:true}
)
provide(collapseKey,{
    activeNames,
    handleClick
})
</script>
