import PaEmpty from "./pa-empty.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaEmpty"]) app.component("PaEmpty", PaEmpty);
};
export default {
  name: "PaEmpty",
  install
};
