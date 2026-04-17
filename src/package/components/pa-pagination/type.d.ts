export interface PaPaginationType {
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
   * @description 当设置该值时，会添加到组件的类名中
   * @description 该值的类型为 `string`，可以是任意类型
   * */
  class?: string;

  /**
   * **自定义样式**
   * @type `Record<string, string>`
   * @default `undefined`
   * @description 当设置该值时，会添加到组件的样式中
   * @description 该值的类型为 `Record<string, string>`，可以是任意类型
   * */
  style?: Record<string, string>;

  /**
   * **分页组件当前页码**
   * @type `number`
   * @description 分页组件当前页码
   * @example
   * ```ts
   * <pa-pagination current-page="1" :total="100" :page-size="10"></pa-pagination>
   * ```
   * */
  currentPage?: number;

  /**
   * **分页组件每页显示数量**
   * @type `number`
   * @description 分页组件每页显示数量
   * @example
   * ```ts
   * <pa-pagination current-page="1" :total="100" :page-size="10"></pa-pagination>
   * ```
   * */
  pageSize?: number;

  /**
   * **分页组件总条数**
   * @type `number`
   * @description 分页组件总条数
   * @example
   * ```ts
   * <pa-pagination current-page="1" :total="100" :page-size="10"></pa-pagination>
   * ```
   * */
  total: number;

  /**
   * **分页组件每页显示数量选择器的选项设置**
   * @type `number[]`
   * @description 分页组件每页显示数量选择器的选项设置
   * @example
   * ```ts
   * <pa-pagination current-page="1" :total="100" :page-size="10" :page-sizes="[10, 20, 30, 40, 50, 100]"></pa-pagination>
   * ```
   * */
  pageSizes?: number[];

  /**
   * **分页组件页码按钮的数量**
   * @type `number`
   * @description 分页组件页码按钮的数量
   * @example
   * ```ts
   * <pa-pagination current-page="1" :total="100" :page-size="10" :pager-count="7"></pa-pagination>
   * ```
   * */
  pagerCount?: number;

  /**
   * **分页组件是否为分页按钮添加背景色**
   * @type `boolean`
   * @description 分页组件是否为分页按钮添加背景色
   * @example
   * ```ts
   * <pa-pagination current-page="1" :total="100" :page-size="10" :pager-count="7" :background="true"></pa-pagination>
   * ```
   * */
  background?: boolean;

  /**
   * **分页组件组件布局，子组件名用逗号分隔**
   * @type `string`
   * @description 分页组件组件布局，子组件名用逗号分隔
   * @example
   * ```ts
   * <pa-pagination current-page="1" :total="100" :page-size="10" :pager-count="7" :background="true" layout="total, sizes, prev, pager, next, jumper"></pa-pagination>
   * ```
   * */
  layout?: string;

  /**
   * **分页组件是否禁用**
   * @type `boolean`
   * @description 分页组件是否禁用
   * @example
   * ```ts
   * <pa-pagination current-page="1" :total="100" :page-size="10" :pager-count="7" :background="true" layout="total, sizes, prev, pager, next, jumper" :disabled="true"></pa-pagination>
   * ```
   * */
  disabled?: boolean;
}
