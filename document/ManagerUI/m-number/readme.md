# Number 数字框

:::warning 注意
`m-number` 可独立使用，在 `m-form/m-table` 中可使用时，需配置 `prop` 字段。
:::

## 组件功能展示

<demo src="./base.vue" ></demo>

## 输入框类 (MNumberType)

| 字段             | 类型                          | 必填 | 默认值    | 描述                       |
| ---------------- | ----------------------------- | ---- | --------- | -------------------------- |
| modelValue       | string                        | ✅    |           | 绑定值                     |
| placeholder      | string                        | ❌    |           | 输入框提示                 |
| disabled         | boolean                       | ❌    | false     | 禁用状态                   |
| display          | boolean                       | ❌    | false     | 纯展示                     |
| max              | number                        | ❌    |           | 最大值                     |
| min              | number                        | ❌    |           | 最小值                     |
| precision        | number                        | ❌    | 0         | 小数点精度                 |
| controls         | boolean                       | ❌    | false     | 显示控制器                 |
| controlsPosition | "" / "right"                  | ❌    | ""        | 控制器显示位置             |
| valueOnClear     | boolean                       | ❌    | false     | 当清空时是否恢复 `最小值`  |
| step             | number                        | ❌    | 1         | 计数器步长                 |
| stepStrictly     | boolean                       | ❌    | false     | 是否只能输入 `step` 的倍数 |
| size             | "default" / "large" / "small" | ❌    | "default" | 尺寸大小                   |
| contrastData     | number / string               | ❌    |           | 对比用原数据               |
| alwaysContrast   | boolean                       | ❌    | false     | 是否总是显示对不数据       |
