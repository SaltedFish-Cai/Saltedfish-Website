// # Import
import PaForm from "./pa-form.vue";
import PaFormControl from "./pa-form-control.vue";
import PaFormItem from "./pa-form-item.vue";

// #Function install
const install = function (app) {
  if (!app._context.components["PaForm"]) {
    app.component("PaForm", PaForm);
    app.component("PaFormControl", PaFormControl);
    app.component("PaFormItem", PaFormItem);
  }
};

export default {
  name: "PaForm",
  install
};
