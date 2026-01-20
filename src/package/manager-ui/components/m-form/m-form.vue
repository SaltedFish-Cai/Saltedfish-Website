<template>
  <template v-if="initialization == 1">
    <el-form
      :id="id || 'default'"
      ref="ruleFormRef"
      :model="formData"
      :rules="useRules ? inRules['default'] : undefined"
      status-icon
      class="m-form"
      :class="[
        props.exClass,
        createSize == 'small' ? 'm-form_small' : createSize == 'large' ? 'm-form_large' : '',
        useTopTitle ? 'm-form_top-title' : 'm-form_left-title',
        titlePosition == 'center' ? 'title-center' : '',
        baseSpanSize ? `m-form_base-span-${baseSpanSize}` : '',
        isPrint ? 'print-mode' : ''
      ]"
    >
      <template v-for="itemConfigs in inMultipleConfig" :key="itemConfigs.unitName">
        <!-- Group组标题 -->

        <template v-if="itemConfigs.unitName != 'default'">
          <m-title>
            {{ itemConfigs.unitName }}
            <el-tooltip v-if="itemConfigs.unitTip" :content="itemConfigs.unitTip" placement="right">
              <m-icon name="question_line" class="form-title_label_icon"></m-icon>
            </el-tooltip>
          </m-title>
        </template>

        <!-- body -->
        <el-row :gutter="10" style="padding-bottom: calc(var(--m-component-padding-size, 10px) * 2)">
          <template v-for="item in itemConfigs.configs" :key="String(item.prop)">
            <!-- tabs 表 -->
            <el-col v-if="item.type == 'tabs-form'" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" :span="24">
              <tabsItem
                :ruleFormRef="ruleFormRef"
                :id="id"
                :ref="refBody => setRuleTabsFormRef(refBody, item.prop)"
                :item="item"
                :baseSpanSize="baseSpanSize"
                :itemSpanSize="itemSpanSize"
                :data="formData"
                :contrastData="contrastData"
                :rules="inRules"
                :labelWidth="useTopTitle ? undefined : Number(labelWidth)"
                :labelPosition="useTopTitle ? 'left' : labelPosition"
                :display="props.display"
                :size="createSize"
                :use-alone="useAlone"
              >
                <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                  <slot :name="slot" v-bind="scope"></slot>
                </template>
              </tabsItem>
            </el-col>

            <!-- group 表 -->
            <el-col
              v-else-if="item.type == 'group' && item.prop"
              :xs="itemSpanSize?.[item.prop] || baseSpanSize"
              :sm="itemSpanSize?.[item.prop] || baseSpanSize"
              :md="itemSpanSize?.[item.prop] || baseSpanSize"
              :lg="itemSpanSize?.[item.prop] || baseSpanSize"
              :xl="itemSpanSize?.[item.prop] || baseSpanSize"
              :span="baseSpanSize"
            >
              <groupItem
                :id="id"
                :ruleFormRef="ruleFormRef"
                :item="item"
                :baseSpanSize="baseSpanSize"
                :itemSpanSize="itemSpanSize"
                :data="formData"
                :alwaysContrast="alwaysContrast"
                :contrastData="contrastData"
                :labelWidth="useTopTitle ? undefined : Number(labelWidth)"
                :labelPosition="useTopTitle ? 'left' : labelPosition"
                :display="props.display"
                :size="createSize"
                :use-alone="useAlone"
                :baseRulesMap="baseRulesMap"
                @change-rules="rules => (inRules = rules)"
              >
                <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                  <slot :name="slot" v-bind="scope"></slot>
                </template>
              </groupItem>
            </el-col>

            <!-- slot -->
            <el-col
              v-else-if="item.type == 'slot'"
              :xs="(item?.prop && itemSpanSize?.[item?.prop]) || baseSpanSize"
              :sm="(item?.prop && itemSpanSize?.[item?.prop]) || baseSpanSize"
              :md="(item?.prop && itemSpanSize?.[item?.prop]) || baseSpanSize"
              :lg="(item?.prop && itemSpanSize?.[item?.prop]) || baseSpanSize"
              :xl="(item?.prop && itemSpanSize?.[item?.prop]) || baseSpanSize"
              :span="baseSpanSize"
            >
              <!-- slot -->
              <el-form-item :prop="item.prop">
                <!-- label -->
                <template #label v-if="item.label">
                  <form-label
                    :label="item.label && String(item.label)"
                    :tip="item.tip && String(item.tip)"
                    :labelWidth="useTopTitle ? undefined : Number(labelWidth)"
                    :labelPosition="useTopTitle ? 'left' : labelPosition"
                    :item="item"
                    :data="formData"
                  >
                    <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                      <slot :name="slot" v-bind="scope" :size="createSize"></slot>
                    </template>
                  </form-label>
                </template>
                <slot :name="item.prop" :row="item" :data="formData" :size="createSize" />
              </el-form-item>
            </el-col>

            <!-- 标准表格 -->
            <formItem
              v-else
              :id="id"
              :ruleFormRef="ruleFormRef"
              :item="item"
              :baseSpanSize="baseSpanSize"
              :itemSpanSize="itemSpanSize"
              :data="formData"
              :contrastData="contrastData"
              :alwaysContrast="alwaysContrast"
              :labelWidth="useTopTitle ? undefined : Number(labelWidth)"
              :labelPosition="useTopTitle ? 'left' : labelPosition"
              :display="props.display"
              :size="createSize"
              :use-alone="useAlone"
            >
              <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                <slot :name="slot" v-bind="scope" :size="createSize"></slot>
              </template>
            </formItem>
          </template>
        </el-row>
      </template>
    </el-form>
  </template>
  <div v-else-if="initialization == -1" class="m-loading"><m-icon class="loading_font" name="loading_line"></m-icon></div>

  <div v-else class="title-error">{{ languagePackage["warning"] }}</div>
</template>

<script lang="tsx" setup>
// # Import
import { ref, Ref, reactive, defineEmits, watch, nextTick, computed, ComputedRef, provide, onUnmounted, onMounted } from "vue";
import lodashPkg from "lodash";
import { useBaseStore } from "../store/index";
import inBrowser from "../tools/inBrowser";

import formLabel from "./components/label.vue";
import groupItem from "./components/group-item.vue";
import tabsItem from "./components/tabs-item.vue";
import formItem from "./components/basics-item.vue";

import { MFormItemType, MFormChildType, MFormProps } from "./type";
import { ExMultipleConfigType, MultipleConfigType } from "./type";
import { MOptionType, MStructureType } from "MTypes";

// # Var
const { debounce, cloneDeep, isEqual, isEmpty } = lodashPkg;

const props = withDefaults(defineProps<MFormProps>(), {
  contrastData: () => ({}),
  useRequired: true,
  labelWidth: 0,
  exOptions: () => ({}),
  exDependent: () => ({
    disabledRule: {},
    disabledDateFn: {},
    fileData: {},
    remoteMethod: {}
  }),
  freeLabel: true,
  display: false,
  useRules: true,
  useTopTitle: true,
  useAlone: false,
  titlePosition: ""
});

const emit = defineEmits(["cellBack", "callBack", "cellChange", "onFormStateChange"]);

const exCellConfig: Ref<objectType> = ref({});

const initialization = ref(0);
const useRequired = ref(true);
const ruleFormRef = ref();
const inRules = ref({});
const inRulesMap = ref({});

const baseRulesMap = ref({});

const baseSpanSize = ref(6);
const itemSpanSize = ref({} as objectType);
const baseItemSpanSize = {} as objectType;

const deepData = props.value && Object.keys(props.value).length > 0 ? cloneDeep(props.value) : props.data;
const formData: Ref<objectType> = ref(deepData || {});
const inConfigObj: objectType = {};

const ruleTabsFormRef: any = {};
// const setRuleTabsFormRefDebounce = debounce(setRuleTabsFormRef, 200, { trailing: true });

function setRuleTabsFormRef(el, key) {
  if (el && key && !ruleTabsFormRef[key]) {
    ruleTabsFormRef[key] = el;
  }
}

const inMultipleConfigKeys: string[] = [];
const inMultipleConfig = reactive([] as MultipleConfigType[]);

const options: Ref<MOptionType.Form> = ref({});
provide(
  "propOptions",
  computed(() => options.value)
);
const dependent: Ref<objectType> = ref({});
provide(
  "propDependent",
  computed(() => dependent.value)
);

const formState = ref("Pending");
provide("changeFormState", data => (formState.value = data));

provide("emitFn", data => emit("cellChange", data));

const globalState = useBaseStore();
const _debounce = debounce(structure => setConfigData(structure), 200, { trailing: true });
const isPrint = computed(() => globalState.isPrint);

let structure: MFormItemType[] = [];
let baseFormData: objectType = {};
let inConfig = reactive(props.structure || []);

// #Computed createSize
const createSize: ComputedRef<"default" | "large" | "small"> = computed(() => globalState.getSize || "default");

// #Computed contrastData
const contrastData: ComputedRef<objectType> = computed(() => (!isEmpty(props.data) ? props.contrastData : {}));

// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("form");
});
let observer: any;
// #Function 初始化单行列数
function createSpanStyle() {
  if (inBrowser) {
    if (props.exSpan) {
      if (props.exSpan == 1) {
        baseSpanSize.value = 24;
      } else if (props.exSpan == 2) {
        baseSpanSize.value = 12;
      } else if (props.exSpan == 3) {
        baseSpanSize.value = 8;
      } else if (props.exSpan == 4) {
        baseSpanSize.value = 6;
      }
    } else {
      const boxWidth = window.document?.getElementById(props.id || "default");
      if (!boxWidth) return;
      const maxSpanList = {
        4: [6, 8, 12, 24],
        3: [8, 8, 12, 24],
        2: [12, 12, 12, 24],
        1: [24, 24, 24, 24]
      };
      observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const containerWidth = entry.contentRect.width;
          if (containerWidth > 1140) {
            baseSpanSize.value = maxSpanList[props.maxSpan || 4][0];
          } else if (containerWidth > 724) {
            baseSpanSize.value = maxSpanList[props.maxSpan || 4][1];
          } else if (containerWidth > 370) {
            baseSpanSize.value = maxSpanList[props.maxSpan || 4][2];
          } else {
            baseSpanSize.value = maxSpanList[props.maxSpan || 4][3];
          }
        }
        for (const key in itemSpanSize.value) {
          itemSpanSize.value[key] = baseItemSpanSize[key];
          if (itemSpanSize.value[key] < baseSpanSize.value) {
            itemSpanSize.value[key] = baseSpanSize.value;
          }
        }
      });

      observer.observe(boxWidth);
    }
  }
}

// #Function 设置单行列数
function setSpanStyle(prop: string, span?: 1 | 2 | 3 | 4) {
  const maxSpanList = {
    4: [6, 12, 18, 24],
    3: [8, 16, 24, 24],
    2: [12, 24, 24, 24],
    1: [24, 24, 24, 24]
  };

  let data = 6;
  if (span == 1) {
    data = maxSpanList[props.exSpan || props.maxSpan || 4][0];
  } else if (span == 2) {
    data = maxSpanList[props.exSpan || props.maxSpan || 4][1];
  } else if (span == 3) {
    data = maxSpanList[props.exSpan || props.maxSpan || 4][2];
  } else if (span == 4) {
    data = maxSpanList[props.exSpan || props.maxSpan || 4][3];
  }
  itemSpanSize.value[prop] = data;
  baseItemSpanSize[prop] = data;
}

// #Function  解析·校验规则
function setRule(item: MFormChildType | MFormItemType, type = "default") {
  if (!inRules.value[type]) {
    inRules.value[type] = [];
    inRulesMap.value[type] = {};
  }

  if (item.rules && Array.isArray(item.rules)) {
    item.rules = item.rules.map(item => {
      const data = {
        trigger: "blur",
        ...item,
        message:
          item.languageMessage?.[globalState.getLanguage || "zh-CN"] || item.message || languagePackage.value["requiredMessage"]
      };
      delete data.languageMessage;
      return data;
    });
  }

  // >-------------> 强制不使用校验 <------------<
  const _prop = item.type == "address" ? item.prop?.join("-") : item.prop;
  if (!props.useRequired || !useRequired.value) {
    inRules.value[type][_prop] = item.display || item.disabled ? [] : item.rules || [];
    inRulesMap.value[type][_prop] = item.display || item.disabled ? [] : item.rules || [];
    return;
  }

  const baseRules =
    item.display || item.disabled ? [] : [{ required: true, message: languagePackage.value["requiredMessage"], trigger: "blur" }];
  // if (item.type == "select" || item.type == "multiple-select" || item.type == "number") {
  //   baseRules = [{ required: true, message: "此项为必填项", trigger: "change" }];
  // }
  // const _rules = item?.isText == true ? [] : item.rules ? item.rules : [{ required: true, message: "此项为必填项", trigger: "blur" }];
  const _rules = item.rules && Array.isArray(item.rules) ? item.rules : baseRules;

  if (_prop) {
    const _baseRules = props.exRules || {};
    if (_baseRules[_prop]) {
      inRules.value[type][_prop] = [..._rules, ..._baseRules[_prop]];
      inRulesMap.value[type][_prop] = [..._rules, ..._baseRules[_prop]];
    } else {
      inRules.value[type][_prop] = _rules;
      inRulesMap.value[type][_prop] = _rules;
    }
  }

  baseRulesMap.value[type] = cloneDeep(inRulesMap.value[type]);
}

// #Function  解析·多form情况
function setMultipleConfig(configItem: ExMultipleConfigType) {
  const _groupName =
    configItem?.languageUnitName?.[globalState.getLanguage || "zh-CN"] || typeof configItem.unitName == "object"
      ? configItem?.languageUnitName?.[globalState.getLanguage || "zh-CN"] ||
        configItem.unitName?.[globalState.getLanguage || "zh-CN"] ||
        configItem.unitName
      : configItem.unitName || "default";
  const _index = inMultipleConfigKeys.indexOf(_groupName);

  // >-------------> 处理 表格 的 group 组 <------------<
  if (configItem.tabsFormConfig?.length) {
    const inMultipleTabsConfigKeys: string[] = [];
    configItem.inMultipleConfig = [];
    // const { exClassName } = getFormBoxInfo();

    let _prop = "";
    if (configItem.prop) {
      _prop = Array.isArray(configItem.prop) ? configItem.prop.join("-") : configItem.prop;
    }

    configItem.tabsFormConfig.map(value => {
      const value_prop = value.type == "address" ? value.prop?.join("-") : value.prop;
      value.span && value_prop && setSpanStyle(value_prop, value.span);

      const item: MFormItemType = { ...value };
      // label
      item.label = item.languageLabel
        ? item.languageLabel[globalState.getLanguage || "zh-CN"]
        : typeof item.label == "object"
        ? item.label?.[globalState.getLanguage || "zh-CN"] || item.label
        : item.label;

      // tip
      item.tip = item.languageTip
        ? item.languageTip[globalState.getLanguage || "zh-CN"]
        : typeof item.tip == "object"
        ? item.tip?.[globalState.getLanguage || "zh-CN"] || item.tip
        : item.tip;

      // placeholder
      item.placeholder = item.languagePlaceholder
        ? item.languagePlaceholder[globalState.getLanguage || "zh-CN"]
        : typeof item.placeholder == "string"
        ? item.placeholder
        : item?.placeholder?.[globalState.getLanguage || "zh-CN"] || item?.placeholder;

      // activeText
      item.activeText = item.languageActiveText
        ? item.languageActiveText[globalState.getLanguage || "zh-CN"]
        : typeof item.activeText == "string"
        ? item.activeText
        : item?.activeText?.[globalState.getLanguage || "zh-CN"] || item?.activeText;

      // inActiveText
      item.inActiveText = item.languageInActiveText
        ? item.languageInActiveText[globalState.getLanguage || "zh-CN"]
        : typeof item.inActiveText == "string"
        ? item.inActiveText
        : item?.inActiveText?.[globalState.getLanguage || "zh-CN"] || item?.inActiveText;

      item.display = item.display != undefined ? item.display : props.display;
      item.disabled = item.disabled == undefined ? configItem.disabled : item.disabled;
      item.placeholder = item.disabled ? " " : item.placeholder;

      setRule(item, _prop);

      const _tabsGroupName =
        item?.languageUnitName?.[globalState.getLanguage || "zh-CN"] || typeof item?.unitName == "object"
          ? item?.languageUnitName?.[globalState.getLanguage || "zh-CN"]
          : item.unitName || "default";

      const _tabsIndex = inMultipleTabsConfigKeys.indexOf(_tabsGroupName);
      if (Array.isArray(configItem.inMultipleConfig)) {
        if (_tabsIndex >= 0) {
          configItem.inMultipleConfig[_tabsIndex].configs.push(item);
        } else {
          inMultipleTabsConfigKeys.push(_tabsGroupName);
          configItem.inMultipleConfig.push({
            unitName: _tabsGroupName,
            unitTip: String(
              typeof configItem.unitTip == "object"
                ? configItem.unitTip?.[globalState.getLanguage || "zh-CN"] || configItem.unitTip
                : configItem.unitTip || ""
            ),
            configs: [item]
          });
        }
      }
    });
  }

  if (_index >= 0) {
    inMultipleConfig[_index].configs.push(configItem);
  } else {
    inMultipleConfigKeys.push(_groupName);
    inMultipleConfig.push({
      unitName: _groupName,
      unitTip: String(
        typeof configItem.unitTip == "object"
          ? configItem.unitTip?.[globalState.getLanguage || "zh-CN"] || configItem.unitTip
          : configItem.unitTip || ""
      ),
      configs: [configItem]
    });
  }
}

// #Function 开始结构处理
function init() {
  nextTick(() => {
    inMultipleConfigKeys.length = 0;
    inMultipleConfig.length = 0;
    createSpanStyle();
    // const { exClassName } = getFormBoxInfo();

    inConfig.map((value: MFormItemType) => {
      const value_prop = value.type == "address" ? value.prop?.join("-") : value.prop;
      value_prop && value.span && setSpanStyle(value_prop, value.span);

      const item: MFormItemType = { ...value };
      const _prop = Array.isArray(item.prop) ? item.prop.join("-") : item.prop;
      if (_prop) inConfigObj[_prop] = item;

      if (props.disabled) {
        item.disabled = true;
      }
      if (item.disabled) {
        item.placeholder = " ";
      }

      item.display = item.display != undefined ? item.display : props.display;

      if (props.display) {
        useRequired.value = false;
      } else {
        useRequired.value = true;
      }

      // setExRoles(item);
      if (item.type == "group" && item?.groupFormConfig?.length) {
        for (let index = 0; index < item.groupFormConfig.length; index++) {
          const el = item.groupFormConfig[index];
          const value_prop = value.type == "address" ? value.prop?.join("-") : value.prop;
          value_prop && el.span && setSpanStyle(value_prop, el.span);

          item.groupFormConfig[index] = {
            ...item.groupFormConfig[index],
            label: item.languageLabel
              ? item.languageLabel[globalState.getLanguage || "zh-CN"]
              : typeof item.label == "object"
              ? item.label?.[globalState.getLanguage || "zh-CN"] || item.label
              : item.label,
            tip: item.languageTip
              ? item.languageTip[globalState.getLanguage || "zh-CN"]
              : typeof item.tip == "object"
              ? item.tip?.[globalState.getLanguage || "zh-CN"] || item.tip
              : item.tip,
            disabled: item.disabled || el.disabled,
            display: item.display || el.display
          };

          setRule(item.groupFormConfig[index]);
        }
      }

      // setClassName(item, exClassName);

      setRule(item);

      setMultipleConfig(item);
    });
  });
}

// #Function 暴露表单校验方法
function checkFormEdit(FormData) {
  if (isEqual(baseFormData, FormData)) {
    return false;
  }
  return true;
}

// #Function 外置数据
function setConfigData(config: MStructureType.Form[]) {
  const _config = config.map(item => ({
    ...item,
    label: item.languageLabel
      ? item.languageLabel[globalState.getLanguage || "zh-CN"]
      : typeof item.label == "object"
      ? item.label?.[globalState.getLanguage || "zh-CN"] || item.label
      : item.label,
    tip: item.languageTip
      ? item.languageTip[globalState.getLanguage || "zh-CN"]
      : typeof item.tip == "object"
      ? item.tip?.[globalState.getLanguage || "zh-CN"] || item.tip
      : item.tip,
    placeholder: item.languagePlaceholder
      ? item.languagePlaceholder[globalState.getLanguage || "zh-CN"]
      : typeof item.placeholder == "string"
      ? item.placeholder
      : item?.placeholder?.[globalState.getLanguage || "zh-CN"] || item?.placeholder,
    activeText: item.languageActiveText
      ? item.languageActiveText[globalState.getLanguage || "zh-CN"]
      : typeof item.activeText == "string"
      ? item.activeText
      : item?.activeText?.[globalState.getLanguage || "zh-CN"] || item?.activeText,
    inActiveText: item.languageInActiveText
      ? item.languageInActiveText[globalState.getLanguage || "zh-CN"]
      : typeof item.inActiveText == "string"
      ? item.inActiveText
      : item?.inActiveText?.[globalState.getLanguage || "zh-CN"] || item?.inActiveText,
    ...exCellConfig.value[item.prop]
  }));

  if (!Array.isArray(_config)) {
    return (initialization.value = -2);
  }
  if (_config?.length > 0) {
    inConfig = cloneDeep(_config);
    init();
    initialization.value = 1;
    // const baseStore = useBaseStore();
    // if (baseStore.getToken) {
    //   initialization.value = 1;
    //   nextTick(() => {
    //     init();
    //   });
    // } else {
    //   initialization.value = -1;
    // }
  }
  if (!inConfig.length) {
    initialization.value = -1;
  }
  // structure.length = 0;
}

// # Expose 提交表单
async function submitForm(step?: "check", type?: "new") {
  if (initialization.value == -1) {
    // window.ElMessage.error({ "en-US": "Please configure the structure first", "zh-CN": "请先配置结构" });
    return;
  }

  const _ruleFormRef = ruleFormRef.value;
  let formResult = true;
  await _ruleFormRef.validate((valid: boolean) => {
    if (!valid) {
      formResult = false;
    }
  });
  for (const index in ruleTabsFormRef) {
    const element = ruleTabsFormRef[index];
    const _await = await element?.submitTabsForm();
    if (_await != "undefined" && _await != undefined && formResult) {
      formResult = _await;
    }
  }
  if (formResult) {
    const deepData = cloneDeep(formData.value) || {};
    const FormData = deepData;
    const _configs = props.structure || [];
    for (let index = 0; index < _configs.length; index++) {
      const element = _configs[index];
      if (element.type == "address") {
        const _prop = element.prop?.join("-");
        _prop && delete FormData[_prop];
      } else if (type == "new" && element.type == "tabs-form" && element.prop && FormData[element.prop]) {
        FormData[element.prop] = FormData[element.prop].map(item => {
          delete item.name;
          delete item.isError;
          return item;
        });
      }
    }

    if (step == "check" && !checkFormEdit(FormData)) return null;

    return FormData;
  } else {
    const errorTimeout = setTimeout(() => {
      window?.MScrollbarToError?.();
      clearTimeout(errorTimeout);
    }, 500);
    return false;
  }
}

// # Expose 为tabs-from取值优化
async function getSubmitForm(step?: "check") {
  return submitForm(step, "new");
}

// # Expose 清空表单内容
async function cleanAll() {
  formData.value = {};
  ruleFormRef.value?.resetFields();
  ruleFormRef.value.clearValidate();
}

// # Expose 重置结构配置
function resetStructure(key, data) {
  exCellConfig.value = {};
  if (!structure.length) {
    structure = cloneDeep(props.structure);
  }

  const _index = structure.findIndex(item => item.prop == key);
  if (_index > -1) {
    structure[_index] = { ...structure[_index], ...data };
    _debounce(structure);
  }
}

function changeBaseData(data) {
  formData.value = cloneDeep(data);
}

function setStructure_Item(prop: string, item: MStructureType.Form) {
  exCellConfig.value[prop] = item;

  _debounce(inConfig);
}

onUnmounted(() => {
  observer?.disconnect?.();
});

defineExpose({
  /**
   * **校验并获取表格数据**
   * @type `(step?: "check") => void`
   * @description
   * - 当设置执行参数值为 `check` 时，会执行数据对比，如果对数据无变化，则会返回 `null`
   * - 当设置执行参数值为 `undefined` 时，会执行数据校验，如果校验通过，则会返回表格数据
   * - 当设置执行参数值为 `undefined` 时，会执行数据校验，如果校验失败，则会返回 `false`
   * @example
   * ```tsx
   * <MoForm ref={formRef} />
   * formRef.value.submitForm()
   * ```
   * */
  submitForm,

  /**
   * **校验并获取表格数据**
   * @type `(step?: "check") => void`
   * @description
   * - 该方法为 `submitForm` 的优化版本，用于兼容
   * - 当设置执行参数值为 `check` 时，会执行数据对比，如果对数据无变化，则会返回 `null`
   * - 当设置执行参数值为 `undefined` 时，会执行数据校验，如果校验通过，则会返回表格数据
   * - 当设置执行参数值为 `undefined` 时，会执行数据校验，如果校验失败，则会返回 `false`
   * @example
   * ```tsx
   * <MoForm ref={formRef} />
   * formRef.value.submitForm()
   * ```
   * */
  getSubmitForm,

  /**
   * **清除表单所有数据**
   * @type `() => void`
   * @description 该方法用于清除表单所有数据，包括表单校验状态。
   * @example
   * ```tsx
   * <MoForm ref={formRef} />
   * ```
   * ```tsx
   * formRef.value.cleanAll()
   * ```
   * */
  cleanAll,

  /**
   * **替换表单结构**
   * @type `(key: string, data: MFormItemType) => void`
   * @description 该方法用于替换表单结构，支持替换单个表单结构。
   * @param key 替换的 `prop`
   * @param data 替换后的表单结构
   * @returns 无返回值
   * @example
   * ```tsx
   * <MoForm ref={formRef} />
   * ```
   * ```tsx
   * formRef.value.resetStructure("key", {})
   * ```
   * */
  resetStructure,
  changeBaseData,

  /**
   * **设置单元格样式**
   * @type `(prop: string, style: string) => void`
   * @description 该方法用于设置单元格样式，支持设置单个单元格样式。
   * @param prop 单元格 `prop`
   * @param style 单元格样式
   * @returns 无返回值
   * @example
   * ```tsx
   * <MoForm ref={formRef} />
   * ```
   * ```tsx
   * formRef.value.setStructure_Item("key", "color: red;")
   * ```
   * */
  setStructure_Item
});

// #Watch 外置数据
watch(
  () => props.data,
  value => {
    if (value && Object.keys(value).length > 0) {
      formData.value = value;
      if (Object.keys(baseFormData).length > 0) return;
      const JsonValue = JSON.parse(JSON.stringify(value));
      baseFormData = cloneDeep(JsonValue);
    }
  },
  { immediate: true, deep: true }
);

// #Watch 外置数据
watch(
  () => props.value,
  value => {
    if (value) {
      window.log.error("value数据赋值的使用暂未稳定，请勿使用！");
      // ruleFormRef.value?.resetFields();
      // formData.value = lodash.cloneDeep(value);
      // baseFormData = lodash.cloneDeep(value);
    }

    // if (!value) return;
    // let nullValue = true;
    // const _formData = lodash.cloneDeep(formData.value);
    // ruleFormRef.value?.resetFields();
    // for (const key in _formData) {
    //   const value = _formData[key] != null && typeof _formData[key] == "object" ? _formData[key].length : _formData[key];
    //   if (!!value) nullValue = false;
    // }
    // if (nullValue) {
    //   const defaultData = lodash.cloneDeep(_formData);
    //   const deepData = { ...defaultData, ...value };
    //   formData.value = deepData;
    //   return;
    // } else {
    // }
    // for (const key in _formData) {
    //   if (inConfigObj[key] && inConfigObj[key].type == "slot" && value[key] && _formData[key] != value[key]) {
    //     _formData[key] = value[key];
    //   }
    // }
    // const deepData = { ...value, ..._formData };
    // formData.value = deepData;
  },
  { immediate: true }
);

// #Watch formData默认数据
watch(
  () => formData.value,
  value => {
    emit("callBack", value);
    emit("cellBack", value);
  },
  { deep: true }
);

// #Watch 结构配置
watch(
  () => props.structure,
  data => {
    setConfigData(data);
  },
  { immediate: true, deep: true }
);

// #Watch display模式
watch(
  () => props.display,
  () => {
    setConfigData(props.structure);
  }
);

// #Watch disabled
watch(
  () => props.disabled,
  () => {
    setConfigData(props.structure);
  }
);

// #Watch exOptions外置选项
watch(
  () => props.exOptions,
  (data: MOptionType.Form) => {
    const _data = {};
    for (const key in data) {
      const item = data[key];
      if (Array.isArray(item)) {
        _data[key] = item.map(item => ({ ...item, value: item.value }));
      } else {
        _data[key] = item;
      }
    }
    options.value = data;
  },
  { immediate: true, deep: true }
);

// #Watch exDependent外置依赖
watch(
  () => props.exDependent,
  data => {
    const { fileData, disabledRule, disabledDateFn } = data;
    if (Object.keys(dependent.value).length === 0) {
      dependent.value = data;
    } else {
      dependent.value = { ...dependent.value, fileData, disabledRule, disabledDateFn };
    }
  },
  { immediate: true, deep: true }
);

// #Watch formState
watch(
  () => formState.value,
  data => {
    emit("onFormStateChange", data);
  }
);

// 解析·根据角色配置disable
// const setExRoles = (item: MFormItemType) => {
//   if (String(props.roles) != "undefined") {
//     const _roles = props.roles || [];
//     if (String(item.disabled) == "undefined") {
//       item.disabled = true;
//     }

//     if (item.prop) {
//       const _prop = typeof item.prop == "string" ? item.prop : item.prop.join("-");
//       if (_roles.indexOf(_prop) >= 0) {
//         item.disabled = false;
//       }
//     }
//   }

//   // if (String(item.isEdit) == 'undefined' && formData.value[item.prop]) {
//   //   item.isEdit = true
//   // }
// };

// --------------------------------------------------------------------  获取页面宽高自动选择class
// function getFormBoxInfo() {
//   let exClassName = "span_item_all";
//   let tabSize = 1;
//   const el = document.getElementById(props.id || "default");
//   const scrollWidth = props.width || el?.scrollWidth || 0;
//   if (scrollWidth > 0) {
//     tabSize = 1;
//     if (scrollWidth / 4 > 300) {
//       exClassName = "span_item_four";
//       tabSize = 3;
//     } else if (scrollWidth / 3 > 300) {
//       exClassName = "span_item_three";
//       tabSize = 3;
//     } else if (scrollWidth / 2 > 300) {
//       exClassName = "span_item_two";
//       tabSize = 2;
//     } else {
//       exClassName = "span_item_all";
//       tabSize = 1;
//     }
//   }
//   return { scrollWidth, exClassName, tabSize };
// }
// // --------------------------------------------------------------------  解析·className
// const setClassName = (item: MFormItemType & { className?: string }, exClassName?: string) => {
//   const spanAll = ["tabs-form", "group"];
//   const spanAllCenter = ["transfer", "editor"];
//   const _class = item.disabled ? " item_disabled" : "";
//   const type = item.type || "";
//   if (props.span == 4 || item.span == 4) {
//     item.className = "span_item_four" + _class;
//   } else if (props.span == 3 || item.span == 3) {
//     item.className = "span_item_three" + _class;
//   } else if (props.span == 2 || item.span == 2) {
//     item.className = "span_item_two" + _class;
//   } else if (props.span == 1 || item.span == 1) {
//     item.className = "span_item_all" + _class;
//   } else if (props.span == 0 || item.span == 0) {
//     item.className = "" + _class;
//   } else if (item.span == -1) {
//     item.className = "span_item_all-center" + _class;
//   } else if (spanAll.lastIndexOf(type) >= 0) {
//     item.className = "span_item_all";
//   } else if (spanAllCenter.lastIndexOf(type) >= 0) {
//     item.className = "span_item_all-center";
//   } else {
//     // >-------------> 自动判断列数 <------------<
//     item.className = exClassName + _class;
//   }
// };
</script>

<style lang="scss">
@use "./index.scss";

.title-error {
  padding: 10px;
  font-size: 14px;
  color: var(--el-color-info);
  text-align: center;
}

.is-guttered:has(.is-error) {
  background-color: var(--el-color-warning-light-8);
  border-radius: 5px;
  margin-bottom: calc(var(--m-component-padding-size, 10px) * 0.2);
}

.is-guttered:has(.tabs-form .tabs-item-title) {
  background-color: initial;
}
</style>
