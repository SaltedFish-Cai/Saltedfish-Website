<template>
  <pa-title :padding="['bottom']">对其方式：default</pa-title>
  <pa-tabs v-model="activeName">
    <pa-tabs-item label="第一页" name="page1" class="card_style" :padding="['all']"> page1 </pa-tabs-item>
  </pa-tabs>

  <pa-title :padding="['bottom']">对其方式：edge</pa-title>
  <pa-tabs v-model="activeName" align="edge">
    <pa-tabs-item label="第一页" name="page1" class="card_style" :padding="['all']"> page1 </pa-tabs-item>
  </pa-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const activeName = ref("page1");
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
  background-color: #f5f5f5;
  height: 200px;
}
</style>
