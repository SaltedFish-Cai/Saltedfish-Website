<template>
  <m-title>尺寸</m-title>
  <m-radio v-model="size" :exOptions="sizeOptions"></m-radio>

  <m-title>基础使用</m-title>
  <m-cascader v-model="value1" :exOptions="exOptions" :size="size" clearable></m-cascader>

  <m-title>Display</m-title>
  <m-cascader v-model="value3" :exOptions="exOptions" :size="size" display></m-cascader>

  <m-title>单层选择</m-title>
  <m-cascader v-model="value2" :exOptions="exOptions" :size="size" :type="'cascader-check'"></m-cascader>

  <m-title>单层多选择</m-title>
  <m-cascader v-model="value3" :exOptions="exOptions" :size="size" :type="'multiple-cascader-check'"></m-cascader>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
const value1 = ref(31);
const value2 = ref(1);
const value3 = ref([1, 31]);

const exOptions = ref([
  { label: "选项1", value: 1, children: [{ label: "选项1-1", value: 11 }] },
  { label: "选项2", value: 2 },
  {
    label: "选项3",
    value: 3,
    children: [
      { label: "选项3-1", value: 31 },
      { label: "选项3-2", value: 32 }
    ]
  }
]);

const size: Ref<"default" | "large" | "small"> = ref("default");

const sizeOptions = ref([
  { label: "小", value: "small" },
  { label: "标准", value: "default" },
  { label: "大", value: "large" }
]);
</script>

<style></style>
