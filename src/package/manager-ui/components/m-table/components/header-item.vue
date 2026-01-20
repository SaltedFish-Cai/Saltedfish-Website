<template>
  <el-table-column v-bind="item" min-width="200" :width="item.width ?? 'auto'" :align="item.align ?? 'left'">
    <template #header>
      <div class="cell_header flex-center-between">
        <span class="no-click">
          <slot :name="item.prop + 'Header'">
            <span class="cell_text drag-el">
              <span
                :class="[
                  'find-class-' + item.prop,
                  item?.cellConfig?.required && !item?.cellConfig?.display ? 'is_required' : ''
                ]"
                >{{ item.label }}</span
              >
            </span>
          </slot>
          <span class="cell_text_after"></span>
        </span>

        <!-- 排序 -->
        <div v-if="item.useSort != false" class="flex-center-between flex1 cell_header_setting">
          <div
            v-if="item.useSort != false"
            :class="[
              props.orderProp == item.prop && orderString != null
                ? 'flex-col table-order-box order-box-act'
                : 'flex-col table-order-box'
            ]"
            @click="handleTableOrder(item)"
          >
            <m-icon
              :class="[
                props.orderProp == item.prop && orderString == 'ascending'
                  ? 'order-icon flex-center order-act'
                  : 'order-icon flex-center'
              ]"
              name="up_small_fill"
            />
            <m-icon
              :class="[
                props.orderProp == item.prop && orderString == 'descending'
                  ? 'order-icon flex-center order-act'
                  : 'order-icon flex-center'
              ]"
              name="down_small"
            />
          </div>
        </div>

        <Filter
          v-if="item.useFilter != false"
          :id="props.id"
          ref="columnFilter"
          :item="item"
          :data="filterValue"
          :exOptions="props.exOptions"
          :size="props.size"
          @handle-remove-query="handleRemoveQuery"
          @open-senior-filter="openSeniorFilter"
          @save-and-filter="saveAndFilter"
        >
          <div :class="[setIconAction(item.prop) ? 'table-filter-box filter-box-act' : 'table-filter-box']">
            <m-icon
              :class="[setIconAction(item.prop) ? 'filter-icon flex-center filter-act' : 'filter-icon flex-center']"
              name="filter"
            />
          </div>
          <template v-for="slot in Object.keys($slots).filter(item => item != 'default')" #[slot]="scope">
            <template v-if="slot.indexOf('header-option-') > -1 || slot.indexOf('header-tag-') > -1">
              <slot :name="slot" :row="scope"></slot>
            </template>
          </template>
          <template #exBtn v-if="isUseCellConfig(item)">
            <div class="flex-center">
              <m-button class="mt-size" font="mortarboard_line" @click="openSeniorFilter(item)" link> 使用高级搜索 </m-button>
            </div>
          </template>
        </Filter>
      </div>
    </template>

    <template #default="{ row }">
      <slot :row="row"></slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts" name="headerItem">
// # Import
import { ref, Ref, watch } from "vue";
import Filter from "./TableColumnFilter.vue";

import { isSelectType, isUseCellConfig, isTimeType } from "../hooks/isType";
import { HeaderItemType } from "../type";

// # Var
const props = withDefaults(defineProps<HeaderItemType>(), {});

const emits = defineEmits(["handleSortChange", "saveAndFilter", "handleCellClick", "handleRemoveQuery", "openSeniorFilter"]);

const orderString: Ref<"ascending" | "descending" | null> = ref(null);
const filterValue = ref({} as objectType);
const columnFilter = ref();
let filterData = [] as objectType[];

// #Function 点击表格排序
function handleTableOrder(state: objectType) {
  switch (orderString.value) {
    case null:
      orderString.value = "ascending";
      break;
    case "ascending":
      orderString.value = "descending";
      break;
    default:
      orderString.value = null;
      break;
  }
  const upData = { prop: state.prop, order: orderString.value };
  emits("handleSortChange", upData);
}

// #Function 设置筛选打开icon的颜色状态
function setIconAction(prop) {
  const { AdvancedFilter } = props.tableQuery;
  const index = AdvancedFilter.findIndex(item => item.fieldName == prop);
  if (index > -1) {
    return true;
  } else {
    return filterValue.value?.fieldName == prop && String(filterValue.value.fieldValue)?.length;
  }
}

// #Function 删除筛选框数据时,同步删除相关数据
function handleRemoveQuery(scope) {
  emits("handleRemoveQuery", scope, "column");
}

// #Function 打开高级搜索
function openSeniorFilter(item: objectType) {
  columnFilter.value?.setListenClick("clean");
  emits("openSeniorFilter", item);
}

// #Function 提交筛选
function saveAndFilter(data) {
  const prop = props.item.prop;
  let _filterData = filterData?.filter(item => item.fieldName != prop);
  _filterData = [..._filterData, ...data];
  emits("saveAndFilter", { Filter: _filterData });
}

// #Watch 排序
watch(
  () => props.orderProp,
  (value: string) => {
    if (props.item.prop != value && orderString.value != null) orderString.value = null;
  },
  { immediate: true }
);

// #Watch Filter值
watch(
  () => props.tableQuery.Filter,
  (value: objectType[]) => {
    filterData = value;
    const prop = props.item.prop;
    if (isTimeType(props.item, true)) {
      const findItemArr = value?.filter(item => item.fieldName == prop);
      const arr = [] as string[];
      for (let index = 0; index < findItemArr.length; index++) {
        const item = findItemArr[index];
        arr[item.conditionalType == 3 ? 0 : 1] = item.fieldValue.split(" ")[0];
      }
      filterValue.value = {
        ...findItemArr[0],
        fieldValue: arr
      };
    } else {
      const findItem = value?.find(item => item.fieldName == prop);
      if (findItem && findItem.fieldValue && String(findItem.fieldValue)?.length) {
        filterValue.value = {
          ...findItem,
          fieldValue: isSelectType(props.item, true) ? findItem.fieldValue.split(",") : findItem.fieldValue
        };
      } else {
        filterValue.value = {};
      }
    }
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss">
%table-order-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 100%;
  padding: 2px 0;
  transition: var(--m-component-animation, 0.3s);
  &:hover {
    background-color: var(--el-table-row-hover-bg-color) !important;
  }
  .order-icon {
    display: flex !important;
    width: 18px;
    height: 7px;
    font-size: calc(var(--m-component-font-size, 13px) + 8px);
    color: var(--el-text-color-disabled);
  }
  .order-act {
    color: var(--el-color-primary);
  }
}
.order-box-act {
  // background-color: var(--el-color-primary-light-9);
}
.table-order-box {
  @extend %table-order-box;
}
.table-filter-box {
  @extend %table-order-box;
  .filter-icon {
    display: flex !important;
    width: inherit;
    height: 100%;
    font-size: calc(var(--m-component-font-size, 13px) + 1px);
    color: var(--el-text-color-disabled);
  }
  .filter-act {
    color: var(--el-color-primary);
  }
}
.filter-box-act {
  // background-color: var(--el-color-primary-light-9);
}
.no-click {
  overflow: hidden;
  color: var(--el-text-color-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.6em;
  display: flex;
  align-items: center;
}
.cell_header {
  width: 100%;
  height: 100%;
  .cell_header_setting {
    height: 100%;
  }
  .is_required {
    &::before {
      margin-right: 4px;
      color: var(--el-color-danger);
      content: "*";
    }
  }
}
.el-tooltip__trigger:has(.table-filter-box) {
  height: 100%;
}
.body_cell_text {
  width: 99.5% !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--el-font-base-size-default) !important;
  .body_cell_text-rel {
    display: inline;
  }
}
.body_cell_text-copy {
  &:hover {
    color: var(--el-color-primary);
    cursor: pointer;
  }
}
</style>
