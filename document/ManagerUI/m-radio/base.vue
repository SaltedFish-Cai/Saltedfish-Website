<template>
  <m-title>基础使用</m-title>
  <m-radio v-model="value1" :exOptions="exOptions"></m-radio>

  <m-title>Display</m-title>
  <m-radio v-model="value1" :exOptions="exOptions" display></m-radio>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value1 = ref(1);

const exOptions = ref([
  { label: "选项1", value: 1 },
  { label: "选项2", value: 2 }
]);
</script>

<style></style>
