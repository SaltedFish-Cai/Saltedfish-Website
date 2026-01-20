export type MTimeType = {
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
   * @type `Array<string>` | `string`
   * @default `undefined`
   * @description 当设置该值时，会绑定该值
   * @description 该值的类型为 `Array<string>` | `string`，可以是任意数组，包括空数组
   * */
  modelValue: string[] | string;

  /**
   * **Time 类型**
   * @type `date-picker-group` | `date-picker` | `date-time-range` | `month-picker-group` | `month-picker` | `time-picker-group` | `time-picker` | `year-picker-group` | `year-picker`
   * @default `date-picker-group`
   * @description 当设置该值为 `date-picker-group` 时，会显示日期选择器组
   * @description 当设置该值为 `date-picker` 时，会显示日期选择器
   * @description 当设置该值为 `date-time-range` 时，会显示日期时间范围选择器
   * @description 当设置该值为 `month-picker-group` 时，会显示月份选择器组
   * @description 当设置该值为 `month-picker` 时，会显示月份选择器
   * @description 当设置该值为 `time-picker-group` 时，会显示时间选择器组
   * @description 当设置该值为 `time-picker` 时，会显示时间选择器
   * @description 当设置该值为 `year-picker-group` 时，会显示年份选择器组
   * @description 当设置该值为 `year-picker` 时，会显示年份选择器
   * @example
   * ```tsx
   * <MTime type="date-picker" />
   * ```
   * @example
   * ```tsx
   * <MTime type="date-time-range" />
   * ```
   * */
  type?:
    | "date-picker-group"
    | "date-picker"
    | "date-time-range"
    | "month-picker-group"
    | "month-picker"
    | "time-picker-group"
    | "time-picker"
    | "year-picker-group"
    | "year-picker";

  /**
   * **纯展示模式**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用纯展示模式
   * @description 当设置该值为 `false` 时，不会使用纯展示模式
   * @example
   * ```tsx
   * <MTime display={true} />
   * ```
   * */
  display?: boolean;

  /**
   * **占位字符串**
   * @type `string`
   * @default `请选择`
   * @description 当设置该值为 `string` 时，会使用该值作为占位字符串
   * @example
   * ```tsx
   * <MTime placeholder="请选择日期" />
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
   * <MTime disabled={true} />
   * ```
   * */
  disabled?: boolean;

  /**
   * **组件尺寸**
   * @type `default` | `large` | `small`
   * @default `default`
   * @description 当设置该值为 `default` 时，组件为默认尺寸
   * @description 当设置该值为 `large` 时，组件为大尺寸
   * @description 当设置该值为 `small` 时，组件为小尺寸
   * @example
   * ```tsx
   * <MTime size="large" />
   * ```
   * */
  size?: "default" | "large" | "small";

  /**
   * **禁用日期判断方法**
   * @type `(date: any) => boolean` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `(date: any) => boolean` 时，会使用该值作为禁用日期判断方法
   * @description 当设置该值为 `undefined` 时，不会使用禁用日期判断方法
   * @example
   * ```tsx
   * <MTime disabledDateFn={(date) => date > moment().endOf("day")} />
   * ```
   * */
  disabledDateFn?: (date: any) => boolean;

  /**
   * **对比数据**
   * @type `Array<number | string>` | `number` | `string`
   * @default `undefined`
   * @description 当设置该值为 `Array<number | string>` 时，会使用该值作为对比数据
   * @description 当设置该值为 `number` 时，会使用该值作为对比数据
   * @description 当设置该值为 `string` 时，会使用该值作为对比数据
   * @description 当设置该值为 `undefined` 时，不会使用对比数据
   * @example
   * ```tsx
   * <MTime contrastData={["2021-01-01", "2021-01-02"]} />
   * ```
   * */
  contrastData?: string[] | string;

  /**
   * **是否显示对比数据**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会显示对比数据
   * @description 当设置该值为 `false` 时，不会显示对比数据
   * @example
   * ```tsx
   * <MTime showContrast={true} />
   * ```
   * */
  alwaysContrast?: boolean;

  /**
   * **当数据发生变更时触发**
   * @type `({ value, oldValue }) => void` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `({ value, oldValue }) => void` 时，会使用该值作为回调函数
   * @description 当设置该值为 `undefined` 时，不会使用回调函数
   * @example
   * ```tsx
   * <MTime onChange={({value, oldValue}) => { console.log(value, oldValue) }} />
   * ```
   * */
  onChange?: ({ value, oldValue }) => void;

  /**
   * **在组件 Input 获得焦点时触发**
   * @type `({ value }) => void` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `({ value }) => void` 时，会使用该值作为回调函数
   * @description 当设置该值为 `undefined` 时，不会使用回调函数
   * @example
   * ```tsx
   * <MTime onFocus={({value}) => { console.log(value) }} />
   * ```
   * */
  onFocus?: ({ value }) => void;

  /**
   * **	在组件 Input 失去焦点时触发**
   * @type `({ value }) => void` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `({ value, oldValue }) => void` 时，会使用该值作为回调函数
   * @description 当设置该值为 `undefined` 时，不会使用回调函数
   * @example
   * ```tsx
   * <MTime onBlur={({value}) => { console.log(value) }} />
   * ```
   * */
  onBlur?: ({ value }) => void;
};
