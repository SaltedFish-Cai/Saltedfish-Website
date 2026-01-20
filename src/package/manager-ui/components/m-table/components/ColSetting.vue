<template>
  <!-- 表配置 -->
  <el-drawer
    :title="languagePackage?.['colSetting'] || ''"
    v-model="drawerVisible"
    size="800px"
    @close="handleCloseDrawer"
    append-to-body
    :class="'m-drawer'"
  >
    <section :id="'table-col-' + id" class="flex-col table-main" style="height: 100%">
      <div style="height: 1px; flex: 1">
        <el-table
          :data="settingColumnsData"
          :border="true"
          row-key="prop"
          default-expand-all
          :tree-props="{ children: 'childrenColumn' }"
        >
          <!-- 列名 -->
          <el-table-column prop="label" align="left" :label="languagePackage?.['col']" width="250">
            <template #header><m-icon class="mr5" name="flag_line"></m-icon>{{ languagePackage?.["col"] }}</template>
            <template #default="{ row }">
              <div v-if="!row.fixed && row.isShow" class="flex-center drag-el">
                <m-icon name="selector_vertical" style="font-size: 22px; width: 14px; transform: translateX(-3px)" />
                <template v-if="props.useHtmlTitle">
                  <div class="flex1" v-html="row.label"></div>
                </template>
                <div v-else class="flex1">{{ row.label }}</div>
              </div>
              <template v-else>
                <template v-if="props.useHtmlTitle">
                  <div class="flex1" v-html="row.label"></div>
                </template>
                <div v-else class="flex1">{{ row.label }}</div>
              </template>
            </template>
          </el-table-column>

          <!-- 条件 -->
          <el-table-column prop="searchCriteria" align="center" label="条件">
            <template #header><m-icon class="mr5" name="type_line"></m-icon>{{ languagePackage?.["filter"] }}</template>
            <template #default="scope">
              <!-- 筛选 -->
              <el-select
                v-if="isSelectType(scope.row, display)"
                v-model="scope.row.searchCriteria"
                :placeholder="languagePackage?.['selectPlaceholder']"
                multiple
                clearable
                :size="size"
              >
                <!-- <template #prefix><m-icon class="mr5" name="filter_line"></m-icon></template> -->
                <el-option
                  v-for="item in _exOptions[scope.row.prop]"
                  :key="item.label + item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>

              <!-- 时间 -->
              <div v-else-if="isTimeType(scope.row, display)" class="flex-center my-date-picker">
                <el-date-picker
                  v-model="scope.row.searchCriteria[0]"
                  type="date"
                  :placeholder="languagePackage?.['startTime']"
                  :prefix-icon="timeIcon"
                  value-format="YYYY-MM-DD"
                  :size="size"
                  :shortcuts="shortcuts"
                  :disabled-date="time => disabledStart(time, scope.row.searchCriteria[1], scope.row)"
                />
                <div class="ml5 mr5">/</div>
                <el-date-picker
                  v-model="scope.row.searchCriteria[1]"
                  type="date"
                  :placeholder="languagePackage?.['endTime']"
                  :prefix-icon="timeIcon"
                  value-format="YYYY-MM-DD"
                  :size="size"
                  :shortcuts="shortcuts"
                  :disabled-date="time => disabledEnd(time, scope.row.searchCriteria[0], scope.row)"
                />
              </div>

              <!-- 搜索 -->
              <template
                v-else-if="
                  (scope.row.useFilter != false && isInputType(scope.row, display)) ||
                  (scope.row.useFilter != false && !scope.row.cellConfig)
                "
              >
                <m-number
                  v-if="isNumberType(scope.row, display)"
                  v-model="scope.row.searchCriteria"
                  :placeholder="scope.row?.cellConfig.placeholder"
                  :disabled="scope.row?.cellConfig.disabled"
                  :display="false"
                  :min="scope.row?.cellConfig.min"
                  :max="scope.row?.cellConfig.max"
                  :precision="scope.row?.cellConfig.precision"
                  :controls="true"
                  :controlsPosition="scope.row?.cellConfig.controlsPosition"
                  :valueOnClear="scope.row?.cellConfig.clearOnValue || scope.row?.cellConfig.valueOnClear"
                  :step="scope.row?.cellConfig.step"
                  :stepStrictly="scope.row?.cellConfig.stepStrictly"
                  :size="scope.row?.cellConfig.size"
                  :contrastData="scope.row?.cellConfig.contrastData"
                  :alwaysContrast="scope.row?.cellConfig.alwaysContrast"
                ></m-number>
                <template v-else>
                  <el-input v-model="scope.row.searchCriteria" :placeholder="languagePackage?.['inputPlaceholder']" :size="size">
                    <!-- <template #prefix><m-icon class="mr5" name="search_line"></m-icon></template> -->
                  </el-input>
                  <!-- !scope.row.useSenior -->
                  <m-button v-if="false" style="width: 100%" is="edit" @click="openSeniorFilter(scope.row)">
                    {{ languagePackage?.["editAdvancedSearch"] }}
                  </m-button>
                </template>
              </template>

              <template v-else> {{ languagePackage?.["noFilter"] }} </template>
            </template>
          </el-table-column>

          <!-- 排序 -->
          <!-- <el-table-column prop="sortable" align="center" label="排序">
            <template #header><m-icon class="mr5" name="switch_vertical_line"></m-icon>排序</template>
            <template #default="scope">
              <el-switch v-model="scope.row.sortable"></el-switch>
            </template>
          </el-table-column> -->

          <!-- 固定 -->
          <el-table-column prop="fixed" align="center" :label="languagePackage?.['fixedState']" width="100">
            <template #header><m-icon class="mr5" name="pin_line"></m-icon>{{ languagePackage?.["fixedState"] }}</template>
            <template #default="scope">
              <div
                :class="['change_btn', scope.row.fixed == undefined ? '' : 'icon_highlight']"
                @click="changeFixed(scope.row)"
                :title="languagePackage?.['clickChangeFixedState']"
              >
                <m-icon name="pin_line" :class="['mr5']" />
                <span>{{ setFixed(scope.row) }}</span>
              </div>
            </template>
          </el-table-column>

          <!-- 显示 -->
          <el-table-column prop="isShow" align="center" :label="languagePackage?.['visibleState']" width="100">
            <template #header><m-icon class="mr5" name="eye_line"></m-icon>{{ languagePackage?.["visibleState"] }}</template>
            <template #default="scope">
              <div
                :class="['change_btn', scope.row.isShow ? '' : 'icon_highlight--hide']"
                @click="setView(scope.row)"
                :title="languagePackage?.['clickChangeVisibleState']"
              >
                <m-icon class="mr5" :name="scope.row.isShow ? 'eye_line' : 'eye_close_line'"></m-icon>
                <span>{{ scope.row.isShow ? languagePackage?.["visible"] : languagePackage?.["hide"] }}</span>
              </div>
            </template>
          </el-table-column>

          <!-- 空 -->
          <template #empty>
            <div class="table-empty">
              <m-icon class="empty-icon" name="world_line"></m-icon>
              <div>{{ languagePackage?.["noCol"] }}</div>
            </div>
          </template>
        </el-table>
      </div>
    </section>
    <template #footer>
      <div class="flex-center">
        <m-button plain type="primary" font="save_line" @click="FetchSaveAndFilter"> {{ languagePackage?.["save"] }} </m-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="ColSetting">
// # Import
import { ref, computed, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import { format } from "../utils";
import { isSelectType, isTimeType, isInputType, isNumberType } from "../hooks/isType";

import timeIcon from "./Icon.vue";
import MNumber from "../../m-number/m-number.vue";

import { SettingPropsType, MTableItemType } from "../type";

// # Var
const drawerVisible = ref<boolean>(false);
const emit = defineEmits(["saveAndFilter", "closeDrawer", "openSeniorFilter", "handleChangeDragEl", "handleChangeDragSort"]);
const props = withDefaults(defineProps<SettingPropsType>(), {
  exOptions: {}
});

const settingColumnsData = computed(() => props.settingColumns);

const shortcuts = [
  {
    text: props.languagePackage?.["today"],
    value: new Date()
  },
  {
    text: props.languagePackage?.["yesterday"],
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    }
  },
  {
    text: props.languagePackage?.["aWeekAgo"],
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    }
  }
];

// #Computed
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
        value: item.activeValue || "true"
      });
      _outData[key].push({
        label: item.inActiveText || "off",
        value: item.inActiveValue || "false"
      });
    }
  }
  return _outData;
});

// #Function 配置初始化开始时间
function disabledStart(time: Date, endTime: Date, row) {
  const _time = format(time.toString(), "yyyy-MM-dd") + " 00:00:00";
  const _now = format(new Date().toString(), "yyyy-MM-dd") + " 00:00:00";
  const _startTime = format(endTime?.toString(), "yyyy-MM-dd") + " 23:59:59";

  if (row?.cellConfig?.useStartLimit) {
    return new Date(_time).getTime() >= new Date(_startTime).getTime() || new Date(_time).getTime() > new Date(_now).getTime();
  } else {
    return new Date(_time).getTime() >= new Date(_startTime).getTime();
  }
}

// #Function 配置初始化结束时间
function disabledEnd(time: Date, startTime: Date, row) {
  const _time = format(time.toString(), "yyyy-MM-dd") + " 23:59:59";
  const _now = format(new Date().toString(), "yyyy-MM-dd") + " 23:59:59";
  const _startTime = format(startTime?.toString(), "yyyy-MM-dd") + " 00:00:00";

  if (row?.cellConfig?.useEndLimit) {
    return new Date(_time).getTime() <= new Date(_startTime).getTime() || new Date(_time).getTime() > new Date(_now).getTime();
  } else {
    return new Date(_time).getTime() <= new Date(_startTime).getTime();
  }
}

// #Function Dialog关闭
function handleCloseDrawer() {
  emit("handleChangeDragEl", "table");
  emit("closeDrawer", { Col: settingColumnsData.value });
}

// #Function 保存并搜索
function FetchSaveAndFilter() {
  const array = settingColumnsData.value;
  const Filter: { fieldLabel?: string; fieldName: string; conditionalType: 0 | 1 | 3 | 5 | 6; fieldValue: string }[] = [];
  for (let index = 0; index < array.length; index++) {
    const element: MTableItemType & { searchCriteria?: any } = array[index];
    if (element.isShow && isTimeType(element, true) && element.prop && !!element.searchCriteria[0]) {
      Filter.push({
        fieldLabel: element.label + `-${props.languagePackage?.["start"]}`,
        fieldName: element.prop,
        conditionalType: 3,
        fieldValue: element.searchCriteria[0] + " 00:00:00"
      });
    }
    if (element.isShow && isTimeType(element, true) && element.prop && !!element.searchCriteria[1]) {
      Filter.push({
        fieldLabel: element.label + `-${props.languagePackage?.["end"]}`,
        fieldName: element.prop,
        conditionalType: 5,
        fieldValue: element.searchCriteria[1] + " 23:59:59"
      });
    }

    if (
      element.isShow &&
      element?.filterType == "time" &&
      element.searchCriteria[0] &&
      element.searchCriteria[1] &&
      element.searchCriteria[0] > element.searchCriteria[1]
    ) {
      return ElMessage.error(element.label + ` ${props.languagePackage?.["errorMessage"]}`);
    }

    if (!isTimeType(element, true)) {
      const fieldValue = isSelectType(element, true)
        ? element.searchCriteria.join(",")
        : isNumberType(element, true)
        ? element.searchCriteria
        : String(element.searchCriteria).trim();

      if (element.isShow && element.prop && !!fieldValue) {
        Filter.push({
          fieldLabel: element.label,
          fieldName: element.prop,
          conditionalType: isSelectType(element, true) ? 6 : isNumberType(element, true) ? 0 : 1,
          fieldValue
        });
      }
    }
  }

  emit("saveAndFilter", { Filter, Col: settingColumnsData.value });
  changeColSetting(false);
}

// #Function 设置固定状态显示值
function setFixed(row: { fixed: "left" | "right" | undefined }) {
  let text = props.languagePackage?.["fixedNone"];
  switch (row.fixed) {
    case "left":
      text = props.languagePackage?.["fixedLeft"];
      break;
    case "right":
      text = props.languagePackage?.["fixedRight"];
      break;
  }
  return text;
}

// #Function 设置固定状态
function changeFixed(row: { fixed: "left" | "right" | undefined }) {
  row.fixed = row.fixed == "left" ? "right" : row.fixed == "right" ? undefined : "left";
  reSetSort();
}

// #Function 设置是否显示
function setView(row: { isShow: boolean }) {
  row.isShow = !row.isShow;
  reSetSort();
}

// #Function 更新排序
function reSetSort() {
  const ColumnsData = settingColumnsData.value;
  const showArr = ColumnsData.filter(item => item.isShow);
  const LeftArr = showArr.filter(item => item.fixed == "left");
  const RightArr = showArr.filter(item => item.fixed == "right");
  const defaultArr = showArr.filter(item => item.fixed != "left" && item.fixed != "right");
  const hideArr = ColumnsData.filter(item => !item.isShow);
  emit("handleChangeDragSort", [...LeftArr, ...defaultArr, ...RightArr, ...hideArr]);
}

// #Function 打开高级搜索
function openSeniorFilter(item: objectType) {
  emit("openSeniorFilter", item);
}

// # Expose 打开表配置
function changeColSetting(value: boolean) {
  emit("handleChangeDragEl", "col");
  drawerVisible.value = value;
}

defineExpose({
  changeColSetting
});
</script>

<style scoped lang="scss">
.empty-icon {
  font-size: 30px;
}
.cursor-move {
  cursor: move;
}
.change_btn {
  cursor: pointer;
  &:hover {
    font-weight: bold;
    color: var(--el-color-primary);
    cursor: pointer;
  }
}
.icon_highlight {
  font-weight: bold;
  color: var(--el-color-primary);
}
.icon_highlight--show {
  color: var(--el-color-primary);
}
.icon_highlight--hide {
  color: var(--el-color-warning);
}
</style>

<style lang="scss">
.my-date-picker {
  .el-input__prefix {
    display: none;
  }
}
</style>
