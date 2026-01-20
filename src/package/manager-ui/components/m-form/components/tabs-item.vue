<template>
  <template v-if="item.type == 'tabs-form'">
    <el-form-item :prop="item.prop" class="m-form-tabs-box" style="flex-direction: column">
      <!-- label -->
      <!-- <template #label v-if="item.label">
        <form-label :label="item.label" :tip="item.tip"></form-label>
      </template> -->

      <!-- :style="{ height: tabHeight + 'px' }" -->
      <section class="tabs-form">
        <!-- tabs -->
        <!-- :editable="!item.disabled" -->

        <template v-if="data[String(item.prop)]?.length || !display">
          <m-tabs ref="tabsFormRef" v-model="stepsIndex" class="m-form-tabs" card @tab-change="clickToChange">
            <template v-if="!display" #HeaderLeft>
              <m-button
                is="add"
                :disabled="item.disabled"
                size="small"
                class="add-tab"
                @click="addTabs"
                :debounced="false"
                :debouncedTime="0"
              >
                {{ languagePackage["add"] }}
              </m-button>
            </template>

            <m-tab-item v-for="(tab, tabIndex) in data[String(item.prop)]" :key="tab.name" :label="tab.name" :name="tab.name">
              <template #label>
                <template v-if="display || item.disabled"
                  ><div :class="['flex-center-start', 'tabs-item-title', tab.isError ? 'error-pane' : '']">
                    <div class="tabs-item-title_text">
                      <template v-if="item.titleLabel">
                        {{
                          typeof item.titleLabel == "string" ? item.titleLabel : item.titleLabel[language as "en-US" | "zh-CN"]
                        }}
                        ({{ tabIndex + 1 }})
                      </template>
                      <template v-else>
                        {{ titleArr[tabIndex] }}
                      </template>
                    </div>
                  </div>
                </template>
                <template v-else-if="tab.name != editTitleIndex">
                  <div :class="['flex-center-start', 'tabs-item-title', tab.isError ? 'error-pane' : '']">
                    <div v-if="item.titleLabel">
                      {{ typeof item.titleLabel == "string" ? item.titleLabel : item.titleLabel[language as "en-US" | "zh-CN"] }}
                      ({{ tabIndex + 1 }})
                    </div>
                    <div v-else class="tabs-item-title_text tabs-item-title_text_hover" @click.stop="editTitleIndex = tab.name">
                      {{ titleArr[tabIndex] }}
                    </div>
                    <m-icon
                      v-if="!display && !item.disabled"
                      class="hand remove-hand ml5"
                      name="close_circle_line"
                      link
                      @click.stop="removeTab(tab)"
                    />
                  </div>
                </template>
                <div v-else class="tab-edit-title-input">
                  <m-input
                    v-model="tab[item.titleKey]"
                    @blur="inputBlur(tab[item.titleKey], val => (tab[item.titleKey] = val))"
                    autoWidth
                    autofocus
                    placeholder=" "
                  ></m-input>
                </div>
              </template>

              <!-- form -->
              <section class="tabs-form-body flat-style">
                <el-form
                  :model="tab"
                  :ref="el => setRuleTabsFormRefDebounce(el, tab)"
                  :rules="rules[String(item.prop)] || {}"
                  status-icon
                >
                  <!-- v-show 防闪烁 -->
                  <!-- v-show="stepsIndex == tab.name" -->
                  <section class="tabs-form-item" v-for="tabGroupItem in item.inMultipleConfig" :key="tabGroupItem.unitName">
                    <!-- 标题 -->
                    <template v-if="tabGroupItem.unitName != 'default'">
                      <m-title>
                        {{ tabGroupItem.unitName }}
                        <el-tooltip v-if="tabGroupItem.unitTip" :content="tabGroupItem.unitTip" placement="right">
                          <m-icon name="question_line" class="form-title_label_icon"></m-icon>
                        </el-tooltip>
                      </m-title>
                    </template>

                    <el-row :gutter="10" style="padding-bottom: calc(var(--m-component-padding-size, 10px) * 2)">
                      <template v-for="tabFormItem in tabGroupItem.configs" :key="String(tabFormItem.prop)">
                        <formItem
                          v-if="tabFormItem.prop != item.titleKey"
                          :id="id"
                          :item="tabFormItem"
                          :baseSpanSize="baseSpanSize"
                          :itemSpanSize="itemSpanSize"
                          :ruleFormRef="getRuleTabsFormRef(tab.name)"
                          :data="tab"
                          :contrastData="props.item.contrastKey ? contrastDataArr[tab[props.item.contrastKey]] : {}"
                          :labelWidth="labelWidth"
                          :labelPosition="labelPosition"
                          :display="display"
                          :size="size"
                          :use-alone="useAlone"
                        >
                          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                            <slot :name="slot" v-bind="scope"></slot>
                          </template>
                        </formItem>
                      </template>
                    </el-row>
                  </section>
                </el-form>
              </section>
            </m-tab-item>

            <!-- 被删除的tabs -->
            <m-tab-item
              v-for="(tab, tabIndex) in contrastDeletedTab"
              :key="'contrastDeletedTab-' + tab.name"
              :label="'contrastDeletedTab-' + tab.name"
              :name="'contrastDeletedTab-' + tab.name"
            >
              <template #label>
                <div :class="['flex-center-start', 'tabs-item-title', tab.isError ? 'error-pane' : '']">
                  <div class="tabs-item-title_text isDelete">
                    {{ languagePackage["isDelete"] }} -
                    <template v-if="item.titleLabel">
                      {{ typeof item.titleLabel == "string" ? item.titleLabel : item.titleLabel[language as "en-US" | "zh-CN"] }}
                      ({{ tabIndex + 1 }})
                    </template>
                    <template v-else>
                      {{ titleArr[tabIndex] }}
                    </template>
                  </div>
                </div>
              </template>

              <!-- form -->
              <section class="tabs-form-body flat-style">
                <el-form :model="tab" status-icon class="is-delete-form">
                  <!-- v-show 防闪烁 -->
                  <!-- v-show="stepsIndex == tab.name" -->
                  <section class="tabs-form-item" v-for="tabGroupItem in item.inMultipleConfig" :key="tabGroupItem.unitName">
                    <!-- 标题 -->
                    <template v-if="tabGroupItem.unitName != 'default'">
                      <m-title>
                        {{ tabGroupItem.unitName }}
                        <el-tooltip v-if="tabGroupItem.unitTip" :content="tabGroupItem.unitTip" placement="right">
                          <m-icon name="question_line" class="form-title_label_icon"></m-icon>
                        </el-tooltip>
                      </m-title>
                    </template>

                    <el-row :gutter="10" style="padding-bottom: calc(var(--m-component-padding-size, 10px) * 2)">
                      <template v-for="tabFormItem in tabGroupItem.configs" :key="String(tabFormItem.prop)">
                        <formItem
                          v-if="tabFormItem.prop != item.titleKey"
                          :id="id"
                          :item="tabFormItem"
                          :baseSpanSize="baseSpanSize"
                          :itemSpanSize="itemSpanSize"
                          :ruleFormRef="getRuleTabsFormRef(tab.name)"
                          :data="tab"
                          :labelWidth="labelWidth"
                          :labelPosition="labelPosition"
                          :enforcementDisplay="true"
                          :size="size"
                          :use-alone="useAlone"
                        >
                          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                            <slot :name="slot" v-bind="scope"></slot>
                          </template>
                        </formItem>
                      </template>
                    </el-row>
                  </section>
                </el-form>
              </section>
            </m-tab-item>
          </m-tabs>
        </template>

        <div v-else class="m-display_style">
          {{ languagePackage["empyt"] }}
        </div>
      </section>
    </el-form-item>
  </template>
</template>
<script lang="ts" setup>
// # Import
import { ref, watch, nextTick, computed, onMounted } from "vue";
import lodashPkg from "lodash";
import { TabsItemPropType } from "../item";
import { random } from "../hooks/random";
// import formLabel from "./label.vue";
import formItem from "./basics-item.vue";
import { useBaseStore } from "../../store/index";

import inBrowser from "../../tools/inBrowser";

const { debounce } = lodashPkg;

const props = defineProps<TabsItemPropType>();

const tabsFormRef = ref();
const stepsIndex = ref("0");
const tabHeight = ref(82);
const editTitleIndex = ref("");
const globalState = useBaseStore();
// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("form");
});

// #Computed language
const language = computed(() => {
  return globalState.getLanguage;
});

const titleArr = computed(() => {
  return props.data[String(props.item.prop)].map(item => {
    item[props.item.titleKey] = item[props.item.titleKey];
    return props.item.titleKey
      ? item[String(props.item.titleKey)] || languagePackage.value["information"]
      : props.item.label || languagePackage.value["information"];
  });
});

const contrastDataArr = computed(() => {
  const { contrastData, item, data } = props;
  const arr: objectType = {};
  if (item && item.contrastUse && contrastData && contrastData[String(item.prop)]) {
    for (let index = 0; index < contrastData[String(item.prop)].length; index++) {
      const element = contrastData[String(item.prop)][index];
      if (element[item.contrastUse]) arr[element[item.contrastUse]] = element;
    }
  }
  return arr;
});

const contrastDeletedTab = computed(() => {
  const { data, contrastData, item } = props;

  const list: any = [];

  if (item && item.prop && item.contrastUse && contrastData) {
    const _contrastData = contrastData[String(item.prop)] || [];
    const _data = data[item.prop]?.map(val => val[String(item.contrastUse)])?.filter(val => !!val);
    for (let index = 0; index < _contrastData.length; index++) {
      const element = _contrastData[index];
      if (element && _data && !_data?.includes?.(element[item.contrastUse])) {
        list.push({ ...element, name: random() || Date.now() });
      }
    }
  }
  return list;
});

const cleanLock = debounce(
  () => {
    setTabsHeight();
  },
  500,
  { trailing: true }
);

let lock = false;

// #Function 设置 Tabs Form Ref
const ruleTabsFormRef: objectType = {};
const setRuleTabsFormRefDebounce = debounce(setRuleTabsFormRef, 200, { trailing: true });
function setRuleTabsFormRef(el: any, prop: objectType) {
  const key = prop.name;
  if (el && key && !ruleTabsFormRef[key]) {
    ruleTabsFormRef[key] = { ref: el, prop };
  }
}

// # function 处理输入框失去焦点事件
// #param {string} value 输入框的值
function inputBlur(value, callback) {
  editTitleIndex.value = "";
  if (value == "") {
    callback(props.item?.titleLabel?.[language.value] || "标签");
  }
}

// #Function 获取 Tabs Form Ref
function getRuleTabsFormRef(name) {
  if (ruleTabsFormRef[name]) {
    return ruleTabsFormRef[name].ref;
  }
  return {};
}

// # Vue onMounted
onMounted(() => {
  nextTick(() => {
    setTabsHeight();
  });
});

// #Function 设置tabs的高度
function setTabsHeight() {
  if (!inBrowser) return;
  setTimeout(() => {
    const el = window.document.getElementById("m-tab-" + props.id);
    if (el && el.offsetHeight) {
      tabHeight.value = el.offsetHeight;
    }
  }, 500);
}

// #Function 点击Tabs
function clickToChange({ name }) {
  if (editTitleIndex.value != name) {
    editTitleIndex.value = "";
  }
  stepsIndex.value = name || 0;
}

// #Function 新增Tabs
function addTabs() {
  const newData = {
    name: random() || Date.now()
  };
  newData[props.item.titleKey] = props.item.titleLabel ? props.item.titleLabel[language.value] || "标签" : "标签";
  props.data[String(props.item.prop)].push(newData);

  stepsIndex.value = props.data[String(props.item.prop)][props.data[String(props.item.prop)].length - 1].name;
  nextTick(() => {
    setTabsHeight();
  });
}

// #Function 删除Tabs
function removeTab(row: objectType) {
  const data = props.data[String(props.item.prop)];
  const index = data.findIndex(item => item.name == row.name);
  props.data[String(props.item.prop)].splice(index, 1);
  delete ruleTabsFormRef[row.name];
  setTimeout(() => {
    nextTick(() => {
      stepsIndex.value = props.data[String(props.item.prop)][0].name;
    });
  }, 10);
}

// #Expose 暴露表单校验方法
const submitTabsForm = async () => {
  if (!Object.keys(ruleTabsFormRef).length) {
    return undefined;
  }
  let formResult = true;
  for (const index in ruleTabsFormRef) {
    const element = ruleTabsFormRef[index];
    await element?.ref?.validate((valid: boolean) => {
      if (!valid) {
        formResult = false;
        element.prop.isError = true;
        if (!lock) {
          stepsIndex.value = element.prop.name;
          lock = true;
        }
      } else {
        element.prop.isError = false;
      }
    });
  }
  lock = false;

  return formResult;
};

defineExpose({ submitTabsForm });

// #Watch data
watch(
  () => props.data[String(props.item.prop)],
  data => {
    if (data?.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const formData = data[index];
        data[index] = {
          ...formData,
          name: random() || Date.now(),
          isError: false
        };
        if (props.item.titleKey) {
          data[index][props.item.titleKey] = props.item?.titleLabel?.[(language.value || "zh-CN") as "en-US" | "zh-CN"] || "标签";
        }
      }
      stepsIndex.value = data[0]?.name;
      cleanLock();
    } else {
    }
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
@use "../index.scss";

/* fade-in-transform */
.m-fade-in-transform-leave-active,
.m-fade-in-transform-enter-active {
  transition: all var(--m-component-animation, 0.3s);
}
.m-fade-in-transform-enter-from {
  opacity: 0;
  transition: all var(--m-component-animation, 0.3s);
  transform: translateX(-10px);
}
.m-fade-in-transform-leave-to {
  opacity: 0;
  transition: all 0s;
  transform: translateX(0);
}
.tabs-form {
  position: relative;

  // .add-tab {
  // }
  // .tabs-form-item {
  //   border-bottom: 1px solid var(--el-border-color-light);
  //   margin-bottom: 10px;
  //   &:last-child {
  //     border-bottom: none;
  //     margin-bottom: 0px;
  //   }

  //   // .title_label {
  //   //   padding-top: 10px;
  //   //   border-top: 1px solid var(--el-border-color-light);
  //   // }
  //   // &:first-child {
  //   //   .title_label {
  //   //     padding-top: 0;
  //   //     border-top: none;
  //   //   }
  //   // }
  // }

  width: 100%;

  // &-tabs {
  //   // padding: 0 20px;
  //   // padding-top: 10px;
  // }
  &-body {
    width: 100%;
    padding: 0;
    padding-top: calc(var(--dms-nav-padding) / 2);
    padding-bottom: 0;
    margin: 0;
    border-top: none !important;

    // box-shadow: 0px 5px 7px #c2c5ca
  }
  .tabs-item-title {
    padding: 0 15px;
    position: relative;
    .tabs-item-title_text {
      position: relative;
      max-width: 155px;
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.isDelete {
        position: relative;
        color: var(--el-color-danger);
        &:after {
          display: block;
          content: "";
          width: 100%;
          position: absolute;
          top: 50%;
          left: 0;
          border-bottom: 1px solid;
        }
      }
    }

    .tabs-item-title_text_hover {
      &:hover {
        &::after {
          position: absolute;
          bottom: 3px;
          width: 100%;
          content: "";
          display: block;
          border-bottom: 1px solid;
        }
      }
    }
    .remove-hand {
      display: none;
      position: absolute;
      right: -5px;
      font-weight: normal;
      font-size: calc(var(--m-component-font-size) + 1px);
    }
    &:hover {
      .remove-hand {
        display: block;
        &:hover {
          color: var(--el-color-danger);
        }
      }
    }
  }
}
.error-pane {
  font-weight: bold;
  color: red !important;
}
</style>
<style lang="scss">
.tabs-form {
  .m-tab-item-body_fix {
    // margin-bottom: calc(var(--m-component-padding-size, 10px) * 2);
    height: max-content !important;
    .tabs-form-body {
      padding: var(--m-component-padding-size, 10px);
      width: initial !important;
      padding-top: 0;
      border: 1px solid var(--el-border-color-light) !important;
      border-top-right-radius: 5px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }

  .tab-edit-title-input {
    .el-input__suffix {
      display: none !important;
    }
    .el-input__inner {
      text-align: center !important;
    }
  }
}
.m-form-tabs-box {
  padding-top: 0 !important;
  .el-tabs__content {
    width: initial !important;
  }
  .m-form-tabs {
    margin: 0 !important;
    // margin-top: var(--m-component-padding-size);
    .tabs-form-item {
      > .m-title {
        padding-top: 0 !important;
      }
    }

    .el-tabs__header {
      position: relative;
      height: 2.6em;
      padding: 0 !important;
      margin: 0 !important;
      font-size: var(--m-component-font-size);
      .el-tabs__item {
        height: 2.6em;
        padding: 0 !important;
        font-size: 14px;
        .is-icon-close {
          display: none;
        }
      }
      .el-tabs__new-tab {
        position: absolute;
        top: 50%;
        right: var(--m-component-padding-size);
        width: initial;
        margin: 0;
        transform: translateY(-50%);
        border: none;
      }
    }
    .el-tabs__nav-wrap {
      width: calc(100% - 85px) !important;
    }
    .tabs-form-body {
      width: 100%;
    }
    .el-tabs__content {
      width: initial !important;
      height: inherit;
      padding: var(--m-component-padding-size);
      border-top: 0;
      transform: translateY(-1px);
    }
  }
}

.is-delete-form.el-form {
  .m-form-content-value {
    color: var(--el-color-danger);
    text-decoration: line-through;
    text-decoration-color: var(--el-color-danger);
  }
}
</style>
