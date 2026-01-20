import MCascader from "./m-cascader.vue";

const install = function (app) {
  if (!app._context.components["MCascader"]) app.component("MCascader", MCascader);
};
export default {
  name: "MCascader",
  install
};
