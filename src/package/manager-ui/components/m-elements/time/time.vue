<!--
 * @ Author: Cai
 * @ Create Time: 2024-03-11 15:43:45
 * @ Modified by: Cai
 * @ Modified time: 2024-08-23 10:17:58
 * @ Description: page name: m-element-time
 -->

<template>
  <template v-if="item.prop">
    <template v-if="!item.display">
      <el-time-picker
        v-if="item.type == 'time-picker-group'"
        :id="id"
        class="m-time-editor"
        v-model="data[item.prop]"
        is-range
        :placeholder="item.placeholder || languagePackage['selectTime']"
        :disabled="item.disabled"
        format="HH:mm:ss"
        value-format="HH:mm:ss"
        :start-placeholder="item?.disabled ? ' ' : languagePackage['startTime']"
        :end-placeholder="item?.disabled ? ' ' : languagePackage['endTime']"
        :size="item.size"
        :disabled-date="item?.disabledDateFn ? item.disabledDateFn : () => false"
      />
      <el-time-picker
        v-else
        :id="id"
        class="m-time-editor"
        v-model="data[item.prop]"
        :placeholder="item.placeholder || languagePackage['selectTime']"
        :disabled="item.disabled"
        format="HH:mm:ss"
        value-format="HH:mm:ss"
        :start-placeholder="item?.disabled ? ' ' : languagePackage['startTime']"
        :end-placeholder="item?.disabled ? ' ' : languagePackage['endTime']"
        :size="item.size"
        :disabled-date="item?.disabledDateFn ? item.disabledDateFn : () => false"
      />
    </template>
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
  const useType = "HH:mm:ss";
  if (Array.isArray(data)) {
    return data.map(item => format("2000-01-01 " + item, useType))?.join(` ${languagePackage.value["to"]} `) || "--";
  } else return format("2000-01-01 " + data, useType) || "--";
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
