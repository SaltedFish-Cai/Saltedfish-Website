import MTime from "./m-time.vue";

const install = function (app) {
  if (!app._context.components["MTime"]) app.component("MTime", MTime);
};
export default {
  name: "MTime",
  install
};
