# 使用 Algolia AI 搜索

本文将介绍如何使用 **Algolia AI** + **Google Gemini** 搜索来实现对文档的智能搜索和智能回答。

## 1. 引入资源（DocSearch v4）

在 HTML 中引入 DocSearch 的 CSS 和 JS 文件（根据你要求的 v4 版本）：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@4" />

<div id="docsearch"></div>

<script src="https://cdn.jsdelivr.net/npm/@docsearch/js@4"></script>
```

## 2. 初始化 DocSearch 并启用 AI 配置

要使用 AI 功能，重点在于 `insights: true` 和 `askAi` 否则只会使用普通的搜索功能。

```javascript
docsearch({
  container: "#docsearch", // 你的容器选择器
  appId: "YOUR_APP_ID", // 替换为你的 App ID
  indexName: "YOUR_INDEX_NAME", // 替换为你的索引名
  apiKey: "YOUR_SEARCH_API_KEY", // 使用 Search-only API Key
  insights: true,
  askAi: "YOUR_ASK_AI_KEY" // 替换为你的 Ask AI Key
});
```

### 2.1 获取 Algolia 所需的基础凭证

基础凭证包括 `YOUR_APP_ID` 和 `YOUR_SEARCH_API_KEY` 以及 `YOUR_INDEX_NAME`。

1. **创建一个新的应用**

- 访问 [Algolia Dashboard](https://www.algolia.com/dashboard) 并登录你的账户。
- 在页面左侧的导航栏中，找到并点击底部的 **Settings**（齿轮图标）
- 然后在弹出菜单的 **General** 板块下选择 **Applications**，点击右上角的 **Create Application**
- 输入应用名称，例如 `Document`，然后在 **Select your Search plan** 选择 **DocSearch** 计划。
- 点击右下角 **Next: Apply to DocSearch** 完成创建。

2. **配置索引**

- 创建完成后你需要在下一步填写你的 "Domain" ,并点击输入框右侧的 **Add domain** 按钮，等待域名审核，期间你可以继续你的其他操作。
- 点击页面中 **Go to Dashboard** 按钮，进入项目的 **Dashboard** 页面。
- 在 **Dashboard** 页面，你可以看到 **Go To Crawler** 按钮，点击它进入 **Crawler** 页面。
- 在 **Crawler** 页面，你可以看到 **Verify now** 按钮这一步是用来验证你的域名是否被允许被索引。
- 在你将 **meta** 添加到你的页面首页后，点击 **Verify now** 按钮，等待域名验证完成，之后项目会自动开始索引你的页面，生成索引数据。

3. **获取 API Keys**

- 索引完成后，点击 **Overview** 按钮，进入首页，你会看到最下饭有一个 **Index** 表格，
- 表格中会显示你的索引名称，这就是你的 `YOUR_INDEX_NAME`。
- 现在点击左下角 **Settings** 按钮，进入 **Settings** 页面。
- 在 **Team and Access** 下，点击**API Keys**，你可以看到 **Application ID**（`YOUR_APP_ID`） 和 **Search API Key**（`YOUR_SEARCH_API_KEY`）。

致辞你已经可以开始配置 **Algolia** 了，但是还没开始配置 **AI 功能**。

## 3. 获取 Gemini API Key

- 访问 [Google AI Studio](https://aistudio.google.com/) 并登录你的账户。
- 在页面左侧的导航栏中，找到并点击 **Get API Key**。
- 点击右上角 **Create API Key** 按钮，输入 API Key 名称，例如 `DocSearch AI`，然后点击 **Create** 按钮。
- 你会在页面上看到你的 **API Key** 列表，点击 **key 名字**，在弹窗中复制你的 **API Key**。

## 4. 如何“真正”开启 AI 功能（后台配置）

单纯引入脚本是不够的，AI 功能主要是在 **Algolia Dashboard**（后台）开启的：

1. **开启 NeuralSearch (AI 搜索)**：

- 登录 Algolia 控制台。
- 进入 **Data sources（Settings 上方按钮）** 你会看到 **Ask AI** 选项。
- 点击 **Add assistant** 选项，开始创建一个新的 AI 助手。
- 选择供应商，这里选择 **Google Gemini**。
- 选择你需要的模型，这里选择 **Gemini 2.5 Flash**。
- 输入你的 **API Key**，之后根据需求配置对于 **Gemini 2.5 Flash** 模型的参数。
- 点击 **Create** 按钮，创建完成后你会在 **Ask AI** 选项中看到你的新创建的 AI 助手。
- 当你完成一个 AI 助手的创建后，你需要在 **Data sources** 页面，点击 **Ask AI** 选项，你会看到你的新创建的 AI 助手。
- 你可以直接看见助手的 **Assistant ID**，这就是你的 `YOUR_ASK_AI_KEY`。

## 5. 问题和注意事项

- **索引数据**：确保你的索引数据包含了足够的文档内容，以便 AI 助手能够理解和回答问题。
- **模型参数**：根据你的需求调整 **Gemini 2.5 Flash** 模型的参数，每天可以调用 1500 次，注意调用次数不要超过限制。
- **权限**：确保你的 API Key 有足够的权限来调用 **Gemini 2.5 Flash** 模型。
- **AI 功能没开启**：如果你可 AI 功能没开启，你可以在 **Data sources** 页面，点击 **Ask AI** 进入页面，在右上角点击**Playground**按钮进入 AI 功能测试页面，测试 AI 功能是否正常，如果在测试页面可以使用，说明 AI 功能已经开启，此时你可以需要等待，因为域名的校验需要时间，如果你的域名已经完成备案，等待时间会更快。

## 6. 示例代码 (完整版)

更多参数请参考和使用说明 [Algolia DocSearch 文档](https://docsearch.algolia.com/docs/docsearch/)

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DocSearch AI 功能测试</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
    <style>
      body {
        font-family: system-ui, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
        background-color: #f4f4f9;
      }

      .container {
        text-align: center;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #333;
      }

      p {
        color: #666;
        margin-bottom: 2rem;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h1>Algolia DocSearch AI 测试</h1>
      <p>点击下方搜索框或使用 <kbd>Ctrl+K</kbd> 唤起 AI 问答</p>
      <div id="docsearch"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@docsearch/js@4"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@4" />

    <script type="text/javascript">
      docsearch({
        container: "#docsearch",
        appId: "YOUR_APP_ID",
        apiKey: "YOUR_SEARCH_API_KEY",
        indexName: "YOUR_INDEX_NAME",
        insights: true,
        askAi: {
          assistantId: "YOUR_ASK_AI_KEY",
          searchParameters: {
            // Filtering parameters
            facetFilters: ["language:en", "version:latest"],
            placeholder: "搜索文档或提问 AI...",
            filters: "type:content AND language:en",

            // Content control parameters
            attributesToRetrieve: ["title", "content", "url"],
            restrictSearchableAttributes: ["title", "content"],

            // Deduplication
            distinct: true
          }
        },
        placeholder: "搜索文档或提问 AI...",
        // --- 语言与提示词修改开始 ---
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
            },
            newConversation: {
              newConversationTitle: "新的对话",
              newConversationDescription: "开始新的对话，AI 助手将忘记之前的内容。"
            }
          }
        },

        searchParameters: {
          clickAnalytics: true,
          facetFilters: ["language:en", "version:latest"]
        }
      });
    </script>
  </body>
</html>
```
