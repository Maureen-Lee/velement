<template>
    <div 
    class="message"
    :class="{ [`message--${type}`]: type}"
    >
      <div class="message__content">
        <slot>
            <RenderVnode :vNode="message" v-if="message"></RenderVnode>
        </slot>
      </div>
      <div class="message-close" v-if="showClose"> 
         <Icon icon="xmark"></Icon> 
      </div>
    </div>
</template>
<script setup lang="ts">
import type { MessageProps } from './types'
import  RenderVnode  from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue'
const props = withDefaults(defineProps<MessageProps>(),{
    type: 'info',
    duration: 3000,
})

</script>
<style scoped>
</style>