import PaPagination from "./pa-pagination.vue";

const install = function (app) {
  if (!app._context.components["PaPagination"]) app.component("PaPagination", PaPagination);
};
export default {
  name: "PaPagination",
  install
};
