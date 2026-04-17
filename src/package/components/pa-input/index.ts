import PaInput from "./pa-input.vue";

const install = function (app) {
  if (!app._context.components["PaInput"]) app.component("PaInput", PaInput);
};
export default {
  name: "PaInput",
  install
};
