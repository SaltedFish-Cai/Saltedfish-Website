import type { ComponentPublicInstance } from "vue";

// 通知类型
export type MessageBoxType = "danger" | "info" | "primary" | "success" | "warning";

type languageKey = "en-US" | "zh-CN";

// 通知配置接口
export interface MessageBoxOptions {
  /**
   * 通知标题
   */
  title?: Record<languageKey, string> | string;
  /**
   * 通知消息
   */
  message?: Record<languageKey, string> | string;
  /**
   * 是否为确认框
   */
  isType?: "confirm" | undefined;
  /**
   * 通知类型
   */
  type?: MessageBoxType;

  /**
   * 自定义样式
   */
  customClass?: string;
  /**
   * 点击通知时的回调函数
   */
  onConfirm?: () => void;
  /**
   * 关闭通知时的回调函数
   */
  onClose?: () => void;
  /**
   * 是否使用HTML
   */
  dangerouslyUseHTMLString?: boolean;
  /**
   * 确认按钮文本
   */
  confirmButtonText?: Record<languageKey, string> | string;
  /**
   * 取消按钮文本
   */
  cancelButtonText?: Record<languageKey, string> | string;
  /**
   * 取消按钮图标
   */
  cancelButtonIcon?: string;
  /**
   * 确认按钮图标
   */
  confirmButtonIcon?: string;
  /**
   * z-index
   */
  zIndex?: number;
  /**
   * 是否在关闭时移除DOM元素
   * @default true
   * @description 是否在关闭时移除DOM元素
   */
  closeOnPressEscape?: boolean;
}

// 通知实例接口
export interface MessageBoxInstance {
  id: string;
  vm: ComponentPublicInstance;
  options: MessageBoxOptions;
  close: () => void;
}

// 通知管理器接口
export interface MessageBoxManager {
  notifications: MessageBoxInstance[];
  add: (options: MessageBoxOptions) => MessageBoxInstance;
  close: (id: string) => void;
  closeAll: () => void;
}
