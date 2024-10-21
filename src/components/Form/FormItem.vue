<template>
    <div class="vk-form-item"
       :class="{
         'is-error': validateStatus.state === 'error',
         'is-success': validateStatus.state === 'success',
         'is-loading': validateStatus.loading,
       }">
     <label class="vk-form-item__label">
        <slot name="label" :label="label" >
            {{ label }}
        </slot>
    </label>
     <div class="vk-form-item__content">
        <slot :validate="validate"/>
        <div class="vk-form-item__error" v-if="validateStatus.state === 'error'">{{ validateStatus.errmsg }}</div>
     </div>
    
     <!-- <button @click.prevent="validate">validate</button> -->
    </div>
</template>
<script lang="ts" setup>
import { inject,computed,reactive,provide ,onMounted,onUnmounted} from 'vue';
import { FormItemProps ,formContextKey,formItemContextKey} from './types'
import Schema from 'async-validator';
import { isNil  } from 'lodash-es'
import { FormItemContext } from '../../../../v-element/src/components/Form/types';
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)

const innerValue = computed(()=>{
    const model = formContext?.model
if(model && props.prop && !isNil(model[props.prop]))
return model[props.prop]
else return null
})
const itemRules = computed(()=>{
    const rules = formContext?.rules
    if(rules && props.prop && rules[props.prop] )
    return rules[props.prop]
    else return []
})

const validateStatus = reactive({
    state: 'init',
    errmsg:"",
    loading: false
})

const  getTriggeredRules = (trigger?: string) => {
    const rules = itemRules.value;
    if (rules) {
        return rules.filter(rule => {
            if (!rule.trigger || !trigger) return true
            return rule.trigger && rule.trigger === trigger
        })
    } else {
        return [] 
    }
}
const validate = (trigger?: string) =>{
    const modelName = props.prop;
    const triggeredRules = getTriggeredRules(trigger) 
    console.log("modelName",triggeredRules,"trigger",trigger)
    if(triggeredRules.length === 0) return true
    if(modelName) {
        const validator = new Schema({
            [modelName]: triggeredRules
        }) 
        validateStatus.loading = true
      return   validator.validate({[modelName]: innerValue.value})
        .then(()=>{
            validateStatus.state = 'success'
            console.log("validate success")
        })
        .catch((e:any)=>{
            const { errors } = e
            validateStatus.state = 'error'
            validateStatus.errmsg = (errors && errors.length > 0) ? errors[0].message || '' : ''
            console.log("validate fail",e.errors)
           // return Promise.reject(e)
        })
        .finally(() => {
        validateStatus.loading = false
      })
    }
    
}
const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errmsg = ''
  validateStatus.loading = false
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) { 
    model[props.prop] = ''
  }
}
const context: FormItemContext = {
    validate,
    prop: props.prop || '',
    clearValidate
}
provide(formItemContextKey,context)
onMounted(()=>{
    if(props.prop)
    formContext?.addField(context)
})
onUnmounted(()=>{
    if(props.prop)
    formContext?.removeField(context)
})
//console.log("inject",formContext)
</script>
<style  scoped>
.vk-form-item{
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}
.vk-form-item__label{
    line-height: 32px;
}
.vk-form-item__content{
    margin-left: 10px;
}
.is-error .vk-form-item__content{
    border: 1px solid #ff4d4f;
    border-radius: 4px;
    box-shadow: none;
    color: #ff4d4f;
}
.vk-form-item__error{
    position: absolute;
}

</style>