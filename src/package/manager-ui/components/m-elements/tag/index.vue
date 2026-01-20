<!--
 * @ Author: Cai
 * @ Create Time: 2024-03-11 10:27:11
 * @ Modified by: Cai
 * @ Modified time: 2024-08-23 10:19:15
 * @ Description: page name: m-element-tag
 -->

<template>
  <el-tag
    class="m-tag"
    :class="[useTagsClick ? 'tag-hand' : '']"
    v-if="item.prop"
    :color="findBgColor(data)"
    :style="{ border: 'none', color: findTextColor(data) }"
    :size="item.size"
  >
    <m-icon v-if="icon" :name="icon"></m-icon> {{ findText(data) }}
  </el-tag>
</template>
<script lang="ts" setup>
import { MElementTagType, MElementTagOptionType } from "./index";
import isDarkColor from "../../tools/isDarkColor";

type Props = {
  item: MElementTagType;
  icon: string;
  useTagsClick: boolean;
  data: boolean | number | string;
  exOptions?: { [x: string]: MElementTagOptionType[] };
};
const props = withDefaults(defineProps<Props>(), {
  useTagsClick: false,
  data: "",
  exOptions: () => ({})
});

function findText(row) {
  let text = "--";
  const item = props.item;
  if (item.prop && props.exOptions[item.prop]) {
    props.exOptions[item.prop].map(item => {
      if (item.value == row) {
        text = item.label;
      }
    });
  }
  return text;
}

function findBgColor(row) {
  let bgColor = "transparent";
  const item = props.item;
  if (item.prop && props.exOptions[item.prop]) {
    props.exOptions[item.prop].map(item => {
      if (item.value == row) {
        if (item.tagStyle?.bgColor) bgColor = item.tagStyle?.bgColor;
      }
    });
  }
  return bgColor;
}

function findTextColor(row) {
  let textColor = "#818181";
  const item = props.item;
  if (item.prop && props.exOptions[item.prop]) {
    props.exOptions[item.prop].map(item => {
      if (item.value == row) {
        if (item.tagStyle?.textColor) textColor = item.tagStyle?.textColor;
        else if (item.tagStyle?.bgColor && isDarkColor(item.tagStyle?.bgColor)) textColor = "#fff";
      }
    });
  }
  return textColor;
}
</script>
<style lang="scss">
.m-tag + .m-tag {
  margin-left: var(--m-component-padding-size, 10px);
}
.el-tag.m-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(var(--m-component-font-size, 13px) - 1px);
  padding: calc(var(--m-component-padding-size, 10px) / 2) calc(var(--m-component-padding-size, 10px) - 2px);
}

.tag-hand {
  &:hover {
    cursor: pointer;
  }
}
</style>
