export type MButtonType = {
  /**
   * **组件唯一标识**
   * @type `string` | `undefined`
   * @default `undefined`
   * @description 当设置该值时，会作为组件的唯一标识
   * @description 该值的类型为 `string`，可以是任意类型，但是建议不要重复
   * */
  id?: string;

  /**
   * **内置样式**
   * @type `string` | `undefined`
   * @default `undefined`
   * @description 可选值为  `add` | `cancel` | `check` | `download` | `edit` | `export` | `file` | `go` | `import` | `ok` | `refresh` | `remove` | `save` | `search` | `submit` | `switch` | `sync` | `time` | `trash` | `upload` | `view` | `more`
   * */
  is?:
    | "add"
    | "cancel"
    | "check"
    | "download"
    | "edit"
    | "export"
    | "file"
    | "go"
    | "import"
    | "more"
    | "ok"
    | "refresh"
    | "remove"
    | "save"
    | "search"
    | "submit"
    | "switch"
    | "sync"
    | "time"
    | "trash"
    | "upload"
    | "view";

  /**
   * **按钮ICON**
   * @type `string` | `undefined`
   * @default `undefined`
   * @description 当设置该值时，会使用该值作为ICON
   * @description
   * - 该值的类型为 `string`，可以是任意类型
   * */
  font?: string;

  /**
   * **按钮样式类型**
   * @type `primary` | `success` | `warning` | `danger` | `info` | `text` | `default`
   * @default `primary`
   * @description 可选值为 `primary` | `success` | `warning` | `danger` | `info` | `text` | `default`
   * @description
   * - 当设置该值为 `primary` 时，按钮为主题色
   * - 当设置该值为 `success` 时，按钮为绿色
   * - 当设置该值为 `warning` 时，按钮为黄色
   * - 当设置该值为 `danger` 时，按钮为红色
   * - 当设置该值为 `info` 时，按钮为灰色
   * - 当设置该值为 `text` 时，按钮为黑色
   * - 当设置该值为 `default` 时，按钮为黑色
   * */
  type?: "danger" | "default" | "info" | "primary" | "success" | "text" | "warning";

  /**
   * **按钮尺寸**
   * @type `default` | `large` | `small`
   * @default `default`
   * @description 可选值为 `default` | `large` | `small`
   * @description
   * - 当设置该值为 `default` 时，按钮为默认尺寸
   * - 当设置该值为 `large` 时，按钮为大尺寸
   * - 当设置该值为 `small` 时，按钮为小尺寸
   * */
  size?: "default" | "large" | "small";

  /**
   * **加载状态**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，按钮为加载状态
   * @description 当设置该值为 `false` 时，按钮为正常状态
   * */
  loading?: boolean;

  /**
   * **是否使用链接(下划线)按钮**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用链接(下划线)按钮
   * @description 当设置该值为 `false` 时，不会使用链接(下划线)按钮
   * */
  line?: boolean;

  /**
   * **是否使用文字按钮**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用文字按钮
   * @description 当设置该值为 `false` 时，不会使用文字按钮
   * */
  link?: boolean;

  /**
   * **是否开启防抖功能**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会开启防抖功能
   * @description 当设置该值为 `false` 时，不会开启防抖功能
   * */
  debounced?: boolean;

  /**
   * **防抖按钮时间**
   * @type `number`
   * @default `300`
   * @description 当设置该值为 `number` 时，会设置防抖按钮时间
   * @description 当设置该值为 `0` 时，不会开启防抖功能
   * */
  debouncedTime?: number;

  /**
   * **是否禁用状态**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，按钮为禁用状态
   * @description 当设置该值为 `false` 时，按钮为正常状态
   * */
  disabled?: boolean;

  /**
   * **Icon位置**
   * @type `left` | `right`
   * @default `left`
   * @description 可选值为 `left` | `right`
   * @description
   * - 当设置该值为 `left` 时，Icon在按钮的左侧
   * - 当设置该值为 `right` 时，Icon在按钮的右侧
   * */
  position?: "left" | "right";

  /**
   * **自动Loading来源**
   * @type `string` | `undefined`
   * @default `undefined`
   * @description 当设置该值时，会自动判断是否为 `loading` 状态，且会自动添加 `loading` 样式
   * */
  loadingBy?: string;

  /**
   * **是否使用Icon**
   * @type `boolean`
   * @default `true`
   * @description 当设置该值为 `true` 时，会使用Icon
   * @description 当设置该值为 `false` 时，不会使用Icon
   * */
  useFont?: boolean;

  /**
   * **是否使用阻止冒泡**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会阻止冒泡
   * @description 当设置该值为 `false` 时，不会阻止冒泡
   * */
  useStop?: boolean;
};
