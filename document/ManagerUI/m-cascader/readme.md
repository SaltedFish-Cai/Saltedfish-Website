# File 文件

:::warning
`m-file` 可独立使用，在 `m-form/m-table` 中可使用时，需配置 `prop` 字段。
:::

## 组件功能展示

<demo src="./base.vue" ></demo>

## 文件类型 (MFileType)

| 字段            | 类型                          | 必填 | 默认值    | 描述                          |
| --------------- | ----------------------------- | ---- | --------- | ----------------------------- |
| modelValue      | FileType[]                    | ✅    |           | 绑定值                        |
| fileMultiple    | number                        | ❌    |           | 上传文件数量限制              |
| placeholder     | string                        | ❌    |           | 输入框提示                    |
| disabled        | boolean                       | ❌    |           | 禁用状态                      |
| display         | boolean                       | ❌    |           | 纯展示                        |
| fileAttached    | object                        | ❌    |           | 文件上传额外参数/数据         |
| fileIncludeType | string[]                      | ❌    |           | 文件类型限制 包含             |
| fileExcludeType | string[]                      | ❌    |           | 文件类型限制 不包含           |
| fileSingleSize  | number                        | ❌    |           | 文件类型限制 单文件大小       |
| fileAllSize     | number                        | ❌    |           | 文件类型限制 单次总包文件大小 |
| size            | "default" / "large" / "small" | ❌    | "default" | 尺寸大小                      |
| contrastData    | number / string               | ❌    |           | 对比用原数据                  |
| alwaysContrast  | boolean                       | ❌    | false     | 是否总是显示对不数据          |

## 源文件类型 (FileType)

| 字段         | 类型            | 必填 | 默认值 | 描述         |
| ------------ | --------------- | ---- | ------ | ------------ |
| FileId       | string          | ✅    |        | 文件ID       |
| FullPath     | string / number | ✅    |        | 完整路径     |
| FileName     | boolean         | ❌    |        | 文件名       |
| FileUrl      | boolean         | ❌    |        | 文件相对路径 |
| OriginalName | boolean         | ❌    |        | 相对文件名   |
