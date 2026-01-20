<template>
  <el-dialog
    :alt="'dialog:' + title"
    class="m-dialog-class"
    :class="[
      createSize == 'small' ? 'm-dialog-class_small' : createSize == 'large' ? 'm-dialog-class_large' : 'm-dialog-class_default'
    ]"
    v-model="state.visible"
    @closed="closeMenu"
    append-to-body
    lock-scroll
    :width="setSize"
    :fullscreen="state.fullscreen"
    :style="{
      height: `${setHeight}`,
      '--m-dialog-class-offset-x': `${setOffsetX}`,
      '--m-dialog-class-offset-y': `${setOffsetY}`
    }"
    :close-on-click-modal="closeOnMod"
    :close-on-press-escape="closeOnEsc"
    :draggable="draggable"
  >
    <template #header="row">
      <!-- :class="[titleAlign == 'center' ? 'flex-center' : titleAlign == 'right' ? 'flex-center-end' : 'flex-center-start']" -->
      <slot name="header" :row="row">
        <div class="title_body">
          <div class="flex-center">
            <slot name="title">
              <div class="is_title_body" :style="{ fontWeight: subTitle ? 'bold' : 'bold' }">{{ title }}</div>
            </slot>
            <m-icon
              v-if="useFull"
              :name="!state.fullscreen ? 'fullscreen_arrow_line' : 'fullscreen_arrow_exit_line'"
              class="flex-center full_icon ml-size"
              @click="state.fullscreen = !state.fullscreen"
            />
          </div>

          <div v-if="subTitle" class="sub_title_body" :style="{ fontWeight: subTitle ? 'bold' : 'normal' }">
            <slot name="subTitle">
              {{ subTitle }}
            </slot>
          </div>

          <div></div>
        </div>
      </slot>
    </template>

    <div
      v-if="keepAlive"
      :class="[
        'flex-col',
        state.fullscreen || size == 'max' || height != undefined ? 'height100' : height == 'auto' ? '' : 'height100'
      ]"
    >
      <m-scrollbar always v-if="scroll" class="m-scrollbar">
        <div class="dialog__body"><slot></slot></div>
      </m-scrollbar>
      <div v-else class="dialog__body flex-col"><slot></slot></div>
    </div>

    <template v-else>
      <div
        v-if="state.visible"
        :class="[
          'flex-col',
          state.fullscreen || size == 'max' || height != undefined ? 'height100' : height == 'auto' ? '' : 'height100'
        ]"
      >
        <m-scrollbar always v-if="scroll" class="m-scrollbar">
          <div class="dialog__body"><slot></slot></div>
        </m-scrollbar>
        <div v-else class="dialog__body flex-col"><slot></slot></div>
      </div>
    </template>

    <template #footer v-if="$slots['footer']"><slot name="footer" /></template>
  </el-dialog>
</template>

<script lang="ts" setup>
// # Import
import { reactive, watch, computed } from "vue";
import { useBaseStore } from "../store/index";
import { MDialogType } from "./type";

// # Var
const props = withDefaults(defineProps<MDialogType>(), {
  id: "",
  size: "m",
  offsetX: 0,
  offsetY: 0,
  keepAlive: false,
  title: "标题",
  useFull: false,
  closeOnMod: true,
  closeOnEsc: true,
  draggable: false,
  scroll: true,
  titleAlign: "left"
});

const emits = defineEmits(["update:modelValue", "closed"]);

const globalState = useBaseStore();
const state = reactive({
  visible: false,
  fullscreen: false
});

// #Computed setSize
const setSize = computed(() => {
  let size: number | string = 500;
  switch (props.size) {
    case "s":
      size = "30%";
      break;
    case "m":
      size = "50%";
      break;
    case "l":
      size = "70%";
      break;
    case "max":
      size = "95%";
      break;
    default:
      break;
  }
  return props.width || size;
});

// #Computed transform
const transform = computed(() => {
  let size: number | string = "-5%";
  switch (props.size) {
    case "s":
      size = "-6%";
      break;
    case "m":
      size = "-3%";
      break;
    case "l":
      size = 0;
      break;
    case "max":
      size = 0;
      break;
    default:
      break;
  }
  return props.offsetX || size;
});

// #Computed setOffsetX
const setOffsetX = computed(() => {
  let data = transform.value;
  if (props.offsetX) {
    data = isNumber(props.offsetX) ? props.offsetX + "px" : props.offsetX;
  }
  if (state.fullscreen) {
    data = 0;
  }
  return data;
});

// #Computed setOffsetY
const setOffsetY = computed(() => {
  let data = 0 as number | string;
  if (props.offsetY) {
    data = isNumber(props.offsetY) ? props.offsetY + "px" : props.offsetY;
  }
  if (state.fullscreen) {
    data = 0;
  }
  return data;
});

// #Computed setHeight
const setHeight = computed(() => {
  let data = 500 as number | string;
  if (props.size == "max") {
    data = "95%";
  } else if (props.size == "l") {
    data = "80%";
  } else if (props.size == "m") {
    data = "80%";
  } else if (props.size == "s") {
    data = "80%";
  }
  if (props.height) {
    data = isNumber(props.height) ? props.height + "px" : props.height;
  }
  if (state.fullscreen) {
    data = "100%";
  }
  return data;
});

// #Computed createSize
const createSize = computed(() => {
  return globalState.getSize || "default";
});

// #Function isNumber
function isNumber(value) {
  return Number.isNaN(value / 1) === false;
}

// #Function 关闭弹窗回调
function closeMenu() {
  emits("update:modelValue", false);
  emits("closed", false);
}

// #Watch modelValue
watch(
  () => props.modelValue,
  data => {
    state.visible = data;
  }
);
</script>

<style lang="scss">
@use "./index.scss";
</style>
