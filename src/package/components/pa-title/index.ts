// # Import
import PaTitle from "./pa-title.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaTitle"]) app.component("PaTitle", PaTitle);
};

export default {
  name: "PaTitle",
  install
};
