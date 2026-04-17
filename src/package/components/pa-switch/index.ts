import PaSwitch from "./pa-switch.vue";

const install = function (app) {
  if (!app._context.components["PaSwitch"]) app.component("PaSwitch", PaSwitch);
};
export default {
  name: "PaSwitch",
  install
};
