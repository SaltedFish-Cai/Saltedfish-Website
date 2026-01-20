# Switch 开关

:::warning
`m-switch` 可独立使用，在 `m-form/m-table` 中可使用时，需配置 `prop` 字段。
:::

## 组件功能展示

<demo src="./base.vue" ></demo>

## 单选 (MSwitchType)

| 字段           | 类型                          | 必填 | 默认值    | 描述                 |
| -------------- | ----------------------------- | ---- | --------- | -------------------- |
| modelValue     | string                        | ✅    |           | 绑定值               |
| disabled       | boolean                       | ❌    |           | 禁用状态             |
| display        | boolean                       | ❌    |           | 纯展示               |
| exOptions      | `MSwitchOptionType[]`         | ❌    |           | 选项                 |
| size           | "default" / "large" / "small" | ❌    | "default" | 尺寸大小             |
| activeValue    | string / number / boolean     | ❌    |           | 打开（值）           |
| inActiveValue  | string / number / boolean     | ❌    |           | 关闭（值）           |
| activeText     | string                        | ❌    |           | 打开（键）           |
| inActiveText   | string                        | ❌    |           | 关闭（键）           |
| contrastData   | number / string / boolean     | ❌    |           | 对比用原数据         |
| alwaysContrast | boolean                       | ❌    | false     | 是否总是显示对不数据 |

## 单选选项 (MSwitchOptionType)

| 字段          | 类型                      | 必填 | 默认值 | 描述       |
| ------------- | ------------------------- | ---- | ------ | ---------- |
| activeValue   | string / number / boolean | ❌    |        | 打开（值） |
| inActiveValue | string / number / boolean | ❌    |        | 关闭（值） |
| activeText    | string                    | ❌    |        | 打开（键） |
| inActiveText  | string                    | ❌    |        | 关闭（键） |

:::tip 关于优先级
`exOptions` 下数据会优先替换 `props` 下数据
:::
