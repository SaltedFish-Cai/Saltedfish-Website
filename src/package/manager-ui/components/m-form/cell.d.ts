import { MElementDateType } from "../m-elements/time/index";
import { MElementIconType } from "../m-elements/icon/index";
import { MElementAddressType } from "../m-elements/address/index";
import { MElementTransferType } from "../m-elements/transfer/index";

import { MCascaderType } from "../m-cascader/type";
import { MCheckboxType } from "../m-checkbox/type";
import { MRadioType } from "../m-radio/type";
import { MSelectType } from "../m-select/type";
import { MSwitchType } from "../m-switch/type";
import { MFileType } from "../m-file/type";
import { MNumberType } from "../m-number/type";
import { MInputType } from "../m-input/type";
import { MFormChildType } from "./type";
import { MOptionType } from "MTypes";

export type CellItemType =
  | MElementAddressType
  | MElementDateType
  | MElementIconType
  | MElementTransferType
  | (MCascaderType & {
      prop?: string;
      type: "cascader-check" | "cascader" | "multiple-cascader-check" | "multiple-cascader";
      displayProp?: string;
      options?: Array<MOptionType.Select>;
    })
  | (MCheckboxType & { prop?: string; type: "checkbox"; options?: Array<MOptionType.Select> })
  | (MFileType & { prop?: string; type: "file"; fileAttached?: objectType })
  | (MInputType & { prop?: string; type: "input" | "textarea" })
  | (MNumberType & { prop?: string; type: "number"; clearOnValue?: number })
  | (MRadioType & { prop?: string; type: "radio"; options?: Array<MOptionType.Select> })
  | (MSelectType & {
      prop?: string;
      type:
        | "multiple-online-select"
        | "multiple-request-select"
        | "multiple-select"
        | "online-select"
        | "request-select"
        | "select";
      displayProp?: string;
      requestBy?: string;
      options?: Array<MOptionType.Select>;
    })
  | (MSwitchType & { prop?: string; type: "switch"; options?: Array<MOptionType.Select> });

type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any ? Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> & T : never;
type StrictUnion<T> = StrictUnionHelper<T, T>;

export type OtherType = {
  prop?: string; // 唯一key
  type: "null" | "slot" | "tag";
  disabled?: boolean; // 禁用状态
  display?: boolean;
};

type GroupFromConfigType = MFormChildType & {
  /**
   * **多语言表单项标题**
   * @type `string`
   * @description 当设置该值为 `string` 时，会使用该值作为表单项标题
   * */
  languageLabel?: {
    [key: "en-US" | "zh-CN"]: string;
  };
  label?: string;
  value: boolean | number | string;
  childLabel?: string;
};

export type GroupType = {
  prop?: string; // 唯一key
  type?: "group";
  groupFormConfig?: GroupFromConfigType[];
  disabled?: boolean; // 禁用状态
  display?: boolean;
};

export type TabsType = {
  prop?: string; // 唯一key
  type?: "tabs-form";
  titleKey?: string; // 多语言tab标题使用字段
  titleLabel?: string | { [key: "en-US" | "zh-CN"]: string }; // 多语言tab标题使用字段
  tabsFormConfig?: MFormChildType[];
  disabled?: boolean;
  contrastKey?: string;
  contrastUse?: string;
};
