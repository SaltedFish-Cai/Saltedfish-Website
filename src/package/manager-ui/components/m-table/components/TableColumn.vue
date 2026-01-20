<template>
  <RenderTableColumn v-bind="props.column" />
</template>

<script lang="tsx" setup name="TableColumn">
// # Import
import { inject, ComputedRef, ref, useSlots, watch, h, computed } from "vue";
import { filterEnum, formatValue, handleProp, useClipboard } from "../utils";
import { useBaseStore } from "../hooks/store";
import Filter from "./TableColumnFilter.vue";
import MTag from "../../m-elements/tag/index.vue";
import { useBaseStore as globalState } from "../../store/index";

import { TableItemTypeType, MTableItemType, MTableType } from "../type";

// # Var
const props = defineProps<TableItemTypeType>();

const emits = defineEmits(["handleSortChange", "saveAndFilter", "handleCellClick", "handleRemoveQuery", "openSeniorFilter"]);

const slots = useSlots();
const enumMap = inject("enumMap", ref(new Map()));

const exProps: ComputedRef<MTableType> | undefined = inject("exProps");

let filterData = [] as objectType[];
const orderString = ref(null as "ascending" | "descending" | null);
const filterValue = ref({} as objectType);
const columnFilter = ref();
const globalStore = useBaseStore();
const useGlobalState = globalState();

const languagePackage = computed(() => {
  return useGlobalState.getLanguagePackage("table") || {};
});

let justClick = false;

// #Function 渲染单元格内数据
function renderCellData(item: MTableItemType & { tableProp?: string }, scope: { [key: string]: any }) {
  let data;
  if (!item?.prop) return "--";
  if (enumMap.value.get(item.prop) && item.filterType == "select") {
    data = filterEnum(scope.row[item?.prop], enumMap.value.get(item.prop)!, item.fieldNames)?.text;
    // data = formatValue(scope.row[item?.tableProp || item?.prop]);
  } else {
    // data = formatValue(handleRowAccordingToProp(scope.row, item.prop!));
    data = formatValue(scope.row[item?.prop]);
  }
  // const data =
  //   enumMap.value.get(item.prop) && item.filterType == "select"
  //     ? filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop)!, item.fieldNames)
  //     : formatValue(handleRowAccordingToProp(scope.row, item.prop!));
  if (item?.filterType == "number") {
    return window.toLocaleString(data);
  } else if (item.textWarp) {
    return data.split(item.textWarp)?.map(item => {
      return <div>{item}</div>;
    });
  } else {
    return data;
  }
}

// #Function 获取 tag 类型
// const getTagType = (item: MTableItemType, scope: { [key: string]: any }) => {
//   return filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop), item.fieldNames, "tag");
// };

// #Function 设置单行数据状态
function getItemState(state: objectType) {
  if (state.tableState == "error") {
    return "color:var(--el-color-danger);font-weight:bold;";
  }
  return "";
}

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

// #Function 提交筛选
function saveAndFilter(data) {
  const prop = props.column.prop;
  let _filterData = filterData?.filter(item => item.fieldName != prop);
  _filterData = [..._filterData, ...data];
  emits("saveAndFilter", { Filter: _filterData });
}

// #Function 点击行(鼠标移动时不选中,防止推拽文字时会误触行数据)
function mouseMove() {
  justClick = false;
}
function mouseDown() {
  justClick = true;
}
function handleCellClick(scope, e) {
  if (!justClick) return;
  emits("handleCellClick", scope.row, scope.column, e.target);
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

// #Function 一键复制文本
function copyText(e) {
  if (globalStore.isTableTextCopy && e.target.className.indexOf("body_cell_text-rel") > -1) {
    useClipboard(e.target.innerText, e);
  }
}

// #Function 点击标签
function _targetTag(item, value, row, options) {
  const { exDependent } = exProps?.value || {};
  const { targetTag } = exDependent || {};
  if (!targetTag || !targetTag[item.prop]) return;
  targetTag[item.prop]({ item, value, row, options });
}

// #Function 设置标签元素
function setTag(tagItem, value, row, exOptions) {
  const item = { ...tagItem.cellConfig, prop: tagItem.prop };
  const { exDependent } = exProps?.value || {};
  const { targetTag, targetTagDisabled } = exDependent || {};
  if (value != null && value != undefined) {
    let useTagsClick = !!targetTag?.[tagItem.prop];
    if (Array.isArray(value)) {
      return (
        <>
          {value.map(data => {
            if (targetTagDisabled?.[tagItem.prop]) {
              useTagsClick = !targetTagDisabled[tagItem.prop]({ item, value: data, row });
            }
            return (
              <MTag
                class="table-col-inline-block"
                icon={useTagsClick ? "finger_press_line" : ""}
                item={item}
                data={data}
                size={props.size}
                exOptions={exOptions}
                useTagsClick={useTagsClick}
                onClick={() => useTagsClick && _targetTag(tagItem, data, row, exOptions)}
              />
            );
          })}
        </>
      );
    } else {
      if (targetTagDisabled?.[tagItem.prop]) {
        useTagsClick = !targetTagDisabled[tagItem.prop]({ item, value, row });
      }
      return (
        <MTag
          class="table-col-inline-block"
          icon={useTagsClick ? "finger_press_line" : ""}
          item={item}
          data={value}
          size={props.size}
          exOptions={exOptions}
          useTagsClick={useTagsClick}
          onClick={() => useTagsClick && _targetTag(tagItem, value, row, exOptions)}
        />
      );
    }
  }
}

// #Function 设置操作列  是否使用更多按钮
// let ctx;
function setOperationsBack(arrData) {
  return;
  const arrayChild = arrData?.[0].children;

  if (arrayChild && arrayChild.length) {
    const _arrayChild: any = [];
    function findChild(arrayChild, childEl?: boolean) {
      for (let index = 0; index < arrayChild.length; index++) {
        const element = arrayChild[index];
        console.log(" ");
        console.log(" ");
        console.log(" ");
        console.log(" ");
        console.log("++++++++++> arrData:", arrData);
        console.log("++++++++++> element:", element);

        const { ctx, props, type } = element;
        if (type?.props && type?.render) {
          // 开发模式
          if (childEl) {
            _arrayChild.push(element);
          } else {
            const setup = type.setup(type.props, ctx.setupContext);
            console.log("++++++++++> setup:", setup);
            const componentChild = type?.render(ctx, {}, props, setup)?.children || [];
            if (componentChild.length) {
              console.log("++++++++++> componentChild:", componentChild);
              for (let index = 0; index < componentChild.length; index++) {
                if (element?.children?.default) componentChild[index].ctx = element.ctx;
              }
              findChild(componentChild, true);
            }
          }
        }
        //  else if (type?.props) {
        //   // 正式模式
        //   console.log(" ");
        //   console.log(" ");
        //   console.log(" ");
        //   console.log(" ");
        //   console.log("++++++++++> props:", props);
        //   console.log("++++++++++> type:", type);
        //   const render = type.setup(props, {
        //     expose: () => {
        //       //
        //     }
        //   });
        //   console.log(" ");
        //   console.log("++++++++++> render:", render);
        //   const componentChild = render(props, ctx)?.children || [];
        //   console.log("++++++++++> componentChild:", componentChild);
        //   if (componentChild.length) {
        //     for (let index = 0; index < componentChild.length; index++) {
        //       componentChild[index].ctx = element.ctx;
        //     }
        //     findChild(componentChild);
        //   }
        // }
        else if (String(element.type) != "Symbol(v-cmt)") {
          _arrayChild.push(element);
        } else if (String(element.type) == "Symbol(v-fgt)" && element.children?.length) {
          findChild(element.children);
        }
      }
    }
    findChild(arrayChild);
    console.log("++++++++++> _arrayChild:", _arrayChild);
    const baseArr: any = [];
    const otherArr: any = [];
    //  ------------------------------------------------------------
    if (_arrayChild.length > props.operationSize) {
      _arrayChild.map((data, index) => {
        if (index < props.operationSize - 1) {
          baseArr.push(data);
        } else {
          otherArr.push(data);
        }
      });

      return (
        <>
          {baseArr.map(data => {
            return h(data);
          })}
          {
            <el-popover placement="top" popper-class="m-table-more-opt">
              {{
                reference: () => {
                  return <m-button is="more">更多</m-button>;
                },
                default: () => {
                  return (
                    <>
                      {otherArr.map(data => {
                        return h(data);
                      })}
                    </>
                  );
                }
              }}
            </el-popover>
          }
        </>
      );
    } else {
      return (
        <>
          {_arrayChild?.map(data => {
            return h(data);
          })}
        </>
      );
    }
  } else {
    return <></>;
  }
}

function setOperations(arrData) {
  setOperationsBack(arrData);
  // const root = arrData?.[0];
  // console.log(" ");
  // console.log(" ");
  // console.log(" ");
  // console.log(" ");
  // console.log("++++++++++> root:", root);
  const arrayChild = arrData?.[0].children;
  if (arrayChild && arrayChild.length) {
    const _arrayChild: any = [];
    // console.log("++++++++++> arrayChild:", arrayChild);
    function findChild(arrayChild) {
      for (let index = 0; index < arrayChild.length; index++) {
        const element = arrayChild[index];
        // console.log(" ");
        // console.log(" ");
        // console.log("++++++++++> h element:", h(element));
        const { type, children } = element;
        const stringType = String(type);
        if (stringType.indexOf("Symbol") < 0 || stringType == "Symbol(v-txt)") {
          _arrayChild.push(element);
        } else if (stringType == "Symbol(v-fgt)" && children?.length) {
          for (let index = 0; index < children.length; index++) {
            const child = children[index];
            _arrayChild.push(child);
          }
        }
        // if (children?.default || String(type) == "Symbol(v-txt)") {
        //   _arrayChild.push(element);
        // } else if (String(type) == "Symbol(v-fgt)" && children?.length) {
        //   findChild(element.children);
        // }
        // else if (children == null) {
        //   const hEl = h(element);
        //   console.log("++++++++++> hEl:", hEl);
        //   // return <>{hEl}</>;
        //   // 开发模式
        //   const setup = type.setup(props, ctx?.setupContext);
        //   console.log("++++++++++> setup:", setup);
        //   const renderEnd = type?.render(root.ctx.setupContext, [], setup.props, setup);
        //   console.log("++++++++++> renderEnd:", renderEnd);
        //   return <>{renderEnd}</>;
        //   // console.log("++++++++++> renderEnd:", renderEnd);
        //   // const componentChild = renderEnd?.children || [];
        //   // if (componentChild.length) {
        //   //   if (rootElement) {
        //   //     console.log("++++++++++> element:", element);
        //   //     _arrayChild.push(element);
        //   //   } else {
        //   //     for (let index = 0; index < componentChild.length; index++) {
        //   //       componentChild[index].ctx = rootElement?.ctx || element.ctx;
        //   //     }
        //   //     console.log("++++++++++> componentChild:", componentChild);
        //   //     findChild(componentChild, element);
        //   //   }
        //   // }
        // }
      }
    }
    findChild(arrayChild);
    const baseArr: any = [];
    const otherArr: any = [];
    //  ------------------------------------------------------------
    if (_arrayChild.length > props.operationSize) {
      _arrayChild.map((data, index) => {
        if (index < props.operationSize - 1) {
          baseArr.push(data);
        } else {
          otherArr.push(data);
        }
      });

      return (
        <>
          {baseArr.map(data => {
            return h(data);
          })}
          {
            <el-popover placement="top" popper-class="m-table-more-opt">
              {{
                reference: () => {
                  return <m-button is="more">{languagePackage.value["more"]}</m-button>;
                },
                default: () => {
                  return (
                    <>
                      {otherArr.map(data => {
                        return h(data);
                      })}
                    </>
                  );
                }
              }}
            </el-popover>
          }
        </>
      );
    } else {
      return (
        <>
          {_arrayChild?.map(data => {
            return h(data);
          })}
        </>
      );
    }
  } else {
    return <></>;
  }
}

// #Function 主方法
function RenderTableColumn(item: MTableItemType & { isTipTitle?: boolean }) {
  const filterType = item.filterType || "input";
  const useSeniorFilter = item.useSenior ?? useGlobalState.getTableConfig?.useSeniorFilter;
  const showOverflowTooltip = item.showOverflowTooltip != undefined ? item.showOverflowTooltip : props.showOverflowTooltip;
  const tooltipOptions = {
    "append-to": "body",
    "popper-class": "m-table-el-popper"
  };

  return (
    <>
      {item.isShow && (
        <el-table-column
          {...item}
          width={item.width || "auto"}
          min-width={item.minWidth || "200px"}
          align={item.align ?? "left"}
          showOverflowTooltip={
            showOverflowTooltip && item.prop !== "operation" && item.cellConfig?.type !== "tag" && !slots[handleProp(item.prop!)]
              ? tooltipOptions
              : false
          }
        >
          {{
            default: (scope: any) => {
              if (item.childrenColumn) return item.childrenColumn.map(child => RenderTableColumn(child));
              if (item.render) return item.render(scope);
              if (slots[handleProp(item.prop!)]) {
                if (item.prop == "operation") {
                  if (slots["moreOperation"] && slots["moreOperation"]!(scope)?.[0]?.children?.length) {
                    return (
                      <div class="operation_item">
                        {slots[handleProp(item.prop!)]!(scope)}
                        <el-popover placement="top" popper-class="m-table-more-opt">
                          {{
                            reference: () => {
                              return <m-button is="more">{languagePackage.value["more"]}</m-button>;
                            },
                            default: () => {
                              return <>{slots["moreOperation"]!(scope)}</>;
                            }
                          }}
                        </el-popover>
                      </div>
                    );
                  } else {
                    const operationArr = slots[handleProp("operation")]!(scope);
                    {
                      /* return <div class="operation_item">{slots[handleProp(item.prop!)]!(scope)}</div>; */
                    }
                    return <div class="operation_item">{setOperations(operationArr)}</div>;
                  }
                } else {
                  return <span class={" find-class-" + item.prop}>{slots[handleProp(item.prop!)]!(scope)}</span>;
                }
              }
              {
                /* <m-tag :item="{ ...item.cellConfig, prop: item.prop }" :data="row" :exOptions="exOptions"></m-tag> */
              }
              {
                /* if (item.cellConfig?.type == "tag") return  <MTag item={tagItem} data={scope.row} exOptions={props.exOptions} />; */
              }
              if (item.cellConfig?.type == "tag" && item.prop)
                return (
                  <div class="body_cell_slot">
                    <span class={"find-class-" + item.prop}>
                      {setTag(item, scope.row[item.prop], scope.row, props.exOptions)}
                    </span>
                  </div>
                );
              return (
                <div
                  class="body_cell_text"
                  style={getItemState(scope.row)}
                  onMousemove={mouseMove}
                  onMousedown={mouseDown}
                  onMouseup={e => handleCellClick(scope, e)}
                >
                  <div
                    class={
                      "body_cell_text-rel find-class-" +
                      item.prop +
                      (globalStore.isTableTextCopy ? " body_cell_text-copy" : "") +
                      (item.textSpill ? " m-table-text-spill" : "")
                    }
                    onClick={copyText}
                  >
                    {renderCellData(item, scope)}
                  </div>
                </div>
              );
            },
            header: () => {
              if (item.headerRender) return item.headerRender(item);
              return (
                <div class={item.prop ? "flex-center-between cell_header" : "flex-center cell_header"}>
                  {!props.useHtmlTitle ? (
                    <span class="no-click">
                      {slots[`${handleProp(item.prop!)}Header`] ? (
                        slots[`${handleProp(item.prop!)}Header`]!({ row: item })
                      ) : (
                        <span class="cell_text drag-el">
                          <span
                            class={
                              item?.cellConfig?.required && !item?.cellConfig?.display
                                ? "is_required find-class-" + item.prop
                                : "find-class-" + item.prop
                            }
                          >
                            {item?.label}
                          </span>
                        </span>
                      )}
                      <span class="cell_text_after"></span>
                    </span>
                  ) : item.isTipTitle ? (
                    <el-tooltip popper-class="title_max_tooltip" content={item?.label} placement="bottom" raw-content>
                      <span class="no-click">
                        {slots[`${handleProp(item.prop!)}Header`] ? (
                          slots[`${handleProp(item.prop!)}Header`]!({ row: item })
                        ) : (
                          <span class="cell_text drag-el">
                            <span
                              class={
                                item?.cellConfig?.required && !item?.cellConfig?.display
                                  ? "is_required find-class-" + item.prop
                                  : "find-class-" + item.prop
                              }
                              innerHTML={item?.label}
                            />
                          </span>
                        )}{" "}
                        <span class="cell_text_after"></span>
                      </span>
                    </el-tooltip>
                  ) : (
                    <span class="no-click" data-prop={item.prop}>
                      {slots[`${handleProp(item.prop!)}Header`] ? (
                        slots[`${handleProp(item.prop!)}Header`]!({ row: item })
                      ) : (
                        <span class="cell_text drag-el">
                          <span
                            class={
                              item?.cellConfig?.required && !item?.cellConfig?.display
                                ? "is_required find-class-" + item.prop
                                : "find-class-" + item.prop
                            }
                            innerHTML={item?.label}
                          />
                        </span>
                      )}
                      <span class="cell_text_after"></span>
                    </span>
                  )}
                  {item.prop && (
                    <div class="flex-center-between flex1 cell_header_setting ">
                      {item.useSort != false ? (
                        <div
                          class={
                            props.orderProp == item.prop && orderString.value != null
                              ? "flex-col table-order-box order-box-act"
                              : "flex-col table-order-box"
                          }
                          onClick={() => {
                            handleTableOrder(item);
                          }}
                        >
                          <m-icon
                            class={
                              props.orderProp == item.prop && orderString.value == "ascending"
                                ? "order-icon flex-center order-act"
                                : "order-icon flex-center"
                            }
                            name="up_small_fill"
                          />
                          <m-icon
                            class={
                              props.orderProp == item.prop && orderString.value == "descending"
                                ? "order-icon flex-center order-act"
                                : "order-icon flex-center"
                            }
                            name="down_small"
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      {item.useFilter != false ? (
                        <Filter
                          id={props.id}
                          ref={columnFilter}
                          item={item}
                          onSaveAndFilter={saveAndFilter}
                          data={filterValue.value}
                          exOptions={props.exOptions}
                          onHandleRemoveQuery={handleRemoveQuery}
                          onOpenSeniorFilter={openSeniorFilter}
                          size={props.size}
                        >
                          {{
                            default: () => {
                              return (
                                <div class={setIconAction(item.prop) ? "table-filter-box filter-box-act" : "table-filter-box"}>
                                  <m-icon
                                    class={
                                      setIconAction(item.prop) ? "filter-icon flex-center filter-act" : "filter-icon flex-center"
                                    }
                                    name="filter"
                                  />
                                </div>
                              );
                            },
                            exBtn: () => {
                              return (
                                (filterType == "input" || filterType == "number") &&
                                useSeniorFilter && (
                                  <div class="flex-center">
                                    <m-button class="mt-size" font="mortarboard_line" onClick={() => openSeniorFilter(item)} link>
                                      {languagePackage.value["useAdvancedSearch"]}
                                    </m-button>
                                  </div>
                                )
                              );
                            },
                            [`header-option-${handleProp(item.prop!)}`]: ({ row }) => {
                              return (
                                slots[`header-option-${handleProp(item.prop!)}`] &&
                                slots[`header-option-${handleProp(item.prop!)}`]!({ row })
                              );
                            },
                            [`header-tag-${handleProp(item.prop!)}`]: ({ row }) => {
                              return (
                                slots[`header-tag-${handleProp(item.prop!)}`] &&
                                slots[`header-tag-${handleProp(item.prop!)}`]!({ row })
                              );
                            }
                          }}
                        </Filter>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )}
                </div>
              );
            }
          }}
        </el-table-column>
      )}
    </>
  );
}

// #Watch 排序
watch(
  () => props.orderProp,
  (value: string) => {
    if (props.column.prop != value && orderString.value != null) orderString.value = null;
  },
  { immediate: true }
);

// #Watch Filter值
watch(
  () => props.tableQuery.Filter,
  (value: objectType[]) => {
    filterData = value;
    const prop = props.column.prop;
    if (props.column?.filterType == "time") {
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
      if (findItem && String(findItem.fieldValue)?.length) {
        filterValue.value = {
          ...findItem,
          fieldValue: props.column.filterType == "select" ? findItem.fieldValue.split(",") : findItem.fieldValue
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
  width: inherit;
  height: 100%;
  padding: 2px 0;
  // margin-left: 3px;
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
    gap: 3px;
  }
  .is_required {
    &::before {
      margin-right: 4px;
      color: var(--el-color-danger);
      content: "*";
    }
  }
}

.title_max_tooltip {
  max-width: 300px;
}

.el-tooltip__trigger:has(.table-filter-box) {
  height: 100%;
}
.body_cell_text {
  width: 99.5% !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.m-table-text-spill {
  display: block !important;
  width: 100%;
  overflow: hidden;
  line-height: 1.5em;
  text-wrap: wrap;
  word-break: break-all;
  word-wrap: break-word;
}

.table-col-inline-block {
  display: inline-block !important;
  width: max-content;
  margin: calc(var(--m-component-padding-size, 10px) * 0.25) !important;
  max-width: 100%;
  height: max-content;
  .el-tag__content {
    width: 100%;
    text-wrap: wrap;
    word-break: break-all;
    word-wrap: break-word;
  }
}
</style>
