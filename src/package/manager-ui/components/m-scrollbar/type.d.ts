import { ScrollbarProps } from "element-plus";

export interface ScrollbarPropsType extends Partial<Omit<ScrollbarProps, "data">> {
  /**
   * @description 是否使用阴影
   * @default false
   */
  useShadow?: boolean;

  /**
   * @description 是否使用自定义样式
   * @default false
   */
  noPadding?: boolean;

  /**
   * @description 是否显示回到顶部按钮
   * @default false
   */
  noBackTop?: boolean;
}
