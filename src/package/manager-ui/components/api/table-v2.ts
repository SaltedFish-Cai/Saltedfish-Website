// # Import
import { ManagerGlobalConfigType } from "../m-manager-v2/type";

// #Function 获取字典(链接关系)
export async function GetConditionals(config: ManagerGlobalConfigType, useType: "group" | "link", params?: objectType) {
  let API = config?.table_config?.advancedQueryApi;

  if (useType == "group") {
    API = config?.table_config?.groupAdvancedQueryApi;
  }

  if (typeof API == "object") {
    return API;
  } else if (typeof API == "function") {
    return API(params);
  } else {
    return [];
  }
}
