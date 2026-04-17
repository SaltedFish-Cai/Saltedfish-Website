import PaCheckboxItem from "./pa-checkbox-item.vue";
import PaCheckbox from "./pa-checkbox.vue";

const install = function (app) {
  if (!app._context.components["PaCheckbox"]) {
    app.component("PaCheckbox", PaCheckbox);
  }
  if (!app._context.components["PaCheckboxItem"]) {
    app.component("PaCheckboxItem", PaCheckboxItem);
  }
};
export default {
  name: "PaCheckbox",
  install
};
