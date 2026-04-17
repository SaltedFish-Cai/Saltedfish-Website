import PaRadioItem from "./pa-radio-item.vue";
import PaRadio from "./pa-radio.vue";

const install = function (app) {
  if (!app._context.components["PaRadio"]) {
    app.component("PaRadio", PaRadio);
  }
  if (!app._context.components["PaRadioItem"]) {
    app.component("PaRadioItem", PaRadioItem);
  }
};
export default {
  name: "PaCheckbox",
  install
};
