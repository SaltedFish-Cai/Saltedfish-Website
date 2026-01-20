<template>
  <m-dialog v-model="state.visible" :title="languagePackage?.['Advanced']" @closed="closeMenu" size="m">
    <section class="filter-list" style="height: calc(100% - 90px)">
      <template v-for="(groupItem, groupItemIndex) in state.advancedFilter.relationshipGroup" :key="groupItem.groupName">
        <div class="group">
          <div class="flex-center-between mb-size border-bottom">
            <div class="flex1 group__title" style="text-align: left">{{ groupItem.groupName }} {{ groupItemIndex + 1 }}</div>
            <m-button v-if="groupItemIndex > 0" is="trash" size="small" @click="FilterFn.remove(groupItemIndex)">
              {{ languagePackage?.["clenGroup"] }}
            </m-button>
          </div>
          <template v-for="(item, itemIndex) in groupItem.group" :key="propItem.prop + groupItemIndex + itemIndex">
            <el-form
              :model="item"
              :ref="el => setAllFormRef(el, propItem.prop + groupItemIndex + itemIndex)"
              :rules="item.conditionalType == 11 ? {} : rulesArr[item.key]"
            >
              <section class="filter-item flex-center-start">
                <el-select v-if="false" v-model="item.fieldName" :placeholder="languagePackage?.['selectAdvanced']">
                  <el-option v-for="opt in settingColumnsComputed" :key="opt.Value" :label="opt.label" :value="opt.prop" />
                </el-select>
                <div v-else class="filter-item_name"># {{ propItem.label }}</div>

                <div class="ml-size mr-size">
                  <m-select
                    v-model="item.conditionalType"
                    :placeholder="languagePackage?.['selectConditional']"
                    @change="value => conditionalTypeChange(value, item.key)"
                    :ex-options="
                      seniorFilterOptions.LineConditional.map(item => ({ label: item.Description, value: item.Value }))
                    "
                  ></m-select>
                </div>

                <el-form-item prop="fieldValue" style="width: 60% !important; margin-bottom: 0">
                  <m-input
                    class="mr-size"
                    style="width: 100%"
                    v-model="item.fieldValue"
                    :placeholder="languagePackage?.['inputAdvanced']"
                    :disabled="item.conditionalType == 11"
                  ></m-input>
                </el-form-item>

                <m-button
                  class="ml0"
                  is="trash"
                  style="width: 88px; flex: 0 0 88px"
                  @click="FilterFn.removeItem(groupItemIndex, itemIndex)"
                >
                  {{ languagePackage?.["del"] }}
                </m-button>
              </section>

              <div class="flex-center" v-if="itemIndex < groupItem.group.length - 1">
                <span style="font-size: var(--m-component-font-size, 13px)">{{ languagePackage?.["filterText"] }}：</span>
                <m-radio
                  v-model="groupItem.groupLinkType"
                  :ex-options="seniorFilterOptions.linkOptions.map(item => ({ label: item.Description, value: item.Value }))"
                ></m-radio>
              </div>
            </el-form>
          </template>

          <div class="flex-center mt20">
            <m-button font="add_circle_line" plain type="primary" @click="FilterFn.addFilter(groupItemIndex)">
              {{ languagePackage?.["addFilter"] }}
            </m-button>
          </div>
        </div>
        <div class="flex-center" v-if="groupItemIndex < state.advancedFilter.relationshipGroup.length - 1">
          <span style="font-size: var(--m-component-font-size, 13px)">{{ languagePackage?.["groupText"] }}：</span>
          <m-radio
            v-model="state.advancedFilter.relationshipGroupLinkType"
            :ex-options="seniorFilterOptions.linkOptions.map(item => ({ label: item.Description, value: item.Value }))"
          ></m-radio>
        </div>
      </template>
      <div class="flex-center mt-size">
        <m-button class="mb-size" font="flag_line" @click="FilterFn.addFilterGroup" plain type="primary">
          {{ languagePackage?.["addGroup"] }}
        </m-button>
      </div>
    </section>

    <template #footer>
      <div class="flex-center">
        <m-button is="search" @click="submitTabsForm">{{ languagePackage?.["endterSearch"] }}</m-button>
      </div>
    </template>
  </m-dialog>
</template>

<script lang="ts" setup>
// # Import
import { ref, reactive, watch, computed, nextTick } from "vue";
import { ElMessageBox } from "element-plus";

import { SeniorFilterPropsType } from "../type";

// # Var
const props = defineProps<SeniorFilterPropsType>();

const emits = defineEmits(["update:modelValue", "callback", "saveAndFilter"]);

const ruleTabsFormRef: any = ref([]);
const ruleTabsFormRefKeys: any = [];
const setAllFormRef = (ref: any, name: string) => {
  if (ruleTabsFormRefKeys.indexOf(name) == -1) {
    ruleTabsFormRef.value.push(ref);
    ruleTabsFormRefKeys.push(name);
  }
};
const rulesArr = ref({} as objectType);
const rules = {
  fieldValue: [{ required: true, message: props.languagePackage?.["inputAdvanced"], trigger: "change" }]
};
const state = reactive({
  visible: false,

  advancedFilter: {
    fieldName: "",
    relationshipGroupLinkType: "1",
    relationshipGroup: [] as objectType[]
  }
});

// #Computed 过滤Filter类型
const settingColumnsComputed = computed(() => {
  return props.settingColumns.filter(item => {
    const filterType = item.filterType || "input";
    return item.isShow && filterType == "input";
  });
});

// #Function 选择关系类型回调
function conditionalTypeChange(value, key) {
  if (value == 11) {
    rulesArr.value[key] = [];
  } else {
    rulesArr.value[key] = rules;
  }
  const _ruleTabsFormRef: any = ruleTabsFormRef.value;
  for (let index = 0; index < _ruleTabsFormRef.length; index++) {
    const element = _ruleTabsFormRef[index];
    element.clearValidate();
  }
}

const FilterFn = {
  // #Function 添加组
  addFilterGroup() {
    const key = Number(new Date());
    const upData = {
      groupName: props.languagePackage?.["group"],
      group: [{ fieldValue: "", conditionalType: "0", key }],
      groupLinkType: "1"
    };
    state.advancedFilter.relationshipGroup.push(upData);
    rulesArr.value[key] = rules;
    // state.ItemList.push({ fieldName: props.propItem.prop, fieldValue: "", LinkNextType: "0", conditionalType: "0" });
  },

  // #Function 提交搜索条件
  addFilter(index: number) {
    const key = Number(new Date());
    state.advancedFilter.relationshipGroup[index].group.push({
      fieldValue: "",
      conditionalType: "0",
      key
    });
    rulesArr.value[key] = rules;
  },

  // #Function 删除组
  remove(pIndex: number, tip = true) {
    if (tip) {
      ElMessageBox.confirm(props.languagePackage["isDelGroup"], props.languagePackage["tip"], {
        type: "error",
        confirmButtonText: props.languagePackage["enterDel"]
      }).then(() => {
        state.advancedFilter.relationshipGroup.splice(pIndex, 1);
      });
    } else {
      state.advancedFilter.relationshipGroup.splice(pIndex, 1);
    }
  },

  // #Function 删除搜索条件
  removeItem(pIndex: number, index: number) {
    const item = state.advancedFilter.relationshipGroup[pIndex].group[index];
    delete rulesArr.value[item.key];

    state.advancedFilter.relationshipGroup[pIndex].group.splice(index, 1);
    if (!state.advancedFilter.relationshipGroup[pIndex].group.length) {
      FilterFn.remove(pIndex, false);
    }
  }
};

// #Function 暴露表单校验方法
async function submitTabsForm() {
  const _ruleTabsFormRef: any = ruleTabsFormRef.value;
  if (_ruleTabsFormRef.length == 0) {
    return undefined;
  }
  let formResult = true;
  for (let index = 0; index < _ruleTabsFormRef.length; index++) {
    const element = _ruleTabsFormRef[index];
    if (!element) formResult = false;
    else {
      await element?.validate((valid: boolean) => {
        if (!valid) formResult = false;
      });
    }
  }
  if (!formResult) return;
  state.advancedFilter.fieldName = props.propItem.prop;

  for (let index = 0; index < state.advancedFilter.relationshipGroup.length; index++) {
    const _item = state.advancedFilter.relationshipGroup[index];
    for (let index = 0; index < _item.group.length; index++) {
      const its = _item.group[index];
      if (its.conditionalType == 11) its.fieldValue = "";
    }
  }

  const _advancedFilter = {
    ...state.advancedFilter,
    label: props.propItem.label,
    props: props.propItem.prop
  };
  state.advancedFilter = {
    fieldName: "",
    relationshipGroupLinkType: "0",
    relationshipGroup: [] as objectType[]
  };
  emits("saveAndFilter", { AdvancedFilter: _advancedFilter });
  emits("update:modelValue", false);
}

// #Function 窗口关闭回调
function closeMenu() {
  emits("update:modelValue", false);
  nextTick(() => {
    ruleTabsFormRef.value.length = 0;
    ruleTabsFormRefKeys.length = 0;
  });
}

// #Watch modelValue
watch(
  () => props.modelValue,
  visible => {
    state.visible = visible;

    if (visible) {
      const { AdvancedFilter } = props.tableQuery;
      const propItem = props.propItem;
      const item = AdvancedFilter.find(item => item.fieldName == propItem.prop);
      if (!item) {
        FilterFn.addFilterGroup();
      } else {
        for (let index = 0; index < item.relationshipGroup.length; index++) {
          const _item = item.relationshipGroup[index];
          for (let index = 0; index < _item.group.length; index++) {
            const its = _item.group[index];
            rulesArr.value[its.key] = its.conditionalType == 11 ? [] : rules;
          }
        }
        state.advancedFilter = item;
      }
    } else {
      state.advancedFilter = {
        fieldName: "",
        relationshipGroupLinkType: "0",
        relationshipGroup: [] as objectType[]
      };
      rulesArr.value = {};
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.filter-list {
  padding: var(--m-component-padding-size, 10px) 0;
  .group {
    box-sizing: border-box;
    padding: var(--m-component-padding-size, 10px);
    overflow-x: hidden;
    background-color: var(--el-bg-color);
    background-color: var(--el-bg-color-page);
    border: 1px solid var(--el-border-color-light);
    border-radius: 3px;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
    .group__title {
      position: relative;
      height: 1.7em;
      line-height: 1.7em;
      padding-left: 12px;
      font-size: calc(var(--m-component-font-size, 13px) + 1px);
      color: var(--el-color-primary);
      &::before {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        display: block;
        width: 4px;
        height: 15px;
        content: "";
        background-color: var(--el-color-primary);
      }
    }
  }
  .filter-item {
    margin-bottom: var(--m-component-padding-size, 10px);
    color: var(--el-menu-text-color);
    .filter-item_name {
      width: 210px;
      font-size: var(--m-component-font-size, 13px);
      font-weight: bold;
      color: var(--el-text-color-regular);
    }
  }
}
</style>
