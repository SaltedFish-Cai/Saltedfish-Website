// # useBaseStore

import { defineStore } from "pinia";
import { GlobalState } from "../type";

import piniaPersistConfig from "../../store/piniaPersist";

export const useBaseStore = defineStore({
  id: "m-table-configs",
  state: (): GlobalState => ({
    // 表列宽缓存
    isKeepAliveTableWidth: false,
    // 表列宽自动列宽
    isAutoTableWidth: false,
    // 表格文本一键复制
    isTableTextCopy: false,
    // 表缩放
    tableGlobalZoom: 100,
    tableWidth: {}
  }),
  getters: {
    getTableWidth: (state: GlobalState) => {
      return (name: string): objectType => {
        return state.tableWidth[name] || {};
      };
    }
  },
  actions: {
    async setTableWidth(name: string, value: objectType) {
      this.tableWidth[name] = value;
    },
    async removeTableWidth(name: string) {
      this.tableWidth[name] = {};
    },
    async cleanTableWidth() {
      this.tableWidth = {};
    },
    async setGlobalConfig(config) {
      const _config = { ...this, ...config };
      this.isKeepAliveTableWidth = _config.isKeepAliveTableWidth;
      this.isAutoTableWidth = _config.isAutoTableWidth;
      this.isTableTextCopy = _config.isTableTextCopy;
      this.tableGlobalZoom = _config.tableGlobalZoom;
    }
  },
  persist: piniaPersistConfig("manager-ui-table-configs")
});
