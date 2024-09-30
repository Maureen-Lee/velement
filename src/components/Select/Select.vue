<template>
    <div 
        class="select"
        @click="toggleDropdown"
        @mouseenter="states.mouseHover = true"
        @mouseleave="states.mouseHover = false"

        >
      
       <ToolTip  
            :popperOptions="popperOptions"
            ref="tooltipRef"
            manual 
            placement="bottom" 
            @click-outside="controlDropdown(false)"
            class="vk-select__tooltip">
        <Input 
           class="vk-input"
           v-model="states.inputValue"
           type="text"
           :readonly="!filterable"> 
           <template #suffix>
            <Icon
              v-if="showClearIcon"
              icon="circle-xmark"
              @click.stop="onClear"
              >
                
            </Icon>
            <Icon 
                v-else  
                icon="angle-down"
                class="header-angle"
                :class="{'is-active' : isDropdownShow}"
                >
            </Icon>
           </template>
        </Input>
        
        <template #content>
            <ul class="select__options">
                <li 
                 :class="{
                    'is-disabled': option.disabled, 
                    'is-selected': states.inputValue === option.label ,
                 }"
                 v-for="option in options" 
                 :key="option.value"
                 @click="itemSelect(option)">
                <RenderVnode :vNode="renderLabel ? renderLabel(option): option.label "></RenderVnode>
                </li>
            </ul>
        </template>
       </ToolTip>
    </div>
    
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue' 
import type { Ref } from 'vue'
import type { TooltipInstance } from '../Tooltip/type'
import ToolTip from '../Tooltip/Tooltip.vue'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import type { SelectProps ,SelectEmits ,SelectOption,SelectStates } from './types'
import RenderVnode from '../Common/RenderVnode'
const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();
const isDropdownShow = ref(false)
const controlDropdown = (show: boolean)=>{
    if(show)
    {
        tooltipRef.value.show()
    }
    else
    {
        
        tooltipRef.value.hide()
    }
    isDropdownShow.value = show
    emits('visible-change',show)
}
const toggleDropdown = ()=>{
    if(props.disabled) return
    controlDropdown(!isDropdownShow.value)
}
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
          state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    }
  ],
}

const findOption = (value)=>{
    const option = props.options.find(option => option.value === value)
    return option ? option : null
}
const initialOption = findOption(props.modelValue)

const tooltipRef = ref() as Ref<TooltipInstance>
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1
})
const itemSelect = (e: SelectOption)=>{
    if(e.disabled) return
   states.inputValue = e.label
   emits('change',e.value)
   emits('update:modelValue',e.value)
}
const showClearIcon = computed(()=>{
    return props.clearable && states.inputValue.trim() !=='' && states.mouseHover
})

const onClear = () =>{
    states.selectedOption = null
    states.inputValue = ''
}
</script> 

