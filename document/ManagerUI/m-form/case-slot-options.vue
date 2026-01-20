<template>
  <m-form id="case-slot-from-demo" ref="proForm" :structure="formConfig">
    <template #option-Select="scope">
      <div>{{ scope }}</div>
    </template>
  </m-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { MStructureType } from "MTypes";

const proForm = ref();

const formConfig: MStructureType.Form[] = [
  {
    label: "Select1",
    prop: "Select",
    type: "select",
    options: [
      { label: "选项1", value: 1 },
      { label: "选项2", value: 2 }
    ]
  }
];
</script>

<style scoped></style>
