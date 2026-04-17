// # Import
import PaTabs from "./pa-tabs.vue";
import PaTabsItem from "./pa-tabs-item.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaTabs"]) {
    app.component("PaTabs", PaTabs);
    app.component("PaTabsItem", PaTabsItem);
  }
};

export default {
  name: "PaTabs",
  install
};
