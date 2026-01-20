// # Import
import mForm from "./m-form.vue";

// #Function install
const install = function (app) {
  if (!app.GlobalState) app.GlobalState = {};
  if (!app._context.components["MForm"]) app.component("MForm", mForm);
};

export default {
  name: "MForm",
  install
};
