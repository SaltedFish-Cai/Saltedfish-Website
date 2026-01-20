<template>
  <div class="vp_title_label">接口请求参数(params)：</div>

  <code-view v-model:html="params"> </code-view>
  <div class="h400">
    <m-table
      id="base-table-demo"
      ref="proTable"
      flat
      :structure="tableConfig"
      :request-api="getTableList"
      :ex-options="exOptions"
    >
      <!-- <template #operation>
        <m-button key="key1" is="save" index="1" v-if="isFalse"> 编辑1 </m-button>
        <m-button key="key2" is="edit" index="2"> 编辑2 </m-button>
        <m-button key="key3" is="trash" index="3" v-if="isFalse"> 编辑3 </m-button>
        <m-button key="key4" is="edit" index="4"> 编辑4 </m-button>
        <m-button key="key5" is="edit" index="5"> 编辑5 </m-button>
        <m-button key="key6" is="edit" index="6"> 编辑6 </m-button>
      </template> -->

      <!-- <template #moreOperation>
      <m-button is="edit"> 更多按钮展示 </m-button>
    </template> -->
    </m-table>
  </div>

  <!-- <div class="h300">
    <m-light-table
      id="light-table-demo"
      ref="proTable"
      flat
      :structure="tableConfig"
      :request-api="getTableList"
      :ex-options="exOptions"
      showSummary
    >
      <template #operation>
        <m-button key="key1" is="save" index="1" v-if="isFalse"> 编辑1 </m-button>
        <m-button key="key2" is="edit" index="2"> 编辑2 </m-button>
        <m-button key="key3" is="trash" index="3" v-if="isFalse"> 编辑3 </m-button>
        <m-button key="key4" is="edit" index="4"> 编辑4 </m-button>
        <m-button key="key5" is="edit" index="5"> 编辑5 </m-button>
        <m-button key="key6" is="edit" index="6"> 编辑6 </m-button>
      </template>
    </m-light-table>
  </div> -->
</template>

<script lang="ts" setup>
import { MStructureType } from "MTypes";
import { ref } from "vue";

const proTable = ref();
const params = ref({});
const tableConfig: MStructureType.Table[] = [
  { label: "Label-Text", prop: "Text", fixed: "left" },
  { label: "Label-Select", prop: "Select", filterType: "select" },
  { label: "Label-Select", prop: "Select", filterType: "select" },
  { label: "Label-Select", prop: "Select", filterType: "select" },
  { label: "Label-Select", prop: "Select", filterType: "select" },
  { label: "Label-Select", prop: "Select", filterType: "select" },
  { label: "Label-Select", prop: "Select", filterType: "select" },
  { label: "Label-Select", prop: "Select", filterType: "select" },
  {
    label: "Label-Number",
    prop: "Number",
    width: 150,
    cellConfig: {
      type: "number",
      display: true,
      precision: 2
    }
  },
  { label: "操作", prop: "operation" }
];

const exOptions = ref({});

setTimeout(() => {
  exOptions.value = {
    Select: [
      { label: "选项1", value: 1 },
      { label: "选项2", value: 2 }
    ]
  };
}, 1000);

async function getTableList(paramsData: any) {
  params.value = paramsData;
  const List: any = [];
  for (let i = 0; i < 30; i++) {
    List.push({ Text: `Text-${i}-d2i23411`, Select: 2 });
  }
  return {
    Data: {
      TotalCount: List.length,
      List
    },
    Code: 200
  };
}

// const a = 7;

// if ((a & 1) > 0) {
//   console.log("++++++++++> 1:", 1);
// }
// if ((a & 2) > 0) {
//   console.log("++++++++++> 2:", 2);
// }
</script>

<style scoped></style>
