<template>
  <div class="m-button-v2-group" :class="['m-button-v2-group--' + type]">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// # Import
// import { reactive, onBeforeMount, useSlots, nextTick, watch } from "vue";
// import lodashPkg from "lodash";
// import { MButtonTypeV2 } from "./type";
// import inBrowser from "../tools/inBrowser";
withDefaults(
  defineProps<{
    type?: "danger" | "default" | "info" | "primary" | "success" | "warning";
  }>(),
  {
    type: "default" as const
  }
);
</script>

<style lang="scss">
@use "./index.scss";
</style>
