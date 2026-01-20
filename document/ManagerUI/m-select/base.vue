<template>
  <m-title>尺寸</m-title>
  <m-radio v-model="size" :exOptions="sizeOptions"></m-radio>

  <m-title>基础使用</m-title>
  <m-select v-model="value1" :exOptions="exOptions" :size="size" clearable></m-select>

  <m-title>Display</m-title>
  <m-select v-model="value1" :exOptions="exOptions" :size="size" display></m-select>

  <m-title class="mt10">异步请求选项</m-title>
  <m-select v-model="value2" :requestApi="remoteMethodFn" clearable type="online-select" :size="size"></m-select>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
const value1 = ref(1);
const value2 = ref(3);

const exOptions = ref([
  { label: "选项1", value: 1 },
  { label: "选项2", value: 2 }
]);

async function remoteMethodFn({ query }) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { label: `选项${query}-1`, value: 3 },
        { label: `选项${query}-2`, value: 4 }
      ]);
    }, 1000);
  });
}

const size: Ref<"default" | "large" | "small"> = ref("default");

const sizeOptions = ref([
  { label: "小", value: "small" },
  { label: "标准", value: "default" },
  { label: "大", value: "large" }
]);
</script>

<style></style>
