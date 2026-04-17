// # Import
import PaPopover from "./pa-popover.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaPopover"]) {
    app.component("PaPopover", PaPopover);
  }
};

export default {
  name: "PaPopover",
  install
};
