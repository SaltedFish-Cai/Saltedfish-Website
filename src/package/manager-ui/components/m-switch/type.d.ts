export type MSwitchType = MSwitchOptionType & {
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
   * @type `boolean` | `number` | `string`
   * @default `undefined`
   * @description 当设置该值时，会绑定该值
   * @description 该值的类型为 `boolean` | `number` | `string`，可以是任意类型
   * */
  modelValue?: boolean | number | string;

  /**
   * **是否禁用**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会禁用该组件
   * @description 当设置该值为 `false` 时，不会禁用该组件
   * @example
   * ```tsx
   * <MSwitch disabled={true} />
   * ```
   * */
  disabled?: boolean;

  /**
   * **外部配置数据**
   * @type `MoSwitchOptionType`
   * @default `undefined`
   * @description 当设置该值时，会使用该值作为配置数据
   * @description 该值的类型为 `MoSwitchOptionType`，可以是任意类型
   * @example
   * ```tsx
   * <MSwitch exOptions={{ activeValue: true, inActiveValue: false }} />
   * ```
   * */
  exOptions?: MSwitchOptionType;

  /**
   * **纯展示模式**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用纯展示模式
   * @description 当设置该值为 `false` 时，不会使用纯展示模式
   * @example
   * ```tsx
   * <MSwitch display={true} />
   * ```
   * */
  display?: boolean;

  /**
   * **组件尺寸**
   * @type `default` | `large` | `small`
   * @default `default`
   * @description 当设置该值为 `default` 时，组件为默认尺寸
   * @description 当设置该值为 `large` 时，组件为大尺寸
   * @description 当设置该值为 `small` 时，组件为小尺寸
   * @example
   * ```tsx
   * <MSwitch size="large" />
   * ```
   * */
  size?: "default" | "large" | "small";

  /**
   * **对比数据**
   * @type `boolean` | `number` | `string`
   * @default `undefined`
   * @description 当设置该值为 `boolean` | `number` | `string` 时，会使用该值作为对比数据
   * @description 当设置该值为 `undefined` 时，不会使用对比数据
   * @example
   * ```tsx
   * <MSwitch contrastData={true} />
   * ```
   * */
  contrastData?: boolean | number | string;

  /**
   * **是否显示对比数据**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会显示对比数据
   * @description 当设置该值为 `false` 时，会更具对比数据的结果来决定是否显示对比数据
   * @example
   * ```tsx
   * <MSwitch alwaysContrast={true} />
   * ```
   * */
  alwaysContrast?: boolean;

  /**
   * **当数据发生变更时触发**
   * @type `({ value, oldValue }) => void` | `undefined`
   * @type `value` 为当前值
   * @type `oldValue` 为旧值
   * @default `undefined`
   * @description 当设置该值为 `({ value, oldValue }) => void` 时，会使用该值作为回调函数
   * @description 当设置该值为 `undefined` 时，不会使用回调函数
   * @example
   * ```tsx
   * <MSwitch onChange={({ value, oldValue }) => { console.log(value, oldValue) }} />
   * ```
   * */
  onChange?: ({ value, oldValue }) => void;
};

export type MSwitchOptionType = {
  /**
   * **打开值**
   * @type `boolean` | `number` | `string`
   * */
  activeValue?: boolean | number | string;

  /**
   * **关闭值**
   * @type `boolean` | `number` | `string`
   * */
  inActiveValue?: boolean | number | string;

  /**
   * **打开标题**
   * @type `boolean` | `number` | `string`
   * */
  activeText?: string;

  /**
   * **多语言打开标题**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为打开标题
   * */
  languageActiveText?: {
    [key: "en-US" | "zh-CN"]: string;
  };

  /**
   * **关闭标题**
   * @type `boolean` | `number` | `string`
   * */
  inActiveText?: string;

  /**
   * **多语言关闭标题**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为关闭标题
   * */
  languageInActiveText?: {
    [key: "en-US" | "zh-CN"]: string;
  };
};

export type MSelectOptionsType = {
  /**
   * **数据标题**
   * @type `string`
   * */
  label: string;

  /**
   * **数据值**
   * @type `boolean` | `number` | `string`
   * @description 数据值的类型为 `boolean` | `number` | `string`，可以是任意类型
   * */
  value: boolean | number | string;

  /**
   * **子数据**
   * @type `Array<MSelectOptionsType>`
   * @description 子数据的类型为 `Array<MSelectOptionsType>`，可以是任意类型
   * */
  children?: Array<MSelectOptionsType>;

  /**
   * **是否禁用该选项**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，该选项将被禁用
   * @description 当设置该值为 `false` 时，该选项将不会被禁用
   * */
  disabled?: boolean;

  /**
   * **源数据**
   * @type `object`
   * @description 源数据的类型为 `object`，可以是任意类型
   * */
  base?: objectType;

  /**
   * **tag样式配置**
   * @type `object`
   * @type `bgColor` 背景颜色
   * @type `textColor` 文字颜色
   * @description tag样式配置的类型为 `object`，可以是任意类型
   * */
  tagStyle?: { bgColor?: string; textColor?: string };
};
