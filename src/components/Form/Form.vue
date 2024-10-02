<template>
    <div class="vk-form">
        <!-- <form >
             -->
            <slot></slot>
        <!-- </form> -->
    </div>
</template>
<script lang="ts" setup>
import { provide } from 'vue'
import { FormContext, FormInstance } from '../../../../v-element/src/components/Form/types'
import type{ FormProps, FormItemProps ,FormItemContext,FormValidateFailure} from './types'
import type {  ValidateError ,ValidateFieldsError  } from 'async-validator'
import { formContextKey } from './types'

const props = defineProps<FormProps>()

const emit = defineEmits<{ (e: 'validate', callback: (isValid: boolean) => void) }>()
const fields: FormItemContext[] = []
const addField :FormContext['addField'] = (field) => {
    fields.push(field)
}
const removeField :FormContext['removeField'] = (field) => {
    if (field.prop) 
    fields.splice(fields.indexOf(field), 1)
}
provide(formContextKey, {
    ...props,
    addField,
    removeField
})
const validate = async () =>{ 
    let validationErrors: ValidateFieldsError = {}
    for(const field of fields){
        try{
            await field.validate()
        }catch(e) {
            const error = e as FormValidateFailure
            validationErrors = {
                ...validationErrors,
                ...error.fields
            }
        }
    }
    console.log("fields",fields)
    if(Object.keys(validationErrors).length === 0) return true
    console.log("Form表单验证失败",validationErrors)
    return Promise.reject(validationErrors)
}

const resetFields = ()=>{
    fields.forEach(field=>field.clearValidate())
}
defineExpose<FormInstance>({
    validate,
    resetFields
})
</script>
