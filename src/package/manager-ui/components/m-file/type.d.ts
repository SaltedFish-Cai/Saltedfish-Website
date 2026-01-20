export type MFileType = {
  /**
   * **双向绑定数据**
   * @type `Array<MFileDataType>`
   * @default `undefined`
   * @description 当设置该值时，会绑定该值
   * @description 当前属性只有作为 `独立组件` 时才会生效
   * @description 该值的类型为 `Array<MFileDataType>`，可以是任意类型
   * */
  modelValue?: Array<MFileDataType>;

  /**
   * **上传文件时附带数据**
   * @type `object`
   * @default `{}`
   * @description 当设置该值时，会将该值作为请求参数发送到服务器
   * @description 该值的类型为 `object`，可以是任意类型
   * @example
   * ```tsx
   * <MoFile exData={{ id: 1 }} />
   * ```
   * @example
   * ```tsx
   * <MoFile exData={{ id: 1, name: "张三" }} />
   * ```
   * */
  exData?: object;
  fileAttached?: object;

  /**
   * **占位字符串**
   * @type `string`
   * @default `请选择文件`
   * @description 当选择值为 `空` 时，会显示该字符串
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
   * <MoFile disabled={true} />
   * ```
   * */
  disabled?: boolean;

  /**
   * **限制文件上传数量**
   * @type `number` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，不会限制文件上传数量
   * @description 当设置该值为 `number` 时，会限制文件上传数量
   * @example
   * ```tsx
   * <MoFile fileMultiple={1} />
   * ```
   * @example
   * ```tsx
   * <MoFile fileMultiple={2} />
   * ```
   * */
  fileMultiple?: number;

  /**
   * **纯展示模式**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会使用纯展示模式
   * @description 当设置该值为 `false` 时，不会使用纯展示模式
   * @example
   * ```tsx
   * <MoFile display={true} />
   * ```
   * */
  display?: boolean;

  /**
   * **允许上传文件类型**
   * @type `Array<string>` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，不会限制文件类型
   * @description 当设置该值为 `Array<string>` 时，会限制文件类型
   * @example
   * ```tsx
   * <MoFile fileIncludeType={["image/png", "image/jpeg"]} />
   * ```
   * @example
   * ```tsx
   * <MoFile fileIncludeType={["image/png", "image/jpeg", "image/gif"]} />
   * ```
   * */
  fileIncludeType?: string[];

  /**
   * **不允许上传文件类型**
   * @type `Array<string>` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，不会限制文件类型
   * @description 当设置该值为 `Array<string>` 时，会限制文件类型
   * @example
   * ```tsx
   * <MoFile fileExcludeType={["image/png", "image/jpeg"]} />
   * ```
   * @example
   * ```tsx
   * <MoFile fileExcludeType={["image/png", "image/jpeg", "image/gif"]} />
   * ```
   * */
  fileExcludeType?: string[];

  /**
   * **单个文件上传大小限制**、
   * @type `number` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，不会限制文件大小
   * @description 当设置该值为 `number` 时，会限制文件大小
   * @example
   * ```tsx
   * <MoFile fileSingleSize={1024} />
   * ```
   * @example
   * ```tsx
   * <MoFile fileSingleSize={1024 * 1024} />
   * ```
   * */
  fileSingleSize?: number;

  /**
   * **总文件上传大小限制**
   * @type `number` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，不会限制文件大小
   * @description 当设置该值为 `number` 时，会限制文件大小
   * @example
   * ```tsx
   * <MoFile fileAllSize={1024} />
   * ```
   * @example
   * ```tsx
   * <MoFile fileAllSize={1024 * 1024} />
   * ```
   * */
  fileAllSize?: number;

  /**
   * **组件尺寸**
   * @type `default` | `large` | `small`
   * @default `default`
   * @description 当设置该值为 `default` 时，组件为默认尺寸
   * @description 当设置该值为 `large` 时，组件为大尺寸
   * @description 当设置该值为 `small` 时，组件为小尺寸
   * @example
   * ```tsx
   * <MoFile size="default" />
   * ```
   * @example
   * ```tsx
   * <MoFile size="large" />
   * ```
   * @example
   * ```tsx
   * <MoFile size="small" />
   * ```
   * */
  size?: "default" | "large" | "small";

  /**
   * **对比数据**
   * @type `Array<MFileDataType>`
   * @default `undefined`
   * @description 当设置该值时，会使用该值作为对比数据
   * @description 该值的类型为 `Array<MFileDataType>`，可以是任意类型
   * @example
   * ```tsx
   * <MoFile contrastData={[{ FileId: "1", FullPath: "1" }]} />
   * ```
   * @example
   * ```tsx
   * <MoFile contrastData={[{ FileId: "1", FullPath: "1" }, { FileId: "2", FullPath: "2" }]} />
   * ```
   * */
  contrastData?: Array<MFileDataType>;

  /**
   * **是否显示对比数据**
   * @type `boolean`
   * @default `false`
   * @description 当设置该值为 `true` 时，会显示对比数据
   * @description 当设置该值为 `false` 时，不会显示对比数据
   * @example
   * ```tsx
   * <MoFile showContrast={true} />
   * ```
   * @example
   * ```tsx
   * <MoFile showContrast={false} />
   * ```
   * */
  alwaysContrast?: boolean;

  /**
   * **当数据发生变更时触发**
   * @type `({ value, oldValue }) => void` | `undefined`
   * @default `undefined`
   * @description 当设置该值为 `undefined` 时，不会触发该事件
   * @description 当设置该值为 `({ value, oldValue }) => void` 时，会使用该值作为回调函数
   * @description 该值的类型为 `({ value, oldValue }) => void`，可以是任意类型
   * @description 该值的参数为 `object`，包含以下属性：
   * - `value` 为当前值
   * - `oldValue` 为旧值
   * @example
   * ```tsx
   * <MoFile onChange={({ value, oldValue }) => { console.log(value, oldValue) }} />
   * ```
   * */
  onChange?: ({ value, oldValue }) => void;
};

export type MFileDataType = {
  FileId: string;
  FullPath: string;
  FileName?: string;
  FileUrl?: string;
  OriginalName?: string;
};
