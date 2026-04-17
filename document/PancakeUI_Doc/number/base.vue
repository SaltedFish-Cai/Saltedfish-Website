<template>
  <pa-title :padding="['bottom']">基础使用</pa-title>
  <pa-number
    v-model="value1"
    controls
    :size="size"
    :contrastData="value2"
    :title="{ 'en-US': 'Basic Usage', 'zh-CN': '基础使用' }"
  ></pa-number>

  <pa-title :padding="['bottom']">Display</pa-title>
  <pa-number v-model="value3" controls :size="size" display :contrastData="value2"></pa-number>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
const value1 = ref(123);
const value2 = ref(333);
const value3 = ref();

const size: Ref<"default" | "large" | "small"> = ref("default");
</script>

<style></style>
