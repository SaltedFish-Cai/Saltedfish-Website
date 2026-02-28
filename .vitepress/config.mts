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
  base: process.env.DEPLOY_TARGET === "gh-pages" ? "/Saltedfish-Website/" : "/",
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
    search:
      process.env.DEPLOY_TARGET === "gh-pages"
        ? {
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
          }
        : {
            provider: "algolia",
            options: {
              appId: "IAB2LW1YC9",
              apiKey: "7137ff10d7023a7fd954b56a313c2076",
              indexName: "saltedfish.frontend-m.online",
              insights: true,
              askAi: "M7l8pndQS3kV",

              translations: {
                button: {
                  buttonText: "搜索文档或提问 AI", // 页面上未激活时的按钮文字
                  buttonAriaLabel: "搜索文档"
                },
                modal: {
                  searchBox: {
                    clearButtonTitle: "清除查询",
                    clearButtonAriaLabel: "清除查询",
                    closeButtonText: "关闭",
                    closeButtonAriaLabel: "关闭弹窗",
                    placeholderText: "搜索文档或提问 AI...",
                    placeholderTextAskAi: "有什么我可以帮您的？",
                    placeholderTextAskAiStreaming: "AI 正在生成回答...",
                    enterKeyHint: "发送",
                    enterKeyHintAskAi: "发送",
                    searchInputLabel: "搜索文档或提问 AI...",
                    backToKeywordSearchButtonText: "返回关键词搜索",
                    backToKeywordSearchButtonAriaLabel: "返回关键词搜索",
                    newConversationPlaceholder: "新的对话",
                    conversationHistoryTitle: "对话历史",
                    startNewConversationText: "开始新的对话",
                    viewConversationHistoryText: "查看对话历史",
                    threadDepthErrorPlaceholder: "对话深度超过最大限制，无法继续"
                  },
                  newConversation: {
                    newConversationTitle: "新的对话",
                    newConversationDescription: "开始新的对话，AI 助手将忘记之前的内容。"
                  },
                  footer: {
                    selectText: "选择",
                    submitQuestionText: "提交问题",
                    selectKeyAriaLabel: "回车键",
                    navigateText: "切换",
                    navigateUpKeyAriaLabel: "向上箭头",
                    navigateDownKeyAriaLabel: "向下箭头",
                    closeText: "关闭",
                    backToSearchText: "返回搜索",
                    closeKeyAriaLabel: "Esc 键"
                  },
                  errorScreen: {
                    titleText: "无法获取结果",
                    helpText: "您可能需要检查网络连接"
                  },
                  startScreen: {
                    recentSearchesTitle: "最近搜索",
                    noRecentSearchesText: "无最近搜索",
                    saveRecentSearchButtonTitle: "保存此搜索",
                    removeRecentSearchButtonTitle: "从历史中移除",
                    favoriteSearchesTitle: "收藏",
                    removeFavoriteSearchButtonTitle: "从收藏中移除",
                    recentConversationsTitle: "最近对话",
                    removeRecentConversationButtonTitle: "从历史中移除"
                  },
                  noResultsScreen: {
                    noResultsText: "没有找到相关结果",
                    suggestedQueryText: "您可以尝试搜索",
                    reportMissingResultsText: "确信该内容存在？",
                    reportMissingResultsLinkText: "点此反馈"
                  },
                  resultsScreen: {
                    askAiPlaceholder: "输入问题，AI 为您解答...",
                    noResultsAskAiPlaceholder: "没有找到相关结果，您可以尝试搜索..."
                  },
                  // Ask AI 专属文案
                  askAiScreen: {
                    disclaimerText: "请确认您的问题与文档内容相关，AI 助手不提供专业咨询服务。",
                    relatedSourcesText: "相关文档",
                    thinkingText: "思考中...",
                    copyButtonText: "复制",
                    copyButtonCopiedText: "已复制",
                    copyButtonTitle: "复制回答",
                    likeButtonTitle: "喜欢",
                    dislikeButtonTitle: "不喜欢",
                    thanksForFeedbackText: "感谢您的反馈！",
                    preToolCallText: "正在调用工具...",
                    duringToolCallText: "工具调用中...",
                    afterToolCallText: "工具调用完成"
                  }
                }
              },

              searchParameters: {
                clickAnalytics: true
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
    ["link", { rel: "icon", href: `//saltedfish.frontend-m.online/logo-ui.svg` }],
    ["meta", { name: "algolia-site-verification", content: "601BD5B794ABD061" }],
    ["script", { src: "https://unpkg.com/@algolia/sitesearch@latest/dist/search.min.js" }],
    ["link", { rel: "stylesheet", href: "https://unpkg.com/@algolia/sitesearch@latest/dist/search.min.css" }],

    ["script", { src: "https://cdn.jsdelivr.net/npm/@docsearch/js@4" }],
    ["link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@docsearch/css@4" }]
    // ["script", { src: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js` }]
  ]
};
