import PaSelect from "./pa-select.vue";

const install = function (app) {
  if (!app._context.components["PaSelect"]) app.component("PaSelect", PaSelect);
};
export default {
  name: "PaSelect",
  install
};
