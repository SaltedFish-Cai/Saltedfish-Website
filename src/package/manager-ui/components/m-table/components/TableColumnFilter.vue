<template>
  <!-- 表头筛选 -->
  <el-popover
    popper-class="m-table-popover"
    :visible="state.visible"
    placement="bottom"
    :popper-style="{ width: isTimeType(item, true) ? '380px !important' : '350px !important' }"
    :teleported="true"
    ref="mPopoverRef"
  >
    <template #reference>
      <div @click="openVisible"><slot name="default"></slot></div>
    </template>
    <div v-if="state.visible" class="flex-center-between filter-body">
      <!-- select -->
      <el-select
        v-if="isSelectType(item, true)"
        v-model="state.searchValue"
        :placeholder="languagePackage['selectPlaceholder']"
        multiple
        :collapse-tags="$slots['header-tag-' + item.prop] ? false : true"
        :collapse-tags-tooltip="$slots['header-tag-' + item.prop] ? false : true"
        clearable
        style="width: 100%; min-width: 210px"
        :popper-options="{}"
        ref="selectRef"
        :size="size"
      >
        <template #tag>
          <slot :name="'header-tag-' + item.prop" v-bind="{ row: state.searchValue }"></slot>
        </template>

        <template #label>
          <slot :name="'header-label-' + item.prop" v-bind="{ row: state.searchValue }"></slot>
        </template>

        <el-option v-for="opt in _exOptions[item.prop]" :key="opt.label + opt.value" :value="opt.value" :label="opt.label">
          <slot :name="'header-option-' + item.prop" v-bind="{ row: opt }">
            <div class="flex-center-start">
              <div
                class="tag-color mr-size"
                v-if="opt.tagStyle?.bgColor"
                :style="{ backgroundColor: opt.tagStyle.bgColor }"
              ></div>
              <div :class="[size == 'small' ? 'm-table-select-label_small' : '']">{{ opt.label }}</div>
            </div>
          </slot>
        </el-option>
      </el-select>

      <!-- time -->
      <div v-else-if="isTimeType(item, true)" class="flex-center my-date-picker head-my-date-picker">
        <el-date-picker
          v-model="state.searchValue[0]"
          type="date"
          :placeholder="languagePackage['startTime']"
          :prefix-icon="timeIcon"
          value-format="YYYY-MM-DD"
          :shortcuts="shortcuts"
          :disabled-date="time => disabledStart(time, state.searchValue[1], item)"
          @keydown.enter="FetchSaveAndFilter"
          :size="size"
        />
        <div class="ml5 mr5">/</div>
        <el-date-picker
          v-model="state.searchValue[1]"
          type="date"
          :placeholder="languagePackage['endTime']"
          :prefix-icon="timeIcon"
          value-format="YYYY-MM-DD"
          :shortcuts="shortcuts"
          :disabled-date="time => disabledEnd(time, state.searchValue[0], item)"
          @keydown.enter="FetchSaveAndFilter"
          :size="size"
        />
      </div>

      <!-- number -->
      <m-number
        v-else-if="isNumberType(item, true)"
        v-model="state.searchValue"
        @keydown.enter="FetchSaveAndFilter"
        :placeholder="languagePackage['inputPlaceholder']"
        :disabled="item?.cellConfig?.disabled"
        :display="false"
        :min="item?.cellConfig?.min"
        :max="item?.cellConfig?.max"
        :precision="item?.cellConfig?.precision"
        :controls="true"
        :controlsPosition="item?.cellConfig?.controlsPosition"
        :valueOnClear="item?.cellConfig?.clearOnValue || item?.cellConfig?.valueOnClear"
        :step="item?.cellConfig?.step"
        :stepStrictly="item?.cellConfig?.stepStrictly"
        :size="item?.cellConfig?.size"
        :contrastData="item?.cellConfig?.contrastData"
        :alwaysContrast="item?.cellConfig?.alwaysContrast"
      ></m-number>

      <!-- input -->
      <el-input
        v-else
        v-model="state.searchValue"
        :placeholder="languagePackage['inputPlaceholder']"
        @keydown.enter="FetchSaveAndFilter"
        style="width: 100%; min-width: 210px"
        clearable
        :size="size"
      />

      <!-- button -->
      <m-button class="mr-size" style="flex: 0 0 89px; margin-right: 0" is="search" @click="FetchSaveAndFilter">
        {{ languagePackage["search"] }}
      </m-button>
    </div>
    <slot name="exBtn"></slot>
    <!-- <div class="hold-back" @click="state.visible = false"></div> -->
  </el-popover>
</template>

<script setup lang="ts" name="TableColumnFilter">
// # import
import { ref, reactive, watch, computed, nextTick, onMounted, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { format } from "../utils";
import { isSelectType, isTimeType, isNumberType } from "../hooks/isType";
import timeIcon from "./Icon.vue";

import { TableColumnFilterType } from "../type";
import inBrowser from "../../tools/inBrowser";
import { useBaseStore as globalState } from "../../store/index";

// # Var
const props = withDefaults(defineProps<TableColumnFilterType>(), {
  exOptions: {}
});

const emits = defineEmits(["saveAndFilter", "handleRemoveQuery", "openSeniorFilter"]);
const useGlobalState = globalState();

const languagePackage = computed(() => {
  return useGlobalState.getLanguagePackage("table") || {};
});

const shortcuts = [
  {
    text: languagePackage.value["today"],
    value: new Date()
  },
  {
    text: languagePackage.value["yesterday"],
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    }
  },
  {
    text: languagePackage.value["aWeekAgo"],
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    }
  }
];

const mPopoverRef = ref();
const selectRef = ref();
const state = reactive({
  visible: false,
  searchValue: (isTimeType(props.item, true) ? [] : "") as any
});

// #Function 配置初始化开始时间
const disabledStart = (time: Date, endTime: Date, row) => {
  const _time = format(time.toString(), "yyyy-MM-dd") + " 00:00:00";
  const _now = format(new Date().toString(), "yyyy-MM-dd") + " 00:00:00";
  const _startTime = format(endTime?.toString(), "yyyy-MM-dd") + " 23:59:59";

  if (row?.cellConfig?.useStartLimit) {
    return new Date(_time).getTime() >= new Date(_startTime).getTime() || new Date(_time).getTime() > new Date(_now).getTime();
  } else {
    return new Date(_time).getTime() >= new Date(_startTime).getTime();
  }
};

// #Function 配置初始化结束时间
const disabledEnd = (time: Date, startTime: Date, row) => {
  const _time = format(time.toString(), "yyyy-MM-dd") + " 23:59:59";
  const _now = format(new Date().toString(), "yyyy-MM-dd") + " 23:59:59";
  const _startTime = format(startTime?.toString(), "yyyy-MM-dd") + " 00:00:00";

  if (row?.cellConfig?.useEndLimit) {
    return new Date(_time).getTime() <= new Date(_startTime).getTime() || new Date(_time).getTime() > new Date(_now).getTime();
  } else {
    return new Date(_time).getTime() <= new Date(_startTime).getTime();
  }
};

let observer;
onMounted(() => {
  if (inBrowser) {
    observer = new window.MutationObserver(callback);
  }
});

let openTime;

// #Computed exOptions
const _exOptions: objectType = computed(() => {
  const _outData: { [x: string]: { label: string; value: string }[] } = {};
  for (const key in props.exOptions) {
    if (Array.isArray(props.exOptions[key])) {
      _outData[key] = props.exOptions[key].map(item => {
        return {
          ...item,
          value: String(item.value)
        };
      });
    } else {
      const item = props.exOptions[key];
      _outData[key] = [];
      _outData[key].push({
        label: item.activeText || "on",
        value: item.activeValue || true
      });
      _outData[key].push({
        label: item.inActiveText || "off",
        value: item.inActiveValue || false
      });
    }
  }
  return _outData;
});

// #Function 打开筛选
function openVisible() {
  state.visible = true;
  nextTick(() => {
    if (selectRef.value) selectRef.value.dropdownMenuVisible = true;
    clearTimeout(openTime);
    openTime = setTimeout(() => {
      if (mPopoverRef.value?.popperRef?.contentRef) {
        const config = { attributes: true };
        const el = mPopoverRef.value?.popperRef?.contentRef;
        observer?.observe(el, config);
      }
    }, 300);
  });
}

// #Function 确认条件并搜索
function FetchSaveAndFilter() {
  const element = props.item;
  let fieldValue = isSelectType(element, true) ? state.searchValue.join?.(",") || "" : state.searchValue;
  if (isSelectType(element, true)) {
    fieldValue = String(fieldValue).trim();
  }

  if (isTimeType(element, true) && !!!state.searchValue[0]) {
    const data = {
      conditionalType: 3,
      props: element.prop
    };
    emits("handleRemoveQuery", data);
  }
  if (isTimeType(element, true) && !!!state.searchValue[1]) {
    const data = {
      conditionalType: 5,
      props: element.prop
    };
    emits("handleRemoveQuery", data);
  }
  if (String(fieldValue).length <= 0) {
    setListenClick("clean");
    let conditionalType = 1;
    if (isSelectType(element, true)) {
      conditionalType = 6;
    } else if (isNumberType(element, true)) {
      conditionalType = 0;
    }

    const data = { conditionalType, props: element.prop };
    setListenClick("clean");
    return emits("handleRemoveQuery", data);
  }

  let filter: { fieldLabel?: string; fieldName: string; conditionalType: 0 | 1 | 3 | 5 | 6; fieldValue: string }[] = [];
  if (isTimeType(element, true)) {
    if (state.searchValue[0]) {
      filter.push({
        fieldLabel: element.label + `-${languagePackage.value["start"]}`,
        fieldName: element.prop,
        conditionalType: 3,
        fieldValue: state.searchValue[0] + " 00:00:00"
      });
    }
    if (state.searchValue[1]) {
      filter.push({
        fieldLabel: element.label + `-${languagePackage.value["end"]}`,
        fieldName: element.prop,
        conditionalType: 5,
        fieldValue: state.searchValue[1] + " 23:59:59"
      });
    }
    if (state.searchValue[0] && state.searchValue[1] && state.searchValue[0] > state.searchValue[1]) {
      return ElMessage.error(element.label + ` ${languagePackage.value["errorMessage"]}`);
    }
  } else {
    filter = [
      {
        fieldLabel: element.label,
        fieldName: element.prop,
        conditionalType: isSelectType(element, true) ? 6 : isNumberType(element, true) ? 0 : 1,
        fieldValue
      }
    ];
  }
  // fieldName: "BeforeName", conditionalType: 1, fieldValue: "111"
  emits("saveAndFilter", filter);
  setListenClick("clean");
  // drawerVisible.value = false;
}

// #Function 监听位置变化后关闭弹窗，(解决：滚动块存在阻止默认事件)
function callback(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.attributeName == "style") {
      setListenClick("clean");
    }
  }
}

// # Vue onUnmounted
onUnmounted(() => {
  observer?.disconnect && observer?.disconnect();
});

// # Expose 监听点击弹窗外部元素关闭弹窗 <------------<
function setListenClick(e) {
  if (e == "clean") {
    state.visible = false;
    window.removeEventListener("mousedown", setListenClick);
    observer?.disconnect && observer?.disconnect();
    return;
  }
  const target = e.target;
  let closePopper = true;
  const findParent = target => {
    const parent = target?.parentElement;
    if (target?.className?.indexOf("el-popper") > -1 || parent?.className?.indexOf("el-popper") > -1) {
      closePopper = false;
    }
    parent && findParent(parent);
  };
  findParent(target);

  if (closePopper) {
    state.visible = false;
    window.removeEventListener("mousedown", setListenClick);
    observer?.disconnect && observer?.disconnect();
  }
}

defineExpose({ setListenClick });

// #Watch visible
watch(
  () => state.visible,
  (value: boolean) => {
    if (value) {
      nextTick(() => {
        window.addEventListener("mousedown", setListenClick);
      });
    }
  }
  // { immediate: true }
);

// #Watch data
watch(
  () => props.data,
  (value: objectType) => {
    if (value?.fieldValue && String(value?.fieldValue)?.length) {
      state.searchValue = Array.isArray(value.fieldValue)
        ? value.fieldValue.map(item => (item == "true" ? true : item == "false" ? false : item))
        : value.fieldValue;
    } else {
      state.searchValue = isTimeType(props.item, true) ? [] : "";
      setListenClick("clean");
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.color-box {
  text-align: center;
  padding: 12px;
  margin-bottom: 2px;
  background-color: #fff;
  &:last-child {
    margin: 0;
  }
}
.padding-zero-popover {
  padding: 5px !important;
  z-index: 9999 !important;
  height: 200px;
  overflow: scroll;
}
.filter-body {
  position: relative;
  z-index: 10;
}
.hold-back {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 10%);
}
.head-my-date-picker {
  .el-date-editor.el-input {
    width: 100%;
  }
}
.tag-color {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
