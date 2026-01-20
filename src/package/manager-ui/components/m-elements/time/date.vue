<!--
 * @ Author: Cai
 * @ Create Time: 2024-03-11 15:29:55
 * @ Modified by: Cai
 * @ Modified time: 2024-09-03 10:31:56
 * @ Description: page name: m-element-data
 -->

<template>
  <template v-if="item.prop">
    <el-date-picker
      v-if="!item.display"
      :id="id"
      class="m-time-editor"
      v-model="data[item.prop]"
      :type="item.type == 'date-picker' ? 'date' : item.type == 'date-time-range' ? 'datetimerange' : 'daterange'"
      :placeholder="item.placeholder || languagePackage['selectTime']"
      :format="item.type == 'date-time-range' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
      :value-format="item.type == 'date-time-range' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
      :disabled="item.disabled"
      :start-placeholder="item?.disabled ? ' ' : languagePackage['startTime']"
      :end-placeholder="item?.disabled ? ' ' : languagePackage['endTime']"
      :size="item.size"
      :disabled-date="item?.disabledDateFn ? item.disabledDateFn : () => false"
      :unlink-panels="true"
    >
    </el-date-picker>
    <div v-else class="m-form-content-value">{{ findData(data[item.prop]) || "--" }}</div>
    <div
      v-if="alwaysContrast || eq(item.prop, data, contrastData)"
      :class="['m-form-contrast-value', item.size == 'small' ? 'mo-form-contrast-value_small' : '']"
    >
      {{ findData(contrastData[item.prop]) }}
    </div>
  </template>
  <div v-else>--</div>
</template>

<script lang="ts" setup>
import { MElementDateType } from "./index";
import format from "../../tools/format";
import lodashPkg from "lodash";
import { computed } from "vue";

import { useBaseStore } from "../../store/index";

const { isEqual } = lodashPkg;

const isRangeType = computed(() => {
  return props.item.type.includes("range") && props.item.type.includes("group");
});

type Props = {
  id?: string;
  item: MElementDateType;
  data?: {};
  contrastData?: {};
  alwaysContrast?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
  contrastData: () => ({})
});

const globalState = useBaseStore();

// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});

function eq(prop, data, contrastData) {
  if (!prop || !contrastData || !contrastData[prop] || (isRangeType.value && !Array.isArray(contrastData[prop]))) return false;
  const _contrastData = isRangeType.value
    ? contrastData[prop].filter(value => value !== null && typeof value !== "undefined")
    : [contrastData[prop]];

  if (_contrastData && _contrastData.length == 0) {
    return false;
  }

  const _Data = isRangeType.value ? data[prop] : [data[prop]];

  const _data = _Data?.map(value => format(value, "yyyy-MM-dd")) || [];
  const _contrast = _contrastData?.map(value => format(value, "yyyy-MM-dd")) || [];
  return !isEqual(_data, _contrast);
}

function findData(data) {
  const useType = props.item.type == "date-time-range" ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";
  if (Array.isArray(data)) {
    return data.map(item => format(item, useType))?.join(" 至 ") || "--";
  } else return format(data, useType) || "--";
}
</script>

<style lang="scss">
@use "../index.scss";
.m-time-editor {
  width: 100% !important;
  padding: 0 !important;
  display: flex;

  .el-range__icon,
  .el-range__close-icon,
  .el-input__prefix {
    display: none;
  }

  // 去除时间选择器上下 padding
  .el-range-editor.el-input__wrapper {
    width: initial !important;
    // padding: 0px 10px;
    height: max-content;
  }

  .el-range-input {
    width: 100%;
  }
  .el-cascader__search-input {
    margin-bottom: 0;
  }
}
</style>
