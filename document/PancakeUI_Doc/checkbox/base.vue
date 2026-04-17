<template>
  <pa-title :padding="['bottom']">基础使用</pa-title>
  <pa-checkbox v-model="value1" :exOptions="exOptions"></pa-checkbox>

  <pa-title :padding="['bottom']">Display</pa-title>
  <pa-checkbox v-model="value1" :exOptions="exOptions" display></pa-checkbox>

  <pa-title :padding="['bottom']">单组件使用</pa-title>
  <pa-checkbox-item v-model="value2" label="选项1" value="1"></pa-checkbox-item>
  <pa-checkbox-item v-model="value2" label="选项2" value="2" disabled></pa-checkbox-item>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value1 = ref([1]);
const value2 = ref(1);

const exOptions = ref([
  { label: "选项1", value: 1 },
  { label: "选项2", value: 2 }
]);
</script>

<style></style>
