// # Import
import SaButton from "./sa-button.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["MButton"]) {
    app.component("SaButton", SaButton);
  }
};

export default {
  name: "SaButton",
  install
};
