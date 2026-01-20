# Checkbox 多选框

:::warning
`m-checkbox` 可独立使用，在 `m-form/m-table` 中可使用时，需配置 `prop` 字段。
:::

## 组件功能展示

<demo src="./base.vue" ></demo>

## 单选 (MCheckboxType)

| 字段           | 类型                          | 必填 | 默认值    | 描述                 |
| -------------- | ----------------------------- | ---- | --------- | -------------------- |
| modelValue     | <number / string>[]           | ✅    |           | 绑定值               |
| disabled       | boolean                       | ❌    |           | 禁用状态             |
| display        | boolean                       | ❌    | false     | 纯展示               |
| exOptions      | `MCheckboxOptionType[]`       | ❌    |           | 选项                 |
| size           | "default" / "large" / "small" | ❌    | "default" | 尺寸大小             |
| contrastData   | number / string               | ❌    |           | 对比用原数据         |
| alwaysContrast | boolean                       | ❌    | false     | 是否总是显示对不数据 |

## 单选选项 (MCheckboxOptionType)

| 字段     | 类型            | 必填 | 默认值 | 描述     |
| -------- | --------------- | ---- | ------ | -------- |
| label    | string          | ✅    |        | 选项名   |
| value    | string / number | ✅    |        | 选项值   |
| disabled | boolean         | ❌    |        | 禁用状态 |
