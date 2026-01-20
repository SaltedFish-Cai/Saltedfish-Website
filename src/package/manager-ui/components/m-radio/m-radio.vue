<template>
  <el-radio-group
    v-if="!display"
    :id="id"
    class="m-radio"
    v-model="inValue"
    :disabled="disabled"
    @change="changeEvent"
    :size="size"
  >
    <el-radio
      v-for="option in exOptionsList"
      :id="id + '-' + option.value"
      :key="String(option.value)"
      :label="option.value"
      :value="option.value"
      :name="String(option.value)"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </el-radio>
  </el-radio-group>
  <div
    v-else
    class="m-display_style"
    :class="[size == 'small' ? 'm-display_style_small' : '', size == 'large' ? 'm-display_style_large' : '']"
  >
    {{ findData(inValue) || "--" }}
  </div>
  <div
    v-if="alwaysContrast || (contrastData && !isEqual(inValue, contrastData))"
    :class="['m-form-contrast-value', size == 'small' ? 'mo-form-contrast-value_small' : '']"
  >
    <div v-if="exOptionsList?.length">{{ findData(contrastData) }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { MRadioType } from "./type";
import lodashPkg from "lodash";

const props = withDefaults(defineProps<MRadioType>(), {});
const { isEqual } = lodashPkg;
const exOptionsList = ref(props?.exOptions || []);

const inValue = ref(props.modelValue);
const emits = defineEmits(["update:modelValue", "change"]);

let oldValue = props.modelValue;
function changeEvent(value) {
  emits("update:modelValue", value);
  emits("change", { value, oldValue });
  oldValue = value;
}

function findData(data) {
  let text = "";
  const options = props.exOptions;
  if (options?.length)
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.value == data) {
        text += option.label;
      }
    }
  return text || "--";
}

// #Watch modelValue
watch(
  () => props.modelValue,
  data => {
    inValue.value = data;
    oldValue = data;
  },
  { immediate: true, deep: true }
);

// #Watch exOptionsList
watch(
  () => props.exOptions,
  data => {
    exOptionsList.value = data || [];
  },
  { immediate: true, deep: true }
);
</script>

<style>
.m-radio {
  .el-radio__label {
    font-size: var(--m-component-font-size, 13px);
  }
  .el-radio {
    user-select: auto;
  }
  .el-radio-button,
  .el-radio-button--small,
  .el-radio-button--large {
    .el-radio-button__inner {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      line-height: 1.6em;
      height: 100%;
      display: block;
    }
  }
}
</style>
