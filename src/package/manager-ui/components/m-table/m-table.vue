<template>
  <div
    :id="'m-table_' + id"
    class="m-table-styles m-table-use-scroll-top"
    :class="[
      createSize == 'small' ? 'm-table-styles_small' : createSize == 'large' ? 'm-table-styles_large' : '',
      _showOverflowTooltip ? '' : 'un-use-tooltip',
      useSticky ? 'use-sticky' : 'no-sticky',
      isPrint ? 'print-mode' : ''
    ]"
    :style="{ ...props.style }"
    v-if="initialization == 1"
  >
    <img class="m-table-styles_load" src="../imgs/load.png" @load="createObserver" />
    <!-- 查询表单 -->
    <SearchForm
      v-if="false"
      :id="id"
      :search="searchAction"
      :searchReset="searchReset"
      :search-param="searchParam"
      :columns="searchColumns"
      :search-span="searchSpan"
      v-show="isShowSearch"
      :flat="flat"
    />
    <!-- 表格内容 -->
    <div :class="['table-main', flat ? '' : 'use-card-style']">
      <!-- 表格头部 操作按钮 -->
      <div
        v-if="
          showToolButton || $slots['HeaderLeft'] || $slots['HeaderCenter'] || $slots['ToolButton'] || $slots['ToolButtonInline']
        "
        class="table-flex table-flex-header"
      >
        <div class="table-flex-lf" :class="[$slots['HeaderLeft'] ? 'table-flex-lf_bottom' : '']">
          <slot name="HeaderLeft" :selectedListIds="selectedListIds" :selectedList="selectedList" />
        </div>
        <div class="table-flex-ct">
          <slot name="HeaderCenter" :selectedListIds="selectedListIds" :selectedList="selectedList" />
        </div>
        <div :class="[embeddedToolButton ? 'table-flex-ri-embedded' : 'table-flex-ri']" v-if="showToolButton">
          <slot name="ToolButton">
            <div class="flex-center-end">
              <slot name="ToolButtonInline"></slot>

              <m-button v-if="props.exportApi" is="export" @click="props.exportApi"> {{ languagePackage["export"] }} </m-button>
              <m-button font="reset_line" type="default" @click="getTableList()">{{ languagePackage["refresh"] }} </m-button>
              <m-button font="filter_line" :plain="false" type="primary" @click="changeColSetting(true)"
                >{{ languagePackage["filter"] }}
              </m-button>
            </div>
          </slot>
        </div>
      </div>
      <slot name="HeaderAfter" />

      <!-- 普通搜索结果展示 -->
      <section v-if="Query.length" class="flex mb-size table-query">
        <div class="table-title-label mr-size">{{ languagePackage["searchFilter"] }} :</div>
        <div class="mr-size query_item" v-for="(item, index) in Query" :key="item.label + item.value">
          <span class="icon_highlight mr5">#{{ index + 1 }}</span>
          <span>{{ item.label }} :</span>

          <template
            v-for="(relationshipItem, relationshipIndex) in item.relationshipGroup"
            :key="'relationshipItem' + relationshipIndex"
          >
            <!-- :style="{
                backgroundColor: relationshipItem?.tagStyle?.bgColor,
                color:
                  relationshipItem?.tagStyle?.bgColor && isDarkColor(relationshipItem?.tagStyle?.bgColor) ? '#fff' : '#818181'
              }" -->
            <span
              class="flex-center query_item_box query_item_box2"
              :style="{
                backgroundColor: 'var(--el-color-primary-light-8)',
                color: '#818181'
              }"
            >
              <div :title="relationshipItem.value">
                {{ relationshipItem.value }}
              </div>
              <m-icon class="ml5 hand remove-icon" name="close_circle_line" @click="handleRemoveQuery(relationshipItem)"></m-icon>
            </span>
          </template>
        </div>

        <m-button is="trash" size="small" @click="handleCleanAllQuery">{{ languagePackage["clean"] }}</m-button>
      </section>

      <!-- 高级搜索结果展示 -->
      <section v-if="AdvancedQuery.length" class="flex mb-size table-query">
        <div class="table-title-label mr-size">{{ languagePackage["Advanced"] }} :</div>
        <div class="mr-size query_item" v-for="(item, index) in AdvancedQuery" :key="item.label + item.value">
          <span class="icon_highlight mr5">#{{ index + 1 }}</span>
          <span>{{ item.label }} :</span>

          <template
            v-for="(relationshipItem, relationshipIndex) in item.relationshipGroup"
            :key="'relationshipItem' + relationshipIndex"
          >
            <span class="flex-center query_item_box">
              <template
                v-for="(groupItem, groupItemIndex) in relationshipItem.group"
                :key="groupItem.conditionalType + groupItem.value"
              >
                <span class="query_item_text flex-center">
                  <span class="query_item_text_relationship_link">
                    &lt;{{ setConditionalType(groupItem.conditionalType) }}&gt;
                  </span>
                  <span class="query_item_text_relationship_link_value">{{ groupItem.fieldValue }}</span>
                  <!-- <el-icon class="ml5 hand" @click="handleRemoveQuery(item)"><CircleClose /></el-icon> -->
                </span>

                <span class="query_item_text_group_link" v-if="groupItemIndex < relationshipItem.group.length - 1">
                  &lt;{{ setRelationshipGroupLinkType(relationshipItem.groupLinkType) }}&gt;
                </span>
              </template>
            </span>
            <span class="query_item_text_group_link" v-if="relationshipIndex < item.relationshipGroup.length - 1">
              &lt;{{ setRelationshipGroupLinkType(item.relationshipGroupLinkType) }}&gt;
            </span>
          </template>
          <m-icon class="ml5 hand remove-icon" name="close_circle_line" @click="handleRemoveSeniorQuery(item)"></m-icon>
        </div>

        <m-button is="trash" size="small" @click="handleCleanAllSeniorQuery">{{ languagePackage["clean"] }}</m-button>
      </section>

      <!-- 表格主体 -->
      <div
        class="table_body"
        v-resize:300="tableResize"
        :style="[{ zoom: tableGlobalZoom, '--m-table-scroll-y-top': scrollYTop + 'px' }]"
      >
        <div v-if="tableLoad && useTableLoading" class="loading">
          <m-icon class="loading_font" name="loading_line"></m-icon>
        </div>
        <!-- 表格主体 -->
        <el-table
          :id="id || 'default-table'"
          ref="tableRef"
          v-bind="$attrs"
          :class="!isScrollEnd ? '' : 'm-table-is-scroll-end'"
          :data="useRelData ? selectedList : tableData"
          :row-key="rowKey"
          :summary-method="getSummaries"
          :expand-row-keys="expandRowKeys"
          @select="handleChangeBack"
          @select-all="handleCellClickAll"
          @header-dragend="handleHeaderDragend"
          :show-summary="showSummary"
          :row-class-name="props.rowClassName"
          scrollbar-always-on
          @scroll="handleScroll"
          :border="true"
          :style="{ opacity: initShow ? 1 : 0 }"
        >
          <!-- :class="isSelectionColumn ? 'useSelection' : ''" -->
          <!-- @cell-click="handleCellClick" -->
          <!-- @sort-change="handleSortChange" -->

          <!-- 默认插槽 -->
          <slot></slot>
          <el-table-column
            v-if="!useSelectionTable && showTableIndex"
            type="index"
            label="#"
            :width="45"
            align="center"
            fixed="left"
          />

          <template v-for="item in tableColumns" :key="item">
            <template v-if="item.type == 'expand'">
              <el-table-column
                v-bind="{ ...item, label: String(item.label) }"
                :width="empowerWidth"
                :min-width="empowerWidth"
                fixed="left"
              >
                <template #default="scope">
                  <div
                    v-if="scope.row.useExpand !== false"
                    class="custom-expand"
                    :class="expandRowVisible[scope.$index] ? 'show-expand' : 'hide-expand'"
                    :style="{ width: empowerBodyWidth }"
                  >
                    <slot name="Expand" :row="scope.row" :index="scope.$index"></slot>
                  </div>
                </template>
              </el-table-column>
            </template>

            <!-- # -->
            <el-table-column
              v-if="item.type == 'index' && useSelectionTable"
              type="index"
              label="#"
              :width="45"
              :align="item.align ?? 'center'"
              fixed="left"
            />

            <!-- 选项 -->
            <el-table-column
              v-if="(item.type == 'selection' || item.type == 'radio') && !isTableSelectAll"
              v-bind="{ ...item, label: String(item.label) }"
              :width="45"
              :align="item.align ?? 'center'"
              :reserve-selection="item.type == 'selection' || item.type == 'radio'"
              fixed="left"
              :selectable="filterSelectRow"
            >
              <template #default="{ row }">
                <div class="flex-center" v-if="item.type == 'radio'">
                  <div
                    class="m-table-radio hand"
                    :class="[row.selected ? 'm-table-radio_action' : '']"
                    @click="handleRadioChecked(row)"
                  />
                </div>
                <div class="flex-center" v-if="row?.children?.length">
                  <el-checkbox
                    :indeterminate="row.indeterminate"
                    :model-value="row.selected"
                    @change="handleChangeChecked(row)"
                  />
                </div>
              </template>
            </el-table-column>

            <el-table-column
              :width="45"
              :align="item.align ?? 'center'"
              fixed="left"
              v-if="item.type == 'selection' && isTableSelectAll"
            >
              <template #default="{}">
                <div class="flex-center">
                  <el-checkbox disabled :checked="checkedSelectedIcon" />
                </div>
              </template>
            </el-table-column>

            <!-- Children展开全部 -->
            <el-table-column
              v-if="item.type == 'row'"
              :width="45"
              class-name="text-center"
              :reserve-selection="item.type == 'row'"
              fixed="left"
            >
              <template #header>
                <el-button
                  :icon="expandRowVisible.length ? Open : TurnOff"
                  :style="['font-size:22px', expandRowVisible.length ? 'color:var(--el-color-primary)' : '']"
                  link
                  v-if="structure.length"
                  @click="setChildrenRowKeysAll"
                />
              </template>
              <template #default="{ row }">
                <div class="flex-center">
                  <m-icon
                    v-if="row?.children?.length"
                    class="expand-icon"
                    :class="[row.childrenVisible ? 'expand-icon-action' : '']"
                    name="right_line"
                    @click="setChildrenRowKey(row)"
                  />
                </div>
              </template>
            </el-table-column>

            <!-- 向下展开 -->
            <!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
            <template v-if="item.type == 'expand'">
              <el-table-column :width="45" fixed="left">
                <template #header>
                  <el-button
                    :icon="expandRowVisible.length ? Open : TurnOff"
                    :style="['font-size:22px', expandRowVisible.length ? 'color:var(--el-color-primary)' : '']"
                    link
                    v-if="structure.length && showExpandAll"
                    @click="setExpandRowKeysAll()"
                  />
                </template>
                <template #default="scope">
                  <div class="flex-center" v-if="scope.row.useExpand !== false">
                    <m-icon
                      class="expand-icon"
                      :class="[expandRowVisible[scope.$index] ? 'expand-icon-action' : '']"
                      name="right_line"
                      @click="setExpandRowKey(scope.$index, scope.row)"
                    />
                  </div>
                </template>
              </el-table-column>
            </template>

            <!-- Cell -->
            <template v-if="item.cellConfig && item.prop && item.isShow && item.cellConfig.type != 'tag'">
              <header-item
                :id="id"
                :tableRef="tableRef"
                :orderProp="orderProp"
                :tableQuery="tableQuery"
                :item="{
                  ...item,
                  filterType: item.cellConfig.type,
                  cellConfig: { ...item.cellConfig, display: item.cellConfig.display || props.display }
                }"
                :length="tableColumns.filter(item => item.isShow).length"
                :exOptions="exOptions"
                :listeners="$"
                :size="createSize"
                @handle-sort-change="handleSortChange"
                @save-and-filter="handleColSetting"
                @handle-cell-click="handleCellClick"
                @handle-remove-query="handleRemoveQuery"
                @open-senior-filter="openSeniorFilter"
              >
                <template #default="{ row }">
                  <div class="flex-col body_cell_text" :class="'find-class-' + item.prop" style="width: 100%; padding: 3px 0">
                    <cell-input
                      v-if="item.cellConfig.type == 'input' || item.cellConfig.type == 'textarea'"
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exFormatter="exFormatter"
                      :exParser="exParser"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                    />

                    <cell-number
                      v-else-if="item.cellConfig.type == 'number'"
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                    />

                    <cell-select
                      v-else-if="item.cellConfig.type == 'select' || item.cellConfig.type == 'multiple-select'"
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                      :exOptions="exOptions"
                    >
                      <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                        <slot :name="slot" v-bind="scope"></slot>
                      </template>
                    </cell-select>

                    <!-- <cell-tag v-else-if="item.cellConfig.type == 'tag'" :item="item" :exOptions="exOptions" /> -->

                    <cell-request-select
                      v-else-if="item.cellConfig.type == 'request-select' || item.cellConfig.type == 'multiple-request-select'"
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                      :exOptions="exOptions"
                      :remoteMethod="remoteMethod"
                      :onlineSelectChange="onlineSelectChange"
                    >
                      <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                        <slot :name="slot" v-bind="scope"></slot>
                      </template>
                    </cell-request-select>

                    <cell-online-select
                      v-else-if="item.cellConfig.type == 'online-select' || item.cellConfig.type == 'multiple-online-select'"
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                      :exOptions="exOptions"
                      :remoteMethod="remoteMethod"
                      :onlineSelectChange="onlineSelectChange"
                    >
                      <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                        <slot :name="slot" v-bind="scope"></slot>
                      </template>
                    </cell-online-select>

                    <cell-switch
                      v-else-if="item.cellConfig.type == 'switch'"
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                      :exOptions="exOptions"
                    />

                    <cell-radio
                      v-else-if="item.cellConfig.type == 'radio'"
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                      :exOptions="exOptions"
                    />

                    <cell-check-box
                      v-else-if="item.cellConfig.type == 'checkbox'"
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                      :exOptions="exOptions"
                    />

                    <cell-cascader
                      v-else-if="
                        item.cellConfig.type == 'cascader' ||
                        item.cellConfig.type == 'cascader-check' ||
                        item.cellConfig.type == 'multiple-cascader-check' ||
                        item.cellConfig.type == 'multiple-cascader'
                      "
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                      :exOptions="exOptions"
                    />

                    <cell-time
                      v-else-if="
                        item.cellConfig.type == 'date-picker-group' ||
                        item.cellConfig.type == 'date-picker' ||
                        item.cellConfig.type == 'date-time-range' ||
                        item.cellConfig.type == 'month-picker-group' ||
                        item.cellConfig.type == 'month-picker' ||
                        item.cellConfig.type == 'time-picker-group' ||
                        item.cellConfig.type == 'time-picker' ||
                        item.cellConfig.type == 'year-picker'
                      "
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                    />

                    <cell-icon
                      v-else-if="item.cellConfig.type == 'select-icon'"
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, size: createSize, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                    />

                    <cell-file
                      v-else-if="item.cellConfig.type == 'file'"
                      :item="{
                        ...item,
                        cellConfig: { ...item.cellConfig, display: item.cellConfig.display || props.display }
                      }"
                      :row="row"
                      :exDisabled="exDisabled"
                      :exDisplay="exDisplay"
                      :exFileData="exFileData"
                    />
                    <div v-if="row['errorMessage']?.[item.prop]" class="element-error-message">
                      {{ row["errorMessage"][item.prop] }}
                    </div>
                  </div>
                </template>

                <template v-for="slot in Object.keys($slots)?.filter?.(item => item != 'default')" #[slot]="scope">
                  <slot :name="slot" :row="scope.row" :size="createSize"></slot>
                </template>
              </header-item>
            </template>

            <!-- other 循环递归 -->
            <TableColumn
              :id="id"
              :tableRef="tableRef"
              :orderProp="orderProp"
              :tableQuery="tableQuery"
              v-else-if="(!item.type && item.prop && item.isShow) || item.childrenColumn"
              :column="{ ...item, filterType: item.cellConfig?.type == 'tag' ? 'select' : item.filterType }"
              :length="tableColumns.filter(item => item.isShow).length"
              :exOptions="exOptions"
              :listeners="$"
              :exTargetTag="exTargetTag"
              :exTargetTagDisabled="exTargetTagDisabled"
              :size="createSize"
              :useHtmlTitle="useHtmlTitle || false"
              :operationSize="operationSize"
              :showOverflowTooltip="_showOverflowTooltip"
              @handle-sort-change="handleSortChange"
              @save-and-filter="handleColSetting"
              @handle-cell-click="handleCellClick"
              @handle-remove-query="handleRemoveQuery"
              @open-senior-filter="openSeniorFilter"
            >
              <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                <slot :name="slot" :row="scope.row" :index="scope.$index" :size="createSize"></slot>
              </template>
            </TableColumn>
          </template>

          <!-- 插入表格最后一行之后的插槽 -->
          <template #append>
            <slot name="BodyAppend"> </slot>
          </template>

          <!-- 表格无数据情况 -->
          <template #empty>
            <div class="table-empty">
              <slot v-if="requestAuto || waitLoading" name="Empty">
                <m-icon class="empty-icon" name="world_line"></m-icon>
                <div>{{ languagePackage["empyt"] }}</div>
              </slot>
              <slot v-else>
                <div class="m-loading m-loading_small"><m-icon class="loading_font" name="loading_line"></m-icon></div>
              </slot>
            </div>
          </template>
        </el-table>
      </div>

      <!-- 分页组件 -->
      <div
        v-if="showPagination || $slots['FooterCenter']"
        class="table-flex table-flex-footer"
        :style="{ height: $slots['FooterCenter'] ? '24px' : '' }"
      >
        <div class="table-flex-lf">
          <slot name="FooterLeft">
            <div class="is-selected" v-if="isSelectionColumn">
              <div class="flex-center">
                <el-button
                  class="mr-size"
                  v-if="props.showSelectAll"
                  type="primary"
                  size="small"
                  plain
                  @click="handleSelectAllOrCancel"
                >
                  {{ !isTableSelectAll ? languagePackage["selectAll"] : languagePackage["selectInvert"] }}
                </el-button>
                <div class="flex-center">
                  <el-button
                    class="mr-size"
                    size="small"
                    plain
                    v-if="!isTableSelectAll && !isExpand && !isChildren"
                    @click="useRelData = !useRelData"
                  >
                    {{ useRelData ? languagePackage["switchSelect"] : languagePackage["switchInvert"] }}
                  </el-button>
                  <span v-if="!isTableSelectAll">
                    {{ languagePackage["selected"] }} <span class="bold-text ml3 mr3">{{ selectedList.length }}</span>
                    {{ languagePackage["piece"] }}
                  </span>
                  <span v-else>
                    <span v-if="checkedSelectedIcon">
                      {{ languagePackage["selected"] }}
                      <span class="bold-text ml3 mr3">{{ isTableSelectAll ? pageable.total : selectedList.length }}</span>
                      {{ languagePackage["piece"] }}
                    </span>
                    <span v-else>
                      {{ languagePackage["selected"] }} <span class="bold-text ml3 mr3">{{ languagePackage["all"] }}</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div v-else></div>
          </slot>
        </div>

        <div v-if="$slots['FooterCenter']" class="table-flex-ct flex-center">
          <slot name="FooterCenter" :selectedListIds="selectedListIds" :selectedList="selectedList"></slot>
        </div>
        <div class="table-flex-ri width-int">
          <div>
            <slot name="paginationLeft"></slot>
          </div>

          <slot name="Pagination">
            <Pagination
              v-if="showPagination"
              :pageable="pageable"
              :exPagination="exPagination"
              :handle-size-change="handleSizeChange"
              :handle-current-change="handleCurrentChange"
              :useFooterCenter="useFooterCenter"
            />
          </slot>
        </div>
      </div>
    </div>

    <!-- 表配置 -->
    <ColSetting
      v-if="showToolButton"
      ref="colRef"
      v-model:settingColumns="settingColumns"
      :id="props.id"
      :exOptions="exOptions"
      :size="createSize"
      :display="props.display"
      :useHtmlTitle="useHtmlTitle || false"
      :languagePackage="languagePackage"
      @save-and-filter="handleColSetting"
      @close-drawer="handleCloseDrawer"
      @open-senior-filter="openSeniorFilter"
      @handle-change-drag-el="handleChangeDragEl"
      @handle-change-drag-sort="handleChangeDragSort"
    />

    <!-- 高级搜索 -->
    <SeniorFilter
      ref="seniorRef"
      v-model="seniorFilterData.visible"
      :table-query="tableQuery"
      :settingColumns="settingColumns"
      :senior-filter-options="seniorFilterOptions"
      :propItem="seniorFilterData.propItem"
      :languagePackage="languagePackage"
      @save-and-filter="handleSeniorSetting"
    />
  </div>
  <div v-else-if="initialization == -1" class="m-loading">
    <m-icon class="loading_font" name="loading_line"></m-icon>
  </div>
  <div v-else class="title-error">{{ languagePackage["warning"] }}</div>
</template>

<script setup lang="ts" name="mTableComponent">
import { ref, Ref, provide, watch, computed, ComputedRef, onBeforeMount, useSlots, useTemplateRef } from "vue";
import { ElTable } from "element-plus";
import { exRoleType } from "./type";
import { useBaseStore } from "../store/index";
import { Open, TurnOff } from "@element-plus/icons-vue";

import { useTagsStore } from "./hooks/tags-store";
import inBrowser from "../tools/inBrowser";
// import isDarkColor from "../tools/isDarkColor";

import { useTable } from "./hooks/useTable";
import { useSelection } from "./hooks/useSelection";
import { useScroll } from "./hooks/useScroll";
import { useExpand } from "./hooks/useExpand";
import { useDictionary } from "./hooks/useDictionary";
import { useRef } from "./hooks/useRef";
import { useFilter } from "./hooks/useFilter";

import SearchForm from "./components/SearchForm/index.vue";
import Pagination from "./components/Pagination.vue";
import ColSetting from "./components/ColSetting.vue";
import TableColumn from "./components/TableColumn.vue";
import SeniorFilter from "./components/SeniorFilter.vue";
import HeaderItem from "./components/header-item.vue";

import CellInput from "./components/cell/input.vue";
import CellNumber from "./components/cell/number.vue";
import CellSelect from "./components/cell/select.vue";
// import CellTag from "./components/cell/tag.vue";
import CellRequestSelect from "./components/cell/request-select.vue";
import CellOnlineSelect from "./components/cell/online-select.vue";
import CellSwitch from "./components/cell/switch.vue";
import CellRadio from "./components/cell/radio.vue";
import CellCheckBox from "./components/cell/checkbox.vue";
import CellCascader from "./components/cell/cascader.vue";
import CellTime from "./components/cell/time.vue";
import CellIcon from "./components/cell/icon.vue";
import CellFile from "./components/cell/file.vue";

import { MTableType } from "./type";
import { MStructureType } from "MTypes";

const props = withDefaults(defineProps<MTableType>(), {
  id: "default-table",
  rowKey: "id",
  requestAuto: true,
  expandAuto: true,
  useTableLoading: true,
  structure: () => [],
  showPagination: true,
  showToolButton: true,
  embeddedToolButton: false,
  showExpandAll: true,
  showSelectAll: false,
  showSummary: false,
  showTableIndex: true,
  showOverflowTooltip: false,
  display: false,
  useAutoTableWidth: false,
  useSticky: false,
  useHtmlTitle: false,
  operationSize: 3,
  exOptions: () => ({}),
  exDependent: () => ({
    requestFunction: {},
    disabledRule: {},
    submitRule: {},
    inputParser: {},
    inputFormatter: {},
    targetTag: {},
    exTargetTagDisabled: {},
    fileData: {}
  }),
  exPagination: () => ({
    pageNum: 1,
    pageSize: 20,
    pageSizes: [20, 50, 100, 150]
  }),
  summaryConfig: () => ({
    sumText: "",
    unitText: ""
  })
});

provide(
  "exProps",
  computed(() => props)
);

const _showOverflowTooltip = computed(() => {
  if (props.useAutoTableWidth) return true;
  return props.showOverflowTooltip;
});

const globalState = useBaseStore();
const createSize: ComputedRef<"default" | "large" | "small"> = computed(() => {
  return globalState.getSize || "default";
});

const emits = defineEmits(["selectRowBack", "selectRowAllBack", "expandRowBack", "expandRowAllBack", "renderEnd", "cellChange"]);

const tableRef = useTemplateRef("tableRef");
const useRelData = ref(false);
const colRef = ref();
const seniorRef = ref();
const initialization = ref(0);
const exDisabled = ref({} as objectType);
const exDisplay = ref({} as objectType);
const exRole: Ref<exRoleType> = ref({});
const exFunction = ref({} as objectType);
const exFormatter = ref({} as objectType);
const exParser = ref({} as objectType);
const exTargetTag = ref({} as objectType);
const exTargetTagDisabled = ref({} as objectType);
const exFileData = ref({} as objectType);
const useFooterCenter = ref(false);
const total = ref(0);
const scrollYTop = ref(32);
const isPrint = computed(() => globalState.isPrint);

// # 选项方法
const {
  isTableSelectAll,
  selectedListIds,
  selectedList,
  setTableSelected,
  handleChangeChecked,
  handleRadioChecked,
  handleChangeBack,
  handleCellClick,
  getSelectAllOrCancel,
  handleSelectAllOrCancel,
  cleanSelectAllOrCancel,
  handleCellClickAll,
  setSelectedList
} = useSelection(tableRef, props.rowKey, emits, total, props.filterSelectRow);

// # 滚动方法
const { isScrollEnd, initScrollEnd, handleScroll } = useScroll(props.id);

// # 下拉外置数据方法
const {
  expandRowKeys,
  expandRowVisible,
  empowerWidth,
  empowerBodyWidth,
  setExpandRowKey,
  setChildrenRowKey,
  setExpandRowKeysAll,
  setChildrenRowKeysAll,
  initExpandRowKeys,
  setExpandBody,
  initChildrenRowKeys
} = useExpand(props.id, tableRef, emits, props.rowKey, props.expandAuto, initScrollEnd);

// const relTableColumns = computed(() => {
//   const data = tableColumns.value.map(item => ({
//     ...item,
//     tableProp: "tableProp-" + item.prop
//   }));
//   return data;
// });

const languagePackage = computed(() => {
  return globalState.getLanguagePackage("table");
});

// # useTable 主表方法
const {
  tableData,
  oldTableData,
  flatTableData,
  pageable,
  searchParam,
  // searchInitParam,
  // totalParam
  tableQuery,
  tableLoad,
  waitLoading,
  useSelectionTable,
  orderProp,
  initShow,
  tableGlobalZoom,

  enumMap,

  initColumns,
  createObserver,
  tableColumns,
  settingColumns,
  searchColumns,

  // flatColumns

  isShowSearch,
  isSelectionColumn,
  isExpand,
  isChildren,

  getTableList,

  getSubmitTableList,

  setTableList,
  setTableRow,
  setListState,
  setExOptionEnumMap,

  searchAction,
  searchReset,

  handleSizeChange,
  handleCurrentChange,

  reSizeWidth,

  handleSortChange,

  handleCloseDrawer,
  handleColSetting,
  handleChangeDragEl,
  handleChangeDragSort,
  handleHeaderDragend,

  remoteMethod,
  onlineSelectChange,
  getSummaries,

  callbackColSetting,

  getGlobalConfig,
  setGlobalConfig,
  tableResize
} = useTable(
  tableRef,
  props.id,
  props.rowKey,
  props.requestApi,
  props.requestAuto,
  props.requestError,
  props.showPagination,
  props.showToolButton,
  props.useAutoTableWidth,
  props.showOverflowTooltip,
  createSize,
  exDisabled,
  exDisplay,
  exRole,
  exFunction,
  languagePackage,
  props.exPagination.pageNum,
  props.exPagination.pageSize,
  props.exPagination.pageSizes,
  total,
  initScrollEnd,
  props.useHtmlTitle,
  scrollYTop,
  setTableSelected,
  getSelectAllOrCancel,
  initExpandRowKeys,
  setExpandBody,
  initChildrenRowKeys,
  props.summaryConfig,
  isPrint.value || false,
  props.summaryFunction
);

// # 字典方法
const { seniorFilterOptions, seniorFilterData, openSeniorFilter, setConditionalType, setRelationshipGroupLinkType } =
  useDictionary();

// # 源对象方法
const { clearSelection, changeColSetting } = useRef(tableRef, colRef, cleanSelectAllOrCancel);

// # 过滤方法
const {
  handleSeniorSetting,
  handleQueryChange,
  handleAdvancedQueryChange,
  handleRemoveQuery,
  handleRemoveSeniorQuery,
  handleCleanAllQuery,
  handleCleanAllSeniorQuery
} = useFilter(tableQuery, enumMap, getTableList, settingColumns, callbackColSetting, languagePackage);

// #Computed
const Query = computed(handleQueryChange);
const AdvancedQuery = computed(handleAdvancedQueryChange);
const checkedSelectedIcon = computed(() => !props.filterSelectRow);

// # onBeforeMount
onBeforeMount(() => {
  if (inBrowser) {
    window.setManagerTableGlobalConfig = setGlobalConfig;
    window.getManagerTableGlobalConfig = getGlobalConfig;
  }

  const slots = useSlots();
  const slotKey = Object.keys(slots);
  const OldSlotKeys = [
    "tableHeader",
    "tableHeaderCenter",
    "tableHeaderRight",
    "toolButtonInline",
    "tableHeaderAll",
    "append",
    "empty",
    "expand",
    "pagination",
    "tableBottomLeft",
    "tableBottomCenter"
  ];
  const NewSlotKeys = [
    "HeaderLeft",
    "HeaderCenter",
    "ToolButton",
    "ToolButtonInline",
    "HeaderAfter",
    "BodyAppend",
    "Empty",
    "Expand",
    "Pagination",
    "FooterLeft",
    "FooterCenter"
  ];
  useFooterCenter.value = slotKey.indexOf("FooterCenter") > -1;
  for (let index = 0; index < slotKey.length; index++) {
    const element = slotKey[index];
    if (OldSlotKeys.indexOf(element) > -1) {
      window.log.error(`存在错误的命名插槽，请更新 ${OldSlotKeys[index]} 为 ${NewSlotKeys[index]}`);
    }
  }
});

const ExposeObject = {
  /**
   * **表格实例**
   * @type any
   * @description 表格实例
   * */
  element: tableRef,

  /**
   * **获取表格数据**
   * @type `(params?: paramsType) => Promise<void>`
   * @description 该方法会返回一个 Promise，当请求成功时，会返回表格数据
   * @param params 类型为 `paramsType`
   * @param params.AdvancedFilter 类型为 `AdvancedFilterType` 高级搜索参数
   * @param params.Page 类型为 `PageType` 分页用参数
   * @param params.Page.PageNum 类型为 `number` 页码
   * @param params.Page.PageSize 类型为 `number` 每页显示条数
   * @param params.Filter 类型为 `FilterType` 过滤参数
   * @param params.Params 类型为 `ParamsType` 额外请求参数
   * @param params.Sort 类型为 `SorterType` 排序参数
   * @returns 返回值为 `Promise<any>`
   * */
  getTableList,

  /**
   * **手动插入(全表)数据**
   * @type `(data?: objectType[]) => void`
   * @description 该方法会手动插入(全表)数据
   * @param data 类型为 `objectType[]`
   * @returns 返回值为 `void`
   * */
  setTableList,

  /**
   * **手动替换单行数据**
   * @type `(id: string, data?: objectType) => void`
   * @description 该方法会手动替换单行数据
   * @param id 类型为 `string`
   * @param data 类型为 `objectType`
   * @returns 返回值为 `void`
   * */
  setTableRow,

  /**
   * **对比表格数据设置状态（错误高亮）**
   * @type `(list: objectType[], key: string, tableKey?: string) => void`
   * @description 该方法会对比表格数据设置状态（错误高亮）
   * @param list 类型为 `objectType[]`
   * @param key 类型为 `string`
   * @param tableKey 类型为 `string`
   * @returns 返回值为 `void`
   * */
  setListState,

  /**
   * **手动设置已选择数据**
   * @type `(data?: objectType[]) => void`
   * @description 该方法会手动设置已选择数据
   * @param data 类型为 `objectType[]`
   * @returns 返回值为 `void`
   * */
  setSelectedList,

  /**
   * **清空选中数据列表**
   * @type `() => void`
   * @description 该方法会清空选中数据列表
   * @returns 返回值为 `void`
   * */
  clearSelection,

  /**
   * **手动全选表格数据**
   * @type `() => void`
   * @description 该方法会手动全选表格数据
   * @returns 返回值为 `void`
   * */
  handleSelectAllOrCancel,

  /**
   * **获取表格是否全选状态**
   * @type `() => boolean`
   * @description 该方法会返回表格是否全选状态
   * @returns 返回值为 `boolean`
   * */
  getSelectAllOrCancel,

  /**
   * **表格数据重置**
   * @type `() => void`
   * @description 该方法会重置表格数据
   * @returns 返回值为 `void`
   * */
  searchReset,

  /**
   * **校验表格填写数据并返回**
   * @type `() => Promise<objectType[] | false>`
   * @description 该方法会校验表格填写数据并返回
   * @description 当校验失败时，会返回 `false`
   * @description 当校验成功时，会返回校验通过的数据
   * @returns 返回值为 `objectType[] | false`
   * */
  getSubmitTableList,

  /**
   * **展开/折叠单个Expand**
   * @type `(index: number, row: objectType, state?: boolean) => void`
   * @description 该方法会展开/折叠单个Expand
   * @param index 类型为 `number`
   * @param row 类型为 `objectType`
   * @param state 类型为 `boolean`
   * @returns 返回值为 `void`
   * */
  setExpandRowKey,

  /**
   * **展开/折叠全部Expand**
   * @type `(state?: boolean) => void`
   * @description 该方法会展开/折叠全部Expand
   * @description 当设置该值为 `true` 时，会展开全部Expand
   * @description 当设置该值为 `false` 时，会折叠全部Expand
   * @param state 类型为 `boolean`
   * @returns 返回值为 `void`
   * */
  setExpandRowKeysAll,

  getGlobalConfig,
  setGlobalConfig,

  /**
   * **重置表列宽**
   * @type `() => void`
   * @description 该方法会重置表列宽
   * @returns 返回值为 `void`
   * */
  reSizeWidth,
  onlineSelectChange,

  handleCurrentChange,
  /**
   * **表格数据**
   * @type `objectType[]`
   * @description 该属性为表格数据
   * */
  tableData,

  /**
   * **扁平化表格数据**
   * @type `objectType[]`
   * @description 该属性为扁平化表格数据
   * */
  flatTableData,
  searchParam,

  /**
   * **请求表格数据用参数**
   * @type `paramsType`
   * @description 该属性为请求表格数据用参数
   * @description 该属性为 `paramsType` 类型
   * @description 该属性包含以下属性：
   * - `paramsType.AdvancedFilter` 为 `AdvancedFilterType` 高级搜索参数
   * - `paramsType.Page` 为分页用参数
   * - `paramsType.Page.PageSize` 为 `number` 每页显示条数
   * - `paramsType.Page.PageNum` 为 `number` 页码
   * - `paramsType.Filter` 为 `FilterType` 过滤参数
   * - `paramsType.Params` 为 `ParamsType` 额外请求参数
   * - `paramsType.Sort` 为 `SorterType` 排序参数
   * */
  tableQuery,

  /**
   * **分页参数**
   * @type `Pageable`
   * @description 该属性为分页参数
   * @description 该属性为 `Pageable` 类型
   * @description 该属性包含以下属性：
   * - `Pageable.pageNum` 为 `number` 页码
   * - `Pageable.pageSize` 为 `number` 每页显示条数
   * - `Pageable.pageSizes` 为 `Array<number>` 控制每页显示条数参数
   * - `Pageable.total` 为 `number` 总条数
   * */
  pageable,
  enumMap,

  /**
   * **选中表格数据**
   * @type `objectType[]`
   * @description 该属性为选中表格数据
   * */
  selectedList,

  /**
   * **选中表格数据 `rowKey` 合集**
   * @type `string[]`
   * @description 该属性为选中表格数据 `rowKey` 合集
   * */
  selectedListIds,

  /**
   * **是否全选（底部全选按钮状态）**
   * @type `boolean`
   * @description 该属性为是否全选（底部全选按钮状态）
   * */
  isTableSelectAll
};

// # Expose
defineExpose(ExposeObject);

/**
 * 查找两个对象数组中有变化的数据
 * @param oldArray 原始数组
 * @param newArray 新数组
 * @param key 用于匹配对象的唯一标识键，默认为'id'
 * @returns 返回包含变化信息的数组，每项包含原始值、新值和变化的字段
 */
function findChangedItems<T extends Record<string, any>>(oldArray: T[], newArray: T[], key = "id") {
  const result: {
    key: number | string;
    oldValue: T;
    newValue: T;
    changedFields: string[];
  }[] = [];

  // 将数组转换为对象，方便查找
  const oldObjMap = oldArray.reduce((map, item) => {
    map[item[key]] = item;
    return map;
  }, {} as Record<number | string, T>);

  const newObjMap = newArray.reduce((map, item) => {
    map[item[key]] = item;
    return map;
  }, {} as Record<number | string, T>);

  // 遍历所有在两个数组中都存在的对象
  Object.keys(oldObjMap).forEach(objKey => {
    if (newObjMap[objKey]) {
      const oldItem = oldObjMap[objKey];
      const newItem = newObjMap[objKey];
      const changedFields: string[] = [];

      // 比较对象的所有属性
      Object.keys(oldItem).forEach(field => {
        // 跳过用于匹配的键
        if (field === key) return;

        // 深度比较属性值是否变化
        if (JSON.stringify(oldItem[field]) !== JSON.stringify(newItem[field])) {
          changedFields.push(field);
        }
      });

      // 检查新对象中是否有旧对象没有的属性
      Object.keys(newItem).forEach(field => {
        if (field !== key && !(field in oldItem)) {
          changedFields.push(field);
        }
      });

      // 如果有变化的字段，添加到结果数组
      if (changedFields.length > 0) {
        result.push({
          key: objKey,
          oldValue: oldItem,
          newValue: newItem,
          changedFields
        });
      }
    }
  });
  return result;
}

watch(
  () => tableData.value,
  data => {
    const changedItems = findChangedItems(oldTableData.value, data, props.rowKey);
    emits("cellChange", changedItems);
    oldTableData.value = JSON.parse(JSON.stringify(data));
  },
  {
    deep: true
  }
);

// #Watch exOptions
watch(
  () => props.exOptions,
  data => {
    for (const key in data) {
      const opts = data[key];
      if (Array.isArray(opts)) {
        const tagsStore: any = useTagsStore();
        for (let index = 0; index < opts.length; index++) {
          const element: any = opts[index];
          if (!element.tagStyle) element.tagStyle = { bgColor: "#00aa90", color: "#fff" };
          if (tagsStore) {
            const color = tagsStore.getTagMaps(props.id, key, element.value) || element.tagStyle?.bgColor || "";
            element.tagStyle.bgColor = color;
          }
        }
      }
    }
    setExOptionEnumMap(data);
  },
  { deep: true, immediate: true }
);

// #Watch structure
function setConfig(config: MStructureType.Table[]) {
  const _config = config.map(item => {
    const _item = {
      ...item,
      label: item.languageLabel
        ? item.languageLabel[globalState.getLanguage || "zh-CN"]
        : typeof item.label == "object"
        ? item.label?.[globalState.getLanguage || "zh-CN"] || item.label
        : item.label
    };

    let cellConfig = {};
    if (item.cellConfig) {
      cellConfig = item.cellConfig;
      if (item.cellConfig.languagePlaceholder) {
        cellConfig = {
          ...cellConfig,
          placeholder: item.cellConfig.languagePlaceholder
            ? item.cellConfig.languagePlaceholder[globalState.getLanguage || "zh-CN"]
            : item.cellConfig.placeholder
        };
      }
      return { ..._item, cellConfig };
    }
    return _item;
  });
  if (initialization.value == 0) emits("renderEnd", ExposeObject);

  if (!Array.isArray(_config)) {
    return (initialization.value = -2);
  }
  if (_config && _config.length) {
    initColumns(_config);
  }
  if (tableColumns.value.length == 0) {
    initialization.value = -1;
  } else {
    initialization.value = 1;
  }
}
watch(() => props.structure, setConfig, { immediate: true });

// #Watch exDependent
watch(
  () => props.exDependent,
  data => {
    if (data.requestFunction) exFunction.value = data.requestFunction;
    if (data.disabledRule) exDisabled.value = data.disabledRule;
    if (data.displayRule) exDisplay.value = data.displayRule;
    if (data.submitRule) exRole.value = data.submitRule;
    if (data.inputParser) exParser.value = data.inputParser;
    if (data.inputFormatter) exFormatter.value = data.inputFormatter;
    if (data.targetTag) exTargetTag.value = data.targetTag;
    if (data.targetTagDisabled) exTargetTagDisabled.value = data.targetTagDisabled;
    if (data.fileData) exFileData.value = data.fileData;
  },
  { deep: true, immediate: true }
);

/**
// 🙅‍♀️ 不需要打印可以把以下方法删除，打印功能目前存在很多 bug（目前数据处理比较复杂 209-246 行）
// 处理打印数据（把后台返回的值根据 enum 做转换）
const printData = computed(() => {
  const printDataList = JSON.parse(JSON.stringify(selectedList.value.length ? selectedList.value : tableData.value));
  // 找出需要转换数据的列（有 enum || 多级 prop && 需要根据 enum 格式化）
  const needTransformCol = flatColumns.value!.filter(
    item => (item.enum || (item.prop && item.prop.split(".").length > 1)) && item.isFilterEnum
  );
  needTransformCol.forEach(colItem => {
    printDataList.forEach((tableItem: { [key: string]: any }) => {
      tableItem[handleProp(colItem.prop!)] =
        colItem.prop!.split(".").length > 1 && !colItem.enum
          ? formatValue(handleRowAccordingToProp(tableItem, colItem.prop!))
          : filterEnum(handleRowAccordingToProp(tableItem, colItem.prop!), enumMap.value.get(colItem.prop!), colItem.fieldNames);
      for (const key in tableItem) {
        if (tableItem[key] === null) tableItem[key] = formatValue(tableItem[key]);
      }
    });
  });
  return printDataList;
});

打印表格数据（💥 多级表头数据打印时，只能扁平化成一维数组，printJs 不支持多级表头打印）
const handlePrint = () => {
  const header = `<div style="text-align: center"><h2>${props.title}</h2></div>`;
  const gridHeaderStyle = "border: 1px solid #ebeef5;height: 45px;color: #232425;text-align: center;background-color: #fafafa;";
  const gridStyle = "border: 1px solid #ebeef5;height: 40px;color: #494b4e;text-align: center";
  printJS({
    printable: printData.value,
    header: props.title && header,
    properties: flatColumns
      .value!.filter(item => !["selection", "index", "expand"].includes(item.type!) && item.isShow && item.prop !== "operation")
      .map((item: MTableItemType) => ({ field: handleProp(item.prop!), displayName: item.label })),
    type: "json",
    gridHeaderStyle,
    gridStyle
  });
};
**/

// watch(
//   () => tableColumns.value,
//   (data) => {
//     tableRef?.value?.doLayout();
//   },
//   { immediate: true, deep: true }
// );
</script>

<style lang="scss">
@use "./styles/index.scss";

.m-table-styles .title-error {
  padding: var(--m-component-padding-size, 10px);
  font-size: 14px;
  color: var(--el-color-info);
  text-align: center;
}
.m-table-radio {
  width: 18px;
  height: 18px;
  border: 1px solid var(--el-border-color);
  border-radius: 50%;
}
.m-table-radio_action {
  position: relative;
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 14px;
    height: 14px;
    content: "";
    background-color: var(--el-color-primary);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
}
.un-use-tooltip {
  .body_cell_text,
  .cell_text {
    white-space: break-spaces !important;
    line-height: 1.6em !important;
    min-width: 10px;
    display: inline-block;
  }
}

.use-sticky.m-table-styles {
  height: auto;
  .use-card-style {
    overflow: visible !important;
    padding-bottom: 0;
  }
  .el-scrollbar__wrap {
    overflow: hidden;
  }
  .table_body,
  .el-table {
    overflow: visible !important;
  }
  .table-flex-footer {
    position: sticky;
    bottom: 0;
    z-index: 9;
    background: var(--el-bg-color);
    margin-top: 0;
    padding-top: var(--m-component-padding-size, 10px);
    padding-bottom: var(--m-component-padding-size, 10px);
    border-top: 1px solid var(--el-border-color-light);
  }
}

.el-scrollbar__view:has(.el-table__empty-block) {
  height: 100%;
}

.el-table .danger-row {
  color: red;
}
</style>
