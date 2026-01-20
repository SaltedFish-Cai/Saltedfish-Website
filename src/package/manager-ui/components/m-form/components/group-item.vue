<template>
  <template v-if="item.type == 'group'">
    <el-form-item :prop="item.prop" :class="[display ? 'm-form-display' : '']">
      <!-- label -->
      <template #label v-if="item.label">
        <form-label
          :label="item.label"
          :tip="item.tip"
          :item="item"
          :data="data"
          :labelWidth="labelWidth"
          :labelPosition="labelPosition"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </form-label>
      </template>

      <div class="flex-col" v-if="item.prop">
        <!-- group -->
        <el-radio-group v-model="data[item.prop]" :size="size" v-if="!display" :disabled="item.disabled">
          <el-radio-button :label="radio.value" :value="radio.value" v-for="radio in radioOptions" :key="String(radio.value)">
            {{
              radio?.languageLabel?.[globalState?.getLanguage || "zh-CN"]
                ? radio.languageLabel[globalState?.getLanguage || "zh-CN"]
                : radio.label
            }}
          </el-radio-button>
        </el-radio-group>

        <template v-else>
          <div class="group-display">
            {{ findData(data[item.prop]) || "--" }}
            <template v-if="findData(data[item.prop])">
              <!-- <el-form-item :prop="item.prop" style="flex-direction: column"> -->
              <template v-for="groupItem in exOptions[item.prop] || item.groupFormConfig" :key="groupItem.label">
                <template v-if="data && data[item.prop] == groupItem.value && groupItem.type != 'null'">
                  (
                  <el-row :gutter="10" v-if="display">
                    <formItem
                      :id="id"
                      :ruleFormRef="ruleFormRef"
                      :item="{ ...groupItem, spanStyle: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }"
                      :baseSpanSize="24"
                      :data="data"
                      :labelWidth="labelWidth"
                      :labelPosition="labelPosition"
                      :display="display"
                      :size="size"
                      noLabel
                      :use-alone="useAlone"
                    >
                      <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                        <slot :name="slot" v-bind="scope"></slot>
                      </template>
                    </formItem>
                  </el-row>
                  )
                </template>
              </template>
              <!-- </el-form-item> -->
            </template>
          </div>
        </template>

        <el-row :gutter="10" v-if="!display" class="group-item">
          <!-- <el-form-item :prop="item.prop" style="flex-direction: column"> -->
          <template v-for="groupItem in exOptions[item.prop] || item.groupFormConfig" :key="groupItem.label">
            <template v-if="data && data[item.prop] == groupItem.value && groupItem.type != 'null'">
              <formItem
                :id="id"
                class="mt5"
                :ruleFormRef="ruleFormRef"
                :item="{
                  ...groupItem,
                  label:
                    groupItem?.childLabel || groupItem?.languageLabel?.[globalState?.getLanguage || 'zh-CN'] || groupItem?.label,
                  spanStyle: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }
                }"
                :baseSpanSize="24"
                :data="data"
                :labelWidth="labelWidth"
                :labelPosition="labelPosition"
                :contrastData="contrastData"
                :alwaysContrast="alwaysContrast"
                :display="display"
                :size="size"
                noLabel
                :use-alone="useAlone"
              >
                <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                  <slot :name="slot" v-bind="scope"></slot>
                </template>
              </formItem>
            </template>
          </template>
          <!-- </el-form-item> -->
        </el-row>
        <div
          v-if="alwaysContrast || (!isNil(contrastData?.[item.prop]) && isEqualFind(data[item.prop], contrastData[item.prop]))"
          :class="['m-form-contrast-value', item.size == 'small' ? 'mo-form-contrast-value_small' : '']"
        >
          <div v-if="radioOptions?.length" style="display: flex; align-items: center">
            {{ findData(contrastData?.[item.prop]) }}
            <template v-if="findData(contrastData?.[item.prop])">
              <!-- <el-form-item :prop="item.prop" style="flex-direction: column"> -->
              <template v-for="groupItem in exOptions[item.prop] || item.groupFormConfig" :key="groupItem.label">
                <template v-if="contrastData && contrastData[item.prop] == groupItem.value && groupItem.type != 'null'">
                  (
                  <el-row :gutter="10">
                    <formItem
                      :id="id"
                      :ruleFormRef="ruleFormRef"
                      :item="{ ...groupItem, display: true, spanStyle: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } }"
                      :baseSpanSize="24"
                      :data="contrastData"
                      :labelWidth="labelWidth"
                      :labelPosition="labelPosition"
                      :display="true"
                      :size="size"
                      noLabel
                      :use-alone="useAlone"
                    >
                      <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                        <slot :name="slot" v-bind="scope"></slot>
                      </template>
                    </formItem>
                  </el-row>
                  )
                </template>
              </template>
              <!-- </el-form-item> -->
            </template>
          </div>
        </div>
      </div>
    </el-form-item>
  </template>
</template>
<script lang="tsx" setup>
// # Import
import { inject, computed, watch } from "vue";
import formLabel from "./label.vue";
import formItem from "./basics-item.vue";
import { GroupItemPropsType } from "../item";
import { useBaseStore } from "../../store/index";
import lodashPkg from "lodash";

const { isNil, isEqual, cloneDeep } = lodashPkg;
// # Var
const props = withDefaults(defineProps<GroupItemPropsType>(), {
  data: () => ({})
});
const emits = defineEmits(["changeRules"]);

const display = computed(() => {
  return !isNil(props.item.display) ? props.item.display : props.display || false;
});
const globalState = useBaseStore();
const exOptions: any = inject("propOptions");
const radioOptions = computed(() => {
  const val = props.data[String(props.item.prop)];
  let opts = exOptions[String(props.item.prop)] || props.item.groupFormConfig;
  const types = typeof val;
  if (types == "string") {
    opts = opts.map(item => {
      return {
        label: item?.languageLabel?.[globalState.getLanguage || "zh-CN"] || item.label,
        value: String(item.value)
      };
    });
  } else if (types == "number") {
    opts = opts.map(item => {
      return {
        label: item?.languageLabel?.[globalState.getLanguage || "zh-CN"] || item.label,
        value: Number(item.value)
      };
    });
  }

  return opts;
});

function changeRadio() {
  const inRules = cloneDeep(props.baseRulesMap);

  const radioVal = props.data[String(props.item.prop)];
  const { groupFormConfig } = props.item;
  if (!groupFormConfig) return;
  for (let index = 0; index < groupFormConfig.length; index++) {
    const item = groupFormConfig[index];
    if (item.value != radioVal) {
      if (inRules["default"]?.[String(item.prop)]) delete inRules["default"][String(item.prop)];
    }
  }

  emits("changeRules", inRules);
}

// #Function 查找数据
function findData(data) {
  if (!props.item.prop) return "--";

  let text = "";
  const options = radioOptions.value;
  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    if (option.value == data) {
      text += option.label;
    }
  }
  return text || "--";
  // const prop = Array.isArray(props.item.prop) ? props.item.prop.join("-") : props.item.prop;
  // const groupFormConfig = exOptions.value[prop] || props.item.groupFormConfig;
  // if (!prop || data == undefined || !groupFormConfig) {
  //   return;
  // }
  // let text = "";
  // for (let index = 0; index < groupFormConfig.length; index++) {
  //   const option = groupFormConfig[index];
  //   if (option.value == data) {
  //     text += option.label;
  //   }
  // }
  // return text || "--";
}

function isEqualFind(val1, val2) {
  if (!isEqual(val1, val2)) return true;
  const { groupFormConfig } = props.item;
  if (!groupFormConfig || isNil(props.contrastData)) return false;
  let isT = false;
  for (let index = 0; index < groupFormConfig.length; index++) {
    const item = groupFormConfig[index];
    const _prop = String(item.prop);
    isT = !isEqual(props.data[_prop], props.contrastData[_prop]);
  }
  return isT;
}

watch(() => props.data[String(props.item.prop)], changeRadio, { immediate: true });

// function findData2(data) {
//   const prop = props.item.prop;
//   if (!prop) {
//     return;
//   }
//   let text = "";
//   const options = radioOptions.value;
//   for (let index = 0; index < options.length; index++) {
//     const option = options[index];
//     if (option.value == data) {
//       if (text == "") text += props.item.label + ":";
//       text += option.label;
//     }
//   }
//   return text || "--";
// }
</script>
<style lang="scss" scoped>
.flex-col {
  width: 100%;
}
</style>
