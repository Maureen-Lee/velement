<template>
    <i class="vk-icon">
      <font-awesome-icon v-bind="$props" />
    </i>
</template>

<script setup lang="ts">

  /* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps } from './types';
defineProps<IconProps>()
defineOptions({
    inheritAttrs: false
})


</script>
