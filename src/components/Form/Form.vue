<template>
    <div class="vk-form">
        <form action="">
            
            <slot></slot>
        </form>
    </div>
</template>
<script lang="ts" setup>
import { provide } from 'vue'
import type{ FormProps, FormItemProps } from './types'
import { formContextKey } from './types'

const props = defineProps<FormProps>()

const emit = defineEmits<{ (e: 'validate', callback: (isValid: boolean) => void) }>()

provide(formContextKey, props)
</script>
