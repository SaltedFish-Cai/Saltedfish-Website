<template>
  <!-- cascader -->
  <cell-item
    v-if="
      item.prop &&
      (item.cellConfig?.type == 'cascader' ||
        item.cellConfig?.type == 'cascader-check' ||
        item.cellConfig?.type == 'multiple-cascader-check' ||
        item.cellConfig?.type == 'multiple-cascader')
    "
    :item="{
      ...item.cellConfig,
      display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
      prop: item.prop,
      placeholder: `${item.cellConfig.placeholder || languagePackage['select'] + item.label}`,
      disabled: exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row)
    }"
    :data="row"
    :exOptions="exOptions"
  ></cell-item>
</template>

<script setup lang="ts" name="Pagination">
// # Import
import CellItem from "../../../m-elements/cascader/index.vue";
import { MTableItemType } from "../../type";
import { computed } from "vue";

import { useBaseStore } from "../../../store/index";

type CellProps = {
  item: MTableItemType;
  row?: objectType;
  exDisabled?: {};
  exDisplay?: {};
  exOptions?: {};
};

const globalState = useBaseStore();

// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});

withDefaults(defineProps<CellProps>(), {
  exDisabled: () => ({}),
  exDisplay: () => ({}),
  exOptions: () => ({})
});
</script>

<style lang="scss"></style>
