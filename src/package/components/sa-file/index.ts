import SaFile from "./sa-file.vue";
import SaFileCustom from "./sa-file-custom.vue";

const install = function (app) {
  if (!app._context.components["SaFile"]) {
    app.component("SaFile", SaFile);
    app.component("SaFileCustom", SaFileCustom);
  }
};
export default {
  name: "SaFile",
  install
};
