// _Import
import { defineAsyncComponent } from "vue";
import pinia from "./components/store/pinia";
import inBrowser from "./components/tools/inBrowser";
import { useBaseStore as globalState } from "./components/store/index";
import packageFile from "./version.json";
import dictionaries from "./components/tools/dictionaries";
import dictionariesAll from "./components/tools/dictionaries-all";
import Log from "./components/tools/log";
import { setThemeColor } from "./components/tools/color";
import toLocaleString from "./components/tools/toLocaleString";

import { M_Notification, M_Message, M_MessageBox } from "./components/feedback";

import "./components/style.scss";
import "./components/styles/index.scss";
import "./components/styles/pt-size.scss";
import "./components/styles/flex.scss";
import "./components/styles/animation.scss";

// import "../../styles/mp.scss";

// icon
import mIcon from "./components/m-icon/index";

// title
import mTitle from "./components/m-title/index";

// card
import mAnimation from "./components/m-animation/index";

// button
import mButton from "./components/m-button/index";

// dialog
import mDialog from "./components/m-dialog/index";

// form
import mForm from "./components/m-form/index";

// table
import mTable from "./components/m-table/index";
import { useBaseStore as tableBaseStore } from "./components/m-table/hooks/store";

// light-table
// import mLightTable from "./components/m-light-table/index";

// tabs
import mTabs from "./components/m-tabs/index";

// editor
import mEditor from "./components/m-editor/index";

// input
import mInput from "./components/m-input/index";

// number
import mNumber from "./components/m-number/index";

// select
import mSelect from "./components/m-select/index";

// radio
import mRadio from "./components/m-radio/index";

// checkbox
import mCheckbox from "./components/m-checkbox/index";

// switch
import mSwitch from "./components/m-switch/index";

// scrollbar
import mScrollBar from "./components/m-scrollbar/index";

// scrollbar
import mScrollBarList from "./components/m-scrollbar-list/index";

// line-map
import mLineMap from "./components/m-line-map/index";

// Media View
import MMediaView from "./components/m-media-view/index";

// File
import MFile from "./components/m-file/index";

// Time
import MTime from "./components/m-time/index";

// Cascader
import MCascader from "./components/m-cascader/index";

import { GlobalState } from "./components/store/type";

// input

// _Function install
const install = function (app, options: GlobalState) {
  const {
    themeColor = "#254679",
    isDark = false,
    requestHeader,
    tableConfig = {},
    formConfig = {},
    size = "default",
    apiBaseUrl = ""
  } = options;
  const { info, error, warning, success, msg } = Log();

  if (inBrowser) {
    window.log = { info, error, warning, success, msg };
    window.log.msg("ManagerUI", "Version " + packageFile.version);
    window.toLocaleString = toLocaleString;

    const observer = window.ResizeObserver
      ? new window.ResizeObserver(callback)
      : {
          observe: () => {
            console.info(callback);
          }
        };

    // _Function 监听屏幕尺寸变化
    function callback() {
      const baseSize = 15;
      const devicePixelRatio = window.devicePixelRatio;
      const size = devicePixelRatio > 1 ? baseSize / devicePixelRatio : baseSize;
      const _size = size < 8 ? 8 : size;
      window.document.documentElement?.style?.setProperty("--el-scrollbar-width", _size + "px");
    }
    observer?.observe(window.document?.body);
  }

  if (!app._context.components["ManagerUI"]) {
    app.use(pinia);
    app.use(dictionaries);
    app.use(dictionariesAll);

    const components: any = import.meta.glob("./components/m-*/m-*.vue");
    for (const path in components) {
      const name = path.slice(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
      app.component(name, defineAsyncComponent(components[path]));
    }

    // if (!app.GlobalState) app.GlobalState = {};
    // if (!app.MTools) app.MTools = {};
    // if (!app.GlobalState.MGlobalState) app.GlobalState.MGlobalState = globalState;
    // if (!app.GlobalState.MTableState) app.GlobalState.MTableState = tableBaseStore;

    if (inBrowser) {
      if (!window.setManagerTheme) window.setManagerTheme = setThemeColor;
      const setManagerThemeDark = val => setThemeColor(themeColor, val);
      if (!window.setManagerThemeDark) window.setManagerThemeDark = setManagerThemeDark;
      setThemeColor(themeColor, isDark);

      const SIZE_MAP_MORE = {
        small: {
          "--el-component-base-size-default": "24px",
          "--el-font-base-size-default": "12px"
        },
        default: {
          "--el-component-base-size-default": "28px",
          "--el-font-base-size-default": "13px"
        },
        large: {
          "--el-component-base-size-default": "32px",
          "--el-font-base-size-default": "15px"
        }
      };

      const SIZE_MAP = {
        // El
        "--el-scrollbar-width": "12px",
        "--el-component-size-large": "32px",
        "--el-component-size": "28px",
        "--el-component-size-small": "24px",

        ...SIZE_MAP_MORE[size]
      };

      for (const key in SIZE_MAP) {
        window.document.documentElement?.style?.setProperty(key, SIZE_MAP[key]);
      }

      if (!window.MGlobalState) window.MGlobalState = globalState;
      if (!window.MTableState) window.MTableState = tableBaseStore;

      const useGlobalState = globalState();
      const data = { themeColor, isDark, requestHeader, tableConfig, formConfig, size, apiBaseUrl };
      useGlobalState.setGlobalConfig(data);
    }
  }
};

export default {
  name: "ManagerUI",
  install
};

export {
  mIcon,
  mTitle,
  mButton,
  mDialog,
  mForm,
  mTable,
  mTabs,
  mEditor,
  mNumber,
  mSelect,
  mRadio,
  mCheckbox,
  mSwitch,
  mInput,
  mLineMap,
  mScrollBar,
  mScrollBarList,
  MMediaView,
  MFile,
  MCascader,
  MTime,
  mAnimation
  // mLightTable
};

export { dictionaries, dictionariesAll, M_Notification, M_Message, M_MessageBox };
