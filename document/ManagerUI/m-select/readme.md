# Select 选择器

:::warning 注意
`m-select` 可独立使用，在 `m-form/m-table` 中可使用时，需配置 `prop` 字段。
:::

## 组件功能展示

<demo src="./base.vue" ></demo>

## 输入框类 (MSelectType)

| 字段            | 类型                                                                                                                      | 必填 | 默认值    | 描述                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- | ---- | --------- | ------------------------------------------------------------- |
| modelValue      | string                                                                                                                    | ✅    |           | 绑定值                                                        |
| type            | "multiple-online-select" / "multiple-request-select" / "multiple-select" / "online-select" / "request-select" / "select"; | ❌    |           | 组件类型                                                      |
| exOptions       | `MSelectOptionType[]`                                                                                                     | ❌    |           | 选项                                                          |
| requestApi      | ({ query: string }) => Promise<`MSelectOptionType[]`>;                                                                    | ❌    |           | 异步选项请求接口                                              |
| key             | string                                                                                                                    | ❌    |           | 唯一 key （使用插槽时必填）                                   |
| displayValue    | string                                                                                                                    | ❌    |           | 纯展示类型下，直接显示值                                      |
| placeholder     | string                                                                                                                    | ❌    |           | 输入框提示                                                    |
| disabled        | boolean                                                                                                                   | ❌    | false     | 禁用状态                                                      |
| display         | boolean                                                                                                                   | ❌    | false     | 纯展示                                                        |
| clearable       | boolean                                                                                                                   | ❌    | true      | 显示清除按钮                                                  |
| multipleLimit   | number                                                                                                                    | ❌    | 0         | `type==multiple-xxx` 多选类型，选择的项目数， 为 `0` 则不限制 |
| collapseTags    | boolean                                                                                                                   | ❌    | true      | `type==multiple-xxx` 多选类型，将选中值按文字的形式展示       |
| maxCollapseTags | number                                                                                                                    | ❌    | 1         | `collapseTags=true` 多选类型，需要显示的 Tag 的最大数量       |
| size            | "default" / "large" / "small"                                                                                             | ❌    | "default" | 尺寸大小                                                      |
| contrastData    | number / string                                                                                                           | ❌    |           | 对比用原数据                                                  |
| alwaysContrast  | boolean                                                                                                                   | ❌    | false     | 是否总是显示对不数据                                          |

:::tip `request-select` 和 `online-select` 区别
`request-select` 只会在组件创建时单次调用 `requestApi`，而 `online-select` 会在输入框值变化时调用 `requestApi`
:::


## 选择器选项 (MSelectOptionType)

| 字段     | 类型                     | 必填 | 默认值 | 描述     |
| -------- | ------------------------ | ---- | ------ | -------- |
| label    | string                   | ✅    |        | 选项名   |
| value    | string / number /boolean | ✅    |        | 选项值   |
| disabled | boolean                  | ❌    |        | 禁用状态 |
