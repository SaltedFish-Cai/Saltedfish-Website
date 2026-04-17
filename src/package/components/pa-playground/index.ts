// # Import
import PaPlayground from "./pa-playground.vue";
import PaPlaygroundVisible from "./pa-playground-visible.vue";

// #Function install
const install = function (app) {
  if (!app.GlobalState) app.GlobalState = {};
  if (!app._context.components["PaPlayground"]) {
    app.component("PaPlayground", PaPlayground);
    app.component("PaPlaygroundVisible", PaPlaygroundVisible);
  }
};

export default {
  name: "PaPlayground",
  install
};
