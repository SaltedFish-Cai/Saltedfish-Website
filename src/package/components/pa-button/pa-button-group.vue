<template>
  <div class="pa-button-group" :class="['pa-button-group--' + type]">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// # Import
// import { reactive, onBeforeMount, useSlots, nextTick, watch } from "vue";
// import _ from "lodash";
// import { PaButtonType } from "./type";
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
