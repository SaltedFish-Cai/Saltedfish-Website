<template>
  <!-- select -->
  <cell-item
    v-if="item.prop && (item.cellConfig?.type == 'select' || item.cellConfig?.type == 'multiple-select')"
    :item="{
      ...item.cellConfig,
      prop: item.prop,
      display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
      placeholder: `${item.cellConfig.placeholder || languagePackage['select'] + item.label}`,
      disabled: exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row)
    }"
    :data="row || {}"
    :exOptions="exOptions"
  >
    <template v-for="slot in Object.keys($slots)" #[slot]="scope"> <slot :name="slot" v-bind="scope"></slot> </template>
  </cell-item>
</template>

<script setup lang="ts" name="Pagination">
// # Import
import CellItem from "../../../m-elements/select/index.vue";
import { MTableItemType } from "../../type";
import { computed } from "vue";

import { useBaseStore } from "../../../store/index";

type CellProps = {
  item: MTableItemType;
  row?: objectType;
  exDisabled?: {};
  exOptions: {};
  exDisplay?: {};
};

withDefaults(defineProps<CellProps>(), {
  exDisabled: () => ({}),
  exOptions: () => ({}),
  exDisplay: () => ({})
});

const globalState = useBaseStore();

// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});
</script>

<style lang="scss"></style>
