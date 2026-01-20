<template>
  <m-title>基础使用</m-title>
  <m-file
    v-model="value1"
    :fileIncludeType="['png']"
    :fileExcludeType="['jpg']"
    :exData="exData"
    :contrastData="value1"
    alwaysContrast
  ></m-file>

  <m-title>Display</m-title>
  <m-file
    v-model="value1"
    :fileIncludeType="['png']"
    :fileExcludeType="['jpg']"
    :exData="exData"
    :contrastData="value1"
    alwaysContrast
    display
  ></m-file>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const exData = ref({
  FileTypeCode: "WorkflowApprovalFile"
});
const value1 = ref([
  {
    FileId: "0000001",
    FileName: "baidu.png",
    FileUrl: "//www.baidu.com/img/flexible/logo/pc/result@2.png",
    FullPath: "//www.baidu.com/img/flexible/logo/pc/result@2.png",
    OriginalName: "baidu.png"
  }
]);
</script>

<style></style>
