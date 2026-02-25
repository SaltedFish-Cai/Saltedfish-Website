import demoBlock from "../src/demo-block";

import { sidebar } from "./sidebar";
import { managerUISidebar } from "./manager-ui-sidebar";
import { managerUIV2Sidebar } from "./manager-ui-v2-sidebar";
import { ManagerMobileSidebar } from "./manager-mobile-sidebar";
import { ManagerTaroSidebar } from "./manager-taro-sidebar";
import { packageCode } from "./package-code";
import { study } from "./study";

import { resolve } from "path";

import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import NutUIResolver from "@nutui/auto-import-resolver";
import { VantResolver } from "@vant/auto-import-resolver";

export default {
  srcDir: "./",
  outDir: ".vitepress/dist",
  base: "/Saltedfish-Website/",
  cleanUrls: true,
  lang: "zh-CN",
  // lang: 'en-US',
  title: "Salted-Fish", // 标题
  description: "老咸鱼的站点", // 描述
  env: "manager",
  lastUpdated: true, // 上次更新时间
  markdown: {
    headers: {
      level: [0, 0]
    },
    config: md => {
      if (md?.use) md.use(demoBlock);
    }
  },

  themeConfig: {
    logo: "/logo-ui.svg",
    outline: {
      level: [2, 6],
      label: "目录大纲"
    },
    // 顶部导航
    nav: [
      // { text: "指南", link: "/document/guide/quickstart", activeMatch: "/guide/" },
      {
        text: "🤩 UI 框架",
        items: [
          { text: "👍 Manager-UI", link: "/document/ManagerUI_V2/m-icon/readme", activeMatch: "/ManagerUI_V2/" },
          { text: "🤹‍♀️ Manager-UI-Element", link: "/document/ManagerUI/m-color/readme", activeMatch: "/ManagerUI/" }
        ],
        activeMatch: "/Manager"
      },
      { text: "🤯 AI学习", link: "/document/study/ai/selection", activeMatch: "/study/" },
      { text: "🔨 工具站", link: "/document/tools/tools" },
      {
        text: "相关链接",
        items: [
          {
            text: "vitepress",
            link: "https://vitepress.dev/zh/"
          },
          {
            text: "vue",
            link: "https://cn.vuejs.org/"
          },
          {
            text: "vite",
            link: "https://cn.vitejs.dev/"
          }
        ]
      }
    ],
    sidebar: {
      "/document/demo/guide": sidebar,
      "/document/md": managerUISidebar,
      "/document/ManagerUI_V2": managerUIV2Sidebar,
      "/document/ManagerUI": managerUISidebar,
      "/document/ManagerMobile": ManagerMobileSidebar,
      "/document/ManagerTaro": ManagerTaroSidebar,
      "/document/solution": managerUISidebar,
      "/document/study": study
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档"
          },
          modal: {
            searchBox: {
              resetButtonTitle: "清除查询条件",
              resetButtonAriaLabel: "清除查询条件",
              cancelButtonText: "取消",
              cancelButtonAriaLabel: "取消"
            },
            startScreen: {
              recentSearchesTitle: "搜索历史",
              noRecentSearchesText: "没有搜索历史",
              saveRecentSearchButtonTitle: "保存至搜索历史",
              removeRecentSearchButtonTitle: "从搜索历史中移除",
              favoriteSearchesTitle: "收藏",
              removeFavoriteSearchButtonTitle: "从收藏中移除"
            },
            errorScreen: {
              titleText: "无法获取结果",
              helpText: "你可能需要检查你的网络连接"
            },
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
              searchByText: "搜索提供者"
            },
            noResultsScreen: {
              noResultsText: "无法找到相关结果",
              suggestedQueryText: "你可以尝试查询",
              reportMissingResultsText: "你认为该查询应该有结果？",
              reportMissingResultsLinkText: "点击反馈"
            }
          }
        }
      }
    },
    // 社交信息栏
    socialLinks: [
      { icon: "gitee", link: "https://gitee.com/SaltedFish-Cai/Saltedfish-Website" },
      { icon: "github", link: "https://github.com/SaltedFish-Cai/Saltedfish-Website" }
    ],
    // 底部信息栏
    footer: {
      message: "Released under the BSD License.",
      copyright: "Copyright © 2024-present <a href='http://beian.miit.gov.cn' target='_blank'>沪ICP备2022024976号</a>"
    },
    lastUpdated: {
      text: "更新于",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium"
      }
    }
    // 广告栏
    // carbonAds: {
    //     code: '',
    //     placement: ''
    // }
  },
  vite: {
    // Vite 配置选项
    plugins: [
      vueJsx(),
      AutoImport({
        resolvers: [VantResolver()]
      }),
      Components({
        resolvers: [VantResolver(), NutUIResolver()]
      })
    ],
    server: {
      host: "0.0.0.0",
      port: 7007,
      open: true,
      cors: true
      // Load proxy configuration from .env.development
    },
    resolve: {
      alias: {
        public: resolve(__dirname, "../public"),
        "@": resolve(__dirname, "../src"),
        "@m": resolve(__dirname, "../src/package/manager-ui"),
        "@mo": resolve(__dirname, "../src/package/manager-mobile"),
        MTools: resolve(__dirname, "../src/package/manager-ui/tools/"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    }
  },
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["link", { rel: "icon", href: `/logo-ui.svg` }]
    // ["script", { src: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js` }]
  ]
};
