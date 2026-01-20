<template>
  <div v-if="!display" class="m-number">
    <el-input-number
      :id="id"
      v-model="inValue"
      :placeholder="placeholder || languagePackage['inputPlaceholder']"
      :disabled="disabled"
      controls-position="right"
      :controls="controls == undefined ? false : controls"
      :value-on-clear="valueOnClear != undefined ? valueOnClear : min || 0"
      :precision="precision || 0"
      :max="max"
      :min="min"
      :step="step == undefined ? 1 : step || min"
      :stepStrictly="stepStrictly == undefined ? false : stepStrictly"
      :size="baseSize"
      @keydown="inputKeyDown"
      @keyup="inputKeyUp"
      @change="inputChange"
    />
  </div>
  <div
    v-else
    class="m-display_style"
    :class="[size == 'small' ? 'm-display_style_small' : '', size == 'large' ? 'm-display_style_large' : '']"
  >
    {{ keepDecimalPlaces(inValue, precision) }}
  </div>
  <div
    v-if="
      (alwaysContrast && contrastData) ||
      (contrastData && contrastData != undefined && contrastData != null && !isEqual(inValue, contrastData))
    "
    :class="['m-form-contrast-value', size == 'small' ? 'mo-form-contrast-value_small' : '']"
  >
    {{ keepDecimalPlaces(contrastData, precision) || "--" }}
  </div>
</template>
<script lang="ts" setup>
// # Import
import { ref, Ref, computed, watch } from "vue";
import lodashPkg from "lodash";
import { useBaseStore } from "../store/index";
import { MNumberType } from "./type";

// # Var
const { isNumber, isEqual, isNil } = lodashPkg;

const props = withDefaults(defineProps<MNumberType>(), {});

const emits = defineEmits(["update:modelValue", "change"]);

const globalState = useBaseStore();
const globalStateSize: Ref<"default" | "large" | "small"> = ref("small");
const inValue: Ref<number | undefined> = ref(undefined);

// #Computed
const baseSize = computed(() => {
  if (props.size) {
    return props.size;
  } else {
    return globalStateSize.value;
  }
});

const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});

// #Function 加小数点
function keepDecimal(_numStr, precision) {
  const numStr = _numStr < 0 ? String(0 - _numStr) : String(_numStr);
  const regexp = new RegExp(`^\\d+(?:\\.\\d{0,${precision}})?`);
  const result = numStr.match(regexp);
  return result ? (_numStr < 0 ? String(0 - Number(result[0])) : result[0]) : "0";
}

// #Function 加数字分号
function numberWithCommas(numStr, precision) {
  const _numStr = numStr.toString();
  const _numStrArr = _numStr.split(".");
  let x = _numStrArr[0];
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return precision > 0 ? [x, _numStrArr[1]].join(".") : x;
}

// #Function 设置数字格式
function keepDecimalPlaces(numStr, precision) {
  if (isNil(numStr)) return "--";
  let numberStr = keepDecimal(numStr, precision);
  let rs = numberStr.indexOf(".");

  if (precision == undefined) return (numberStr = numberStr.split(".")[0]);

  if (precision == 0) {
    return numberWithCommas((numberStr = numberStr.split(".")[0]), precision);
  }
  if (rs < 0 && precision > 0) {
    rs = numberStr.length;
    numberStr += ".";
  }
  while (numberStr.length <= rs + precision) {
    numberStr += "0";
  }
  return numberWithCommas(numberStr, precision);
}

// #Function 键盘弹起
let oldValue: number | undefined = props.modelValue;
function inputKeyUp() {
  inValue.value = Number(inValue.value) ? inValue.value : props.valueOnClear != undefined ? props.valueOnClear : props.min || 0;
  emits("update:modelValue", inValue.value);
  emits("change", { value: inValue.value, oldValue });
  oldValue = inValue.value;
}

// #Function 键盘摁下
function inputKeyDown(e) {
  const precision = props?.precision || 0;
  const data = inValue.value || 0;
  const key = e.key;
  if (key === "e" || key === "E" || key === "+" || (data < 0 && key === "-") || (precision <= 0 && key === ".")) {
    e.returnValue = false;
    return false;
  }
  return true;
}

// #Function 输入框内容变革
function inputChange() {
  emits("update:modelValue", inValue.value);
}

// #Watch globalState
watch(
  () => globalState,
  data => {
    globalStateSize.value = data.getSize || "default";
  },
  { immediate: true, deep: true }
);

// #Watch modelValue
watch(
  () => props.modelValue,
  data => {
    inValue.value = isNumber(data) ? Number(data) : undefined;
    oldValue = isNumber(data) ? Number(data) : undefined;
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss">
.m-number {
  width: 100%;

  .el-input-number {
    width: 100%;
    transition: var(--m-component-animation, 0.3s);

    .el-input-number__increase,
    .el-input-number__decrease {
      transition: var(--m-component-animation, 0.3s);

      height: auto;
    }
    .el-input__wrapper {
      padding: 1px calc(var(--m-component-padding-size, 10px) * 1) !important;
      font-size: var(--m-component-font-size, 13px);
      .el-input__inner {
        text-align: left;
        height: var(--m-component-height-size, 28px);
        line-height: var(--m-component-height-size, 28px);
      }
    }
  }

  .is-controls-right {
    height: 50% !important;
  }
}

.m-number.is-controls-right {
  .el-input-number__increase,
  .el-input-number__decrease {
    height: auto;
  }
}
</style>
