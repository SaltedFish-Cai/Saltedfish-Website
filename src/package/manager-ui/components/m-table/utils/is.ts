// #Function 是否某个类型
export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

// #Function 是否为函数
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, "Function");
}

// #Function 是否已定义
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

// #Function 是否未定义
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

// #Function 是否为对象
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};

// #Function 是否为时间
export function isDate(val: unknown): val is Date {
  return is(val, "Date");
}

// #Function 是否为数值
export function isNumber(val: unknown): val is number {
  return is(val, "Number");
}

// #Function 是否为AsyncFunction
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, "AsyncFunction");
}

// #Function 是否为promise
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

// #Function 是否为字符串
export function isString(val: unknown): val is string {
  return is(val, "String");
}

// #Function 是否为boolean类型
export function isBoolean(val: unknown): val is boolean {
  return is(val, "Boolean");
}

// #Function 是否为数组
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

// #Function 是否客户端
export const isClient = () => {
  return typeof window !== "undefined";
};

// #Function 是否为浏览器
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

// #Function 是否为 element 元素
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

// #Function 是否为 null
export function isNull(val: unknown): val is null {
  return val === null;
}

// #Function 是否为 null || undefined
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

// #Function 是否为 16 进制颜色
export const isHexColor = (str: string) => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};
