// # type
export type MTabsType = {
  /**
   * **自定义id**
   * @type `string`
   * @default `undefined`
   * @description 当设置该值时，会添加到组件的id中
   * */
  id?: string;

  /**
   * **双向绑定值**
   * @type `string`
   * @default `undefined`
   * @description 当设置该值时，会绑定该值
   * */
  modelValue?: string;

  /**
   * **自定义样式**
   * @type `Record<string, string>`
   * @default `undefined`
   * @description 当设置该值时，会添加到组件的样式中
   * @description 该值的类型为 `Record<string, string>`，可以是任意类型
   * */
  style?: Record<string, string>;

  /**
   * **隐藏tabs方式**
   * @type `display` | `visible`
   * @default `visible`
   * @description 当设置该值为 `display` 时，会隐藏tabs内容元素
   * @description 当设置该值为 `visible` 时，不会隐藏tabs内容元素
   * @example
   * ```tsx
   * <MoTabs mode="display" />
   * ```
   * */
  mode?: "display" | "visible";

  /**
   * **是否使用完整高度**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用完整高度
   * @description 当设置该值为 `false` 时，不会使用完整高度
   * @example
   * ```tsx
   * <MoTabs useFull={true} />
   * ```
   * */
  useFull?: boolean;

  /**
   * **使用卡片样式**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用卡片样式
   * @description 当设置该值为 `false` 时，不会使用卡片样式
   * @example
   * ```tsx
   * <MoTabs card={true} />
   * ```
   * */
  card?: boolean;

  /**
   * **使用左侧栏布局**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用左侧栏布局
   * @description 当设置该值为 `false` 时，不会使用左侧栏布局
   * @example
   * ```tsx
   * <MoTabs portrait={true} />
   * ```
   * */
  portrait?: boolean;

  /**
   * **使用滚动布局**
   *  @type `boolean`
   *  @default `false`
   *  @description 当设置该值为 `true` 时，会使用滚动布局
   *  @description 当设置该值为 `false` 时，不会使用滚动布局
   *  @example
   *  ```tsx
   *  <MoTabs slider={true} />
   *  ```
   *  */
  slider?: boolean;

  /**
   * **是否使用底线**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用底线
   * @description 当设置该值为 `false` 时，不会使用底线
   * @example
   * ```tsx
   * <MoTabs useHeaderLine={true} />
   * ```
   * */
  useHeaderLine?: boolean;

  /**
   * **是否使用滚动阴影**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会使用滚动阴影
   * @description 当设置该值为 `false` 时，不会使用滚动阴影
   * @example
   * ```tsx
   * <MoTabs useShadow={true} />
   * ```
   * */
  useShadow?: boolean;

  /**
   * **是否使用黏性布局**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用黏性布局
   * @description 当设置该值为 `false` 时，不会使用黏性布局
   * @example
   * ```tsx
   * <MoTabs useSticky={true} />
   * ```
   * */
  useSticky?: boolean;

  /**
   * **Tab变更回调**
   * @type `({ name: string, index: number }) => void` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `({ name: string, index: number }) => void` 时，会使用该值作为Tab变更回调
   * @description 当设置该值为 `undefined` 时，不会使用Tab变更回调
   * @example
   * ```tsx
   * <MoTabs onTabChange={(name, index) => { console.log(name, index) }} />
   * ```
   * */
  onTabChange?: ({ name: string, index: number }) => void;
};

export type MTabsItemType = {
  /**
   * **Tab名称**
   * @type `number` | `string`
   * @description 当设置该值为 `number` 时，会使用该值作为Tab名称
   * @description 当设置该值为 `string` 时，会使用该值作为Tab名称
   * @example
   * ```tsx
   * <MoTabsItem label="Tab1" />
   * ```
   * */
  label: number | string;

  /**
   * **Tab唯一Key**
   * @type `number` | `string`
   * @description 当设置该值为 `number` 时，会使用该值作为Tab唯一Key
   * @description 当设置该值为 `string` 时，会使用该值作为Tab唯一Key
   * @example
   * ```tsx
   * <MoTabsItem name="Tab1" />
   * ```
   * */
  name: number | string;

  /**
   * **是否开启滚动**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会开启滚动
   * @description 当设置该值为 `false` 时，不会开启滚动
   * @example
   * ```tsx
   * <MoTabsItem scroll={true} />
   * ```
   * */
  scroll?: boolean;

  /**
   * **提示**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为提示
   * @example
   * ```tsx
   * <MoTabsItem tips="提示信息" />
   * ```
   * */
  tips?: string;

  /**
   * **懒加载**
   * @type `boolean` | `number`
   * @default `1000`
   * @description 当设置该值为 `true` 时，该组件会懒加载
   * @description 当设置该值为 `false` 时，该组件不会懒加载
   * @description 当设置该值为 `number` 时，该组件会懒加载，延迟加载时间为该值
   * @example
   * ```tsx
   * <MoTabsItem lazy={true} />
   * <MoTabsItem lazy={1000} />
   * ```
   * */
  lazy?: boolean | number;
};

export type MTabsItemTitleType = {
  slots: any;
  activeName: string;
  changeTabs: any;
  card: boolean;
  portrait: boolean;
};
