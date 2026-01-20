// # Import
import MTitle from "./m-title.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["MTitle"]) app.component("MTitle", MTitle);
};

export default {
  name: "MTitle",
  install
};
