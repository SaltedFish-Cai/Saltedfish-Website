<template>
  <template v-if="item.prop && (item.cellConfig?.type == 'request-select' || item.cellConfig?.type == 'multiple-request-select')">
    <div class="hidden-span" v-if="!row?.cellConfig?.options[item.prop]">
      {{ remoteMethod("", item.prop, item, row, true) }}
    </div>
    <cell-item
      :item="{
        ...item.cellConfig,
        display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
        prop: item.prop,
        placeholder: `${item.cellConfig.placeholder || languagePackage['select'] + item.label}`,
        disabled: exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row)
      }"
      :data="row || {}"
      :ex-options="item.exOption"
      @online-select-change="data => onlineSelectChange(data.prop, data.data, data.type)"
    >
      <template v-for="slot in Object.keys($slots)" #[slot]="scope"> <slot :name="slot" v-bind="scope"></slot> </template>
    </cell-item>
  </template>
</template>

<script setup lang="ts" name="Pagination">
// # Import
import CellItem from "../../../m-elements/select/index.vue";
import { MTableItemType } from "../../type";
import { computed } from "vue";

import { useBaseStore } from "../../../store/index";

type CellProps = {
  item: MTableItemType & { exOption?: {} };
  row?: objectType;
  exDisabled?: {};
  exDisplay?: {};
  exOptions?: {};
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
