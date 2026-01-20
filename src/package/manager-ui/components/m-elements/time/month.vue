<!--
 * @ Author: Cai
 * @ Create Time: 2024-03-11 15:44:31
 * @ Modified by: Cai
 * @ Modified time: 2024-08-23 10:18:02
 * @ Description: page name: m-element-month
 -->

<template>
  <template v-if="item.prop">
    <el-date-picker
      v-if="!item.display"
      :id="id"
      class="m-time-editor"
      v-model="data[item.prop]"
      :type="item.type == 'month-picker' ? 'month' : 'monthrange'"
      :placeholder="item.placeholder || languagePackage['selectTime']"
      :format="'YYYY-MM'"
      :value-format="'YYYY-MM'"
      :disabled="item.disabled"
      :start-placeholder="item?.disabled ? ' ' : languagePackage['startTime']"
      :end-placeholder="item?.disabled ? ' ' : languagePackage['endTime']"
      :size="item.size"
      :disabled-date="item?.disabledDateFn ? item.disabledDateFn : () => false"
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
import { computed } from "vue";
import { MElementDateType } from "./index";
import format from "../../tools/format";
import lodashPkg from "lodash";

import { useBaseStore } from "../../store/index";

const { isEqual } = lodashPkg;

type Props = {
  id?: string;
  item: MElementDateType;
  data?: {};
  contrastData?: {};
  alwaysContrast?: boolean;
};
withDefaults(defineProps<Props>(), {
  data: () => ({}),
  contrastData: () => ({})
});

const globalState = useBaseStore();

// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});

function eq(prop, data, contrastData) {
  if (!prop || !contrastData || !contrastData[prop] || !Array.isArray(contrastData[prop])) return false;

  const _contrastData = contrastData[prop].filter(value => value !== null && typeof value !== "undefined");

  if (_contrastData && _contrastData.length == 0) {
    return false;
  }

  return !isEqual(data[prop], _contrastData);
}

function findData(data) {
  const useType = "yyyy-MM";
  if (Array.isArray(data)) {
    return data.map(item => format(item, useType))?.join(` ${languagePackage.value["to"]} `) || "--";
  } else return format(data, useType) || "--";
}
</script>
<style lang="scss">
@use "../index.scss";
.m-time-editor {
  width: 100% !important;
  .el-range__icon,
  .el-range__close-icon,
  .el-input__prefix {
    display: none;
  }
}
</style>
