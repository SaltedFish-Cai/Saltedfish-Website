import { MOptionType } from "MTypes";

export type MElementCascaderType = {
  prop?: string;
  displayProp?: string;
  type: "cascader-check" | "cascader" | "multiple-cascader-check" | "multiple-cascader";
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  collapseTags?: boolean;
  maxCollapseTags?: number;
  options?: Array<MOptionType.Select>;
  display?: boolean;
  size?: "default" | "large" | "small";
};

export type MElementCascaderOptionType = {
  label: string;
  value: number | string;
  children?: MElementCascaderOptionType[];
  disabled?: boolean;
  base?: objectType;
};
