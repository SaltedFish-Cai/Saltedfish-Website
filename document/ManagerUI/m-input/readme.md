# Input 输入框

:::warning 注意
`m-input` 可独立使用，在 `m-form/m-table` 中可使用时，需配置 `prop` 字段。
:::

## 组件功能展示

<demo src="./base.vue" ></demo>

## 输入框类 (MInputType)

| 字段           | 类型                                         | 必填 | 默认值    | 描述                             |
| -------------- | -------------------------------------------- | ---- | --------- | -------------------------------- |
| modelValue     | string                                       | ✅    |           | 绑定值                           |
| type           | "input"/"textarea"                           | ❌    |           | 表单组件类型                     |
| placeholder    | string                                       | ❌    |           | 输入框提示                       |
| disabled       | boolean                                      | ❌    | false     | 禁用状态                         |
| display        | boolean                                      | ❌    | false     | 纯展示                           |
| maxLength      | number                                       | ❌    |           | 内容长度的最大数                 |
| minLength      | number                                       | ❌    |           | 内容长度的最小数                 |
| clearable      | boolean                                      | ❌    | true      | 显示清除按钮 `type==text`        |
| showPassword   | boolean                                      | ❌    |           | 显示切换密码图标 `type==text`    |
| showWordLimit  | boolean                                      | ❌    | true      | 显示统计字数，需配置 `maxLength` |
| minRows        | number                                       | ❌    | 3         | 最小行数 `type==textarea`        |
| maxRows        | number                                       | ❌    | 5         | 最大行数 `type==textarea`        |
| autofocus      | boolean                                      | ❌    | false     | 自动获取焦点                     |
| size           | "default" / "large" / "small"                | ❌    | "default" | 尺寸大小                         |
| inputParser    | (value: string) => string / undefined        | ❌    | false     | 指定从格式化器输入中提取的值     |
| inputFormatter | (value: number/string) => string / undefined | ❌    | false     | 指定输入值的格式                 |
| contrastData   | number / string                              | ❌    |           | 对比用原数据                     |
| alwaysContrast | boolean                                      | ❌    | false     | 是否总是显示对不数据             |

