<template>
  <m-title>基础使用</m-title>
  <m-switch v-model="value1" :activeText="'选择222'" :exOptions="exOptions"></m-switch>

  <m-title>Display</m-title>
  <m-switch v-model="value1" :activeText="'选择222'" :exOptions="exOptions" display></m-switch>
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
