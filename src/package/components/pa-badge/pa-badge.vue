<template>
  <div class="pa-badge">
    <slot></slot>
    <div v-if="show || (value && value != 0)" class="pa-badge__content">
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PaBadgeType } from "./type";

withDefaults(defineProps<PaBadgeType>(), {});
</script>

<style lang="scss">
@use "./index.scss";
</style>
