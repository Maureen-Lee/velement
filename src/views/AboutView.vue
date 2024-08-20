<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Button @click="closeToolTip()">close Tooltip</Button>
  <Button @click="showTooltip()">Open Tooltip</Button>
  <Tooltip  content="tooltip content" trigger="click" ref="tooltipRef" placement="left" manual>
    <div><Button>Test manual Tooltip</Button></div>
  </Tooltip>

  </div>
</template>
<script setup lang="ts">
import { TooltipInstance } from '@/components/Tooltip/type';
import  Button  from '@/components/Button/Button.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue';
</script>

