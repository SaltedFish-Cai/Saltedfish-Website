export type MElementDateType = {
  type:
    | "date-picker-group"
    | "date-picker"
    | "date-time-range"
    | "month-picker-group"
    | "month-picker"
    | "time-picker-group"
    | "time-picker"
    | "year-picker-group"
    | "year-picker";

  display?: boolean;
  prop?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "default" | "large" | "small";
  disabledDateFn?: (date: any) => boolean;
};
