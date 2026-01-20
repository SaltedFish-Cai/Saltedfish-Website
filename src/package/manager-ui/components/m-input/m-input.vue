<template>
  <div v-if="!display" class="m-input" :class="[autoWidth ? 'auto-width' : '', props.class]" :style="style">
    <div v-if="autoWidth" class="hide-value">{{ inValue }}</div>
    <el-input
      :id="id"
      v-model="inValue"
      ref="inputRef"
      :class="[maxLength ? 'm-input-text-area-wrap' : '']"
      :type="type == 'textarea' ? 'textarea' : 'text'"
      :placeholder="placeholder || languagePackage['inputPlaceholder']"
      :disabled="disabled"
      :maxlength="maxLength"
      :minlength="minLength"
      :clearable="clearable == undefined ? true : clearable"
      :show-word-limit="showWordLimit == undefined ? true : showWordLimit"
      :autosize="autoSize"
      :parser="parser"
      :formatter="formatter"
      :size="size"
      @input="limitLength"
      @blur="emits('blur')"
      @focus="emits('focus')"
    />
  </div>
  <div
    v-else
    class="m-display_style"
    :class="[size == 'small' ? 'm-display_style_small' : '', size == 'large' ? 'm-display_style_large' : '']"
  >
    {{ inValue || "--" }}
  </div>
  <div
    v-if="
      (alwaysContrast && contrastData) ||
      (contrastData && contrastData != undefined && contrastData != null && !isEqual(inValue, contrastData))
    "
    :class="['m-form-contrast-value', size == 'small' ? 'mo-form-contrast-value_small' : '']"
  >
    {{ contrastData || "--" }}
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, computed, watch, onMounted } from "vue";
import { MInputType } from "./type";
import lodashPkg from "lodash";
import { useBaseStore as globalState } from "../store/index";

const { isEqual, debounce } = lodashPkg;
const inputRef = ref();

const props = withDefaults(defineProps<MInputType>(), {
  id: "",
  modelValue: "",
  type: "text",
  showWordLimit: true,
  clearable: true,
  showPassword: false,
  autofocus: false,
  autoWidth: false
});

const autoSize: Ref<objectType | boolean> = ref(
  props.minRows || props.maxRows ? { minRows: Number(props.minRows) || 3, maxRows: Number(props.maxRows) || 5 } : false
);

const _globalState = globalState();
const languagePackage = computed(() => {
  return _globalState.getLanguagePackage("cell");
});

const inValue = ref(props.modelValue);
const emits = defineEmits(["update:modelValue", "change", "blur", "focus"]);

const formatter = computed(() => {
  const { inputParser } = props;
  if (inputParser) return inputParser;
  return undefined;
});

const parser = computed(() => {
  const { inputFormatter } = props;
  if (inputFormatter) return inputFormatter;
  return undefined;
});

onMounted(() => {
  if (props.autofocus) {
    setTimeout(() => {
      inputRef.value.focus();
    }, 300);
  }
});

let oldValue: string | undefined = props.modelValue;
const limitLength = value => {
  if (props.maxLength && value.length > props.maxLength) {
    emits("update:modelValue", value.slice(0, props.maxLength));
    emits("change", { value: value.slice(0, props.maxLength), oldValue });
  } else {
    emits("update:modelValue", value);
    emits("change", { value, oldValue });
  }
  oldValue = value;
};

const _debounce = debounce(
  data => {
    autoSize.value = !data ? { minRows: Number(props.minRows) || 3, maxRows: Number(props.maxRows) || 5 } : false;
  },
  300,
  { trailing: true }
);

watch(
  () => props.display,
  data => {
    _debounce(data);
  },
  { deep: true }
);
watch(
  () => props.modelValue,
  data => {
    inValue.value = data;
    oldValue = data;
  }
);
</script>

<style lang="scss">
.m-input {
  position: relative;

  .mo-input-length + .mo-input-clear {
    margin-left: 5px;
  }
  .el-input,
  .el-textarea {
    transition: var(--m-component-animation, 0.3s);
  }
  .el-input + .m-input__count {
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  }

  .mo-input-clear {
    font-size: 14px;
    .m-iconfont_icon {
      position: relative;
      top: 0.5px;
    }
    &:hover {
      color: var(--el-color-primary);
      cursor: pointer;
    }
  }

  .only-clear {
    position: absolute;
    right: 6px;
    bottom: 2px;
    color: var(--el-color-info);
    line-height: 24px;
  }

  // .el-input__suffix {
  //   display: none;
  // }
  .el-input .el-input__count {
    position: relative;
    padding-left: 0 !important;
    right: -7px !important;
    box-shadow: none !important;
    .el-input__count-inner {
      padding-left: 0;
    }
  }

  .m-input-text-area-wrap {
    .el-input__count {
      padding: 5px;
      border-radius: var(--el-input-border-radius, var(--el-border-radius-base)) 0
        var(--el-input-border-radius, var(--el-border-radius-base)) 0;
      right: 0;
      bottom: 0;
      transition: var(--m-component-animation, 0.3s);
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    }
    &:hover .el-input__count {
      box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
    }
    &:has(.is-focus) {
      .el-input__count {
        box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
      }
    }
  }

  .m-input__count {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--el-fill-color-blank);
    color: var(--el-color-info);
    font-size: 12px;
    line-height: 14px;
    position: absolute;
    padding: 5px;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base)) 0
      var(--el-input-border-radius, var(--el-border-radius-base)) 0;
    right: 0;
    bottom: 0;
    transition: var(--m-component-animation, 0.3s);
    box-shadow: 0 0 0 1px var(--el-border-color, var(--el-border-color)) inset;
  }

  .el-input--small.el-input + .m-input__count {
    height: calc(100% - 2px) !important;
  }
  .el-input__wrapper {
    padding: 1px calc(var(--m-component-padding-size, 10px) * 1) !important;
    font-size: var(--m-component-font-size, 13px);
    .el-input__inner {
      height: var(--m-component-height-size, 28px);
      line-height: var(--m-component-height-size, 28px);
    }
  }

  &:hover .m-input__count {
    box-shadow: 0 0 0 1px var(--el-text-color-disabled) inset;
  }
  &:has(.is-focus) {
    .m-input__count {
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
    }
  }

  &:has(.el-input) {
    .m-input__count {
      height: 100%;
      line-height: 18px;
    }
  }

  &:has(.mo-input-length) {
    .el-input__wrapper {
      padding-right: 55px;
    }
  }

  &:has(.mo-input-clear) {
    .el-input__wrapper {
      padding-right: 24px !important;
    }
  }

  &:has(.mo-input-length + .mo-input-clear) {
    .el-input__wrapper {
      padding-right: 72px !important;
    }
  }

  &:has(.el-textarea + .m-input__count) {
    .el-textarea__inner {
      padding-bottom: 24px !important;
    }
  }
}

.m-input.auto-width {
  width: min-content;
  .hide-value {
    min-width: calc(var(--m-component-padding-size, 10px) * 2);
    padding: 0 var(--m-component-padding-size, 10px);
    height: 0;
  }
}

.is-error {
  .m-input {
    .el-input__count {
      box-shadow: 0 0 0 1px var(--el-color-danger) inset;
    }
  }
}
</style>
