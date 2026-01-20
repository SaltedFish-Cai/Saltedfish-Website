<template>
  <div v-if="!display" class="m-cascader">
    <el-cascader
      :id="id"
      :props="optionsProps || cascaderProps"
      :show-all-levels="showAllLevels || false"
      v-model="inValue"
      :placeholder="placeholder || languagePackage['selectPlaceholder']"
      :disabled="disabled"
      :options="exOptionsList"
      filterable
      collapse-tags-tooltip
      :clearable="clearable == undefined ? true : clearable"
      :collapse-tags="collapseTags == undefined ? true : collapseTags"
      :max-collapse-tags="maxCollapseTags == undefined ? 1 : maxCollapseTags"
      :size="baseSize"
      @change="cascaderChange"
    >
      <template #default="scope">
        <span>{{ scope.data.label }}</span>
        <span v-if="!scope.node.isLeaf && scope?.data?.children?.length"> ({{ scope?.data?.children?.length }}) </span>
      </template>
    </el-cascader>
  </div>
  <div
    v-else
    class="m-display_style"
    :class="[baseSize == 'small' ? 'm-display_style_small' : '', baseSize == 'large' ? 'm-display_style_large' : '']"
  >
    {{ findData(inValue) || "--" }}
  </div>
  <div
    v-if="(alwaysContrast && contrastData) || (contrastData && eq(contrastData))"
    :class="['m-form-contrast-value', baseSize == 'small' ? 'mo-form-contrast-value_small' : '']"
  >
    {{ findData(inContrastValue) }}
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import lodashPkg from "lodash";
import { MCascaderType } from "./type";
import { useBaseStore as globalState } from "../store/index";

const { isEqual, debounce } = lodashPkg;

const emits = defineEmits(["change", "update:modelValue"]);

const _globalState = globalState();
const languagePackage = computed(() => {
  return _globalState.getLanguagePackage("cell");
});

const props = withDefaults(defineProps<MCascaderType>(), {
  type: "cascader"
});

// #Computed baseSize
const baseSize = computed(() => {
  if (props.size) {
    return props.size;
  } else {
    return _globalState.getSize || "default";
  }
});

const exOptionsList = computed(() => {
  if (!props?.exOptions) return [];
  function setOpts(opts) {
    return opts.map(item => {
      return {
        ...item,
        label: item.label,
        value: item.value == "true" || item.value == "false" ? String(item.value) : item.value,
        children: item.children && item.children.length > 0 ? setOpts(item.children) : []
      };
    });
  }

  return setOpts(props?.exOptions);
});

function eq(contrastData) {
  if (!contrastData) return false;
  return !isEqual(oldValue, contrastData);
}

const cascaderProps = {
  multiple: props.type == "multiple-cascader" || props.type == "multiple-cascader-check",
  checkStrictly: props.type == "cascader-check" || props.type == "multiple-cascader-check" ? true : false,
  expandTrigger: "hover" as const
};

const inValue = ref([] as string[]);
const inContrastValue = ref([] as string[]);

const init = (options, data, arr?: string[]) => {
  if (!options) return;
  for (let index = 0; index < options.length; index++) {
    const element = options[index];
    const inArr: string[] = arr ? [...arr] : [];

    inArr.push(element.value);

    if (element.value == data) {
      oldValue = inArr;
      inValue.value = inArr;
    }
    if (element.children && element.children?.length > 0) {
      init(element.children, data, arr || inArr);
    }
  }
};

const initContrast = (options, data, arr?: string[]) => {
  if (!options) return;
  for (let index = 0; index < options.length; index++) {
    const element = options[index];
    const inArr: string[] = arr ? [...arr] : [];

    inArr.push(element.value);

    if (element.value == data) {
      inContrastValue.value = inArr;
    }
    if (element.children && element.children?.length > 0) {
      initContrast(element.children, data, arr || inArr);
    }
  }
};

function findData(data) {
  if (props.displayValue) {
    return props.displayValue || "--";
  }

  let text = "";
  const options: { label: string; value: number | string }[] = [];
  const _options = exOptionsList.value;
  for (let index = 0; index < _options.length; index++) {
    const element = _options[index];
    const { label, value } = element;
    options.push({ label, value });

    if (element.children?.length) {
      for (let ch_index = 0; ch_index < element.children.length; ch_index++) {
        const ch_element = element.children[ch_index];
        const { label, value } = ch_element;
        options.push({ label, value });
      }
    }
  }

  for (let I_index = 0; I_index < data.length; I_index++) {
    const row = data[I_index];
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.value == row) {
        text += option.label + `${I_index < data.length - 1 ? "，" : ""}`;
      }
    }
  }
  return text || "--";
}

let oldValue = props.modelValue;
function cascaderChange(data) {
  console.log("++++++++++> props.showAllLevels:", props);
  if (props.showAllLevels) {
    console.log("++++++++++> data:", data);
    console.log("++++++++++> inValue:", inValue);
    emits("update:modelValue", data);
    emits("change", { data, oldValue });
    oldValue = data;
  }
  // emits("change", { value: data });
  else if (props.type == "cascader-check" || props.type == "cascader") {
    const value = data.slice(-1)[0];
    emits("update:modelValue", value);
    emits("change", { value, oldValue });
    oldValue = value;
  } else {
    const value = data.map(item => item.slice(-1)[0]);
    emits("update:modelValue", value);
    emits("change", { value, oldValue });
    oldValue = value;
  }
}

let lock = false;
const _debounce = debounce(
  () => {
    lock = true;
  },
  500,
  { trailing: true }
);

watch(
  () => props.contrastData,
  data => {
    inContrastValue.value = [];
    if (Array.isArray(data)) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        initContrast(exOptionsList.value, element, inContrastValue.value);
      }
    } else {
      initContrast(exOptionsList.value, data);
    }

    _debounce();
  },
  { immediate: true, deep: true }
);

watch(
  () => props.modelValue,
  data => {
    if (lock) return;
    inValue.value = [];
    if (Array.isArray(data)) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        init(exOptionsList.value, element, inValue.value);
      }
    } else {
      init(exOptionsList.value, data);
    }

    _debounce();
  },
  { immediate: true }
);

watch(
  () => inValue.value,
  data => {
    if (!lock) return;
    let _data: any;
    if (data) {
      if (props.type == "multiple-cascader-check" || props.type == "multiple-cascader") {
        if (!_data) _data = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          _data.push(element[element.length - 1]);
        }
      } else {
        _data = data[data.length - 1];
      }
    }
    // emits("change", { value: data });
  },
  { immediate: true }
);
</script>

<style lang="scss">
.m-cascader {
  width: 100%;
  .el-cascader {
    width: 100% !important;
  }
  .el-cascader:has(.el-cascader__tags) {
    box-sizing: border-box;
    vertical-align: middle;
    position: relative;

    .el-input {
      position: absolute;
      .el-input__wrapper {
        box-shadow: none !important;
      }
      .el-input__inner {
        height: initial !important;
      }
    }
    .el-cascader__tags {
      padding: 1px 0 0;
      position: relative;
      top: 0;
      right: 0;
      transform: none;
      padding-right: 45px;
      transition: var(--m-component-animation, 0.3s);
      border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
      transform: translate3d(0, 0, 0);
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
      justify-content: flex-start;
      align-items: center;
      height: var(--m-component-height-size, 28px);

      &:focus,
      &:hover {
        box-shadow: 0 0 0 1px var(--el-input-focus-border-color, var(--el-color-primary)) inset;
      }
      .el-tag {
        margin: 1px 0 1px 7px;
      }
      .el-cascader__search-input {
        padding: 0;
        margin: 0;
        height: inherit;
        min-width: 10px;
        width: 10px;
        margin-top: -2px;
        margin-left: 6px;
      }
    }
  }

  .is-error {
    .el-cascader:has(.el-cascader__tags) {
      .el-cascader__tags {
        box-shadow: 0 0 0 1px var(--el-color-danger) inset;
      }
    }
  }

  .el-cascader {
    .el-input__wrapper,
    .el-cascader__tags {
      transition: var(--m-component-animation, 0.3s);
      font-size: var(--m-component-font-size, 13px);
      padding: 1px calc(var(--m-component-padding-size, 10px) * 1);
      // min-height: calc(var(--m-component-height-base, 28px));
      .el-input__inner {
        text-align: left;
        height: var(--m-component-height-size, 28px);
        line-height: var(--m-component-height-size, 28px);
      }
    }
  }
}
.el-cascader--small {
}
</style>
