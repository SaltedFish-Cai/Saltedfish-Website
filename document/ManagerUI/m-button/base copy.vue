<template>
  <el-row class="mb-4">
    <m-button font="star_arc_line" :plain="false" type="primary">Primary</m-button>
    <m-button font="star_arc_line" :plain="false" type="success">Success</m-button>
    <m-button font="star_arc_line" :plain="false" type="info">Info</m-button>
    <m-button font="star_arc_line" :plain="false" type="warning">Warning</m-button>
    <m-button font="star_arc_line" :plain="false" type="danger">Danger</m-button>
  </el-row>

  <el-row class="mb-4">
    <m-button font="star_arc_line" type="primary">Primary</m-button>
    <m-button font="star_arc_line" type="success">Success</m-button>
    <m-button font="star_arc_line" type="info">Info</m-button>
    <m-button font="star_arc_line" type="warning">Warning</m-button>
    <m-button font="star_arc_line" type="danger">Danger</m-button>
  </el-row>

  <el-row class="mb-4">
    <m-button font="star_arc_line" round type="primary">Primary</m-button>
    <m-button font="star_arc_line" round type="success">Success</m-button>
    <m-button font="star_arc_line" round type="info">Info</m-button>
    <m-button font="star_arc_line" round type="warning">Warning</m-button>
    <m-button font="star_arc_line" round type="danger">Danger</m-button>
  </el-row>

  <el-row class="mb-4">
    <m-button font="star_arc_line" round type="primary" />
    <m-button font="star_arc_line" round type="success" />
    <m-button font="star_arc_line" round type="info" />
    <m-button font="star_arc_line" round type="warning" />
    <m-button font="star_arc_line" round type="danger" />
  </el-row>

  <el-row>
    <m-button font="star_arc_line" circle type="primary" />
    <m-button font="star_arc_line" circle type="success" />
    <m-button font="star_arc_line" circle type="info" />
    <m-button font="star_arc_line" circle type="warning" />
    <m-button font="star_arc_line" circle type="danger" />
  </el-row>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import useDictionaries from "../../../src/package/manager-ui/components/tools/dictionaries";
import useDictionariesAll from "../../../src/package/manager-ui/components/tools/dictionaries-all";
import { MOptionType } from "MTypes";
// import useDictionaries from "MTools/dictionaries";
// import useDictionariesAll from "MTools/dictionaries-all";
// import { mTagOptionType } from "ManagerUI/global";

const exOptions = ref({});
nextTick(async () => {
  const options = await useDictionariesAll([
    {
      key: "aa",
      dictionaryType: "table",
      tableName: "SmartLabelImportExportRecord",
      columnName: "RecordType",
      dictionaryKey: ""
    },
    {
      key: "bb",
      dictionaryType: "system",
      tableName: "",
      columnName: "",
      dictionaryKey: "InvoiceTimeOutCheckTaskIntervalDays"
    }
  ]);

  console.log("++++++++++> options:", options);
  const Select: MOptionType.Select[] = await useDictionaries("table", ["Dealer"]); // [!code warning]
  const bgColor = ["#33b698", "#409eff"];
  for (let index = 0; index < Select.length; index++) {
    Select[index].tagStyle = { bgColor: bgColor[index], textColor: "#fff" };
  }
  console.log("++++++++++> Select:", Select);
  exOptions.value = { Select };
});
</script>

<style>
.mb-4 {
  margin-bottom: 1rem;
}
</style>
