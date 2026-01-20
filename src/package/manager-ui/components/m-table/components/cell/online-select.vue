<template>
  <cell-item
    v-if="item.prop && (item.cellConfig?.type == 'online-select' || item.cellConfig?.type == 'multiple-online-select')"
    :item="{
      ...item.cellConfig,
      display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
      prop: item.prop,
      placeholder: `${item.cellConfig.placeholder || languagePackage['select'] + item.label}`,
      disabled: exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row)
    }"
    :data="row"
    @remote-method="data => remoteMethod(data.query, data.prop, data.item, data.data)"
    @online-select-change="data => onlineSelectChange(data.prop, data.data, data.type)"
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
  exDisplay?: {};
  remoteMethod: Function;
  onlineSelectChange: Function;
};

withDefaults(defineProps<CellProps>(), {
  exDisabled: () => ({}),
  exDisplay: () => ({}),
  exOptions: () => ({})
});

const globalState = useBaseStore();

// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});
</script>

<style lang="scss"></style>
