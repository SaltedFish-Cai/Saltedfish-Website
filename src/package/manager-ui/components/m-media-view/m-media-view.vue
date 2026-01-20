<template>
  <div class="m-media-view-download-file">
    <div @click="openFile" class="flex-center-start m-hand">
      <m-icon :name="'attachment_line'" style="padding: 0 3px" />
      <slot>
        <div style="white-space: initial; width: 100%">{{ file?.OriginalName || file?.FileName }}</div>
      </slot>
    </div>
    <div class="flex-center down-file m-hand" @click="downFile">
      <m-icon name="download_line" />
      {{ languagePackage["download"] }}
    </div>
  </div>
  <m-dialog
    v-model="visible"
    :title="file?.OriginalName || file?.FileName"
    size="max"
    useFull
    :scroll="false"
    class="m-media-view-dialog"
    titleAlign="center"
  >
    <div class="m-media-page-body">
      <imageView v-if="fileType == 'image'" :filePath="filePath" v-model="zoomIndex" ref="viewRef"></imageView>
      <pdfView v-else-if="fileType == 'pdf'" :filePath="filePath" :zoom="zoomIndex" ref="viewRef"></pdfView>
      <excel-view v-else-if="fileType == 'excel'" :filePath="filePath" :zoom="zoomIndex"></excel-view>
      <word-view v-if="fileType == 'word'" :filePath="filePath" :zoom="zoomIndex"></word-view>
      <textView v-else-if="fileType == 'text'" :filePath="filePath" :zoom="zoomIndex"></textView>
    </div>
    <template #footer>
      <div class="flex-center" style="position: relative">
        <m-button :id="id + '-download'" is="download" type="primary" @click="downFile">{{
          languagePackage["download"]
        }}</m-button>

        <div class="flex-center zoom-box">
          <div class="flex-center mr-size reset-btn" @click="reset90" v-if="fileType == 'pdf' || fileType == 'image'">
            <m-icon class="mr5" name="reset_line"></m-icon><span style="font-size: 12px">{{ languagePackage["rotate"] }}</span>
          </div>
          <m-icon name="minus_circle_line" class="m-hand" @click="handleMouseWheel({ deltaY: 1 })"></m-icon>
          <div
            style="font-size: 14px; width: 42px; text-align: center"
            class="pl5 ml5 mr5 m-hand-scroll"
            @mousewheel="handleMouseWheel"
            :title="languagePackage['zoom']"
          >
            {{ (zoomIndex * 100).toFixed(0) }}%
          </div>
          <m-icon name="add_circle_line" class="m-hand" @click="handleMouseWheel({ deltaY: -1 })"></m-icon>
        </div>
      </div>
    </template>
  </m-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { MMediaViewType } from "./type";
import { isImageFile, isPdfFile, isTextFile, isWordFile, isExcelFile, isUnOpenFile } from "./is";
import { ElMessage } from "element-plus";

import { useDownload } from "./use-download";
import imageView from "./image-view.vue";
import pdfView from "./pdf-view.vue";
import excelView from "./excel-view.vue";
import wordView from "./word-view.vue";
import textView from "./text-view.vue";
import { useTemplateRef } from "vue";
import { useBaseStore } from "../store/index";

const visible = ref(false);
const zoomIndex = ref(1);
// const startDistance = ref(0);
let scaleFactor = 1;

const viewRef = useTemplateRef("viewRef");

const props = withDefaults(defineProps<MMediaViewType>(), {});

// function getDistance(touches) {
//   const dx = touches[0].clientX - touches[1].clientX;
//   const dy = touches[0].clientY - touches[1].clientY;
//   return Math.sqrt(dx * dx + dy * dy);
// }

// function handleTouchMove(event) {
//   if (event.touches.length === 2) {
//     const currentDistance = getDistance(event.touches);
//     handleMouseWheel({ deltaY: startDistance.value - currentDistance });
//   }
// }

const globalState = useBaseStore();
const languagePackage = computed(() => {
  return globalState.getLanguagePackage("cell");
});

function openFile() {
  const fileName = props.fileName || props?.file?.OriginalName || props?.file?.FileName;
  if (isUnOpenFile(fileName)) {
    return ElMessage.warning(languagePackage.value["errorText"]);
  }
  visible.value = true;
}

// #Function 滚轮缩放
function handleMouseWheel(event) {
  let _zoomIndex = event.deltaY < 0 ? scaleFactor + 0.02 : scaleFactor - 0.02;
  if (_zoomIndex < 0.3) _zoomIndex = 0.3;
  if (_zoomIndex > 1.7) _zoomIndex = 1.7;
  zoomIndex.value = _zoomIndex;
  scaleFactor = _zoomIndex;
}

function reset90() {
  viewRef.value?.leftAll90();
}

// # Var 文件类型
const fileType = computed(() => {
  if (isImageFile(props.filePath)) {
    return "image";
  } else if (isPdfFile(props.filePath)) {
    return "pdf";
  } else if (isTextFile(props.filePath)) {
    return "text";
  } else if (isWordFile(props.filePath)) {
    return "word";
  } else if (isExcelFile(props.filePath)) {
    return "excel";
  }
  return "";
});

// #Function 现在文件
function downFile() {
  if (props.filePath) useDownload(props.filePath, props.fileName || props?.file?.OriginalName || props?.file?.FileName || "文件");
}

watch(
  () => zoomIndex.value,
  data => {
    scaleFactor = data;
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss">
.m-media-view-download-file {
  padding-right: 52px !important;
  position: relative;
  border: 1px solid var(--el-border-color-light);
  border-radius: 3px;
  margin: 3px 3px 3px 0;
  font-size: var(--m-component-font-size, 13px);

  .down-file {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    font-size: calc(var(--m-component-font-size, 13px) - 2px);
    transition: var(--m-component-animation, 0.3s);
    padding: 0 3px;
    border-left: 1px solid var(--el-border-color-light);
  }
  .download-file_text {
    word-break: break-all;
    display: inline-block;
    white-space: pre-line;
  }

  .remove-btn {
    font-size: var(--m-component-font-size, 13px);
  }
}

.m-media-view-dialog {
  .dialog__body {
    height: calc(100%) !important;
    padding: 0 !important;
  }
  .m-media-page-body {
    width: 100%;
    height: 100%;
    background-color: var(--mo-bg-color);
  }

  .zoom-box {
    position: absolute;
    right: 10px;
    font-size: 20px;
    .reset-btn {
      padding: 0 7px;
      border-radius: 30px;
      cursor: pointer;
      transition: var(--m-component-animation, 0.3s);
      border: 1px solid;
      .m-icon {
        font-size: 14px;
      }
      &:hover {
        color: #fff;
        border-color: var(--el-color-primary);
        background-color: var(--el-color-primary);
      }
    }
  }
}
</style>
