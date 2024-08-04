<template>
    <button 
    ref="b_ref"
    class="vk-button"
    :class="{
    [`vk-button-${type}`]: type,
    [`vk-button-size-${size}`]: size,
    'is-disabled': disabled,
    'is-round': round,
    'is-circle': circle,
    'is-plain' : plain,
    }"
    :disabled="disabled"
    :type="nativeType"
    >
    <span> 
        <slot></slot>
    </span>
    </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from './type'
withDefaults(defineProps<ButtonProps>(),{
    nativeType:'button',

})

const b_ref = ref<HTMLButtonElement>()

defineExpose({
    ref: b_ref
})
</script>

<style scoped>

</style>
