export type MElementInputType = {
  /**
   * **表单项类型**
   * - 类型为 `input` | `textarea`
   * - 默认值为 `input`
   * - 当设置该值为 `input` 时，会显示输入框
   * - 当设置该值为 `textarea` 时，会显示文本域
   * - 当设置该值为 `input` 时，会显示输入框
   * */
  type: "input" | "textarea";

  /**
   * **表单项标签**
   * - 类型为 `string`
   * - 当设置该值为 `string` 时，会使用该值作为表单项标签
   * */
  prop?: string;

  /**
   * **表单项标签**
   * - 类型为 `string`
   * - 当设置该值为 `string` 时，会使用该值作为表单项标签
   * */
  placeholder?: string;

  /**valueOnClear
   * **表单项标签**
   * - 类型为 `string`
   * - 当设置该值为 `string` 时，会使用该值作为表单项标签
   * */
  disabled?: boolean;
  display?: boolean;
  maxLength?: number | string;
  minLength?: number | string;
  clearable?: boolean;
  showPassword?: boolean;
  showWordLimit?: boolean;
  minRows?: number | string;
  maxRows?: number | string;
  autofocus?: boolean;

  /**
   * **组件尺寸**
   * - 类型为 `default` | `large` | `small`
   * - 默认值为 `default`
   * - 当设置该值为 `default` 时，会显示默认尺寸
   * - 当设置该值为 `large` 时，会显示大尺寸
   * - 当设置该值为 `small` 时，会显示小尺寸
   * */
  size?: "default" | "large" | "small";
  inputParser?: (value: string) => string | undefined;
  inputFormatter?: (value: number | string) => string | undefined;
};
