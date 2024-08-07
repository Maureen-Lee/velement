<template>
    <i class="vk-icon" :class="{[`vk-icon--${type}`]:type}" v-bind="$attrs">
      <font-awesome-icon v-bind="filteredProps" />
    </i>
</template>

<script setup lang="ts">
import { omit } from "lodash-es"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps} from './types';
const props = defineProps<IconProps>()
const filteredProps = omit(props,['type','color'])
defineOptions({
    inheritAttrs: false
})


</script>
