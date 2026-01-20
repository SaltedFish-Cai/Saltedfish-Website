import { MOptionType } from "MTypes";

export type MCascaderType = {
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
   * @type `Array<number | string>` | `number` | `string`
   * @default `undefined`
   * @description 当设置该值时，会绑定该值
   * @description 该值的类型为 `Array<number | string>` | `number` | `string`，可以是任意类型
   * @description 当前属性只有作为 `独立组件` 时才会生效
   * @example
   * ```tsx
   * <MoCascader modelValue={["1", "2"]} />
   * ```
   * */
  modelValue?: Array<number | string> | number | string; // 绑定值

  /**
   * **纯展示数据**
   * @type `Array<number | string>` | `number` | `string`
   * @default `undefined`
   * @description 当设置该值时，会显示该值
   * @description 该值的类型为 `Array<number | string>` | `number` | `string`，可以是任意类型
   * @example
   * ```tsx
   * <MoCascader displayValue={["1", "2"]} />
   * ```
   * */
  displayValue?: string;

  /**
   * **Cascader 类型**
   * @type `cascader` | `multiple-cascader` | `cascader-check` | `multiple-cascader-check`
   * @default `cascader`
   * @description 当设置该值时，会显示指定类型的级联选择器
   * @description 该值的类型为 `cascader` | `multiple-cascader` | `cascader-check` | `multiple-cascader-check`
   * @description 该值的默认值为 `cascader`
   * @description 当设置该值为 `cascader` 时，会显示级联选择器
   * @description 当设置该值为 `multiple-cascader` 时，会显示多选级联选择器
   * @description 当设置该值为 `cascader-check` 时，会显示级联选择器
   * @description 当设置该值为 `multiple-cascader-check` 时，会显示多选级联选择器
   * @example
   * ```tsx
   * <MoCascader type="cascader" />
   * ```
   * @example
   * ```tsx
   * <MoCascader type="multiple-cascader" />
   * ```
   * */
  type?: "cascader-check" | "cascader" | "multiple-cascader-check" | "multiple-cascader";

  /**
   * **外置数据**
   * @type `Array<MOptionType.Select>`
   * @default `undefined`
   * @description 当设置该值时，会使用该值作为配置数据
   * @description 该值的类型为 `Array<MOptionType.Select>`，可以是任意类型
   * @example
   * ```tsx
   * <MoCascader exOptions={[{ label: "选项1", value: "1" }]} />
   * ```
   * */
  exOptions?: Array<MOptionType.Select>;

  /**
   * **占位字符串**
   * @type `string`
   * @default `请选择`
   * @description 当设置该值时，会显示该字符串
   * @description 该值的类型为 `string`，可以是任意类型
   * @example
   * ```tsx
   * <MoCascader placeholder="请选择" />
   * ```
   * */
  placeholder?: string;

  /**
   * **是否显示清除按钮**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会显示清除按钮
   * @description 当设置该值为 `false` 时，不会显示清除按钮
   * @example
   * ```tsx
   * <MoCascader clearable />
   * ```
   * */
  clearable?: boolean;

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
   * **是否使用Tag合并选项**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会使用Tag合并选项
   * @description 当设置该值为 `false` 时，不会使用Tag合并选项
   * @example
   * ```tsx
   * <MoCascader collapseTags />
   * ```
   * */
  collapseTags?: boolean;

  /**
   * **使用Tag合并选项最大数量**
   * @type `number`
   * @default `1`
   * @description 当设置该值为 `number` 时，会使用该值作为最大数量
   * @description 当设置该值为 `undefined` 时，该值无效
   * @description 当设置该值为 `number` 时，会使用该值作为最大数量
   * @example
   * ```tsx
   * <MoCascader collapseTags maxCollapseTags={2} />
   * ```
   * */
  maxCollapseTags?: number;

  /**
   * **纯展示模式**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用纯展示模式
   * @description 当设置该值为 `false` 时，不会使用纯展示模式
   * @example
   * ```tsx
   * <MoCascader display={true} />
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
   * <MoCascader size="large" />
   * ```
   * */
  size?: "default" | "large" | "small";

  /**
   * **对比数据**
   * @type `Array<number | string>` | `number` | `string`
   * @description 当设置该值时，会使用该值作为对比数据
   * @description 该值的类型为 `Array<number | string>` | `number` | `string`，可以是任意类型
   * @example
   * ```tsx
   * <MoCascader contrastData={[1, 2, 3]} />
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
   * <MoCascader contrast={true} />
   * ```
   * */
  alwaysContrast?: boolean;

  /**
   * **级联选择器配置项**
   * @type `CascaderProps`
   * @description 当设置该值时，会使用该值作为级联选择器配置项
   * @description 该值的类型为 `CascaderProps`，可以是任意类型
   * @example
   * ```tsx
   * <MoCascader optionsProps={{}} />
   * ```
   * */
  optionsProps?: CascaderProps;

  /**
   * **是否显示所有级别的选项**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会显示所有级别的选项
   * @description 当设置该值为 `false` 时，不会显示所有级别的选项
   * @example
   * ```tsx
   * <MoCascader showAllLevels={true} />
   * ```
   * */
  showAllLevels?: boolean;

  /**
   * **当数据发生变更时触发**
   * @type `({ value, oldValue }) => void` | `undefined`
   * @type `value` 为当前值
   * @type `oldValue` 为旧值
   * @description 当数据发生变更时触发
   * @description 该值的类型为 `({ value, oldValue }) => void` | `undefined`
   * @description 当设置该值为 `({ value, oldValue }) => void` 时，会使用该值作为回调函数
   * @description 当设置该值为 `undefined` 时，不会触发回调函数
   * @example
   * ```tsx
   * <MoCascader onChange={({value, oldValue}) => { console.log(value, oldValue) }} />
   * ```
   * */
  onChange?: ({ value, oldValue }) => void;
};
