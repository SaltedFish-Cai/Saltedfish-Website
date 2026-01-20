import type { FormItemRule } from "element-plus";
import { CellItemType, OtherType, GroupType, TabsType } from "./cell";
import { MOptionType } from "MTypes";

type languageKey = "en-US" | "zh-CN";

export type MFormProps = {
  /**
   * **多表时唯一ID**
   * @type `string`
   * @description 当设置该值时，会使用该值作为唯一ID
   * @example
   * ```ts
   * <m-form id="form" />
   * ```
   * */
  id: string;

  /**
   * **双向绑定外置默认数据**
   * @type `object`
   * @description 当设置该值时，会使用该值作为默认数据
   * @example
   * ```ts
   * <m-form value={{ name: "张三", age: 18 }} />
   * ```
   * */
  value?: {};

  /**
   * **双向绑定外置默认数据**
   * @type `object`
   * @description 当设置该值时，会使用该值作为默认数据
   * @example
   * ```ts
   * <m-form v-model:value={{ name: "张三", age: 18 }} />
   * ```
   * */
  data?: {};

  /**
   * **对比数据**
   * @type `object`
   * @description 当设置该值时，会使用该值作为对比数据
   * @example
   * ```ts
   * <m-form contrastData={{ name: "张三", age: 18 }} />
   * ```
   * */
  contrastData?: {};

  /**
   * **是否显示对比数据**
   * @type `boolean`
   * @description 当设置该值为 `true` 时，会显示对比数据
   * @description 当设置该值为 `false` 时，不会显示对比数据
   * @default false
   * @example
   * ```ts
   * <m-form showContrastData />
   * ```
   * */
  alwaysContrast?: boolean;

  /**
   * **单行分栏**
   * @type 1 | 2 | 3 | 4
   * @description 当设置该值为 `1` 时，会显示占行1/4栏
   * @description 当设置该值为 `2` 时，会显示占行2/4栏
   * @description 当设置该值为 `3` 时，会显示占行3/4栏
   * @description 当设置该值为 `4` 时，会显示占行4/4栏
   * @default 1
   * @example
   * ```ts
   * <m-form span="1" />
   * ```
   * */
  // span?: 1 | 2 | 3 | 4;

  /**
   * **外置选择框选项**
   * @type `MOptionType.Form`
   * @description 当设置该值时，会使用该值作为外置选择框选项
   * */
  exOptions?: MOptionType.Form;

  /**
   * **是否使用校验**
   * @type `boolean`
   * @default true
   * @description 当设置该值为 `true` 时，会使用校验
   * @description 当设置该值为 `false` 时，不会使用校验
   * @default true
   * @example
   * ```ts
   * <m-form useRequired />
   * ```
   * */
  useRequired?: boolean;

  /**
   * **标题宽度**
   * @type `number` | `string`
   * @description 当设置该值为 `number` 时，会使用该值作为标题宽度
   * @description 当设置该值为 `string` 时，会使用该值作为标题宽度
   * @default 0
   * @example
   * ```ts
   * <m-form labelWidth="100px" />
   * ```
   * */
  labelWidth?: number | string;

  /**
   * **Label显示位置**
   * @type `left` | `right`
   * @description 当设置该值为 `left` 时，会使用该值作为Label显示位置
   * @description 当设置该值为 `right` 时，会使用该值作为Label显示位置
   * @default left
   * @example
   * ```ts
   * <m-form labelPosition="left" />
   * ```
   * */
  labelPosition?: "left" | "right";

  /**
   * **表单结构**
   * @type `Array<MStructureType.Form>`
   * @description 当设置该值为 `Array<MStructureType.Form>` 时，会使用该值作为表单结构
   * @example
   * ```ts
   * <m-form structure={[{ label: "姓名", prop: "name" }]} />
   * ```
   * */
  structure: Array<MStructureType.Form>;

  /**
   * **外置表单校验规则**
   * @type `{ [x: string]: Array<FormItemRule> }`
   * @description 当设置该值为 `{ [x: string]: Array<FormItemRule> }` 时，会使用该值作为外置表单校验规则
   * @example
   * ```ts
   * <m-form exRules={{ name: [{ required: true, message: "姓名不能为空" }] }} />
   * ```
   * */
  exRules?: { [x: string]: Array<{ validator: (params: { rule: any; value: any; callback: any }) => void; trigger: string }> };

  /**
   * **强制表单不可编辑**
   * @type `boolean`
   * @description 当设置该值为 `true` 时，会强制表单不可编辑
   * @description 当设置该值为 `false` 时，不会强制表单不可编辑
   * @default false
   * @example
   * ```ts
   * <m-form disabled />
   * ```
   * */
  disabled?: boolean;

  /**
   * **纯展示模式**
   * @type `boolean`
   * @description 当设置该值为 `true` 时，会使用纯展示模式
   * @description 当设置该值为 `false` 时，不会使用纯展示模式
   * @default false
   * @example
   * ```ts
   * <m-form display />
   * ```
   * */
  display?: boolean;

  /**
   * **额外的样式**
   * @type `string`
   * @description 当设置该值时，会使用该值作为额外的样式
   * @example
   * ```ts
   * <m-form exClass="ex-class" />
   * ```
   * */
  exClass?: string;

  /**
   * **是否使用角色配置**
   * @type `boolean`
   * @description 当设置该值为 `true` 时，会使用角色配置
   * @description 当设置该值为 `false` 时，不会使用角色配置
   * @default false
   * @example
   * ```ts
   * <m-form useRules />
   * ```
   * */
  useRules?: boolean;

  /**
   * **是否使用上标题**
   * @type `boolean`
   * @description 当设置该值为 `true` 时，会使用上标题
   * @description 当设置该值为 `false` 时，不会使用上标题
   * @default true
   * @example
   * ```ts
   * <m-form useTopTitle />
   * ```
   * */
  useTopTitle?: boolean;

  /**
   * **使用上标题位置**
   * @type `"center"`
   * @description 当设置该值为 `"center"` 时，会使用标题位置为居中
   * @default center
   * */
  titlePosition?: "" | "center";

  /**
   * **外置配置依赖**
   * @type `exDependentType`
   * @type `exDependentType.disabledRule` `{ [x: string]: (value) => boolean }`
   * @type `exDependentType.fileData` `{ [x: string]: object }`
   * @type `exDependentType.remoteMethod` `{ [x: string]: (value) => Promise<MOptionType.Select[]> }`
   * @type `exDependentType.disabledDateFn` `{ [x: string]: (value) => boolean }`
   * @description 当设置该值为 `exDependentType` 时，会使用该值作为外置配置依赖
   * @example
   * ```ts
   * <m-form exDependent={{ disabledRule: { name: (value) => value === "张三" } }} />
   * ```
   * */
  exDependent?: {
    disabledRule?: { [x: string]: (value) => boolean };
    fileData?: { [x: string]: object };
    remoteMethod?: { [x: string]: (value) => Promise<MOptionType.Select[]> };
    disabledDateFn?: { [x: string]: (value) => boolean };
  };

  /**
   * **使用外置单元**
   * @type `boolean`
   * @description 当设置该值为 `true` 时，会使用外置单元
   * @description 当设置该值为 `false` 时，不会使用外置单元
   * @default false
   * @example
   * ```ts
   * <m-form useAlone />
   * ```
   * */
  useAlone?: boolean;
  // roles?: string[]; // 外置角色规则

  /**
   * **单行最大分栏**
   * @type 1 | 2 | 3 | 4
   * @description 当设置该值为 `1` 时，一行最多显示1栏
   * @description 当设置该值为 `2` 时，一行最多显示2栏
   * @description 当设置该值为 `3` 时，一行最多显示3栏
   * @description 当设置该值为 `4` 时，一行最多显示4栏
   * @default 1
   * @example
   * ```ts
   * <m-form maxSpan="1" />
   * ```
   * */
  maxSpan?: 1 | 2 | 3 | 4;

  /**
   * **单行强制分栏**
   * @type 1 | 2 | 3 | 4
   * @description 当设置该值为 `1` 时，一行强制显示1栏
   * @description 当设置该值为 `2` 时，一行强制显示2栏
   * @description 当设置该值为 `3` 时，一行强制显示3栏
   * @description 当设置该值为 `4` 时，一行强制显示4栏
   * @default 1
   * @example
   * ```ts
   * <m-form exSpan="1" />
   * ```
   * */
  exSpan?: 1 | 2 | 3 | 4;

  /**
   * **当表单数据发生变化时触发**
   * @type `(value) => void`
   * @description 当设置该值为 `(value) => void` 时，会使用该值作为回调函数
   * @example
   * ```ts
   * <m-form onChange={(value) => { console.log(value) }} />
   * ```
   * */
  onCellBack?: (value) => void;

  /**
   * **当表单 `单元素` 数据发生变化时触发**
   * @type `(prop, value) => void`
   * @type `prop` `string` 表单结构唯一Key
   * @type `value` `Array<number | string>` | `number` | `string` `单元素`数据
   * @type `oldValue` `Array<number | string>` | `number` | `string` `单元素`旧数据
   * @description 当设置该值为 `(prop, value, oldValue) => void` 时，会使用该值作为回调函数
   * @example
   * ```ts
   * <m-form onCellChange={(prop, value, oldValue) => { console.log(prop, value, oldValue) }} />
   * ```
   * */
  onCellChange?: (prop, value, oldValue) => void;
};

type BaseType = {
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
   * **多语言表单项提示**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为表单项提示
   * */
  languageTip?: {
    [key: "en-US" | "zh-CN"]: string;
  };

  /**
   * **多语言表单单元**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为表单单元
   * */
  languageUnitName?: {
    [key: "en-US" | "zh-CN"]: string;
  };

  /**
   * **多语言表单项占位符**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为表单项占位符
   * */
  languagePlaceholder?: {
    [key: "en-US" | "zh-CN"]: string;
  };

  /**
   * **表单项提示**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为表单项提示
   * */
  tip?: string | { [key: "en-US" | "zh-CN"]: string };

  /**
   * **表单项占位符**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为表单项占位符
   * */
  placeholder?: Record<languageKey, string> | string;

  /**
   * **是否禁用**
   * @type `boolean`
   * @description 当设置该值为 `true` 时，会禁用该表单项
   * @description 当设置该值为 `false` 时，不会禁用该表单项
   * @default false
   * */
  disabled?: boolean;

  /**
   * **是否编辑**
   * @type `boolean`
   * @description 当设置该值为 `true` 时，会显示编辑状态
   * @description 当设置该值为 `false` 时，会显示查看状态
   * @default true
   * */
  isEdit?: boolean;

  /**
   * **自动划组时使用名**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为自动划组时使用名
   * */
  unitName?: string | { [key: "en-US" | "zh-CN"]: string };

  /**
   * **自动划组时提示**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为自动划组时提示
   * */
  unitTip?: string | { [key: "en-US" | "zh-CN"]: string };

  /**
   * **外置校验规则**
   * @type `Array<FormItemRule>` | `string`
   * @description 当设置该值为 `Array<FormItemRule>` 时，会使用该值作为外置校验规则
   * @description 当设置该值为 `string` 时，会使用该值作为外置校验规则
   * @example
   * ```ts
   * <MoForm rules={[{ required: true, message: "必填项" }]} />
   * ```
   * */
  rules?:
    | Array<
        FormItemRule & {
          languageMessage?: {
            [key: "en-US" | "zh-CN"]: string;
          };
        }
      >
    | string;

  /**
   * **单行分栏**
   * @type 1 | 2 | 3 | 4
   * @description 当设置该值为 `1` 时，会显示占行1/4栏
   * @description 当设置该值为 `2` 时，会显示占行2/4栏
   * @description 当设置该值为 `3` 时，会显示占行3/4栏
   * @description 当设置该值为 `4` 时，会显示占行4/4栏
   * @default 1
   * */
  span?: 1 | 2 | 3 | 4;

  /**
   * **额外样式**
   * @type `Record<string, string>`
   * @description 当设置该值为 `Record<string, string>` 时，会使用该值作为额外样式
   * */
  exStyles?: {
    style?: Record<string, string>;
    message?: string;
    class?: string;
    messageClass?: string;
    messageStyle?: Record<string, string>;
  };
};

export type MFormChildType = BaseType & StrictUnion<CellItemType | OtherType>;

export type MFormItemType = BaseType & StrictUnion<CellItemType | GroupType | OtherType | TabsType>;

export type MFormRef = {
  /**
   * **校验并获取表格数据**
   * @type `(step?: "check") => objectType | false | null`
   * @description 当设置该值为 `(step?: "check") => objectType | false | null` 时，会使用该值作为回调函数
   * @description 当设置执行参数值为 `check` 时，会执行数据对比，如果对数据无变化，则会返回 `null`
   * @description 当设置执行参数值为 `undefined` 时，会执行数据校验，如果校验通过，则会返回表格数据
   * @description 当设置执行参数值为 `undefined` 时，会执行数据校验，如果校验失败，则会返回 `false`
   * @example
   * ```tsx
   * <MoForm ref={formRef} />
   * ```
   * ```tsx
   * formRef.value.getSubmitForm()  // 校验并获取表格数据
   * ```
   * */
  getSubmitForm?: (step?: "check") => objectType | false | null;

  /**
   * **清除表单所有数据**
   * @type `() => void`
   * @description 当设置该值为 `() => void` 时，会使用该值作为回调函数
   * @example
   * ```tsx
   * <MoForm ref={formRef} />
   * ```
   * ```tsx
   * formRef.value.cleanAll()  // 清除表单所有数据
   * ```
   * */
  cleanAll?: () => void;

  /**
   * **替换表单结构**
   * @type `(key: string, data: MFormItemType) => void`
   * @type `key` `string` 需要替换的 `prop`
   * @type `data` `MFormItemType` 替换后的表单结构
   * @description 当设置该值为 `(key: string, data: MFormItemType) => void` 时，会使用该值作为回调函数
   * @example
   * ```tsx
   * <MoForm ref={formRef} />
   * ```
   * ```tsx
   * formRef.value.resetStructure("key", {})
   * ```
   * */
  resetStructure?: (key: string, data: MFormItemType) => void;
};
// type InGroupType = GroupType & {
//   groupFormConfig: (GroupFromConfigType & { spanStyle?: spanStyleType })[];
// };

// >-------------> 分栏类型配置 <------------<

// type InTabsType = TabsType & {
//   tabsFormConfig: (MFormChildType & { spanStyle?: spanStyleType })[];
// };

// >-------------> InFormType <------------<
// export type InFormItemType = BaseType &
//   StrictUnion<CellItemType | InGroupType | InTabsType | OtherType> & { spanStyle: spanStyleType };

type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any ? Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> & T : never;
type StrictUnion<T> = StrictUnionHelper<T, T>;

export type ExMultipleConfigType = MFormItemType & {
  inMultipleConfig?: MultipleConfigType[];
  tabsFormConfig?: MFormChildType[];
};

export type MultipleConfigType = {
  unitName?: string; // 自动划组时使用名
  unitTip?: string; // 自动划组时提示
  configs: MFormItemType[];
};

// export interface GlobalState {
//   addressMap: objectType;
//   addressMapLoading: boolean;
// }

export type labelPropsType = {
  tip?: string;
  label?: string;
  labelWidth?: number;
  labelPosition?: "left" | "right";
  item: InFormItemType;
  data: {};
};
