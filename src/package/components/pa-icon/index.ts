import PaIcon from "./pa-icon.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaIcon"]) app.component("PaIcon", PaIcon);
};
export default {
  name: "PaIcon",
  install
};
