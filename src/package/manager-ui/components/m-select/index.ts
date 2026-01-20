import MSelect from "./m-select.vue";

const install = function (app) {
  if (!app._context.components["MSelect"]) app.component("MSelect", MSelect);
};
export default {
  name: "MSelect",
  install
};
