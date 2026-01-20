<template>
  <m-form id="case-ex-options-from-demo" ref="proForm" :structure="formConfig" :ex-options="exOptions" />

  <div class="flex">
    <m-button is="go" @click="getOptionsFromApi">获取下拉框选项</m-button>
  </div>
</template>

<script lang="ts" setup>
import { MStructureType, MOptionType } from "MTypes";
import { ref } from "vue";

const proForm = ref();

const formConfig: MStructureType.Form[] = [{ label: "Select1", prop: "Select1", type: "select" }];

const exOptions: MOptionType.Form = {
  Select1: [] as []
};

async function getOptionsFromApi() {
  exOptions.value["Select1"] = [
    { label: "选项1", value: 1 },
    { label: "选项2", value: 2 }
  ];
}
</script>

<style scoped></style>
