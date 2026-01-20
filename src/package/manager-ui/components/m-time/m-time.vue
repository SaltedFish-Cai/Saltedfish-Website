<template>
  <template v-if="!display">
    <el-date-picker
      v-if="type == 'date-picker-group' || type == 'date-picker' || type == 'date-time-range'"
      class="m-time"
      :id="id"
      ref="EL"
      v-model="inValue"
      :type="type == 'date-picker' ? 'date' : type == 'date-time-range' ? 'datetimerange' : 'daterange'"
      :placeholder="placeholder || languagePackage['selectTime']"
      :format="type == 'date-time-range' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
      :value-format="type == 'date-time-range' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
      :disabled="disabled"
      :start-placeholder="disabled ? ' ' : languagePackage['startTime']"
      :end-placeholder="disabled ? ' ' : languagePackage['endTime']"
      :size="size"
      :disabled-date="disabledDateFn ? disabledDateFn : () => false"
      :unlink-panels="true"
      @blur="blurFn"
      @focus="focusFn"
      @visible-change="visibleChangeFn"
      @change="changeFn"
    >
    </el-date-picker>
    <el-date-picker
      v-else-if="type == 'month-picker' || type == 'month-picker-group'"
      class="m-time"
      :id="id"
      ref="EL"
      v-model="inValue"
      :type="type == 'month-picker' ? 'month' : 'monthrange'"
      :placeholder="placeholder || languagePackage['selectTime']"
      :format="'YYYY-MM'"
      :value-format="'YYYY-MM'"
      :disabled="disabled"
      :start-placeholder="disabled ? ' ' : languagePackage['startTime']"
      :end-placeholder="disabled ? ' ' : languagePackage['endTime']"
      :size="size"
      :disabled-date="disabledDateFn ? disabledDateFn : () => false"
      @blur="blurFn"
      @focus="focusFn"
      @visible-change="visibleChangeFn"
      @change="changeFn"
    >
    </el-date-picker>
    <el-date-picker
      v-else-if="type == 'year-picker' || type == 'year-picker-group'"
      class="m-time"
      :id="id"
      ref="EL"
      v-model="inValue"
      :type="type == 'year-picker' ? 'year' : 'yearrange'"
      :placeholder="placeholder || languagePackage['selectTime']"
      :format="'YYYY'"
      :value-format="'YYYY'"
      :disabled="disabled"
      :start-placeholder="disabled ? ' ' : languagePackage['startYear']"
      :end-placeholder="disabled ? ' ' : languagePackage['endYear']"
      :size="size"
      :disabled-date="disabledDateFn ? disabledDateFn : () => false"
      @blur="blurFn"
      @focus="focusFn"
      @visible-change="visibleChangeFn"
      @change="changeFn"
    >
    </el-date-picker>
    <el-time-picker
      class="m-time"
      :id="id"
      ref="EL"
      v-else-if="type == 'time-picker-group'"
      v-model="inValue"
      is-range
      :placeholder="placeholder || languagePackage['selectTime']"
      :disabled="disabled"
      format="HH:mm:ss"
      value-format="HH:mm:ss"
      :start-placeholder="disabled ? ' ' : languagePackage['startTime']"
      :end-placeholder="disabled ? ' ' : languagePackage['endTime']"
      :size="size"
      :disabled-date="disabledDateFn ? disabledDateFn : () => false"
      @blur="blurFn"
      @focus="focusFn"
      @visible-change="visibleChangeFn"
      @change="changeFn"
    />
    <el-time-picker
      class="m-time"
      :id="id"
      ref="EL"
      v-else-if="type == 'time-picker'"
      v-model="inValue"
      :placeholder="placeholder || languagePackage['selectTime']"
      :disabled="disabled"
      format="HH:mm:ss"
      value-format="HH:mm:ss"
      :start-placeholder="disabled ? ' ' : languagePackage['startTime']"
      :end-placeholder="disabled ? ' ' : languagePackage['endTime']"
      :size="size"
      :disabled-date="disabledDateFn ? disabledDateFn : () => false"
      @blur="blurFn"
      @focus="focusFn"
      @visible-change="visibleChangeFn"
      @change="changeFn"
    />
  </template>
  <div
    v-else
    class="m-display_style"
    :class="[size == 'small' ? 'm-display_style_small' : '', size == 'large' ? 'm-display_style_large' : '']"
  >
    {{ findData(inValue) || "--" }}
  </div>
  <div
    v-if="alwaysContrast || eq(inValue, contrastData)"
    :class="['m-form-contrast-value', size == 'small' ? 'mo-form-contrast-value_small' : '']"
  >
    {{ findData(contrastData) }}
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, watch, computed } from "vue";
import { MTimeType } from "./type";
import format from "../tools/format";
import lodashPkg from "lodash";

import { useBaseStore } from "../store/index";

const { isEqual } = lodashPkg;

const inValue: Ref<string[] | string> = ref("");
const EL = ref();
const isFocus = ref(false);

const props = withDefaults(defineProps<MTimeType>(), {
  type: "date-picker-group"
});

const emits = defineEmits(["update:modelValue", "change", "focus", "blur"]);

const formatMap = {
  "time-picker": "HH:mm:ss",
  "time-picker-group": "HH:mm:ss",
  "date-time-range": "yyyy-MM-dd HH:mm:ss",
  "date-picker": "yyyy-MM-dd",
  "date-picker-group": "yyyy-MM-dd",
  "month-picker": "yyyy-MM",
  "month-picker-group": "yyyy-MM",
  "year-picker": "yyyy",
  "year-picker-group": "yyyy"
};

const globalState = useBaseStore();

// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});

function eq(data, contrastData) {
  if (!contrastData) return false;

  // const _contrastData = contrastData.filter(value => value !== null && typeof value !== "undefined");

  let _contrast = contrastData;
  let _data = data;
  if (
    props.type == "time-picker-group" ||
    props.type == "date-time-range" ||
    props.type == "date-picker-group" ||
    props.type == "month-picker-group" ||
    props.type == "year-picker-group"
  ) {
    _contrast = contrastData.map(value =>
      format(props.type == "time-picker-group" ? "2024-01-01 " + value : value, formatMap[props.type])
    );
    _data = data?.map(value => format(props.type == "time-picker-group" ? "2024-01-01 " + value : value, formatMap[props.type]));
  } else {
    _contrast = format(props.type == "time-picker" ? "2024-01-01 " + contrastData : contrastData, formatMap[props.type]);
    _data = format(props.type == "time-picker" ? "2024-01-01 " + data : data, formatMap[props.type]);
  }
  return !isEqual(_data, _contrast);
}

function findData(data) {
  if (Array.isArray(data)) {
    return (
      data
        .map(item => format(props.type == "time-picker-group" ? "2024-01-01 " + item : item, formatMap[props.type]))
        ?.join(` ${languagePackage.value["to"]} `) || "--"
    );
  } else return format(props.type == "time-picker" ? "2024-01-01 " + data : data, formatMap[props.type]) || "--";
}

let oldValue = props.modelValue;
function changeFn(value) {
  setTimeout(() => {
    emits("update:modelValue", value);
    emits("change", { value, oldValue });
    oldValue = value;
    EL.value?.blur();
  }, 0);
}

function visibleChangeFn(visible) {
  if (!visible && isFocus.value) {
    EL.value?.handleOpen();
  }
}

function blurFn() {
  isFocus.value = false;
  emits("blur", { value: inValue.value });
}

function focusFn() {
  isFocus.value = true;
  emits("focus", { value: inValue.value });
}

watch(
  () => props.modelValue,
  data => {
    inValue.value = data;
    oldValue = data;
  },
  { immediate: true }
);
</script>

<style lang="scss">
.m-time {
  width: 100% !important;
  padding: 1px 0 !important;
  display: flex;
  height: initial !important;

  .el-range__icon,
  .el-range__close-icon,
  .el-input__prefix {
    display: none;
  }
  .el-input__wrapper {
    padding: 1px calc(var(--m-component-padding-size, 10px) * 1) !important;
    font-size: var(--m-component-font-size, 13px);
    .el-input__inner {
      height: var(--m-component-height-size, 28px);
      line-height: var(--m-component-height-size, 28px);
      text-align: left;
    }
  }
  // 去除时间选择器上下 padding
  .el-range-editor.el-input__wrapper {
    width: initial !important;
    // padding: 0px 10px;
    height: initial !important;
  }

  .el-range-input {
    width: 100%;
    height: var(--m-component-height-size, 28px);
    line-height: var(--m-component-height-size, 28px);
    font-size: var(--m-component-font-size, 13px);
  }
  .el-cascader__search-input {
    margin-bottom: 0;
  }
}
</style>
