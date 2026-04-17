<template>
  <pa-button font="star_arc_line" @click="debouncedClick1">Drawer弹窗</pa-button>

  <pa-drawer
    v-model="drawerVisible"
    :title="{ 'zh-CN': '弹窗', 'en-US': 'Drawer' }"
    :sub-title="{ 'zh-CN': '弹窗副标题', 'en-US': 'Drawer Subtitle' }"
    scroll
    :padding="['all']"
  >
    <div style="height: 1500px">弹窗内容</div>
    <template #footer>
      <pa-button type="primary" @click="drawerVisible = false" is="cancel">关闭</pa-button>
    </template>
  </pa-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const drawerVisible = ref(false);

function debouncedClick1() {
  drawerVisible.value = true;
}
</script>

<style></style>
