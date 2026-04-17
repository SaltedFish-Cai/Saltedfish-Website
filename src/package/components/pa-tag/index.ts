import PaTag from "./pa-tag.vue";

const install = function (app) {
  if (!app._context.components["PaTag"]) app.component("PaTag", PaTag);
};
export default {
  name: "PaTag",
  install
};
