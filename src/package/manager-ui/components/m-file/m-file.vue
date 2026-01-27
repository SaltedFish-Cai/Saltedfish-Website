<template>
  <div class="flex-col m-file">
    <template v-if="fileConfigData.fileApi?.url">
      <div class="flex-center-start" v-if="!display">
        <el-upload
          class="m-upload-btn"
          ref="uploadRef"
          :action="fileConfigData.fileApi.url"
          :show-file-list="false"
          :data="exData"
          :on-success="files => handleSuccess(files)"
          :on-error="files => handleError()"
          :on-change="fileChange"
          :accept="accept"
          :headers="setHeader()"
          :multiple="fileMultiple ? fileMultiple > 1 : false"
          :http-request="httpRequest"
          :auto-upload="false"
        >
          <slot name="reference">
            <slot name="reference-before"></slot>
            <m-button
              :title="languagePackage['uploadText']"
              class="btn-width mr0"
              is="upload"
              :size="size"
              :loading="loading"
              :disabled="disabled || (fileMultiple ? fileMultiple == inValue?.length : false)"
            >
              {{ !disabled && placeholder && placeholder != " " ? placeholder : languagePackage["uploadText"] }}
            </m-button>
          </slot>
        </el-upload>
        <m-button
          v-if="inValue?.length && !display"
          :title="languagePackage['clearAddedfiles']"
          class="btn-width ml5"
          is="trash"
          :size="size"
          link
          :disabled="disabled"
          @click="cleanFiles"
        >
          {{ languagePackage["clean"] }}
        </m-button>
      </div>

      <div
        class="tips-box"
        v-if="!display && (accept || excludeType || (fileMultiple && fileMultiple > 1) || fileSingleSize || fileAllSize)"
      >
        <span v-if="accept">
          {{ languagePackage["canUploaded"] }} <span class="light-text">{{ accept }}</span> {{ languagePackage["typeFile"] }}
        </span>

        <span v-if="excludeType">
          {{ languagePackage["noCanUploaded"] }} <span class="light-text">{{ excludeType }}</span>
          {{ languagePackage["typeFile"] }}
        </span>

        <span v-if="fileMultiple && fileMultiple > 1">
          {{ languagePackage["uploadMost"] }} <span class="light-text">{{ fileMultiple }}{{ languagePackage["piece"] }}</span>
          {{ languagePackage["file"] }}
        </span>

        <span v-if="fileSingleSize">
          {{ languagePackage["singleMax"] }}
          <span class="light-text">{{ fileSingleSize ? (fileSingleSize / 1024).toFixed(2) : 1 }}M</span>
        </span>

        <span v-if="fileAllSize">
          {{ languagePackage["singleMaxAll"] }}
          <span class="light-text">{{ fileAllSize ? (fileAllSize / 1024).toFixed(2) : 1 }}M</span>
        </span>
      </div>

      <div class="file-item-box">
        <template v-if="inValue?.length">
          <template v-for="(file, index) in inValue" :key="file.FileId">
            <m-media-view v-if="file.FileUrl" :filePath="file.FileUrl" :file="file" :size="size">
              <div>{{ file?.OriginalName || file?.FileName }}</div>
              <m-icon
                v-if="!display && !disabled"
                :title="languagePackage['del']"
                class="del-hand ml5 remove-btn"
                name="close_circle_line"
                @click="removeFile(index)"
              />
            </m-media-view>
          </template>
        </template>
        <!-- class="m-display_style"
        :class="[size == 'small' ? 'm-display_style_small' : '', size == 'large' ? 'm-display_style_large' : '']" -->
        <div v-else-if="!inValue?.length && (display || disabled)" class="tips-box">{{ languagePackage["noFile"] }}</div>
      </div>
    </template>
    <div
      class="file-item-box"
      :class="['m-form-contrast-value']"
      v-if="(alwaysContrast && contrastData?.length) || (contrastData?.length && eq(inValue, contrastData))"
    >
      <template v-if="contrastData.length">
        <template v-for="file in contrastData" :key="file.FileId">
          <m-media-view v-if="file.FileUrl" :filePath="file.FileUrl" :file="file" :size="size">
            <div>{{ file?.OriginalName || file?.FileName }}</div>
          </m-media-view>
          <!-- <div class="flex-center mb3 file-item">
          <div class="flex-center download-file" :class="[size == 'small' ? 'download-file_small' : '']">
          </div>
        </div> -->
        </template>
      </template>
      <div v-else>--</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import lodashPkg from "lodash";
import { MFileType, MFileDataType } from "./type";
import { ElMessage, ElMessageBox } from "element-plus";
import { ajaxUpload } from "./ajax";

import { useBaseStore as globalState } from "../store/index";
// import { useDownload } from "../m-media-view/use-download";

const { isEqual, debounce } = lodashPkg;
const props = withDefaults(defineProps<MFileType>(), {});

const inValue = ref(props.modelValue);
const emits = defineEmits(["update:modelValue", "change", "changeState"]);

const uploadRef = ref();
const loading = ref(false);
const uploadFilesList: { name: string; size: number }[] = [];
const ajaxFileList: objectType[] = [];

const _globalState = globalState();
const languagePackage = computed(() => {
  return _globalState.getLanguagePackage("file") || {};
});

// >-------------> 文件数量 <------------<
const fileConfigData = computed(() => {
  const useGlobalState = globalState();
  const headerData = useGlobalState.getRequestHeader;
  const fileApi = useGlobalState.getFormConfig?.fileApi;
  return { headerData, fileApi };
});

// >-------------> 文件数量 <------------<
const fileMultiple = computed(() => {
  let multiple: number | undefined = undefined;
  const { fileMultiple } = props;
  if (fileMultiple) multiple = fileMultiple;
  return multiple;
});

// >-------------> 允许类型 <------------<
const accept = computed(() => {
  let accept: string | undefined = undefined;
  const { fileIncludeType } = props;
  if (fileIncludeType && Array.isArray(fileIncludeType)) accept = fileIncludeType.join(",");
  return accept?.toLowerCase() || "";
});

// >-------------> 不允许类型 <------------<
const excludeType = computed(() => {
  let exType: string | undefined = undefined;
  const { fileExcludeType } = props;
  if (fileExcludeType && Array.isArray(fileExcludeType)) exType = fileExcludeType.join(",");
  return exType?.toLowerCase() || "";
});

function changeEvent(value) {
  emits("change", { value });
  emits("update:modelValue", value);
}

const setHeader = () => {
  const data = {};
  if (fileConfigData.value.headerData) {
    for (const key in fileConfigData.value.headerData) {
      data[key] = fileConfigData.value.headerData[key];
    }
  }
  return data;
};

// >-------------> 上传成功 <------------<
const handleSuccess = (response: { Code: Number; Data: MFileDataType; Message?: string }) => {
  if (!response) return;

  const { Code, Data, Message } = response;
  if (Code == 200) {
    if (!inValue.value) {
      inValue.value = [];
    }
    if (Array.isArray(Data)) {
      const _Data = Data.map(item => {
        return {
          ...item,
          FileName: item?.OriginalName || item?.FileName,
          FullPath: fileConfigData.value.fileApi?.fileApi + item.FileUrl
        };
      });
      inValue.value.push(..._Data);
    } else {
      inValue.value.push({
        ...Data,
        FileName: Data?.OriginalName || Data?.FileName,
        FullPath: fileConfigData.value.fileApi?.fileApi || "" + Data.FileUrl
      });
    }

    changeEvent(inValue.value);
    uploadFilesList.length = 0;
    ajaxFileList.length = 0;
    uploadRef?.value?.clearFiles();
    loading.value = false;
  } else {
    ElMessage.error({ message: Code != 500 && Message ? Message : `${languagePackage.value["upFail"]}` });
    uploadFilesList.length = 0;
    ajaxFileList.length = 0;
    uploadRef?.value?.clearFiles();
    loading.value = false;
  }
};

// >-------------> 上传失败 <------------<
const handleError = () => {
  uploadFilesList.length = 0;
  ajaxFileList.length = 0;
  uploadRef?.value?.clearFiles();
  ElMessage.error({ message: `${languagePackage.value["upFail"]}(02)` });
  loading.value = false;
};

// >-------------> 文件选择 <------------<
const fileChange = (uploadFile, uploadFiles) => {
  if (loading.value || !uploadFiles.length) return;
  uploadFilesList.push(uploadFile);
  fetchUpload();
};

// >-------------> 上传前钩子 <------------<
const beforeUpload = (fileList: { name: string; size: number }[]) => {
  loading.value = true;
  if (!fileConfigData.value.fileApi) {
    ElMessage.error({ message: `${languagePackage.value["fail"]}` });
    return false;
  }
  const defaultData = inValue.value || [];
  if (fileMultiple.value && fileMultiple.value > 1 && [...fileList, ...defaultData].length > fileMultiple.value) {
    ElMessage.warning({ message: `${languagePackage.value["msg"]}${fileMultiple.value}个` });
    return false;
  } else {
    for (let i = 0; i < fileList.length; i++) {
      const files = fileList[i];

      //获取最后一个.的位置
      const index = files.name.lastIndexOf(".");
      //获取文件后缀
      const ext = files.name.substring(index + 1).toLowerCase();
      const size = files.size;

      const _excludeType = excludeType.value.split(",");
      if (!!excludeType.value && _excludeType && _excludeType.length && _excludeType.indexOf(String(ext)) > -1) {
        ElMessage.error({
          message: `${languagePackage.value["noCanUploaded"]}${_excludeType.join(" ")}${languagePackage.value["typeFile"]}`
        });
        return false;
      }

      const _includeType = accept.value.split(",");
      if (!!accept.value && _includeType && _includeType.length && _includeType.indexOf(String(ext)) < 0) {
        ElMessage.error({
          message: `${languagePackage.value["canUploaded"]}${_includeType.join(" ")}${languagePackage.value["typeFile"]}`
        });
        return false;
      }

      if (props.fileSingleSize && size / 1024 > props.fileSingleSize) {
        ElMessage.error({ message: `${languagePackage.value["tip1"]}：${(size / 1024 / 1024).toFixed(2)}M` });
        return false;
      }

      const allSize = fileList.reduce((prev, cur) => prev + cur.size, 0);
      if (props.fileAllSize && allSize / 1024 > props.fileAllSize) {
        ElMessage.error({ message: `${languagePackage.value["tip2"]}：${(allSize / 1024 / 1024).toFixed(2)}M` });
        return false;
      }
    }
    return true;
  }
};

// >-------------> 接口请求 <------------<
let ajaxOptions: objectType = {};

const fetchUpload = debounce(
  () => {
    if (!uploadFilesList.length) return;
    if (!beforeUpload(uploadFilesList)) {
      uploadFilesList.length = 0;
      ajaxFileList.length = 0;
      uploadRef?.value?.clearFiles();
      loading.value = false;
      return;
    } else {
      uploadRef?.value?.submit();
    }
  },
  300,
  { trailing: true }
);

const _debounce = debounce(actionRequest, 100, { trailing: true });
function actionRequest() {
  ajaxOptions.ajaxFileList = ajaxFileList;
  ajaxUpload(ajaxOptions);
}

const httpRequest = async options => {
  const { filename, file } = options;
  ajaxFileList.push({ filename, file });
  ajaxOptions = options;
  _debounce();
};

const cleanFiles = () => {
  ElMessageBox.confirm(`${languagePackage.value["isDel"]}`, languagePackage.value["tip"], {
    type: "warning",
    confirmButtonText: languagePackage.value["enterDel"]
  }).then(() => {
    if (inValue.value) inValue.value.length = 0;
  });
};

// >-------------> 删除文件 <------------<
const removeFile = (index: number) => {
  inValue.value?.splice(index, 1);
  changeEvent(inValue.value);
};

// function openFile(file: MFileDataType) {
//   if (file.FileUrl) {
//     useDownload(file.FileUrl, file?.OriginalName || file?.FileName);
//   }
// }

function eq(data, contrastData) {
  if (!contrastData || !Array.isArray(contrastData)) return false;

  const _contrastData = contrastData.filter(value => value !== null && typeof value !== "undefined");

  if (_contrastData && _contrastData.length == 0) {
    return true;
  }

  return !isEqual(
    data?.map?.(item => item.FileId)?.sort((a, b) => a.replace(/\D/g, "") - b.replace(/\D/g, "")),
    _contrastData?.map?.(item => item.FileId)?.sort((a, b) => a.replace(/\D/g, "") - b.replace(/\D/g, ""))
  );
}

watch(
  () => loading.value,
  data => {
    emits("changeState", data ? "Working" : "Pending");
  }
);
</script>

<style lang="scss">
.m-file {
  .file-item-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }

  .del-hand {
    font-size: 14px;
    &:hover {
      color: var(--el-color-error);
      cursor: pointer;
    }
  }
  .light-text {
    color: var(--el-color-primary);
  }
  .tips-box + .file-item-box {
    margin-top: 3px;
  }
  // .tips-box:has(span) + .file-item-box {
  //   margin-top: 0;
  // }
  .tips-box {
    padding-top: 2px;
    font-size: var(--m-component-font-size, 13px);
    color: var(--el-color-info-light-2);
  }
}
</style>
