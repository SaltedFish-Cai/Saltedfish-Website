import { PaOptionType, PaStructureType } from "../../../manager-type";
import { computed, nextTick, Ref } from "vue";
import { PaPlaygroundPageButtonType } from "../type";
import { M_MessageBox } from "../../../feedback";
import { PaPlaygroundItem, MStructureType } from "../../type";

const MIN_WIDTH = 520;

export const useFunctionHooks = (
  emit: any,
  baseConfig: Ref<PaPlaygroundItem | undefined>,
  dataStructures: Ref<MStructureType[]>,
  tableConfig: Ref<PaStructureType.TableV2[]>,
  tableConfigExOperation: Ref<PaStructureType.TableV2[]>,
  tableExOptions: Ref<Record<string, string>>,
  tableData: Ref<any[][]>,
  tableWidth: Ref<number>,
  editHeadersData: Ref<PaPlaygroundPageButtonType[]>,
  editOperationData: Ref<PaPlaygroundPageButtonType[]>,
  tableBaseCellWidth: number,
  selectedColumnIndex: Ref<number>,
  closeContextMenu: () => void
) => {
  const columnCount = computed(() => tableConfigExOperation.value.length);

  // 创建表格
  function createTable() {
    setMockTableData();
  }

  // 设置模拟表格数据
  function setMockTableData() {
    // 生成随机数据
    tableData.value = [];
    // 生成5行随机数据
    for (let i = 0; i < 5; i++) {
      const row: string[] = [];
      for (let j = 0; j < tableConfigExOperation.value.length; j++) {
        // 所有数据都使用随机数
        row.push(`数据${i + 1}-${j + 1}`);
      }
      tableData.value.push(row);
    }
    setTableWidth();
  }

  // 设置表格宽度
  function setTableWidth() {
    nextTick(() => {
      // 根据每列的width计算总宽度，默认100
      let width = tableConfigExOperation.value.reduce((total, col) => {
        const width = col.width;
        const widthNum = typeof width === "number" ? width : tableBaseCellWidth;
        return total + widthNum;
      }, 0);

      width = width <= MIN_WIDTH ? MIN_WIDTH : width;

      // 添加配置列的宽度
      width += (editOperationData.value.length || 1) * 110;

      emit("updatePageSize", { width: width + 20, height: tableData.value.length * 40 + 82 + 40 + 10 });
      tableWidth.value = width;
    });
  }

  // 更新列
  function updateCol(col: PaStructureType.TableV2 & { cellType: any }, options: Record<string, string>) {
    tableConfig.value[selectedColumnIndex.value] = { ...col, cellConfig: { ...col.cellConfig, type: col.cellType } };
    tableExOptions.value = options;
    setTableWidth();
  }

  // 更新所有列
  function updateColAll(cols: PaStructureType.TableV2[], options?: Record<string, string>) {
    tableConfig.value = cols;
    if (options) tableExOptions.value = options;
    setTableWidth();
    setMockTableData();
  }

  // 处理删除列
  function handleDeleteColumn(columnIndex: number) {
    closeContextMenu();

    if (columnIndex >= 0) {
      // 确认删除
      M_MessageBox.delete({
        onConfirm: () => {
          // 删除列名
          tableConfig.value.splice(columnIndex!, 1);

          // 删除表格数据中的对应列
          tableData.value = tableData.value.map(row => {
            row.splice(columnIndex!, 1);
            return row;
          });
          setTableWidth();
        }
      });
    }
  }

  // 导出表格配置
  function exportTableConfig() {
    const _tableConfig: PaStructureType.TableV2[] = [];
    const exOptions: PaOptionType.Default = {};

    for (const item of tableConfig.value) {
      if (item.cellConfig?.exOptions) {
        exOptions[String(item.prop)] = item.cellConfig.exOptions;
        delete item.cellConfig.exOptions;
      }
      _tableConfig.push({
        label: item.label,
        prop: item.prop,
        fixed: item.fixed,
        width: item.width,
        useFilter: item.useFilter,
        useSort: item.useSort,
        filterType: item.filterType,
        cellConfig: item.cellConfig
      });
    }

    const actionButtons = [...editOperationData.value, ...editHeadersData.value];
    return { config: _tableConfig, exOptions, actionButtons };
  }

  // 刷新表格数据
  function handleRefresh() {
    const _baseConfig = baseConfig.value;
    if (!_baseConfig) return;
    const oldConfig = tableConfig.value;
    const findConfig = dataStructures.value.find(config => config.id === _baseConfig.sourceTable);
    if (oldConfig && findConfig?.config) {
      const outData: PaStructureType.TableV2[] = [];
      for (const col of findConfig.config) {
        const oldCol = oldConfig.find(oldCol => oldCol.prop === col.prop);
        if (oldCol) {
          outData.push(oldCol);
        } else {
          if (findConfig.indexKey != col.id) {
            outData.push({
              prop: col.prop,
              label: { "en-US": col.label["en-US"] || col.prop, "zh-CN": col.label["zh-CN"] || col.prop },
              fixed: "default",
              useFilter: true,
              useSort: true,
              filterType: "input",
              cellConfig: { type: "text" }
            });
          }
        }
      }
      updateColAll(outData);
    }
  }

  return {
    columnCount,
    createTable,
    updateCol,
    updateColAll,
    handleDeleteColumn,
    setTableWidth,
    exportTableConfig,
    setMockTableData,
    handleRefresh
  };
};
