export type MElementNumberType = {
  type: "number";
  prop?: string;
  placeholder?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
  precision?: number;
  controls?: boolean;
  controlsPosition?: "" | "right"; // 控制按钮位置
  clearOnValue?: number;
  valueOnClear?: number;
  step?: number;
  stepStrictly?: boolean;
  display?: boolean;
  size?: "default" | "large" | "small";
};
