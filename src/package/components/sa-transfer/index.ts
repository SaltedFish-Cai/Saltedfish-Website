import SaTransfer from "./sa-transfer.vue";

const install = function (app) {
  if (!app._context.components["SaTransfer"]) app.component("SaTransfer", SaTransfer);
};
export default {
  name: "SaTransfer",
  install
};
