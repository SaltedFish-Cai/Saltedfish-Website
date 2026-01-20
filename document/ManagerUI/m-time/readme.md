# Time 时间

:::warning
`m-time` 可独立使用，在 `m-form/m-table` 中可使用时，需配置 `prop` 字段。
:::

## 组件功能展示

<demo src="./base.vue" ></demo>

## 时间选择器 (MTimeType)

| 字段        | 类型                                                                                                                                             | 必填 | 默认值    | 描述             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---- | --------- | ---------------- |
| type        | "date-picker-group" / "date-picker"/ "date-time-range"/ "month-picker-group"/ "month-picker"/ "time-picker-group"/ "time-picker"/ "year-picker"; | ✅    |           | 表单组件类型     |
| prop        | string                                                                                                                                           | ✅    |           | 表单结果字段 key |
| placeholder | string                                                                                                                                           | ❌    |           | 输入框提示       |
| disabled    | boolean                                                                                                                                          | ❌    |           | 禁用状态         |
| display     | boolean                                                                                                                                          | ❌    |           | 纯展示           |
| size        | "default" / "large" / "small"                                                                                                                    | ❌    | "default" | 尺寸大小         |
