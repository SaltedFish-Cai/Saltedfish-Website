<template>
  <el-checkbox-group
    v-if="!display"
    :id="id"
    class="m-checkbox"
    v-model="inValue"
    :disabled="disabled"
    @change="changeEvent"
    :size="size"
  >
    <el-checkbox
      v-for="option in exOptionsList"
      :key="String(option.value)"
      :label="option.value"
      :value="option.value"
      :name="String(option.value)"
      :disabled="option.disabled"
      :size="size"
    >
      {{ option.label }}
    </el-checkbox>
  </el-checkbox-group>
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
import { MCheckboxType } from "./type";
import lodashPkg from "lodash";

const props = withDefaults(defineProps<MCheckboxType>(), {});
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
  if (Array.isArray(data) && options?.length) {
    for (let I_index = 0; I_index < data.length; I_index++) {
      const row = data[I_index];
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        if (option.value == row) {
          text += option.label + `${I_index < data.length - 1 ? "，" : ""}`;
        }
      }
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
.m-checkbox {
  user-select: auto;
}
</style>
