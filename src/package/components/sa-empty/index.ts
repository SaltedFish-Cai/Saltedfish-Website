import SaEmpty from "./sa-empty.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["SaEmpty"]) app.component("SaEmpty", SaEmpty);
};
export default {
  name: "SaEmpty",
  install
};
