<!--
 * @ Author: Cai
 * @ Create Time: 2024-03-11 14:36:22
 * @ Modified by: Cai
 * @ Modified time: 2024-08-30 16:40:50
 * @ Description: page name: m-element-checkbox
 -->

<template>
  <template v-if="item.prop">
    <el-checkbox-group
      v-if="!item.display && item.prop"
      :id="id"
      v-model="data[item.prop]"
      :disabled="item.disabled"
      @change="changeEvent(data, item)"
      :size="item.size"
    >
      <el-checkbox
        v-for="option in exOptions[item.prop] || item.options"
        :id="id + '-' + option.value"
        :key="option.value"
        :label="option.value"
        :value="option.value"
        :name="String(option.value)"
        :disabled="option.disabled"
        :size="item.size"
      >
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
    <div v-else class="m-form-content-value">{{ findData(data[item.prop]) || "--" }}</div>
    <div
      v-if="alwaysContrast || eq(data, contrastData)"
      :class="['m-form-contrast-value', item.size == 'small' ? 'mo-form-contrast-value_small' : '']"
    >
      {{ findData(contrastData[item.prop]) }}
    </div>
  </template>
  <div v-else>--</div>
</template>

<script lang="ts" setup>
import { MElementCheckBoxType, MElementCheckBoxOptionType } from "./index";
import lodashPkg from "lodash";

const { isEqual } = lodashPkg;

type Props = {
  id?: string;
  item: MElementCheckBoxType;
  data: {};
  contrastData?: {};
  alwaysContrast?: boolean;
  exOptions: { [x: string]: MElementCheckBoxOptionType[] };
};
const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
  contrastData: () => ({}),
  exOptions: () => ({})
});

const emit = defineEmits(["change"]);

function eq(data, contrastData) {
  const prop = props.item.prop;
  if (!prop || !contrastData || !contrastData[prop] || !Array.isArray(contrastData[prop])) return false;

  const _contrastData = contrastData[prop].filter(value => value !== null && typeof value !== "undefined");

  if (_contrastData && _contrastData.length == 0) {
    return false;
  }

  return !isEqual(data[prop], _contrastData);
}

function changeEvent(value, item) {
  if (item.prop) {
    emit("change", { value: value[item?.prop], item });
  }
}

function findData(data) {
  const prop = props.item.prop;
  if (!prop || !data) {
    return;
  }
  let text = "";
  const options = props.exOptions[prop] || props.item.options;
  if (Array.isArray(data)) {
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
</script>

<style lang="scss" scoped>
@use "../index.scss";
</style>

<style>
.el-checkbox {
  user-select: auto;
}
</style>
