// # Import
import PaTable from "./pa-table.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaTable"]) app.component("PaTable", PaTable);
};

export default {
  name: "PaTable",
  install
};
