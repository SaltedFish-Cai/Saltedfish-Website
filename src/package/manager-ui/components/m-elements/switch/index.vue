<!--
 * @ Author: Cai
 * @ Create Time: 2024-03-11 11:44:55
 * @ Modified by: Cai
 * @ Modified time: 2024-08-23 10:18:16
 * @ Description: page name: m-element-switch
 -->

<template>
  <template v-if="item.prop">
    <el-switch
      v-if="!item.display"
      :id="id"
      v-model="inValue"
      :disabled="item.disabled"
      :active-value="options.activeValue"
      :inactive-value="options.inActiveValue"
      :active-text="options.activeText"
      :inactive-text="options.inActiveText"
      :size="item.size"
    />
    <div v-else class="m-form-content-value">{{ findData(inValue) || "--" }}</div>
    <div
      v-if="alwaysContrast || (!isNil(contrastData[item.prop]) && !isEqual(inValue, contrastData[item.prop]))"
      :class="['m-form-contrast-value', item.size == 'small' ? 'mo-form-contrast-value_small' : '']"
    >
      {{ findData(contrastData[item.prop]) }}
    </div>
  </template>
  <div v-else>--</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { MElementSwitchType } from "./index";
import lodashPkg from "lodash";
import { useBaseStore } from "../../store/index";
const globalState = useBaseStore();

const { isEqual, isNil } = lodashPkg;

type Props = {
  id?: string;
  item: MElementSwitchType;
  data: {};
  contrastData?: {};
  alwaysContrast?: boolean;
  exOptions: {};
};
const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
  contrastData: () => ({}),
  exOptions: () => ({})
});

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
  const item = {
    activeValue: true,
    inActiveValue: false,
    activeText: globalState.getLanguage == "zh-CN" ? "是" : "Yes",
    inActiveText: globalState.getLanguage == "zh-CN" ? "否" : "No",
    ...props.item
  };
  let _opt = {
    activeValue: item.activeValue,
    inActiveValue: item.inActiveValue,
    activeText: item.activeText,
    inActiveText: item.inActiveText
  };
  if (item.prop && props.exOptions[item.prop]) {
    const _item = {
      activeValue: true,
      inActiveValue: false,
      activeText: globalState.getLanguage == "zh-CN" ? "是" : "Yes",
      inActiveText: globalState.getLanguage == "zh-CN" ? "否" : "No",
      ...props.exOptions[item.prop]
    };
    _opt = {
      activeValue: item.activeValue,
      inActiveValue: item.inActiveValue,
      activeText: _item.activeText,
      inActiveText: _item.inActiveText
    };
  }
  return changeType(typeIs, _opt);
});
const inValue = ref(props.data[String(props.item.prop)]);

function findData(data) {
  const prop = props.item.prop;
  if (!prop || data == undefined || data == null) {
    return;
  }
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
  () => props.data[String(props.item.prop)],
  data => {
    inValue.value = data || options.value.inActiveValue;
    props.data[String(props.item.prop)] = data || options.value.inActiveValue;
  },
  { immediate: true }
);

watch(
  () => inValue.value,
  data => {
    props.data[String(props.item.prop)] = data;
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
@use "../index.scss";
</style>
