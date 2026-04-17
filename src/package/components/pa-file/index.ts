import PaFile from "./pa-file.vue";
import PaFileCustom from "./pa-file-custom.vue";

const install = function (app) {
  if (!app._context.components["PaFile"]) {
    app.component("PaFile", PaFile);
    app.component("PaFileCustom", PaFileCustom);
  }
};
export default {
  name: "PaFile",
  install
};
