<template>
  <el-form-item :prop="item.prop">
    <!-- label -->
    <template #label v-if="item.label">
      <form-label :label="item.label" :tip="item.tip" :item="item" :data="data" :labelWidth="labelWidth">
        <template v-for="slot in Object.keys($slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope"></slot>
        </template>
      </form-label>
    </template>

    <slot :name="item.prop" :row="item" />
  </el-form-item>
</template>
<script lang="ts" setup>
// # Import
import formLabel from "../label.vue";
import { SlotItemsPropsType } from "../../item";

// # Var
withDefaults(defineProps<SlotItemsPropsType>(), {
  data: () => ({})
});
</script>
<style lang="scss" scoped></style>
