// # Import
import PaScrollBarList from "./pa-scrollbar-list.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaScrollBarList"]) app.component("PaScrollBarList", PaScrollBarList);
};

export default {
  name: "PaScrollBarList",
  install
};
