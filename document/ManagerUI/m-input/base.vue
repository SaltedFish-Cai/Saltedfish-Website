<template>
  <m-title>尺寸</m-title>
  <m-radio v-model="size" :exOptions="exOptions"></m-radio>

  <m-title>基础使用</m-title>
  <m-input
    v-model="value1"
    :size="size"
    maxLength="2000"
    @change="data => console.log(data)"
    alwaysContrast
    :contrastData="value2"
  ></m-input>

  <m-title>Display</m-title>
  <m-input
    v-model="value1"
    :size="size"
    maxLength="2000"
    @change="data => console.log(data)"
    :contrastData="value2"
    display
  ></m-input>

  <m-title class="mt10">文本域</m-title>
  <m-input v-model="value2" type="textarea" maxLength="2000" :size="size" clearable :contrastData="value1"></m-input>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
const value1 = ref("123");
const value2 = ref("321");

const size: Ref<"default" | "large" | "small"> = ref("default");

const exOptions = ref([
  { label: "小", value: "small" },
  { label: "标准", value: "default" },
  { label: "大", value: "large" }
]);
</script>

<style></style>
