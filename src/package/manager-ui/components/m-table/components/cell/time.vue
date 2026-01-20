<template>
  <!-- time -->
  <cell-date
    v-if="
      item.prop &&
      (item.cellConfig?.type == 'date-picker-group' ||
        item.cellConfig?.type == 'date-picker' ||
        item.cellConfig?.type == 'date-time-range')
    "
    :item="{
      ...item.cellConfig,
      prop: item.prop,
      display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
      placeholder: `${languagePackage['select']}${item.cellConfig.placeholder || item.label}`,
      disabled: exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row)
    }"
    :data="row"
  ></cell-date>

  <template v-if="item.prop && (item.cellConfig?.type == 'time-picker-group' || item.cellConfig?.type == 'time-picker')">
    <template v-if="!(exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row))">
      <cell-time
        :item="{
          ...item.cellConfig,
          display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
          prop: item.prop,
          placeholder: `${item.cellConfig.placeholder || languagePackage['select'] + item.label}`
        }"
        :data="row"
      ></cell-time>
    </template>

    <div v-else>{{ row[item.prop] || "--" }}</div>
  </template>

  <template v-if="item.prop && (item.cellConfig?.type == 'month-picker-group' || item.cellConfig?.type == 'month-picker')">
    <template v-if="!(exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row))">
      <cell-month
        :item="{
          ...item.cellConfig,
          display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
          prop: item.prop,
          placeholder: `${item.cellConfig.placeholder || languagePackage['select'] + item.label}`
        }"
        :data="row"
      ></cell-month>
    </template>

    <div v-else>{{ row[item.prop] || "--" }}</div>
  </template>

  <template v-if="item.prop && item.cellConfig?.type == 'year-picker'">
    <template v-if="!(exDisabled && exDisabled[item.prop] && exDisabled[item.prop](row))">
      <cell-year
        :item="{
          ...item.cellConfig,
          display: item.cellConfig.display || (exDisplay[item.prop] && exDisplay[item.prop](row)),
          prop: item.prop,
          placeholder: `${item.cellConfig.placeholder || languagePackage['select'] + item.label}`
        }"
        :data="row"
      ></cell-year>
    </template>

    <div v-else>{{ row[item.prop] || "--" }}</div>
  </template>
</template>

<script setup lang="ts" name="Pagination">
// # Import
import CellDate from "../../../m-elements/time/date.vue";
import CellTime from "../../../m-elements/time/time.vue";
import CellMonth from "../../../m-elements/time/month.vue";
import CellYear from "../../../m-elements/time/year.vue";

import { MTableItemType } from "../../type";

import { computed } from "vue";

import { useBaseStore } from "../../../store/index";

type CellProps = {
  item: MTableItemType;
  row?: objectType;
  exDisabled?: {};
  exDisplay?: {};
};

withDefaults(defineProps<CellProps>(), {
  row: () => ({}),
  exDisabled: () => ({}),
  exDisplay: () => ({})
});

const globalState = useBaseStore();

// #Computed languagePackage
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});
</script>

<style lang="scss"></style>
