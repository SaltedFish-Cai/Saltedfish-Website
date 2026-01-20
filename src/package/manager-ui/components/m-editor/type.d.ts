// # Type
import { MFileType } from "../m-file/type";

export type fileType = {
  /**
   * **文件地址**
   * - 类型为 `string`
   * */
  FileUrl?: string;

  /**
   * **文件名称**
   * - 类型为 `string`
   * */
  OriginalName?: string;

  /**
   * **文件名称**
   * - 类型为 `string`
   * */
  FileName?: string;
};

export type MEditorType = {
  /**
   * **组件Id**
   * - 类型为 `string`
   * - 当设置该值为 `string` 时，会使用该值作为组件Id
   * @example
   * ```tsx
   * <MoEditor id="editor" />
   * ```
   * */
  id: string;

  /**
   * **默认编辑器值**
   * - 类型为 `string`
   * - 当设置该值为 `string` 时，会使用该值作为默认编辑器值
   * @example
   * ```tsx
   * <MoEditor defaultValue="Hello World" />
   * ```
   * */
  defaultValue: string;

  /**
   * **外置编辑器按钮**
   * - 类型为 `Array<exButtonType>`
   * - 当设置该值为 `Array<exButtonType>` 时，会使用该值作为外置编辑器按钮
   * - exButtonType.icon 为按钮图标
   * - exButtonType.name 为按钮名称
   * - exButtonType.target 为按钮点击事件
   * @example
   * ```tsx
   * <MoEditor exButton={[{ icon: "el-icon-upload", name: "上传", target: () => { console.log("上传") } }]} />
   * ```
   * */
  exButton?: Array<{
    icon: string;
    name: string;
    target: Function;
  }>;

  /**
   * **上传文件配置**
   * - 类型为 `MFileType`
   * - 当设置该值为 `MFileType` 时，会使用该值作为上传文件配置
   * */
  upImageConfig?: MFileType;
};
