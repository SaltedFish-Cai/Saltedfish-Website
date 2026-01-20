import MSwitch from "./m-switch.vue";

const install = function (app) {
  if (!app._context.components["MSwitch"]) app.component("MSwitch", MSwitch);
};
export default {
  name: "MSwitch",
  install
};
