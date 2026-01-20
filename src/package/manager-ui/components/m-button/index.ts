// # Import
import mButton from "./m-button.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["MButton"]) app.component("MButton", mButton);
};

export default {
  name: "MButton",
  install
};
