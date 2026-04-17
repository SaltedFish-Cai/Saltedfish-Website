<template>
  <pa-button is="go" @click="visible = true">显示弹窗</pa-button>
  <pa-dialog v-model="visible" title="弹出框Dialog" height="300">
    <template #header>
      <div class="custom-header">自定义 Header</div>
    </template>
    Slot
    <template #footer>自定义 Footer</template>
  </pa-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const visible = ref(false);
</script>

<style scoped>
.custom-header {
  padding: var(--pa-size-padding);
  font-weight: bold;
}
</style>
