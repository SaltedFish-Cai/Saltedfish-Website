<template>
  <!-- input -->
  <cell-item
    v-if="item.prop && (item.cellConfig?.type == 'input' || item.cellConfig?.type == 'textarea')"
    :item="{
      ...item.cellConfig,
      display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
      prop: item.prop,
      placeholder: `${item.cellConfig.placeholder || languagePackage['input'] + item.label}`,
      disabled: exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row)
    }"
    :data="row"
  ></cell-item>
</template>

<script setup lang="ts" name="Pagination">
// # Import
import { computed } from "vue";
import CellItem from "../../../m-elements/input/index.vue";
import { MTableItemType } from "../../type";
import { useBaseStore } from "../../../store/index";

type CellProps = {
  item: MTableItemType;
  row?: objectType;
  exFormatter?: {};
  exParser?: {};
  exDisabled?: {};
  exDisplay?: {};
};

withDefaults(defineProps<CellProps>(), {
  exFormatter: () => ({}),
  exParser: () => ({}),
  exDisabled: () => ({}),
  exDisplay: () => ({})
});

const globalState = useBaseStore();
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});
</script>

<style lang="scss"></style>
