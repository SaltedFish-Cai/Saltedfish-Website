// # Import
import MScrollBarList from "./m-scrollbar-list.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["MScrollBarList"]) app.component("MScrollBarList", MScrollBarList);
};

export default {
  name: "MScrollBarList",
  install
};
