<!--
 * @ Author: Cai
 * @ Create Time: 2024-03-12 09:10:00
 * @ Modified by: Cai
 * @ Modified time: 2025-05-06 13:44:38
 * @ Description: page name: m-element-file
 -->

<template>
  <template v-if="item.prop">
    <div class="flex-col m-file">
      <template v-if="fileConfigData.fileApi?.url">
        <div class="flex-center-start" v-if="!item.display">
          <el-upload
            class="m-upload-btn"
            ref="uploadRef"
            :action="fileConfigData.fileApi.url"
            :show-file-list="false"
            :data="item?.fileAttached"
            :on-success="files => handleSuccess(item.prop, files)"
            :on-error="files => handleError()"
            :on-change="fileChange"
            :accept="accept"
            :headers="setHeader()"
            :multiple="fileMultiple ? fileMultiple > 1 : false"
            :http-request="httpRequest"
            :auto-upload="false"
          >
            <m-button
              :id="id + '-button'"
              :title="languagePackage['uploadText']"
              class="btn-width mr0"
              is="upload"
              :loading="loading"
              :disabled="item.disabled || (fileMultiple ? fileMultiple == data[item.prop]?.length : false)"
            >
              {{ item?.placeholder && item?.placeholder != " " ? item?.placeholder : languagePackage["uploadText"] }}
            </m-button>
          </el-upload>
          <m-button
            v-if="data[item.prop]?.length && !item.display"
            :title="languagePackage['clearAddedfiles']"
            class="btn-width ml5"
            :id="id + '-button-clean'"
            is="trash"
            link
            :disabled="item.disabled"
            @click="cleanFiles"
          >
            {{ languagePackage["clean"] }}
          </m-button>
        </div>

        <div
          class="tips-box"
          v-if="
            !item.display &&
            (accept || excludeType || (fileMultiple && fileMultiple > 1) || item.fileSingleSize || item.fileAllSize)
          "
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

          <span v-if="item.fileSingleSize">
            {{ languagePackage["singleMax"] }}
            <span class="light-text">{{ item.fileSingleSize ? (item.fileSingleSize / 1024).toFixed(2) : 1 }}M</span>
          </span>

          <span v-if="item.fileAllSize">
            {{ languagePackage["singleMaxAll"] }}
            <span class="light-text">{{ item.fileAllSize ? (item.fileAllSize / 1024).toFixed(2) : 1 }}M</span>
          </span>
        </div>

        <div class="file-item-box">
          <template v-if="data[item.prop]?.length">
            <template v-for="(file, index) in data[item.prop]" :key="file.FileId">
              <m-media-view :filePath="file.FileUrl" :file="file" :id="id + 'media-view-' + index">
                <div>{{ file?.OriginalName || file?.FileName }}</div>
                <m-icon
                  v-if="!item.display && !item.disabled"
                  :title="languagePackage['del']"
                  class="hand ml5 remove-btn"
                  name="close_circle_line"
                  @click="removeFile(item.prop, index)"
                />
              </m-media-view>
            </template>
          </template>
          <!-- class="m-display_style" -->
          <div class="tips-box" v-else-if="!data[item.prop]?.length && (item.display || item.disabled)">
            {{ languagePackage["noFile"] }}
          </div>
        </div>
      </template>
      <div class="file-item-box" :class="['m-form-contrast-value']" v-if="alwaysContrast || eq(item.prop, data, contrastData)">
        <template v-if="contrastData[item.prop].length">
          <template v-for="file in contrastData[item.prop]" :key="file.FileId">
            <m-media-view :filePath="file.FileUrl" :file="file">
              <div>{{ file?.OriginalName || file?.FileName }}</div>
            </m-media-view>
          </template>
        </template>
        <div v-else>--</div>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import lodashPkg from "lodash";
import { MElementFileType } from "./index";
import { ElMessage, ElMessageBox } from "element-plus";
// import { useDownload } from "./use-download";
import { ajaxUpload } from "./ajax";

import { useBaseStore as globalState } from "../../store/index";
// import { useDownload } from "../../m-media-view/use-download";

const { isEqual, debounce } = lodashPkg;

type fileType = { FileUrl?: string; OriginalName?: string; FileName?: string };

type Props = {
  id?: string;
  item: MElementFileType;
  data?: {};
  contrastData?: {};
  alwaysContrast?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
  contrastData: () => ({}),
  includeType: () => ({})
});

const _globalState = globalState();
const languagePackage = computed(() => {
  return _globalState.getLanguagePackage("file");
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
  const { fileMultiple } = props.item;
  if (fileMultiple) multiple = fileMultiple;
  return multiple;
});

// >-------------> 允许类型 <------------<
const accept = computed(() => {
  let accept: string | undefined = undefined;
  const { fileIncludeType } = props.item;
  if (fileIncludeType && Array.isArray(fileIncludeType)) accept = fileIncludeType.join(",");
  return accept?.toLowerCase() || "";
});

// >-------------> 不允许类型 <------------<
const excludeType = computed(() => {
  let exType: string | undefined = undefined;
  const { fileExcludeType } = props.item;
  if (fileExcludeType && Array.isArray(fileExcludeType)) exType = fileExcludeType.join(",");
  return exType?.toLowerCase() || "";
});

const emit = defineEmits(["change", "changeState"]);
const uploadRef = ref();
const loading = ref(false);
const uploadFilesList: { name: string; size: number }[] = [];
const ajaxFileList: objectType[] = [];

function changeEvent(value, item) {
  emit("change", { value, item });
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
const handleSuccess = (prop = "", response: { Code: Number; Data: fileType; Message?: string }) => {
  if (!prop) return ElMessage.error({ message: `${languagePackage.value["upFail"]}` });
  if (!response) return;

  const { Code, Data, Message } = response;
  if (Code == 200) {
    if (!props.data[prop]) {
      props.data[prop] = [];
    }
    if (Array.isArray(Data)) {
      const _Data = Data.map(item => {
        return {
          ...item,
          FileName: item?.OriginalName || item?.FileName,
          FullPath: fileConfigData.value.fileApi?.fileApi + item.FileUrl
        };
      });
      props.data[prop].push(..._Data);
    } else {
      props.data[prop].push({
        ...Data,
        FileName: Data?.OriginalName || Data?.FileName,
        FullPath: fileConfigData.value.fileApi?.fileApi || "" + Data.FileUrl
      });
    }

    changeEvent(props.data[prop], props.item);
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
  ElMessage.error({ message: `上传失败` });
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
  const prop = props?.item?.prop;
  if (!prop) return false;
  if (!fileConfigData.value.fileApi) {
    ElMessage.error({ message: `${languagePackage.value["fail"]}` });
    return false;
  }
  const defaultData = props.data[prop] || [];
  if (fileMultiple.value && fileMultiple.value > 1 && [...fileList, ...defaultData].length > fileMultiple.value) {
    ElMessage.warning({ message: `${languagePackage.value["msg"]}${fileMultiple.value}个` });
    return false;
  } else {
    for (let i = 0; i < fileList.length; i++) {
      const files = fileList[i];

      //获取最后一个.的位置
      const index = files.name.lastIndexOf(".");
      //获取文件后缀
      const ext = files.name.substring(index).toLowerCase();
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

      if (props.item.fileSingleSize && size / 1024 > props.item.fileSingleSize) {
        ElMessage.error({ message: `${languagePackage.value["tip1"]}：${(size / 1024 / 1024).toFixed(2)}M` });
        return false;
      }

      const allSize = fileList.reduce((prev, cur) => prev + cur.size, 0);
      if (props.item.fileAllSize && allSize / 1024 > props.item.fileAllSize) {
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
  if (props?.item?.prop) {
    ElMessageBox.confirm("是否删除当前已选文件?", "温馨提示", {
      type: "warning",
      confirmButtonText: "确认删除"
    }).then(() => {
      if (props?.item?.prop) props.data[props.item.prop].length = 0;
    });
  }
};

// >-------------> 删除文件 <------------<
const removeFile = (prop = "", index: number) => {
  if (!prop) return;
  props.data[prop].splice(index, 1);

  changeEvent(props.data[prop], props.item);
};

// function openFile(file: fileType) {
//   if (file.FileUrl) {
// useDownload(file.FileUrl, file?.OriginalName || file?.FileName);
//   }
// }

function eq(prop, data, contrastData) {
  if (!prop || !contrastData || !contrastData[prop] || !Array.isArray(contrastData[prop])) return false;

  const _contrastData = contrastData[prop].filter(value => value !== null && typeof value !== "undefined");

  if (_contrastData && _contrastData.length == 0) {
    return true;
  }

  return !isEqual(
    data?.[prop]?.map(item => item.FileId),
    _contrastData.map(item => item.FileId)
  );
}

watch(
  () => loading.value,
  data => {
    emit("changeState", data ? "Working" : "Pending");
  }
);
</script>

<style lang="scss" scoped>
@use "../index.scss";

.file-item-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.hand {
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
  // > span + span {
  //   margin-right: calc(var(--m-component-padding-base) / 2);
  // }
}
</style>
