import PaCascader from "./pa-cascader.vue";

const install = function (app) {
  if (!app._context.components["PaCascader"]) app.component("PaCascader", PaCascader);
};
export default {
  name: "PaCascader",
  install
};
