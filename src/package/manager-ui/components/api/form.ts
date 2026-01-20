import http from "../api/index";
import lodashPkg from "lodash";
import { useBaseStore as globalState } from "../store/index";

// #Function 获取字典（地址）
export async function GetSystemAddressMap() {
  const useGlobalState = globalState();
  const KEY = "SystemDictionary-AddressMap";
  const data = useGlobalState.getDictionary(KEY);
  const { cloneDeep } = lodashPkg;
  const language = useGlobalState.getLanguage || "zh-CN";
  if (data) {
    const _data = cloneDeep(data);
    return _data;

    let isSuccess = true;
    const exData = _data.map(item => {
      if (!item.base?.languageLabel?.[language]) isSuccess = false;
      return {
        ...item,
        label: item.base?.languageLabel?.[language]
      };
    });
    if (isSuccess) {
      return exData;
    }
  } else {
    const url = useGlobalState.getFormConfig?.addressApi?.url;
    const type = useGlobalState.getFormConfig?.addressApi?.type;

    if (url) {
      const { Data, Code } = await http[type || "get"](url);
      if (Code == 200) {
        useGlobalState.setDictionary(KEY, Data);
        return Data;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
}
