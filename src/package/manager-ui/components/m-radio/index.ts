import MRadio from "./m-radio.vue";

const install = function (app) {
  if (!app._context.components["MRadio"]) app.component("MRadio", MRadio);
};
export default {
  name: "MRadio",
  install
};
