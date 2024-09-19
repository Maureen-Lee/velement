<template>
    <div
        class="switch"
        @click="changeSwitch"
        >
        <input
            type="checkbox"
            :checked="isChecked"
            class="switch-checkbox"
        />
        <div class="switch-core"
        :class = "{
            'is-checked': isChecked
        }">
            <div class="switch-action">
                
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref,computed ,onMounted} from 'vue'
import type { SwitchProps, SwitchEmits } from './types'
const props = withDefaults(defineProps<SwitchProps>(),{
    modelValue:false,
    disabled:false,
    width:40,
    activeColor:'#409eff',
    inactiveColor:'#c0ccda',
    activeText:'',
    inactiveText:'',
    activeValue:true,
    inactiveValue:false,
    name:''
})
const emit = defineEmits<SwitchEmits>()
const innerValue = ref(props.modelValue)
const isChecked = computed(()=>innerValue.value == props.activeText)
const changeSwitch = ()=>{
    innerValue.value = isChecked.value ? props.inactiveText : props.activeText
    console.log("innerValue",innerValue.value)
}
onMounted(()=>{
    console.log("onMounted",isChecked.value)
})
</script>
<style scoped >

.switch {
  --vk-switch-on-color: var(--vk-color-primary);
  --vk-switch-off-color: var(--vk-border-color);
  --vk-switch-on-border-color: var(--vk-color-primary);
  --vk-switch-off-border-color: var(--vk-border-color);
}
.switch-checkbox{
    background-color : #ccc;
    
}
.switch-core{
    width: 100px;
    height: 40px;
    position: relative;
    display: inline-flex;
    align-items: center;
    border-radius:  25px;
    cursor: pointer;
    background-color: var(--vk-switch-off-color);
}
.switch-action{
    width: 35px;
    height: 35px;
    position: absolute;
    left: 2px;
    border-radius: 50%;
    background: #fff;
    z-index: 10000;
    transition: all .5s ease;
}

.is-checked  .switch-action{
    left: 63px;
    transition: all .5s ease;
   
  }
 .is-checked  {
     border-color: var(--vk-switch-on-border-color) !important;
     background-color: var(--vk-switch-on-color) !important;
    }
</style>