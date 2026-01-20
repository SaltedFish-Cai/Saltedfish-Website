import { MFormItemType } from "./type";

export type BasicsItemPropsType = {
  id: string;
  ruleFormRef: any;
  item: MFormItemType;
  useAlone: boolean;
  data?: objectType;
  contrastData?: objectType;
  alwaysContrast?: boolean;
  labelWidth?: number;
  baseSpanSize?: number;
  itemSpanSize?: objectType;
  labelPosition?: "left" | "right";
  display: boolean;
  enforcementDisplay?: boolean;
  size?: "default" | "large" | "small";
  noLabel?: boolean;
};

export type GroupItemPropsType = {
  id: string;
  ruleFormRef: any;
  item: MFormItemType;
  data: objectType;
  baseRulesMap: objectType;
  labelWidth?: number;
  baseSpanSize?: number;
  itemSpanSize?: objectType;
  contrastData?: objectType;
  alwaysContrast?: boolean;
  labelPosition?: "left" | "right";
  display: boolean;
  size?: "default" | "large" | "small";
  useAlone: boolean;
};

export type TabsItemPropType = {
  id: string;
  ruleFormRef: any;
  item: TabsFormType;
  data: objectType;
  contrastData?: objectType;
  rules: objectType;
  display: boolean;
  baseSpanSize?: number;
  itemSpanSize?: objectType;
  labelWidth?: number;
  labelPosition?: "left" | "right";
  size?: "default" | "large" | "small";
  useAlone: boolean;
};

export type SlotItemsPropsType = { item: InFormItemType; data?: objectType; labelWidth?: number };
