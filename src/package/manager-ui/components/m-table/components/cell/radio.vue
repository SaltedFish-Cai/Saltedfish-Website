<template>
  <!-- -radio -->
  <cell-item
    v-if="item.prop && item.cellConfig?.type == 'radio'"
    :item="{
      ...item.cellConfig,
      display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
      prop: item.prop,
      disabled: exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row)
    }"
    :data="row"
    :exOptions="exOptions"
  ></cell-item>
</template>

<script setup lang="ts" name="Pagination">
// # Import
import CellItem from "../../../m-elements/radio/index.vue";
import { MTableItemType } from "../../type";

type CellProps = {
  item: MTableItemType;
  row?: objectType;
  exOptions?: {};
  exDisabled?: {};
  exDisplay?: {};
};

withDefaults(defineProps<CellProps>(), {
  exOptions: () => ({}),
  exDisabled: () => ({}),
  exDisplay: () => ({})
});
</script>

<style lang="scss"></style>
