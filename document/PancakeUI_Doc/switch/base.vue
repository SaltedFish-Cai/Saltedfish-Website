<template>
  <pa-title :padding="['bottom']">基础使用</pa-title>
  <pa-switch v-model="value1" :activeText="'activeText'" :exOptions="exOptions"></pa-switch>

  <pa-title :padding="['bottom']">Display</pa-title>
  <pa-switch v-model="value1" :activeText="'activeText'" :exOptions="exOptions" display></pa-switch>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value1 = ref(1);

const exOptions = ref({
  activeValue: "1",
  inActiveValue: "2",
  inActiveText: "选择2"
});
</script>

<style></style>
