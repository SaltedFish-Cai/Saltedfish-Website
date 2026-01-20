// # Type

export type MNumberType = {
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
   * @type `number`
   * @default `undefined`
   * @description 当设置该值时，会绑定该值
   * @description 当前属性只有作为 `独立组件` 时才会生效
   * @description 该值的类型为 `number`，可以是任意类型
   * */
  modelValue?: number;

  /**
   * **占位字符串**
   * @type `string`
   * @default `请输入内容`
   * @description 当输入框为空时，会显示该字符串
   * @description 该值的类型为 `string`，可以是任意类型
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
   * <MNumber disabled={true} />
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
   * <MNumber display={true} />
   * */
  display?: boolean;

  /**
   * **计数器允许的最小值**
   * @type `number` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，计数器允许的最小值为 `0`
   * @description 当设置该值为 `number` 时，计数器允许的最小值为 `number`
   * */
  min?: number;

  /**
   * **计数器允许的最大值**
   * @type `number` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，计数器允许的最大值为 `Infinity`
   * @description 当设置该值为 `number` 时，计数器允许的最大值为 `number`
   * */
  max?: number;

  /**
   * **数值精度**
   * @type `number`
   * @default `0`
   * @description 当设置该值为 `0` 时，数值精度为 `0`
   * @description 当设置该值为 `1` 时，数值精度为 `0.1`
   * @description 当设置该值为 `2` 时，数值精度为 `0.01`
   * */
  precision?: number;

  /**
   * **是否显示控制器**
   * @type `boolean` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，不显示控制器
   * @description 当设置该值为 `true` 时，显示控制器
   * @description 当设置该值为 `false` 时，不显示控制器
   * */
  controls?: boolean;

  /**
   * **控制器位置**
   * @type `right` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，控制器位置为 `左右显示`
   * @description 当设置该值为 `right` 时，控制器位置为 `右侧显示`
   * */
  controlsPosition?: "" | "right";

  /**
   * **当输入框被清空时显示的值**
   * @type `number`
   * @default `0`
   * @description 当输入框被清空时显示的值
   * @description 该值的类型为 `number`，可以是任意类型
   * */
  valueOnClear?: number;

  /**
   * **计数器步长**
   * @type `number`
   * @default `1`
   * @description 计数器步长
   * @description 该值的类型为 `number`，可以是任意类型
   * */
  step?: number;

  /**
   * **严格步进**
   * @type `boolean`
   * @default `false`
   * @description 严格步进
   * @description 当设置该值为 `true` 时，计数器步长为 `step`
   * @description 当设置该值为 `false` 时，计数器步长为 `step` 的整数倍
   * */
  stepStrictly?: boolean;

  /**
   * **组件尺寸**
   * @type `default` | `large` | `small`
   * @default `default`
   * @description 当设置该值为 `default` 时，组件为默认尺寸
   * @description 当设置该值为 `large` 时，组件为大尺寸
   * @description 当设置该值为 `small` 时，组件为小尺寸
   * @example
   * ```tsx
   * <MNumber size="large" />
   * */
  size?: "default" | "large" | "small";

  /**
   * **对比数据**
   * @type `number`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，不显示对比数据
   * @description 当设置该值为 `number` 时，显示对比数据
   * @description 该值的类型为 `number`，可以是任意类型
   * */
  contrastData?: number;

  /**
   * **是否显示对比数据**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `false` 时，不显示对比数据
   * @description 当设置该值为 `true` 时，显示对比数据
   * */
  alwaysContrast?: boolean;

  /**
   * **当数据发生变更时触发**
   * @type `({ value, oldValue }) => void` | `undefined`
   * @type `value` 为当前值
   * @type `oldValue` 为旧值
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，不触发该事件
   * @description 当设置该值为 `({ value, oldValue }) => void` 时，会使用该值作为回调函数
   * @example
   * ```tsx
   * <MoCascader onChange={({value, oldValue}) => { console.log(value, oldValue) }} />
   * ```
   * */
  onChange?: ({ value, oldValue }) => void;
};
