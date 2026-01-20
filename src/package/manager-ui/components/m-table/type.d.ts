import { MOptionType } from "./../global";
import { TableProps } from "element-plus";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { MFormChildType } from "../m-form/type";

import { MElementInputType } from "../m-elements/input/index";
import { MElementNumberType } from "../m-elements/number/index";
import { MElementSelectType, MElementRequestSelectType, MElementOnlineSelectType } from "../m-elements/select/index";
import { MElementSwitchType } from "../m-elements/switch/index";
import { MElementRadioType } from "../m-elements/radio/index";
import { MElementCheckBoxType } from "../m-elements/checkbox/index";
import { MElementCascaderType } from "../m-elements/cascader/index";
import { MElementDateType } from "../m-elements/time/index";
import { MElementIconType } from "../m-elements/icon/index";
import { MElementTagType } from "../m-elements/tag/index";
import { MElementFileType } from "../m-elements/file/index";

export type summaryConfigType = {
  sumText?: string; // 合计文字
  unitText?: string; // 单位文字
};

export interface MTableType extends Partial<Omit<TableProps<any>, "data">> {
  /**
   * **多表时唯一ID**
   * @type `string`
   * @description 当设置该值时，会使用该值作为唯一ID
   * @example
   * ```ts
   * <m-table id="table1" :structure="structure" :requestApi="requestApi"></m-table>
   * ```
   * */
  id: string;

  /**
   * **自定义样式**
   * @type `Record<string, string>`
   * @description 当设置该值时，会使用该值作为自定义样式
   * @example
   * ```ts
   * <m-table :style="{ width: '100%' }" :structure="structure" :requestApi="requestApi"></m-table>
   * ```
   * */
  style?: Record<string, number | string>;

  /**
   * **表格结构**
   * @type `Array<MStructureType.Table>`
   * @description 当设置该值时，会使用该值作为表格结构
   * @example
   * ```ts
   * <m-table :structure="structure" :requestApi="requestApi"></m-table>
   * ```
   * */
  structure: Array<MStructureType.Table>;

  /**
   * **请求表格数据的Api**
   * @type `(params: any, id?: string) => Promise<any> | any`
   * @param `params` 请求参数
   * @param `id` 表格的唯一ID
   * @returns `Promise<any> | any`
   * @description 当设置该值时，会使用该值作为请求表格数据的Api
   * @example
   * ```ts
   * <m-table :requestApi="requestApi"></m-table>
   * ```
   * */
  requestApi: (params: any, id?: string) => Promise<any> | any;

  /**
   * **否自动执行请求**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会自动执行请求
   * @description 当设置该值为 `false` 时，不会自动执行请求
   * @example
   * ```ts
   * <m-table :requestAuto="true"></m-table>
   * ```
   * */
  requestAuto?: boolean;

  /**
   * **是否直接打开Expand**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会直接打开Expand
   * @description 当设置该值为 `false` 时，不会直接打开Expand
   * @example
   * ```ts
   * <m-table :expandAuto="true"></m-table>
   * ```
   * */
  expandAuto?: boolean;

  /**
   * **表格Api请求错误监听**
   * @type `(params: any, id?: string) => void`
   * @param `params` 请求参数
   * @param `id` 表格的唯一ID
   * @returns `void`
   * @description 当设置该值时，会使用该值作为表格Api请求错误监听
   * @example
   * ```ts
   * <m-table :requestError="requestError"></m-table>
   * ```
   * */
  requestError?: (params: any, id?: string) => void;

  /**
   * **是否使用扁平化样式**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用扁平化样式
   * @description 当设置该值为 `false` 时，不会使用扁平化样式
   * @example
   * ```ts
   * <m-table :flat="true"></m-table>
   * ```
   * */
  flat?: boolean;

  /**
   * **是否使用Html表头**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用 Html表头
   * @description 当设置该值为 `false` 时，不会使用 Html表头
   * @example
   * ```ts
   * <m-table :useHtmlTitle="true"></m-table>
   * ```
   * */
  useHtmlTitle?: boolean;

  /**
   * **是否使用表格加载中样式**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会使用表格加载中样式
   * @description 当设置该值为 `false` 时，不会使用表格加载中样式
   * @example
   * ```ts
   * <m-table :useTableLoading="true"></m-table>
   * ```
   * */
  useTableLoading?: boolean;

  /**
   * **行数据的 Key**
   * @type `string`
   * @default `id`
   * @description 当设置该值时，会使用该值作为行数据的 Key
   * @example
   * ```ts
   * <m-table rowKey="id"></m-table>
   * ```
   * */
  rowKey?: string;

  /**
   * **是否显示表格功能按钮**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会显示表格功能按钮
   * @description 当设置该值为 `false` 时，不会显示表格功能按钮
   * @example
   * ```ts
   * <m-table :showToolButton="true"></m-table>
   * ```
   * */
  showToolButton?: boolean;

  /**
   * **是否需要分页组件**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会需要分页组件
   * @description 当设置该值为 `false` 时，不会需要分页组件
   * @example
   * ```ts
   * <m-table :showPagination="true"></m-table>
   * ```
   * */
  showPagination?: boolean;

  /**
   * **是否显示展开全部按钮**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会显示展开全部按钮
   * @description 当设置该值为 `false` 时，不会显示展开全部按钮
   * @example
   * ```ts
   * <m-table :showExpandAll="true"></m-table>
   * ```
   * */
  showExpandAll?: boolean;

  /**
   * **显示全选按钮**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会显示全选按钮
   * @description 当设置该值为 `false` 时，不会显示全选按钮
   * @example
   * ```ts
   * <m-table :showSelectAll="true"></m-table>
   * ```
   * */
  showSelectAll?: boolean;

  /**
   * **是否显示尾行合计**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会显示尾行合计
   * @description 当设置该值为 `false` 时，不会显示尾行合计
   * @example
   * ```ts
   * <m-table :showSummary="true"></m-table>
   * ```
   * */
  showSummary?: boolean;

  /**
   * **是否显示表格序号**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会显示表格序号
   * @description 当设置该值为 `false` 时，不会显示表格序号
   * @example
   * ```ts
   * <m-table :showTableIndex="true"></m-table>
   * ```
   * */
  showTableIndex?: boolean;

  /**
   * **是否使用超出格子使用**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会使用超出格子使用
   * @description 当设置该值为 `false` 时，不会使用超出格子使用
   * @example
   * ```ts
   * <m-table :showOverflowTooltip="true"></m-table>
   * ```
   * */
  showOverflowTooltip?: boolean;

  /**
   * **是否显示表格功能按钮嵌入式样式**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会显示表格功能按钮嵌入式样式
   * @description 当设置该值为 `false` 时，不会显示表格功能按钮嵌入式样式
   * @example
   * ```ts
   * <m-table :embeddedToolButton="true"></m-table>
   * ```
   * */
  embeddedToolButton?: boolean;

  /**
   * **外置选择框选项**
   * @type `MOptionType.Table`
   * @description 当设置该值时，会使用该值作为外置选择框选项
   * @example
   * ```ts
   * <m-table :exOptions="exOptions"></m-table>
   * ```
   * */
  exOptions?: MOptionType.Table;

  /**
   * **请求时额外数据**
   * @type `exDependentType`
   * @type `exDependentType.requestFunction` 为 `{ [x: string]: (value) => MOptionType.Select[] }`
   * @type `exDependentType.disabledRule` 为 `{ [x: string]: (value) => boolean }`
   * @type `exDependentType.displayRule` 为 `{ [x: string]: (value) => boolean }`
   * @type `exDependentType.submitRule` 为 `exRoleType`
   * @type `exDependentType.inputParser` 为 `{ [x: string]: (value) => string }`
   * @type `exDependentType.inputFormatter` 为 `{ [x: string]: (value) => string }`
   * @type `exDependentType.targetTag` 为 `{ [x: string]: (value) => void }`
   * @type `exDependentType.fileData` 为 `{ [x: string]: objectType }`
   * @description 当设置该值时，会使用该值作为请求时额外数据
   * @example
   * ```ts
   * <m-table :exRequestData="exRequestData"></m-table>
   * ```
   * */
  exDependent?: {
    /**
     * **异步请求接口获取表下拉参数数据**
     */
    requestFunction?: { [x: string]: (value) => MOptionType.Select[] };
    /**
     * **禁用规则**
     */
    disabledRule?: { [x: string]: (value) => boolean };
    /**
     * **显示规则**
     */
    displayRule?: { [x: string]: (value) => boolean };
    /**
     * **提交规则**
     */
    submitRule?: exRoleType;
    /**
     * **输入解析器**
     */
    inputParser?: { [x: string]: (value) => string };
    /**
     * **输入格式化器**
     */
    inputFormatter?: { [x: string]: (value) => string };
    /**
     * **点击标签回调**
     */
    targetTag?: { [x: string]: (value) => void };
    /**
     * **点击标签禁用规则**
     */
    targetTagDisabled?: { [x: string]: (value) => boolean };
    /**
     * **上传文件数据**
     */
    fileData?: { [x: string]: objectType };
  };

  /**
   * **外置分页配置**
   * @type `exPaginationType`
   * @type `exPaginationType.pageNum` 为 `number`
   * @type `exPaginationType.pageSize` 为 `number`
   * @type `exPaginationType.pageSizes` 为 `number[]`
   * @type `exPaginationType.layout` 为 `string`
   * @type `exPaginationType.pagerCount` 为 `number`
   * @description 当设置该值时，会使用该值作为外置分页配置
   * @example
   * ```ts
   * <m-table :exPagination="exPagination"></m-table>
   * ```
   * */
  exPagination?: {
    pageNum?: number;
    pageSize?: number;
    pageSizes?: number[];
    layout?: string;
    pagerCount?: number;
  };

  /**
   * **顶部搜索区分栏**
   * @type 1 | 2 | 3 | 4
   * @default 1
   * @description 当设置该值为 `1` 时，会显示一行搜索栏
   * @description 当设置该值为 `2` 时，会显示两行搜索栏
   * @description 当设置该值为 `3` 时，会显示三行搜索栏
   * @description 当设置该值为 `4` 时，会显示四行搜索栏
   * @example
   * ```ts
   * <m-table :searchSpan="1"></m-table>
   * ```
   * */
  searchSpan?: 1 | 2 | 3 | 4;

  /**
   * **下载按钮请求接口**
   * @type `(params: any) => Promise<any> | any`
   * @param `params` 请求参数
   * @returns `Promise<any> | any`
   * @description 当设置该值时，会使用该值作为下载按钮请求接口
   * @example
   * ```ts
   * <m-table :exportApi="exportApi"></m-table>
   * ```
   * */
  exportApi?: (params: any) => Promise<any> | any;

  /**
   * **过滤 `选择表状态下` 可选择数据**
   * @type `(params: any) => Promise<any> | any`
   * @param `params` 请求参数
   * @returns `Promise<any> | any`
   * @description 当设置该值时，会使用该值作为过滤 `选择表状态下` 可选择数据
   * @example
   * ```ts
   * <m-table :filterSelectRow="filterSelectRow"></m-table>
   * ```
   * */
  filterSelectRow?: (params: any) => Promise<any> | any;

  /**
   * **纯展示模式**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用纯展示模式
   * @description 当设置该值为 `false` 时，不会使用纯展示模式
   * @example
   * ```ts
   * <m-table :display="true"></m-table>
   * ```
   * */
  display?: boolean;

  /**
   * **操作内元素最大显示数量，超出放置到更多按钮**
   * @type `number`
   * @default `3`
   * @description 当设置该值为 `number` 时，会使用该值作为操作内元素最大显示数量，超出放置到更多按钮
   * @example
   * ```ts
   * <m-table :operationSize="3"></m-table>
   * ```
   * */
  operationSize?: number;

  /**
   * **合计参数**
   * @type `summaryConfigType`
   * @type `summaryConfigType.sumText` 为 `string`
   * @type `summaryConfigType.unitText` 为 `string`
   * @description 当设置该值时，会使用该值作为合计参数
   * @example
   * ```ts
   * <m-table :summaryConfig="summaryConfig"></m-table>
   * ```
   * */
  summaryConfig?: summaryConfigType;

  /**
   * **自定义合计方法**
   * @type `(params: any) => any`
   * @param `params` 请求参数
   * @returns `string[]`
   * @description 当设置该值时，会使用该值作为自定义合计方法
   * @example
   * ```ts
   * <m-table :summaryFunction="summaryFunction"></m-table>
   * ```
   * */
  summaryFunction?: (params: any) => string[];

  /**
   * **是否使用粘性表头**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用粘性表头
   * @description 当设置该值为 `false` 时，不会使用粘性表头
   * @example
   * ```ts
   * <m-table :useSticky="true"></m-table>
   * ```
   * */
  useSticky?: boolean;

  /**
   * **是否自动设置表格宽度**
   * @type `boolean`
   * @default `false`
   * @description
   * - 当设置该值为 `true` 时，会自动设置表格宽度
   * - 当设置该值为 `false` 时，不会自动设置表格宽度
   * */
  useAutoTableWidth?: boolean;

  /**
   * **选择表格行回调**
   * @type `(selected: objectType[], row: objectType) => void`
   * @param `selected` 已选择的行数据
   * @param `row` 为当前行数据
   * @returns `void`
   * @description 当选择表格行时，会触发该回调
   * @example
   * ```ts
   * <m-table :onSelectRowBack="onSelectRowBack"></m-table>
   * ```
   * */
  onSelectRowBack?: ({ selected, row }: { selected: objectType[]; row: objectType }) => void;

  /**
   * **选择表格全选按钮回调**
   * @type `(value: boolean, selection: objectType[], allValue: boolean, allSelection: objectType[]) => void`
   * @param `value` 当前页是否被全选
   * @param `selection` 当前页被全选数据
   * @param `allValue` 全部页是否被全选
   * @param `allSelection` 全部页被全选数据
   * @returns `void`
   * @description 当选择表格全选按钮时，会触发该回调
   * @example
   * ```ts
   * <m-table :onSelectRowAllBack="onSelectRowAllBack"></m-table>
   * ```
   * */
  onSelectRowAllBack?: ({
    value,
    selection,
    allValue,
    allSelection
  }: {
    value: boolean;
    selection: objectType[];
    allValue: boolean;
    allSelection: objectType[];
  }) => void;

  /**
   * **打开/关闭表格行子数据回调**
   * @type `(index: number, row: objectType, state: boolean) => void`
   * @param `index` 为当前行索引
   * @param `row` 为当前行数据
   * @param `state` 为当前行打开状态
   * @returns `void`
   * @description 当打开/关闭表格行子数据时，会触发该回调
   * @example
   * ```ts
   * <m-table :onExpandRowBack="onExpandRowBack"></m-table>
   * ```
   * */
  onExpandRowBack?: ({ index, row, state }: { index: number; row: objectType; state: boolean }) => void;

  /**
   * **打开/关闭全部表格行子数据按钮回调**
   * @type `(state: boolean) => void`
   * @param `state` 是否打开全部表格行子数据
   * @returns `void`
   * @description 当打开/关闭全部表格行子数据按钮时，会触发该回调
   * @example
   * ```ts
   * <m-table :onExpandRowAllBack="onExpandRowAllBack"></m-table>
   * ```
   * */
  onExpandRowAllBack?: (state: boolean) => void;

  /**
   * **首次渲染完成后回调**
   * @type `(getTableList: (params?: paramsType) => Promise<any>) => void`
   * @param `getTableList` 为获取表格数据方法
   * @returns `void`
   * @description 当首次渲染完成后回调时，会触发该回调
   * @example
   * ```ts
   * <m-table :onRenderEnd="onRenderEnd"></m-table>
   * ```
   * */
  onRenderEnd?: (getTableList: (params?: paramsType) => Promise<any>) => void;
}

export type MTableRef = {
  /**
   * **表格实例**
   * @type `any`
   * @description 表格实例
   * */
  element?: any;

  /**
   * **获取表格数据**
   * @type `(params?: paramsType) => Promise<any>`
   * @param `params` 请求参数
   * @param `params.AdvancedFilter` 为 `AdvancedFilterType` 高级搜索参数
   * @param `params.Page` 为分页用参数
   * @param `params.Page.PageNum` 为 `number` 页码
   * @param `params.Page.PageSize` 为 `number` 每页显示条数
   * @param `params.Filter` 为 `FilterType` 过滤参数
   * @param `params.Params` 为 `ParamsType` 额外请求参数
   * @param `params.Sort` 为 `SorterType` 排序参数
   * @returns `Promise<any>`
   * @description 获取表格数据
   * @example
   * ```ts
   * <m-table ref="tableRef"></m-table>
   * ```
   * */
  getTableList?: (params?: paramsType) => Promise<any>;

  /**
   * **手动插入(全表)数据**
   * @type `(data?: objectType[]) => void`
   * @param `data` 为要插入的数据
   * @returns `void`
   * @description 该方法会手动插入(全表)数据
   * @example
   * ```ts
   * <m-table ref="tableRef"></m-table>
   * ```
   * */
  setTableList?: (data: objectType[]) => void;

  /**
   * **手动替换单行数据**
   * @type `(id: string, data?: objectType) => void`
   * @param `id` 为要替换的数据的唯一Key名（来源：rowKey）
   * @param `data` 为要替换的数据
   * @returns `void`
   * @description
   * - 该方法会手动替换单行数据
   * - 该方法会将数据替换到表格中，不会触发表格的刷新
   * */
  setTableRow?: (id: string, data?: objectType) => void;

  /**
   * **对比表格数据设置状态（错误高亮）**
   * @type `(list: objectType[], key: string, tableKey?: string) => void`
   * @param `list` 需要对比的数据列表
   * @param `key` 需要对比的数据列表的唯一Key名
   * @param `tableKey` 原表格数据唯一Key名（来源：rowKey）
   * @returns `void`
   * @description
   * - 该方法会对比表格数据设置状态（错误高亮）
   * - 该方法会将数据状态设置到表格中，不会触发表格的刷新
   * */
  setListState?: (list: objectType[], key: string, tableKey?: string) => void;

  /**
   * **手动设置已选择数据**
   * @type `(data?: objectType[]) => void`
   * @param `data` 为要设置的数据
   * @returns `void`
   * @description 该方法会将已选择数据设置到表格中，不会触发表格的刷新
   * */
  setSelectedList?: (data?: objectType[]) => void;

  /**
   * **清空选中数据列表**
   * @type `() => void`
   * @returns `void`
   * @description 该方法会将选中数据列表清空，不会触发表格的刷新
   * */
  clearSelection?: () => void;

  /**
   * **手动全选表格数据**
   * @type `() => void`
   * @returns `void`
   * @description 该方法会将表格数据全选，不会触发表格的刷新
   * */
  handleSelectAllOrCancel?: () => void;

  /**
   * **获取表格是否全选状态**
   * @type `() => boolean`
   * @returns `boolean`
   * @description 该方法会获取表格是否全选状态
   * */
  getSelectAllOrCancel?: () => boolean;

  /**
   * **表格数据重置**
   * @type `() => void`
   * @description 该方法会将表格数据重置
   * */
  searchReset?: () => void;

  /**
   * **校验表格填写数据并返回**
   * @type `() => objectType[] | false`
   * @returns `objectType[] | false`
   * @description
   * - 该方法会校验表格填写数据并返回
   * - 当校验失败时，会返回 `false`
   * - 当校验成功时，会返回校验通过的数据
   * */
  getSubmitTableList?: () => objectType[] | false;

  /**
   * **展开/折叠单个Expand**
   * @type `(index: number, row: objectType, state?: boolean) => void`
   * @param index 为当前行索引
   * @param row 为当前行数据
   * @param state 为当前行打开状态
   * @returns `void`
   * @description 该方法会展开/折叠单个Expand
   * */
  setExpandRowKey?: (index: number, row: objectType, state?: boolean) => void;

  /**
   * **展开/折叠全部Expand**
   * @type `(state?: boolean) => void`
   * @param state 为当前行打开状态
   * @returns `void`
   * @description
   * - 该方法会展开/折叠全部Expand
   * - 当设置该值为 `true` 时，会展开全部Expand
   * - 当设置该值为 `false` 时，会折叠全部Expand
   * */
  setExpandRowKeysAll?: (state: boolean) => void;

  /**
   * **重置表列宽**
   * @type `() => void`
   * @description 方法会重置表列宽
   * */
  reSizeWidth?: () => void;

  /**
   * **表格数据**
   * @type `objectType[]`
   * @description 该属性为表格数据
   * */
  tableData: objectType[];

  /**
   * **扁平化表格数据**
   * @type `objectType[]`
   * @description 该属性为扁平化表格数据
   * */
  flatTableData: objectType[];

  /**
   * **请求表格数据用参数**
   * @type `paramsType`
   * @type `paramsType.AdvancedFilter` 为 `AdvancedFilterType` 高级搜索参数
   * @type `paramsType.Page` 为分页用参数
   * @type `paramsType.Page.PageNum` 为 `number` 页码
   * @type `paramsType.Page.PageSize` 为 `number` 每页显示条数
   * @type `paramsType.Filter` 为 `FilterType` 过滤参数
   * @type `paramsType.Params` 为 `ParamsType` 额外请求参数
   * @type `paramsType.Sort` 为 `SorterType` 排序参数
   * @description 该属性为请求表格数据用参数
   * */
  tableQuery: paramsType;

  /**
   * **分页参数**
   * @type `Pageable`
   * @type `Pageable.pageNum` 为 `number` 页码
   * @type `Pageable.pageSize` 为 `number` 每页显示条数
   * @type `Pageable.pageSizes` 为 `Array<number>` 控制每页
   * @type `Pageable.total` 为 `number` 总条数
   * @description 当设置该值为 `Pageable` 时，会将该值设置到表格中
   * */
  pageable: Pageable;

  /**
   * **选中表格数据**
   * @type `objectType[]`
   * @description 该属性为表格数据
   * */
  selectedList: objectType[];

  /**
   * **选中表格数据 `rowKey`合集**
   * @type `string[]`
   * @description
   * - 该属性为表格数据
   * - 当设置该值为 `string[]` 时，会将该值设置到表格中
   * */
  selectedListIds: string[];

  /**
   * **是否全选（底部全选按钮状态）**
   * @type `boolean`
   * @description
   * - 该属性为表格数据
   * - 当设置该值为 `true` 时，会显示全选按钮
   * - 当设置该值为 `false` 时，不会显示全选按钮
   * */
  isTableSelectAll: boolean;
};

type MElementNumberTypeIn = MElementNumberType & { maxBy?: string; minBy?: string };
export type CellItemType = StrictUnion<
  | MElementCascaderType
  | MElementCheckBoxType
  | MElementDateType
  | MElementFileType
  | MElementIconType
  | MElementInputType
  | MElementNumberTypeIn
  | MElementOnlineSelectType
  | MElementRadioType
  | MElementRequestSelectType
  | MElementSelectType
  | MElementSwitchType
  | MElementTagType
>;

type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any ? Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> & T : never;
type StrictUnion<T> = StrictUnionHelper<T, T>;

export interface EnumProps {
  label: string; // 选项框显示的文字
  value: any; // 选项框值
  disabled?: boolean; // 是否禁用此选项
  tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any;
}

export type TypeProps = "expand" | "index" | "radio" | "selection";

export type SearchType =
  | "cascader"
  | "date-picker"
  | "input-number"
  | "input"
  | "select-v2"
  | "select"
  | "slider"
  | "switch"
  | "time-picker"
  | "time-select"
  | "tree-select";

export type SearchProps = {
  el: SearchType; // 当前项搜索框的类型
  props?: any; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  key?: string; // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  order?: number; // 搜索项排序（从大到小）
  span?: number; // 搜索项所占用的列数，默认为1列
  offset?: number; // 搜索字段左侧偏移列数
  defaultValue?: any[] | boolean | number | string; // 搜索项默认值
};

export type FieldNamesProps = {
  label: string;
  value: string;
  children?: string;
};

export interface MTableItemType<T = any> extends Partial<Omit<TableColumnCtx<T>, "children" | "renderCell" | "renderHeader">> {
  /**
   * **表单唯一Key**
   * @type `string`
   * @description
   * - 该属性为表单唯一Key
   * - 当设置该值为 `string` 时，会使用该值作为表单唯一Key
   * */
  prop?: string;

  /**
   * **表单项标题**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为表单项标题
   * */
  label?: string | { [key: "en-US" | "zh-CN"]: string };

  /**
   * **多语言表单项标题**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为表单项标题
   * */
  languageLabel?: {
    [key: "en-US" | "zh-CN"]: string;
  };

  /**
   * **宽度**
   * @type `number | string`
   * @description 当设置该值为 `number | string` 时，会使用该值作为宽度
   * */
  width?: number | string;

  /**
   * **最小宽度**
   * @type `number | string`
   * @description 当设置该值为 `number | string` 时，会使用该值作为最小宽度
   * */
  minWidth?: number | string;

  tag?: boolean; // 是否是标签展示

  /**
   * **是否显示在表格当中**
   * @type `boolean`
   * @default `true`
   * @description
   * - 当设置该值为 `true` 时，会显示在表格当中
   * - 当设置该值为 `false` 时，不会显示在表格当中
   * */
  isShow?: boolean;

  /**
   * **是否使用排序**
   * @type `boolean`
   * @default `true`
   * @description
   * - 当设置该值为 `true` 时，会使用排序
   * - 当设置该值为 `false` 时，不会使用排序
   * */
  useSort?: boolean;

  /**
   * **是否使用筛选**
   * @type `boolean`
   * @default `true`
   * @description
   * - 当设置该值为 `true` 时，会使用筛选
   * - 当设置该值为 `false` 时，不会使用筛选
   * */
  useFilter?: boolean; // 是否使用筛选
  useTag?: boolean; // 是否使用标签
  search?: SearchProps | undefined; // 搜索项配置
  enum?: EnumProps[] | ((params?: any) => Promise<any>); // 枚举类型（字典）
  isFilterEnum?: boolean; // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）(废弃)

  /**
   * **筛选类型**
   * @type `string`
   * @default `input`
   * @description 筛选类型
   * - 当设置该值为 `input` 时，会使用 `input` 类型的筛选
   * - 当设置该值为 `number` 时，会使用 `number` 类型的筛选
   * - 当设置该值为 `select` 时，会使用 `select` 类型的筛选
   * - 当设置该值为 `time` 时，会使用 `time` 类型的筛选
   * */
  filterType?: "input" | "number" | "select" | "time";
  fieldNames?: FieldNamesProps; // 指定 label && value && children 的 key 值
  headerRender?: (row: MTableItemType) => any; // 自定义表头内容渲染（tsx语法）
  render?: (scope: { row: T }) => any; // 自定义单元格内容渲染（tsx语法）
  childrenColumn?: MTableItemType<T>[];

  /**
   * **单元格是否进行拆分折行**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为单元格是否进行拆分折行
   * */
  textWarp?: string;

  /**
   * **单元格配置**
   * @type `MoFormChildType`
   * @description 当设置该值为 `MoFormChildType` 时，会使用该值作为单元格配置
   * */
  cellConfig?: MFormChildType & {
    required?: boolean;
    size?: "default" | "large" | "small";
    /**
     * **多语言表单项占位符**
     * @type `string`
     * @description 当设置该值为 `string` 时，会使用该值作为表单项占位符
     * */
    languagePlaceholder?: {
      [key: "en-US" | "zh-CN"]: string;
    };
  };

  /**
   * **列是否使用合计**
   * @type `boolean`
   * @default `true`
   * @description
   * - 当设置该值为 `true` 时，会使用合计
   * - 当设置该值为 `false` 时，不会使用合计
   * */
  useSum?: boolean;

  /**
   * **是否使用高级搜索**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用高级搜索
   * - 当设置该值为 `false` 时，不会使用高级搜索
   * */
  useSenior?: boolean;

  /**
   * **搜索值**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为搜索值
   * */
  searchCriteria?: string;

  /**
   * **单元格文字溢出**
   * @type `boolean` | `undefined`
   * @default `undefined`
   * @description 单元格文字溢出
   * - 当设置该值为 `true` 时，会使用 tooltip 显示单元格文字
   * - 当设置该值为 `false` 时，不会使用 tooltip 显示单元格文字
   * */
  textSpill?: boolean;
}

export type Responsive = {
  span?: number;
  offset?: number;
};

export interface GlobalState {
  isKeepAliveTableWidth: boolean;
  isAutoTableWidth: boolean;
  isTableTextCopy: boolean;
  tableGlobalZoom: number;
  tableWidth: objectType;
}

export type exRoleType = { [x: string]: { roleFn: (element: objectType, key?: string) => any; errorMessage?: string } };

export type SettingPropsType = {
  id: string;
  size: "default" | "large" | "small";
  settingColumns: MTableItemType[];
  exOptions?: any;
  display: boolean;
  useHtmlTitle: boolean;
  languagePackage: objectType;
};

export type HeaderItemType = {
  id: string;
  item: objectType;
  length: number;
  exOptions: {};
  tableRef: any;
  orderProp: string;
  listeners: any;
  tableQuery: objectType;
  size: "default" | "large" | "small";
};

export interface PaginationPropsType {
  pageable: Pageable;
  pageNum?: number;
  exPagination: {
    layout?: string;
    pagerCount?: number;
  };
  useFooterCenter?: boolean;
  handleSizeChange: (size: number) => void;
  handleCurrentChange: (currentPage: number) => void;
}

export interface SearchFormItem {
  column: MTableItemType;
  searchParam: { [key: string]: any };
}

export interface MTableSearchType {
  id: string;
  columns?: MTableItemType[]; // 搜索配置列
  searchParam?: { [key: string]: any }; // 搜索参数
  searchSpan?: 1 | 2 | 3 | 4;
  search: (params: any) => void; // 搜索方法
  searchReset: (params: any) => void; // 重置方法
  flat?: boolean;
}

export interface ProTablePropsType {
  columns: FormItemType[]; // 列配置项
  flat?: boolean; // 扁平页面 不使用 class:card
  exOptions?: any; // 外置异步筛选用 选项值,
}

export type SeniorFilterPropsType = {
  modelValue: boolean;
  propItem: objectType;
  settingColumns: any;
  seniorFilterOptions: { LineConditional: objectType[]; linkOptions: objectType[] };
  tableQuery: objectType;
  languagePackage: objectType;
};

export type TableItemTypeType = {
  id: string;
  column: MTableItemType;
  length: number;
  exOptions: {};
  tableRef: any;
  orderProp: string;
  listeners: any;
  useHtmlTitle: boolean;
  size?: "default" | "large" | "small";
  tableQuery: objectType;
  showOverflowTooltip: boolean;
  operationSize: number;
};

export type TableColumnFilterType = {
  item: objectType;
  id: string;
  data: objectType;
  exOptions?: any;
  size?: "default" | "large" | "small";
};

export namespace Table {
  export interface Pageable {
    pageNum?: number;
    pageSize?: number;
    pageSizes?: number[];
    total: number;
  }
  export interface TableStateProps {
    tableData: any[];
    oldTableData: any[];
    flatTableData: any[];
    pageable: Pageable;
    searchParam: {
      [key: string]: any;
    };
    searchInitParam: {
      [key: string]: any;
    };
    totalParam: {
      [key: string]: any;
    };
    icon?: {
      [key: string]: any;
    };
    tableQuery: {
      [key: string]: any;
    };

    tableLoad: boolean;
    waitLoading: boolean;

    useSelectionTable: boolean;

    orderProp: string;

    initShow: boolean;
  }
}

export namespace HandleData {
  export type MessageType = "" | "error" | "info" | "success" | "warning";
}

export namespace Theme {
  export type GreyOrWeakType = "grey" | "weak";
}
