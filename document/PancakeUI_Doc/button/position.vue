<template>
  <el-row>
    <pa-button iconName="star_arc_line" @click="debouncedClick">左侧</pa-button>
    <pa-button iconName="star_arc_line" iconPosition="right" @click="debouncedClick">右侧</pa-button>
  </el-row>
</template>

<script lang="ts" setup>
import { M_Message } from "@/package/components/feedback";

function debouncedClick() {
  M_Message.success("点击触发");
}
</script>

<style></style>
