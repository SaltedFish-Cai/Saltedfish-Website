import { MOptionType } from "MTypes";

export type MSelectType = {
  /**
   * **组件唯一标识**
   * @type `string` | `undefined`
   * @default `undefined`
   * @description 当设置该值时，会作为组件的唯一标识
   * @description 该值的类型为 `string`，可以是任意类型，但是建议不要重复
   * */
  id?: string;

  /**
   * **双向绑定值**
   * @type `Array<number | string>` | `number` | `string` | `boolean`
   * @default `undefined`
   * @description 当设置该值时，会绑定该值
   * @description 该值的类型为 `Array<number | string>` | `number` | `string` | `boolean`，可以是任意类型
   * */
  modelValue?: Array<number | string> | number | string;

  /**
   * **纯展示数据**
   * @type `string`
   * @default `undefined`
   * @description 当设置该值时，会显示该值
   * @description 该值的类型为 `string`，可以是任意类型
   * */
  displayValue?: string;

  /**
   * **类型**
   * @type `multiple-online-select` | `multiple-request-select` | `multiple-select` | `online-select` | `request-select` | `select`
   * @default `select`
   * @description 当设置该值时，会使用该值作为类型
   * - 当设置该值为 `multiple-online-select` 时，需要配置 `requestApi` 接口
   * - 当设置该值为 `multiple-request-select` 时，需要配置 `requestApi` 接口
   * - 当设置该值为 `online-select` 时，需要配置 `requestApi` 接口
   * - 当设置该值为 `request-select` 时，需要配置 `requestApi` 接口
   * @example
   * ```tsx
   * <MoSelect type="multiple-online-select" />
   * ```
   * */
  type?: "multiple-online-select" | "multiple-request-select" | "multiple-select" | "online-select" | "request-select" | "select";

  /**
   * **外置数据**
   * @type `Array<MOptionType.Select>`
   * @description 当设置该值时，会使用该值作为配置数据
   * @description 该值的类型为 `Array<MOptionType.Select>`，可以是任意类型
   * @example
   * ```tsx
   * <MoSelect exOptions={[]} />
   * ```
   * */
  exOptions?: Array<MOptionType.Select>;

  /**
   * **远端请求选项接口**
   * @type `({ query: string }) => Promise<Array<MOptionType.Select>>`
   * @description 当设置该值时，会使用该接口请求选项
   * @description 该值的类型为 `({ query: string }) => Promise<Array<MOptionType.Select>>`，可以是任意类型
   * @description 该接口的参数为 `{ query: string }`，返回值为 `Promise<Array<MOptionType.Select>>`
   * @example
   * ```tsx
   * <MoSelect requestApi={(query) => { return new Promise((resolve) => { resolve([]) }) }} />
   * */
  requestApi?: ({ query: string }) => Promise<Array<MOptionType.Select>>;

  /**
   * **选项KEy**
   * @type `string`
   * @default `value`
   * @description 当设置该值时，会使用该值作为选项的KEy
   * */
  optionKey?: string;

  /**
   * **占位字符串**
   * @type `string`
   * @default `请选择`
   * @description 当设置该值时，会使用该值作为占位字符串
   * @example
   * ```tsx
   * <MoSelect placeholder="请选择" />
   * ```
   * */
  placeholder?: string;

  /**
   * **是否禁用**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会禁用该组件
   * @description 当设置该值为 `false` 时，不会禁用该组件
   * @example
   * ```tsx
   * <MoSelect disabled={true} />
   * ```
   * */
  disabled?: boolean;

  /**
   * **纯展示模式**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用纯展示模式
   * @description 当设置该值为 `false` 时，不会使用纯展示模式
   * @example
   * ```tsx
   * <MoSelect display={true} />
   * ```
   * */
  display?: boolean;

  /**
   * **显示清除按钮**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会显示清除按钮
   * @description 当设置该值为 `false` 时，不会显示清除按钮
   * @example
   * ```tsx
   * <MoSelect clearable={true} />
   * ```
   * */
  clearable?: boolean;

  /**
   * **多选最大数量**
   * @type `number`
   * @default `0`
   * @description 当设置该值为 `number` 时，多选最大数量为 `number`
   * @description 当设置该值为 `0` 时，多选最大数量不做限制
   * @description 当设置该值为 `number` 时，多选最大数量为 `number`
   * @example
   * ```tsx
   * <MoSelect multipleLimit={2} />
   * ```
   * */
  multipleLimit?: number;

  /**
   * **是否使用Tag合并选项**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会使用Tag合并选项
   * @description 当设置该值为 `false` 时，不会使用Tag合并选项
   * @example
   * ```tsx
   * <MoSelect collapseTags={true} />
   * ```
   * */
  collapseTags?: boolean;

  /**
   * **使用Tag合并选项最大数量**
   * @type `number`
   * @default `1`
   * @description 当设置该值为 `number` 时，会使用该值作为最大数量
   * @description 当设置该值为 `0` 时，Tag合并选项不做限制
   * @description 当设置该值为 `number` 时，Tag合并选项最大数量为 `number`
   * @description 当设置该值为 `number` 时，当选项数量大于 `number` 时，会使用 `+${number}` 显示
   * @example
   * ```tsx
   * <MoSelect collapseTags maxCollapseTags={2} />
   * ```
   * */
  maxCollapseTags?: number;

  /**
   * **组件尺寸**
   * @type `default` | `large` | `small`
   * @default `default`
   * @description 当设置该值为 `default` 时，组件为默认尺寸
   * @description 当设置该值为 `large` 时，组件为大尺寸
   * @description 当设置该值为 `small` 时，组件为小尺寸
   * @example
   * ```tsx
   * <MoSelect size="large" />
   * ```
   * */
  size?: "default" | "large" | "small";

  /**
   * **对比数据**
   * @type `Array<number | string>` | `number` | `string`
   * @default `undefined`
   * @description 当设置该值时，会使用该值作为对比数据
   * @description 该值的类型为 `Array<number | string>` | `number` | `string`，可以是任意类型
   * @example
   * ```tsx
   * <MoSelect contrastData={[1, 2, 3]} />
   * ```
   * */
  contrastData?: Array<number | string> | number | string;

  /**
   * **是否显示对比数据**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会显示对比数据
   * @description 当设置该值为 `false` 时，不会显示对比数据
   * @example
   * ```tsx
   * <MoSelect contrast={true} />
   * ```
   * */
  alwaysContrast?: boolean;

  /**
   * **当数据发生变更时触发**
   * @type `({ value, oldValue }) => void` | `undefined`
   * @type `value` 为当前值
   * @type `oldValue` 为旧值
   * @type 默认值为 `undefined`
   * @type 当设置该值为 `({ value, oldValue }) => void` 时，会使用该值作为回调函数
   * @example
   * ```tsx
   * <MoSelect onChange={({value, oldValue}) => { console.log(value, oldValue) }} />
   * ```
   * */
  onChange?: ({ value, oldValue }) => void;
};
