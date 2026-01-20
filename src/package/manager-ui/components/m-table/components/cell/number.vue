<template>
  <!-- number -->
  <cell-item
    v-if="item.prop && item.cellConfig?.type == 'number'"
    :item="{
      ...item.cellConfig,
      max: maxSize,
      min: minSize,
      display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
      prop: item.prop,
      placeholder: `${item.cellConfig.placeholder || languagePackage['select'] + item.label}`,
      disabled: exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row)
    }"
    :data="row"
  ></cell-item>
</template>

<script setup lang="ts" name="Pagination">
// # Import
import { computed } from "vue";
import CellItem from "../../../m-elements/number/index.vue";
import { MTableItemType } from "../../type";
import { useBaseStore } from "../../../store/index";

type CellProps = {
  item: MTableItemType;
  row?: objectType;
  exDisabled?: {};
  exDisplay?: {};
};

const props = withDefaults(defineProps<CellProps>(), {
  exDisabled: () => ({}),
  exDisplay: () => ({})
});

const maxSize = computed(() => {
  const { item, row } = props;
  if (item.cellConfig?.maxBy && row?.[item.cellConfig?.maxBy]) {
    return row?.[item.cellConfig?.maxBy];
  } else {
    return item?.cellConfig?.max ?? 2147483647;
  }
});

const minSize = computed(() => {
  const { item, row } = props;
  if (item.cellConfig?.minBy && row?.[item.cellConfig?.minBy]) {
    return row?.[item.cellConfig?.minBy];
  } else {
    return item?.cellConfig?.min ?? -2147483647;
  }
});

const globalState = useBaseStore();
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});
</script>

<style lang="scss"></style>
