<script setup lang="ts">
import docsearch from "@docsearch/js";
import { useRoute, useRouter } from "vitepress";
import type { DefaultTheme } from "vitepress/theme";
import { nextTick, onMounted, watch } from "vue";
import { useData } from "../composables/data";

const props = defineProps<{
  algolia: DefaultTheme.AlgoliaSearchOptions;
}>();

const router = useRouter();
const route = useRoute();
const { site, localeIndex, lang } = useData();

type DocSearchProps = Parameters<typeof docsearch>[0];

onMounted(update);
watch(localeIndex, update);

async function update() {
  await nextTick();
  const options = {
    ...props.algolia,
    ...props.algolia.locales?.[localeIndex.value]
  };
  const rawFacetFilters = options.searchParameters?.facetFilters ?? [];
  const facetFilters = [
    ...(Array.isArray(rawFacetFilters) ? rawFacetFilters : [rawFacetFilters]).filter(f => !f.startsWith("lang:")),
    `lang:${lang.value}`
  ];
  initialize({
    ...options,
    searchParameters: {
      ...options.searchParameters,
      facetFilters
    }
  });
}

function initialize(userOptions: DefaultTheme.AlgoliaSearchOptions) {
  // 1. 提取基础配置
  const { appId, apiKey, indexName, algoliaOptions } = userOptions;

  const options = {
    appId,
    apiKey,
    indexName,
    container: "#docsearch",

    // 2. 核心：显式开启 Insights 模式
    insights: true,

    // 3. 核心：手动注入 Assistant ID
    searchParameters: {
      ...userOptions.searchParameters,
      // 这里的 ID 必须匹配你截图中的 RO6Rb34soEl3
      assistantId: "RO6Rb34soEl3",
      attributesToSnippet: ["*:20"]
    },

    // 4. 处理路由跳转逻辑（保持你原有的不变）
    navigator: {
      navigate({ itemUrl }) {
        const { pathname: hitPathname } = new URL(window.location.origin + itemUrl);
        if (route.path === hitPathname) {
          window.location.assign(window.location.origin + itemUrl);
        } else {
          router.go(itemUrl);
        }
      }
    },

    transformItems(items) {
      return items.map(item => ({
        ...item,
        url: getRelativePath(item.url)
      }));
    }
  } as DocSearchProps;

  // 打印到控制台，确认 assistantId 是否真的存在
  console.log("Final AI Config:", options);

  docsearch(options);
}

function getRelativePath(url: string) {
  const { pathname, hash } = new URL(url, location.origin);
  return pathname.replace(/\.html$/, site.value.cleanUrls ? "" : ".html") + hash;
}
</script>

<template>
  <div id="docsearch" />
</template>
