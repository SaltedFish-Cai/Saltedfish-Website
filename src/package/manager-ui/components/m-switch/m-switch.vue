<template>
  <el-switch
    v-if="!display"
    :id="id"
    class="m-switch"
    v-model="inValue"
    :disabled="disabled"
    :active-value="options.activeValue"
    :inactive-value="options.inActiveValue"
    :active-text="options.activeText"
    :inactive-text="options.inActiveText"
    :size="size"
    @change="changeEvent"
  />
  <div
    v-else
    class="m-display_style"
    :class="[size == 'small' ? 'm-display_style_small' : '', size == 'large' ? 'm-display_style_large' : '']"
  >
    {{ findData(inValue) || "-1-" }}
  </div>
  <div
    v-if="alwaysContrast || (!isNil(contrastData) && !isEqual(inValue, contrastData))"
    :class="['m-form-contrast-value', size == 'small' ? 'mo-form-contrast-value_small' : '']"
  >
    <div v-if="options.activeText">{{ findData(contrastData) }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, Ref, watch } from "vue";
import { MSwitchType } from "./type";
import lodashPkg from "lodash";
import { useBaseStore } from "../store/index";
const globalState = useBaseStore();

const props = withDefaults(defineProps<MSwitchType>(), {
  activeValue: true,
  inActiveValue: false,
  contrastData: undefined
});
const { isEqual, isNil } = lodashPkg;
// const exOptionsList = ref(props?.exOptions || []);

const inValue: Ref<boolean | number | string | undefined> = ref(props.modelValue);
const emits = defineEmits(["update:modelValue", "change"]);

let oldValue = props.modelValue;
function changeEvent(value) {
  emits("update:modelValue", value);
  emits("change", { value, oldValue });
  oldValue = value;
}

function changeType(type, opts) {
  if (type == "string") {
    return {
      activeValue: String(opts.activeValue),
      inActiveValue: String(opts.inActiveValue),
      activeText: opts.activeText,
      inActiveText: opts.inActiveText
    };
  } else if (type == "number") {
    return {
      activeValue: Number(opts.activeValue),
      inActiveValue: Number(opts.inActiveValue),
      activeText: opts.activeText,
      inActiveText: opts.inActiveText
    };
  } else {
    return {
      activeValue: opts.activeValue,
      inActiveValue: opts.inActiveValue,
      activeText: opts.activeText,
      inActiveText: opts.inActiveText
    };
  }
}

const options = computed(() => {
  const typeIs = typeof inValue.value;
  const {
    activeValue = true,
    inActiveValue = false,
    activeText = globalState.getLanguage == "zh-CN" ? "是" : "Yes",
    inActiveText = globalState.getLanguage == "zh-CN" ? "否" : "No"
  } = props.exOptions || props;

  const _opt = changeType(typeIs, {
    activeValue: activeValue,
    inActiveValue: inActiveValue,
    activeText: activeText,
    inActiveText: inActiveText
  });
  return _opt;
});

function findData(data) {
  let text = "";
  const opt = options.value;
  const _options = [
    { label: opt.activeText, value: opt.activeValue },
    { label: opt.inActiveText, value: opt.inActiveValue }
  ];
  for (let index = 0; index < _options.length; index++) {
    const option = _options[index];
    if (option.value == data) {
      text += option.label;
    }
  }
  return text || "--";
}

watch(
  () => props.modelValue,
  data => {
    inValue.value = data || options.value.inActiveValue;
    oldValue = data || options.value.inActiveValue;
    emits("update:modelValue", data || options.value.inActiveValue);
  },
  { immediate: true }
);

// #Watch exOptionsList
// watch(
//   () => props.exOptions,
//   data => {
//     exOptionsList.value = data;
//   },
//   { immediate: true, deep: true }
// );
</script>

<style lang="scss">
.m-switch {
  user-select: auto;
}
</style>
