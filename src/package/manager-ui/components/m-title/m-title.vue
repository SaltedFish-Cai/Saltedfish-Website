<template>
  <div class="m-title" :class="[!!props.line ? '' : 'm-title_no-line', createSize == 'small' ? 'm-title_small' : '']">
    <div class="m-title_box" :class="[!!props.line ? '' : 'm-title_no-line']">
      <div class="m-title_text"><slot /></div>
    </div>
    <div class="m-title_tip">
      <slot name="tips">{{ tips }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// # Import
import { computed, ComputedRef } from "vue";
import { MTitleType } from "./type";
import { useBaseStore } from "../store/index";

// # Var
const props = withDefaults(defineProps<MTitleType>(), {
  line: true
});

const globalState = useBaseStore();
const createSize: ComputedRef<"default" | "small"> = computed(() => (globalState.getSize == "small" ? "small" : "default"));
</script>

<style lang="scss">
.m-title {
  position: relative;
  font-weight: bold;
  font-size: var(--m-component-font-size, 13px);
  margin-left: 0;
  color: var(--el-color-primary);
  width: calc(100% - var(--m-scroll-padding));
  padding-top: var(--m-component-padding-size, 10px);
  // padding-bottom: calc(var(--m-component-padding-size, 10px) / 2);
  padding-bottom: 0;

  .m-title_box {
    position: relative;
    &::after {
      position: absolute;
      bottom: 0;
      content: "";
      display: block;
      height: calc(var(--m-component-padding-size, 10px) * 0.3);
      border-radius: 0 8px;
      left: 3px;
      z-index: 1;
      width: calc(100% - 3px);
      background-color: var(--el-color-primary-light-7);
    }
  }

  .m-title_text {
    display: inline-block;
    width: max-content;
    position: relative;
    padding-bottom: calc(var(--m-component-padding-size, 10px) * 0.8);
    &::after {
      position: absolute;
      bottom: 0;
      content: "";
      display: block;
      height: calc(var(--m-component-padding-size, 10px) * 0.8);
      border-radius: 0 8px;
      z-index: 2;
      left: 0px;
      width: 100%;
      background-color: var(--el-color-primary);
    }
  }

  .m-title_tip {
    font-size: 14px;
  }
}

.m-title_no-line {
  padding-bottom: 0px !important;
  width: max-content;
  &::after {
    display: none;
  }
  .m-title_text {
    padding-bottom: 5px;

    &::after {
      position: absolute;
      bottom: 0;
      content: "";
      display: block;
      height: 5px;
      border-radius: 0 5px;
      z-index: 2;
      left: 0px;
      width: 100%;
      background-color: var(--el-color-primary);
    }
  }
}

// .m-scrollbar:has(> .is-vertical .el-scrollbar__thumb[style*="height"]) {
//   .el-scrollbar__view {
//     .m-title {
//       --m-scroll-padding: var(--m-component-padding-size, 10px);
//     }
//   }
// }
</style>
