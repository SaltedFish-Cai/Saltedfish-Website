<template>
  <m-title>尺寸</m-title>
  <m-radio v-model="size" :exOptions="sizeOptions"></m-radio>

  <m-title>Display</m-title>
  <m-time v-model="value1" :size="size" type="date-picker-group" display></m-time>

  <m-title>基础使用(类型：date-picker-group)</m-title>
  <m-time v-model="value1" :size="size" type="date-picker-group"></m-time>

  <m-title>类型：date-picker</m-title>
  <m-time v-model="value2" :size="size" type="date-picker"></m-time>

  <m-title>类型：date-time-range</m-title>
  <m-time v-model="value3" :size="size" type="date-time-range"></m-time>

  <m-title>类型：month-picker-group</m-title>
  <m-time v-model="value4" :size="size" type="month-picker-group"></m-time>

  <m-title>类型：month-picker</m-title>
  <m-time v-model="value5" :size="size" type="month-picker"></m-time>

  <m-title>类型：time-picker-group</m-title>
  <m-time v-model="value6" :size="size" type="time-picker-group"></m-time>

  <m-title>类型：time-picker</m-title>
  <m-time v-model="value7" :size="size" type="time-picker"></m-time>

  <m-title>类型：year-picker-group</m-title>
  <m-time v-model="value8" :size="size" type="year-picker-group"></m-time>

  <m-title>类型：year-picker</m-title>
  <m-time v-model="value9" :size="size" type="year-picker"></m-time>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
const value1 = ref(["2024-04-23 00:00:00", "2024-04-28 00:00:01"]);
const value2 = ref("2024-04-23 00:00:00");
const value3 = ref(["2024-04-23 00:00:00", "2024-04-28 00:00:01"]);
const value4 = ref(["2024-04-23 00:00:00", "2024-04-28 00:00:01"]);
const value5 = ref("2024-04-23 00:00:00");
const value6 = ref(["2024-04-23 00:00:00", "2024-04-28 00:00:01"]);
const value7 = ref("2024-04-23 00:00:00");
const value8 = ref(["2024-04-23 00:00:00", "2024-04-28 00:00:01"]);
const value9 = ref("2024-04-23 00:00:00");

const size: Ref<"default" | "large" | "small"> = ref("default");

const sizeOptions = ref([
  { label: "小", value: "small" },
  { label: "标准", value: "default" },
  { label: "大", value: "large" }
]);
</script>

<style></style>
