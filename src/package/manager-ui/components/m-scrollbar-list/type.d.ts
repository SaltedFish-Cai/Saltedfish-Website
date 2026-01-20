import { ScrollbarProps } from "element-plus";

export interface ScrollbarListPropsType extends Partial<Omit<ScrollbarProps, "data">> {
  useShadow?: boolean;
  noBackTop?: boolean;
  showPagination?: boolean;

  /**
   * **请求表格数据的Api**
   * @type `(params: any, id?: string) => Promise<any> | any`
   * @param `params` 请求参数
   * @param `id` 表格的唯一ID
   * @returns `Promise<any> | any`
   * @description 当设置该值时，会使用该值作为请求表格数据的Api
   * @example
   * ```ts
   * <m-table :requestApi="requestApi"></m-table>
   * ```
   * */
  requestApi: (params: any, id?: string) => Promise<any> | any;

  /**
   * **行数据的 Key**
   * @type `string`
   * @default `id`
   * @description 当设置该值时，会使用该值作为行数据的 Key
   * @example
   * ```ts
   * <m-table rowKey="id"></m-table>
   * ```
   * */
  rowKey?: string;
}
