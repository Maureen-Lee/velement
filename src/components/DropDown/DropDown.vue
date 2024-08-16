<template>
  <div class="vk-DropDown">
  <Tooltip 
  :trigger="trigger"
  :placement="bottom"
  :popper-options="popperOptions"
  ref="tooltipRef"
  >
      <slot/>
    <template #content>
       <ul class="vk-dropdown__menu">
         <template v-for="item in menuOptions" :key="item.key">
             <li 
             v-if="item.divided"
             role="separator"
             class="vk-dropdown__placeholder"
            />
            <li
            class="vk-dropdown__item"
            :class="{'is-disabled': item.disabled, 'is-divided': item.divided}"
            :id="`dropdown-item-${item.key}`"
            >
              <RendererVnode :vNode="item.label"></RendererVnode>
            </li>
         </template>
       </ul>
    </template>
  </Tooltip>
 </div> 
</template>
<script setup lang="ts">
import Tooltip from '../Tooltip/Tooltip.vue';
import RendererVnode  from '../Common/RenderVnode';
import type { DropdownProps ,DropdownEmits} from './types'
import { bottom } from '@popperjs/core';
const props = defineProps<DropdownProps>()
const emits = defineEmits<DropdownEmits>()

</script>