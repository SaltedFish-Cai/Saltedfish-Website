import { SaStructureType, SaOptionType } from "M_Types";
import { SaPlaygroundPageButtonType } from "./components/type";
type languageKey = "en-US" | "zh-CN";

export type MInterfaceConfig = {
  id: string;
  name: string;
  apiUrl: string;
  apiType: "delete" | "get" | "post" | "put";
  dataStructure: string;
  requestParameters?: string[];
};

export type MOptionsType = {
  id: string;
  description: string;
  OptionsType: "interface" | "select" | "switch";
  config: SaOptionType.SelectList | SaOptionType.Switch;
  dictionaryType?: string;
  dictionaryKey?: string;
  columnName?: string;
  tableName?: string;
};

export type MStructureTypeItem = {
  id: string;
  prop: string;
  description: string;
  label: Record<languageKey, string>;
  [x: string]: any;
};

export type MStructureType = {
  id: string;
  description: string;
  indexKey: string;
  config: MStructureTypeItem[];
};

export type SaPlaygroundItem = {
  itemId: string;
  width: number;
  height: number;
  type: "form" | "table" | "tabs";
  structure: (SaStructureType.FormV2 & { [x: string]: any })[] | (SaStructureType.TableV2 & { [x: string]: any })[];
  actionButtons: SaPlaygroundPageButtonType[];
  exOptions: Record<string, string>;
  sourceTable: string;
  actionApi?: string;
  title?: Record<languageKey, string> | {};
  otherProps?: Record<string, any>;
};

export type SaPlaygroundPagesType = {
  pageId: string;
  name: string;
  x: number;
  y: number;
  itemConfigs: SaPlaygroundItem[];
};

export type SaPlaygroundType = {
  id: string;
  name: string;
  description?: string;
  adminIndex?: string;
  adminX: number;
  adminY: number;
  adminScale: number;
  pagesConfigs: SaPlaygroundPagesType[];
  interfaceConfigs: MInterfaceConfig[];
  dataStructures: MStructureType[];
  exOptions: MOptionsType[];
};

export type SaPlaygroundActionFunctionType = {
  executionMethod: any;
  executionDependencies: Array<{
    label: Record<languageKey, string>;
    key: string;
    type: "input" | "select";
    exOptions?: SaOptionType.SelectList;
    showByKey?: string;
    showByValue?: string;
  }>;
};

export type SaPlaygroundProps = {
  /**
   * **组件唯一标识**
   * @type `string` | `undefined`
   * @default `undefined`
   * @description 当设置该值时，会作为组件的唯一标识
   * @description 该值的类型为 `string`，可以是任意类型，但是建议不要重复
   * */
  id?: string;

  /**
   * **自定义类名**
   * @type `string`
   * @default `undefined`
   * @description 当设置该值时，会自定义类名
   * @description 该值的类型为 `string`，可以是任意类型
   * */
  class?: string;

  /**
   * **自定义样式**
   * @type `Record<string, string>`
   * @default `undefined`
   * @description 当设置该值时，会自定义样式
   * @description 该值的类型为 `Record<string, string>`，可以是任意类型
   * */
  style?: Record<string, string>;

  /**
   * **数据**
   * @type `Record<string, any>`
   * @default `{}`
   * @description 该值的类型为 `Record<string, any>`，可以是任意类型
   * */
  data?: SaPlaygroundType;

  /**
   * **请求HTML API**
   * @type `string`
   * @default `undefined`
   * @description 当设置该值时，会作为请求HTML API
   * @description 该值的类型为 `string`，可以是任意类型
   * */
  requestFunction?: any;

  /**
   * **操作函数**
   * @type `Record<string, any>`
   * @default `undefined`
   * @description 当设置该值时，会作为操作函数
   * @description 该值的类型为 `Record<string, any>`，可以是任意类型
   * */
  actionFunction?: Array<SaOptionType.Select & SaPlaygroundActionFunctionType>;

  /**
   * **授权函数**
   * @type `Record<string, any>`
   * @default `undefined`
   * @description 当设置该值时，会作为授权函数
   * @description 该值的类型为 `Record<string, any>`，可以是任意类型
   * */
  authorizationFunction?: Array<SaStructureType.TableV2>;

  /**
   * **可见性判断函数**
   * @type `Record<string, any>`
   * @default `undefined`
   * @description 当设置该值时，会作为可见性判断函数
   * @description 该值的类型为 `Record<string, any>`，可以是任意类型
   * */
  visibleBefore?: (data: any) => boolean;

  /**
   * **操作前判断函数**
   * @type `Record<string, any>`
   * @default `undefined`
   * @description 当设置该值时，会作为操作前判断函数
   * @description 该值的类型为 `Record<string, any>`，可以是任意类型
   * */
  actionBefore?: (data: any) => boolean;
};

type useFormType = {
  submitUrl?: string;
};

type useTableType = {
  getTableDataUrl?: string;
};
