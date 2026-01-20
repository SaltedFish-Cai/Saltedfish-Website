<template>
  <!-- file -->
  <cell-item
    v-if="item.prop && item.cellConfig?.type == 'file'"
    :item="{
      ...item.cellConfig,
      prop: item.prop,
      display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
      placeholder: `${item.cellConfig.placeholder || languagePackage['select'] + item.label}`,
      disabled: exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row),
      fileAttached: exFileData[item.prop]
    }"
    :data="row"
    :uploadConfig="uploadConfig"
  ></cell-item>
</template>

<script setup lang="ts" name="Pagination">
// # Import
import { computed } from "vue";
import { useBaseStore } from "../../../store/index";

import CellItem from "../../../m-elements/file/index.vue";
import { MTableItemType } from "../../type";

type CellProps = {
  item: MTableItemType;
  row?: objectType;
  exDisabled?: {};
  exDisplay?: {};
  exFileData?: {};
};
const globalState = useBaseStore();

// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});

const uploadConfig = computed(() => ({
  host: globalState.getApiHost || "",
  token: globalState.getToken || "",
  version: globalState.getVersion || ""
}));

withDefaults(defineProps<CellProps>(), {
  exDisabled: () => ({}),
  exDisplay: () => ({}),
  exFileData: () => ({})
});
</script>

<style lang="scss"></style>
