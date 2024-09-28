<template>
    <div class="vk-input"
    :class="{
        [`input-wrapper--${type}`]: type,
        'is-disabled': disabled,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocus,
        'input-wrapper--readonly': readonly, 
    }"
    >
    <template v-if= "type == 'textarea'">
       <textarea 
        v-model="innerValue"
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        ></textarea>
    </template>
    <template v-else>
      <!-- prepend slot -->
        <div  v-if="$slots.prepend" class="vk-input__prepend">
            <slot name="prepend"/>
         </div>
        
         <div class="vk-input__wrapper">
            <!-- prefix slot -->
            <div v-if="$slots.prefix" class="vk-input__prefix">
                <slot name="prefix"/>
            </div> 
            <input
               class="vk-input__inner"
               :type="showPassword? (passwordVisible ? 'text' : 'password') : type" 
               v-bind="attrs"
               v-model="innerValue" 
               :disabled="disabled"
               :readonly="readonly"
               :autocomplete="autocomplete"
               :placeholder="placeholder"
               :autofocus="autofocus"
               :form="form"
               @input="handleInput"
               @focus="handleFocus" 
               @blur="handleBlur"
                />
            <!-- suffix slot -->
            <div v-if="$slots.suffix || clearable || showPassword" class="input-suffix">
                <slot name="suffix" />
                <Icon  
                    v-if= "showClear" 
                    icon="circle-xmark"
                    class="vk-input__clear"
                    @click="clear" 
                    />
                    <Icon  
                    v-if= "showPasswordArea && passwordVisible" 
                    icon="eye"
                    class="vk-input__password"
                    @click="togglePasswordVisible" 
                    />
                    <Icon  
                    v-if= "showPasswordArea && !passwordVisible" 
                    icon="eye-slash"
                    class="vk-input__password"
                    @click="togglePasswordVisible" 
                    />
            </div>
         </div>
   
        <div v-if="$slots.append" class="input-append">
             <slot name="append"/>
        </div>
    </template>
    </div>
</template>                                                                                                                            
<script setup lang="ts">
import { computed, ref,watch,useAttrs } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { InputProps ,InputEmits }  from './types'
defineOptions({
    inheritAttrs: false
})
const isFocus = ref(false)
const props = withDefaults(defineProps<InputProps>(),{
    type: 'text'
});
const emit = defineEmits<InputEmits>()
const attrs = useAttrs()
const innerValue = ref(props.modelValue)
const isFocuse = ref(false)
const passwordVisible = ref(true)
const showClear = computed(()=>
     props.clearable && 
     !!innerValue.value && 
     !props.disabled 
     && isFocuse.value
)
const showPasswordArea = computed(()=>
    props.showPassword && 
    !!innerValue.value &&
     !props.disabled
)
const togglePasswordVisible = ()=>{
    passwordVisible.value = !passwordVisible.value
}
const handleFocus = ()=>{
    isFocuse.value = true
   
}
const handleBlur = ()=>{
    isFocuse.value = false
    console.log("handleBlur blur",isFocuse.value)
}
const handleInput = ()=>{
    emit('update:modelValue',innerValue.value? innerValue.value:'')
}
const clear = ()=>{
    innerValue.value = ''
    emit('update:modelValue','')
}
watch(()=> props.modelValue, (newValue)=>{
    innerValue.value = newValue
})

</script>
