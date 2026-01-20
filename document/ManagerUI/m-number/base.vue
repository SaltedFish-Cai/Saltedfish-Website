<template>
  <m-title>尺寸</m-title>
  <m-radio v-model="size" :exOptions="exOptions"></m-radio>

  <m-title>基础使用</m-title>
  <m-number v-model="value1" controls :size="size" :contrastData="value2"></m-number>

  <m-title>Display</m-title>
  <m-number v-model="value3" controls :size="size" display :contrastData="value2"></m-number>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
const value1 = ref(123);
const value2 = ref(333);
const value3 = ref();

const size: Ref<"default" | "large" | "small"> = ref("default");

const exOptions = ref([
  { label: "小", value: "small" },
  { label: "标准", value: "default" },
  { label: "大", value: "large" }
]);
</script>

<style></style>
