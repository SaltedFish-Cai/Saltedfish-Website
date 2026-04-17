// # Import
import PaBadge from "./pa-badge.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaBadge"]) app.component("PaBadge", PaBadge);
};

export default {
  name: "PaBadge",
  install
};
