import PaTime from "./pa-time.vue";

const install = function (app) {
  if (!app._context.components["PaTime"]) app.component("PaTime", PaTime);
};
export default {
  name: "PaTime",
  install
};
