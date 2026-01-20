import MCheckbox from "./m-checkbox.vue";

const install = function (app) {
  if (!app._context.components["MCheckbox"]) app.component("MCheckbox", MCheckbox);
};
export default {
  name: "MCheckbox",
  install
};
