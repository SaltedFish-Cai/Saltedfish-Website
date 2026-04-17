import PaNumber from "./pa-number.vue";

const install = function (app) {
  if (!app._context.components["PaNumber"]) app.component("PaNumber", PaNumber);
};
export default {
  name: "PaNumber",
  install
};
