import { PaFormItemType } from "./type";

export type GroupItemPropsType = {
  id: string;
  item: PaFormItemType;
};

export type TabsItemPropType = {
  id: string;
  item: PaFormItemType;
  rules: Record<string, FormItemRule | FormItemRule[]>;
};

export type SlotItemsPropsType = { item: PaFormItemType; data?: Record<string, string>; labelWidth?: number };
