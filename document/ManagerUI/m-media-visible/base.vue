<template>
  <m-title>基础使用</m-title>
  <m-media-visible :file-list="value1"></m-media-visible>
</template>

<script lang="ts" setup>
import { ref } from "vue";
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
