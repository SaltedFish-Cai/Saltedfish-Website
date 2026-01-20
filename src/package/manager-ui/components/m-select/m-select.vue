<template>
  <div v-if="!display" class="m-select">
    <el-select
      v-model="inValue"
      :id="id"
      :multiple="
        type == 'multiple-select' || type == 'multiple-request-select' || type == 'multiple-online-select' ? true : false
      "
      :placeholder="placeholder || languagePackage['selectPlaceholder']"
      :disabled="disabled"
      collapse-tags-tooltip
      filterable
      :clearable="clearable == undefined ? true : clearable"
      :multiple-limit="multipleLimit == undefined ? 0 : multipleLimit"
      :collapse-tags="collapseTags == undefined ? true : collapseTags"
      :max-collapse-tags="maxCollapseTags == undefined ? 2 : maxCollapseTags"
      :remote="
        type == 'request-select' ||
        type == 'multiple-request-select' ||
        type == 'online-select' ||
        type == 'multiple-online-select'
      "
      @clear="
        () => {
          if (type == 'online-select' || type == 'multiple-online-select') {
            remoteMethodFn('');
          }
        }
      "
      @change="onlineSelectChange"
      :remote-method="(query: any) =>{
          remoteMethodFn(query || inValue)
      }"
      :size="size"
    >
      <template #tag>
        <slot :name="'tag-' + optionKey" v-bind="{ row: inValue }"></slot>
      </template>

      <template #label>
        <slot :name="'label-' + optionKey" v-bind="{ row: inValue }"></slot>
      </template>

      <el-option
        v-for="option in exOptionsList"
        :id="id + '-option-' + option.value"
        :key="String(option.value)"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled"
      >
        <slot :name="'option-' + optionKey" v-bind="{ option }"></slot>
      </el-option>
    </el-select>
  </div>
  <div
    v-else
    class="m-display_style"
    :class="[size == 'small' ? 'm-display_style_small' : '', size == 'large' ? 'm-display_style_large' : '']"
  >
    <div v-if="exOptionsList?.length || displayValue">{{ findData(inValue) || "--" }}</div>
    <div v-else>--</div>
  </div>
  <div
    v-if="(alwaysContrast && isNil(contrastData)) || (!isNil(contrastData) && !isEqual(inValue, contrastData))"
    :class="['m-form-contrast-value', size == 'small' ? 'mo-form-contrast-value_small' : '']"
  >
    <div v-if="exOptionsList?.length">{{ findData(contrastData) }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, computed, watch } from "vue";
import { MSelectType } from "./type";
import lodashPkg from "lodash";
import { MOptionType } from "MTypes";
import { useBaseStore as globalState } from "../store/index";

const { isEqual, isNil } = lodashPkg;

const inValue: Ref<Array<number | string> | number | string | undefined> = ref("");

const props = withDefaults(defineProps<MSelectType>(), {
  type: "select"
});

const exOptionsList = ref(props?.exOptions || []);
const emit: any = defineEmits(["remoteMethod", "change", "update:modelValue"]);

async function remoteMethodFn(query) {
  if ((props.type == "multiple-request-select" || props.type == "request-select") && exOptionsList.value.length) {
    return [];
  }
  if (props.requestApi) {
    const opt: MOptionType.Select[] = await props.requestApi({ query: query || "" });
    exOptionsList.value = opt || [];
  } else {
    exOptionsList.value = [];
  }
}

const _globalState = globalState();
const languagePackage = computed(() => {
  return _globalState.getLanguagePackage("cell");
});

let oldValue = props.modelValue;
function onlineSelectChange(data) {
  emit("change", { value: data, oldValue });
  emit("update:modelValue", data);
  oldValue = data;
}

function findData(data) {
  if (props.displayValue) {
    return props.displayValue || "--";
  }

  let text = "";
  const options = exOptionsList.value;
  if (!options?.length) return "--";
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
  } else {
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.value == data) {
        text += option.label;
      }
    }
  }
  return text || "--";
}

// #Watch modelValue
watch(
  () => props.modelValue,
  data => {
    if (
      (props.type == "multiple-request-select" ||
        props.type == "request-select" ||
        props.type == "multiple-online-select" ||
        props.type == "online-select") &&
      inValue.value != data
    ) {
      remoteMethodFn(data);
    }
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

<style lang="scss">
.m-select {
  .el-select__selected-item {
    user-select: auto;
  }
  .el-select__wrapper.is-disabled {
    .el-select__placeholder {
      color: var(--el-text-color-placeholder);
    }
  }

  .el-cascader.el-tooltip__trigger {
    .el-cascader__tags {
      align-items: center;
      .el-tag {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }

  .el-select__selection.is-near {
    margin-left: 0 !important;
  }

  .el-select {
    .el-select__wrapper {
      min-height: initial !important;
      font-size: var(--m-component-font-size, 13px);
      padding: 1px calc(var(--m-component-padding-size, 10px) * 1);
      .el-select__selection {
        min-height: var(--m-component-height-size, 28px);
        line-height: var(--m-component-height-size, 28px);
      }
    }
  }
}
</style>
