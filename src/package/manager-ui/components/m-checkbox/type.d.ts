import { MOptionType } from "MTypes";

export type MCheckboxType = {
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
   * @description 当前属性只有作为 `独立组件` 时才会生效
   * @description 该值的类型为 `boolean` | `number` | `string`，可以是任意类型
   * */
  modelValue?: Array<number | string>;

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
   * **外置数据**
   * @type `Array<MOptionType.Select>`
   * @description 当设置该值时，会使用该值作为配置数据
   * @description 该值的类型为 `Array<MOptionType.Select>`，可以是任意类型
   * */
  exOptions?: Array<MOptionType.Select>;

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
   * @type `Array<number | string>`
   * @description 当设置该值时，会使用该值作为对比数据
   * @description 该值的类型为 `Array<number | string>`，可以是任意类型
   * @example
   * ```tsx
   * <MSwitch contrastData={[1, 2, 3]} />
   * ```
   * */
  contrastData?: Array<number | string>;

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
   * @description 当设置该值时，会使用该值作为回调函数
   * @description 该值的类型为 `({ value, oldValue }) => void` | `undefined`，可以是任意类型
   * @example
   * ```tsx
   * <MSwitch onChange={({value, oldValue}) => { console.log(value, oldValue) }} />
   * ```
   * */
  onChange?: ({ value, oldValue }) => void;
};
