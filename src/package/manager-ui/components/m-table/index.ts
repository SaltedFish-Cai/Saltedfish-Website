// # Import
import mTable from "./m-table.vue";
import inBrowser from "../tools/inBrowser";

// # Var
if (inBrowser) {
  const script = window.document?.createElement("script") || {};
  script.src = "/Saltedfish-Website/library/sortable.js";
  window.document?.head?.appendChild(script);
}

// #Function install
const install = function (app) {
  if (!app._context.components["MTable"]) app.component("MTable", mTable);
};

export default {
  name: "MTable",
  install
};
