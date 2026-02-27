import MMediaView from "./m-media-view.vue";
import MMediaVisible from "./m-media-visible.vue";
import inBrowser from "../tools/inBrowser";

if (inBrowser) {
  const script1 = window.document?.createElement("script") || {};
  script1.src = "/library/pdf.js";
  script1.onload = () => {
    const script = window.document?.createElement("script") || {};
    script.src = "/library/pdfh5.js";
    window.document?.head?.appendChild(script);
  };
  window.document?.head?.appendChild(script1);

  const script2 = window.document?.createElement("script") || {};
  script2.src = "/library/pdf.worker.js";
  window.document?.head?.appendChild(script2);

  const script3 = window.document?.createElement("script") || {};
  script3.src = "/library/jquery-3.6.0.min.js";
  window.document?.head?.appendChild(script3);

  const link = window.document?.createElement("link") || {};
  link.rel = "stylesheet";
  link.href = "/library/pdfh5.min.css";
  window.document?.head?.appendChild(link);

  // const mammoth = window.document?.createElement("script") || {};
  // mammoth.src = "https://cdn.jsdelivr.net/npm/mammoth-style-plus@1.7.2-5/mammoth.browser.min.js";
  // window.document?.head?.appendChild(mammoth);

  // const zip = window.document?.createElement("script") || {};
  // zip.src = "/library/jszip.min.js";
  // window.document?.head?.appendChild(zip);

  // const docx = window.document?.createElement("script") || {};
  // docx.src = "/library/docx-preview.js";
  // window.document?.head?.appendChild(docx);

  // word
  const docxScript = window.document?.createElement("script") || {};
  docxScript.src = "/library/docx@1.6.4.js";
  window.document?.head?.appendChild(docxScript);

  const docxCss = window.document?.createElement("link") || {};
  docxCss.rel = "stylesheet";
  docxCss.href = "/library/docx@1.6.4.css";
  window.document?.head?.appendChild(docxCss);

  // excel
  const excelScript = window.document?.createElement("script") || {};
  excelScript.src = "/library/excel@1.7.14.js";
  window.document?.head?.appendChild(excelScript);

  const excelCss = window.document?.createElement("link") || {};
  excelCss.rel = "stylesheet";
  excelCss.href = "/library/excel@1.7.14.css";
  window.document?.head?.appendChild(excelCss);
}

const install = function (app) {
  if (!app._context.components["MMediaView"]) {
    app.component("MMediaView", MMediaView);
    app.component("MMediaVisible", MMediaVisible);
  }
};
export default {
  name: "MMediaView",
  install
};
