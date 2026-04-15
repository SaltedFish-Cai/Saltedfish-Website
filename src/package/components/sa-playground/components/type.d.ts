import { ButtonTypeV2Is } from "@/package/components/sa-button/type";

type languageKey = "en-US" | "zh-CN";

export type SaPlaygroundPageButtonType = {
  buttonId?: string;
  text: Record<languageKey, string>;
  type: "danger" | "default" | "info" | "primary" | "success" | "warning";
  icon: string;
  useType?: "dialog" | "HeaderCenter" | "HeaderLeft" | "operation" | "ToolButtonInline";
  is?: ButtonTypeV2Is;
  isText?: Record<languageKey, string>;
  styleType: "Built" | "Custom";
  actionType: string | "delete" | "dialog" | "jump" | "null" | "save";
  jumpTarget?: string;
  transmitData?: string[];
  actionApiId?: string;
  dialogContentId?: string;
  dialogSize?: "l" | "m" | "max" | "s";
  dialogContentButtons?: SaPlaygroundPageButtonType[];
  dialogTitle?: Record<languageKey, string> | string;
  dialogSubTitle?: string;
  closeBySave?: number;
  refreshByDialogClose?: number;
  dialogScroll?: number;
  [x: string]: any;
};
