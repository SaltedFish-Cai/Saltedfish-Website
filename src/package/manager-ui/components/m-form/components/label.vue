<template>
  <div
    :class="['label_width', labelPosition == 'right' ? 'form_label_text_right' : '']"
    :style="{ width: !!labelWidth ? labelWidth + 'px !important' : 'initial' }"
    v-if="label"
  >
    <div ref="RefLabel" :class="['label_text', 'form_label_text']" :title="label">
      {{ label }}
    </div>

    <!-- 提示 -->
    <el-tooltip v-if="tip" :content="tip" placement="right" raw-content>
      <m-icon name="question_line" class="form-title_label_icon"></m-icon>
    </el-tooltip>

    <slot :name="'label-' + item.prop" v-bind="{ data, item }"></slot>
  </div>
</template>
<script lang="ts" setup>
// # Import
import { ref, nextTick, reactive } from "vue";
import { labelPropsType } from "../type";

// # Var
defineProps<labelPropsType>();

const coldState = {
  animationKey: 0,
  moveValue: 0,
  maxValue: 0
};
const state = reactive({
  overLabel: false
});
const RefLabel = ref();

nextTick(() => {
  const el = RefLabel.value;
  if (el && el.scrollWidth > el.clientWidth) {
    coldState.maxValue = el.scrollWidth - el.clientWidth;
    state.overLabel = true;
  }
});
</script>
<style lang="scss" scoped>
.form_label_text {
  // display: flex;
  // align-items: center;
  // justify-content: flex-start;
  font-size: calc(var(--m-component-font-size, 13px) + 1px);
  font-weight: bold;
  color: var(--el-text-color-regular);
  word-break: break-all;
}
.form_label_text_right {
  justify-content: flex-end !important;
}
.label_width {
  display: flex;
  // overflow: hidden;
  justify-content: flex-start;
  color: var(--dms-page-text-color);
  align-items: center;
  // white-space: nowrap;
  &_text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-tip {
    margin: 0 5px;
  }
  .label_help {
    cursor: help;
  }
}
</style>
