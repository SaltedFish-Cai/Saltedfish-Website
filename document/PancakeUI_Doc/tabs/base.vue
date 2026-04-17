<template>
  <pa-title :padding="['bottom']">Card样式</pa-title>
  <pa-tabs v-model="activeName">
    <pa-tabs-item label="第一页" name="page1" class="card_style" :padding="['all']" use-border> page1 </pa-tabs-item>
    <pa-tabs-item label="第二页" name="page2" class="card_style" :padding="['all']" use-border> page2 </pa-tabs-item>
  </pa-tabs>

  <pa-title :padding="['bottom']">非Card样式</pa-title>
  <pa-tabs v-model="activeName" styleMode="default" align="edge">
    <pa-tabs-item label="第一页" name="page1" class="card_style" :padding="['all']"> page1 </pa-tabs-item>
    <pa-tabs-item label="第二页" name="page2" class="card_style"> page2 </pa-tabs-item>
  </pa-tabs>

  <pa-title :padding="['bottom']">纵向</pa-title>
  <pa-tabs v-model="activeName3" mode="portrait" styleMode="default">
    <pa-tabs-item label="第一页" name="page1" class="card_style" :padding="['all']"> page1 </pa-tabs-item>
    <pa-tabs-item label="第二页" name="page2" class="card_style"> page2 </pa-tabs-item>
  </pa-tabs>

  <pa-title :padding="['bottom']">纵向卡片</pa-title>
  <pa-tabs v-model="activeName4" mode="portrait">
    <pa-tabs-item label="第一页" name="page1" class="card_style" :padding="['all']"> page1 </pa-tabs-item>
    <pa-tabs-item label="第二页" name="page2" class="card_style"> page2 </pa-tabs-item>
  </pa-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const activeName = ref("page1");
const activeName3 = ref("page1");
const activeName4 = ref("page1");
</script>

<style scoped lang="scss">
.vp_title_label {
  margin-top: 20px;
  margin-bottom: 5px;
  &:first-child {
    margin-top: 0;
  }
}

.card_style {
  height: 200px;
}
</style>
