import MFile from "./m-file.vue";

const install = function (app) {
  if (!app._context.components["MFile"]) app.component("MFile", MFile);
};
export default {
  name: "MFile",
  install
};
