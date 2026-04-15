import { SaStructureType } from "M_Types";
import { cellMapConfig } from "./cell-config";

export const editTableColConfig: SaStructureType.FormV2[] = [
  {
    unitName: { "en-US": "Basic Config", "zh-CN": "基础配置" },
    label: { "en-US": "Column Name", "zh-CN": "列名" },
    prop: "label",
    type: "slot"
  },
  {
    unitName: { "en-US": "Basic Config", "zh-CN": "基础配置" },
    label: { "en-US": "Column Key", "zh-CN": "列Key" },
    prop: "prop",
    type: "input",
    display: true
  },
  {
    unitName: { "en-US": "Basic Config", "zh-CN": "基础配置" },
    label: { "en-US": "Cell Type", "zh-CN": "单元格类型" },
    prop: "cellType",
    type: "cascader",
    exOptions: cellMapConfig
  }
];

// 额外配置_表格
export const editOtherTableColConfig: SaStructureType.FormV2[] = [
  {
    unitName: { "en-US": "Extra Config", "zh-CN": "额外配置" },
    label: { "en-US": "Width", "zh-CN": "宽度" },
    prop: "width",
    placeholder: { "en-US": "Empty when adaptive", "zh-CN": "为空时，根据内容自适应" },
    type: "number",
    rules: [{ required: false }]
  },
  {
    unitName: { "en-US": "Extra Config", "zh-CN": "额外配置" },
    label: { "en-US": "Fixed Case", "zh-CN": "固定情况" },
    prop: "fixed",
    type: "select",
    rules: [{ required: false }]
  },
  {
    unitName: { "en-US": "Extra Config", "zh-CN": "额外配置" },
    label: { "en-US": "Use Filter", "zh-CN": "是否使用筛选" },
    prop: "useFilter",
    type: "select",
    rules: [{ required: false }]
  }
];

export const filterType: SaStructureType.FormV2 = {
  unitName: { "en-US": "Extra Config", "zh-CN": "额外配置" },
  label: { "en-US": "Filter Type", "zh-CN": "筛选类型" },
  prop: "filterType",
  type: "select",
  rules: [{ required: false }]
};

export const exOptionsById: SaStructureType.FormV2 = {
  unitName: { "en-US": "Extra Config", "zh-CN": "额外配置" },
  label: { "en-US": "Ex Options By Id", "zh-CN": "选项来源" },
  prop: "exOptionsById",
  type: "select",
  rules: [{ required: false }]
};
