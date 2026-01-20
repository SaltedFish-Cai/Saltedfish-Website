<template>
  <section :id="id" class="flex-col" style="width: 100%; height: 100%; box-sizing: border-box" ref="scrollBarList">
    <el-scrollbar class="m-scrollbar" ref="mScrollbarListRef" v-bind="props" @scroll="scrollFn">
      <div v-if="useShadow" class="is-scroll"></div>
      <template v-for="(item, index) in state.tableData" :key="index">
        <template v-for="(row, i) in item" :key="props.rowKey || 'key-' + i">
          <template v-if="row.type == 'more'">
            <div class="m-scrollbar-more" :id="`${id}-more-${row.name}`">
              <!-- {{ id }} -more- {{ row.name }} -->
            </div>
          </template>
          <slot v-else :row="row"></slot>
        </template>
      </template>

      <!-- back-top -->
      <m-icon
        v-if="!noBackTop"
        :style="{ opacity: scrollValue > 10 ? '1' : '0', right: `${scrollValue > 10 ? '24px' : '-20px'}` }"
        name="arow_to_up_line"
        class="m-scrollbar-back-top m-hand"
        @click="setScrollTop(0)"
      />
      <!-- loading -->
      <div v-if="state.tableLoad" class="m-loading">
        <m-icon class="loading_font" name="loading_line"></m-icon>
      </div>

      <!-- more -->
      <div v-if="state.tableLoadEnd" class="title-error" style="padding-top: var(--m-component-padding-size, 10px)">暂无更多</div>

      <div v-if="useShadow" class="m-scrollbar-is-scroll-end" :style="{ opacity: !isScrollEnd ? '1' : '0' }"></div>
    </el-scrollbar>
    <slot name="footer">
      <div class="flex-center-between pt-size">
        <div>
          <slot name="footer-left"></slot>
        </div>
        <!-- {{ state.pageNum }} -->
        <el-pagination
          size="small"
          background
          layout="prev, pager, next"
          :total="state.pageable.total"
          v-model:current-page="state.pageNum"
          @change="handleCurrentChange"
        />
      </div>
    </slot>
  </section>
</template>

<script lang="ts" setup>
// # import
import { ref, Ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import lodashPkg from "lodash";
import { randChar } from "../tools/rand-char";
import { ScrollbarListPropsType } from "./type";
import { useIntersectionObserver } from "./useIntersectionObserver";

const { debounce } = lodashPkg;
const scrollBarList = ref();
const emits = defineEmits(["scroll"]);

const props = withDefaults(defineProps<ScrollbarListPropsType>(), {
  useShadow: true,
  noBackTop: false,
  showPagination: true
});
const id = ref(randChar());
const mScrollbarListRef = ref();
const scrollValue = ref(0);
const isScrollEnd = ref(false);
const _debounce = debounce(update, 100, { trailing: true });

let observer;

// # State 表格状态
const state = reactive({
  // 表格数据
  tableData: [] as objectType[],
  flatTableData: [] as objectType[],
  pageNum: 1,
  // 分页数据
  pageable: {
    // 当前页数
    pageNum: 1,
    // 每页显示条数
    pageSize: 10,
    // 每页选择页数列表
    pageSizes: [20, 50, 100, 150],
    // 总条数
    total: 0
  },
  // 查询参数(只包括查询)
  searchParam: {},
  // 初始化默认的查询参数
  searchInitParam: {},
  // 总参数(包含分页和查询参数)
  tableQuery: { Filter: [], AdvancedFilter: [], Page: {}, Params: {}, Sort: [] },

  tableLoad: false,

  tableLoadEnd: false,

  useSelectionTable: false,

  orderProp: "",

  initShow: false
});

// # onMounted
onMounted(() => {
  watchDom();
  getTableList();
});

async function getTableList(pageNum?: number, next?: boolean) {
  const _pageNum = (pageNum || state.pageable.pageNum) - 1;

  if (state.tableLoadEnd || state.tableData[_pageNum]?.length) {
    if (!stopObservingList.value.length) setRuleTabsFormRef();
    return;
  }
  if (state.tableLoad) return;
  state.tableLoad = true;

  if (stopObservingList.value.length) {
    stopObservingList.value.forEach((item: any) => {
      item();
    });
    stopObservingList.value.length = 0;
  }
  // let { data } = await api({ ...state.searchInitParam, ...state.totalParam });
  const _query = {
    ...state.tableQuery,
    Page: {
      PageNum: pageNum || state.pageable.pageNum,
      PageSize: state.pageable.pageSize
    }
  };
  state.tableQuery = _query;
  const Data = await props.requestApi(_query);
  // tableRef?.value?.scrollTo(0, 0);

  // const deepData = lodash.cloneDeep(Data);
  const deepData = Data;

  const _data = props.showPagination ? deepData.List || deepData : deepData;
  const ar = [{ type: "more", name: pageNum || state.pageable.pageNum }, ..._data];
  state.flatTableData = [...state.flatTableData, ..._data];
  state.tableData[_pageNum] = ar;
  props.showPagination && updatePageable({ total: deepData.TotalCount });
  state.tableLoad = false;

  setTimeout(() => {
    if (pageNum && !next) {
      const mpreEl: any = document.querySelector(`#${id.value} #${id.value}-more-${state.pageable.pageNum}`);
      if (mpreEl) setScrollTop(Number(mpreEl?.offsetTop) || 0);

      setTimeout(() => {
        if (pageNum) {
          getTableList(pageNum - 1, true);
        }
      }, 1000);
    } else {
      if (pageNum) {
        getTableList(pageNum - 1, true);
      } else {
        setTimeout(() => {
          setRuleTabsFormRef();
        }, 300);
      }
    }
  }, 0);

  if (state.flatTableData.length >= deepData.TotalCount) {
    state.tableLoadEnd = true;
  }
}

// #Function  更新分页信息
function updatePageable(resPageable: { pageNum?: number; pageSize?: number; pageSizes?: number[]; total: number }) {
  Object.assign(state.pageable, resPageable);
}

// # onBeforeUnmount
onBeforeUnmount(() => {
  if (observer?.disconnect) observer?.disconnect();
});

// #Function 监听元素节点
function watchDom() {
  // 目标节点
  const targetNode = document.getElementById(id.value);
  if (targetNode) {
    setTimeout(() => {
      const scrollWrap = targetNode.querySelector(".el-scrollbar__wrap");
      if (scrollWrap && scrollWrap.scrollHeight > scrollWrap.clientHeight) {
        isScrollEnd.value = false;
      }
    }, 800);
    // 观察器的配置（需要观察什么变动）
    const config = { childList: true, subtree: true, attributes: true };

    // 当观察到变动时执行的回调函数(mutationsList, observer)
    const callback = function () {
      _debounce();
    };
    _debounce();
    // 创建一个观察器实例并传入回调函数
    observer = new MutationObserver(callback);

    // 开始观察目标节点
    observer.observe(targetNode, config);
  }
}

// #Function 更新滚动条状态
function update() {
  mScrollbarListRef?.value?.update();
}

// #Function 设置左距离
function setScrollLeft(value: number) {
  mScrollbarListRef?.value?.scrollTo({ left: value, behavior: "smooth" });
}

// #Function 设置高距离
function setScrollTop(value: number) {
  mScrollbarListRef?.value?.scrollTo({ top: value, behavior: "smooth" });
}

// #Function 滚动回调
function scrollFn({ scrollTop, scrollLeft }) {
  scrollValue.value = scrollTop;
  emits("scroll", { scrollTop, scrollLeft });

  // 判断滚动条是否到底部
  const scrollbar = mScrollbarListRef.value;
  if (scrollbar) {
    const { scrollHeight, clientHeight } = scrollbar.$el.querySelector(".el-scrollbar__wrap");
    const isAtBottom = scrollTop + clientHeight + 5 >= scrollHeight;
    if (isAtBottom) {
      isScrollEnd.value = true;

      if (state.tableLoad) return;
      state.pageable.pageNum++;
      getTableList();
    } else {
      isScrollEnd.value = false;
    }
  }
}

// 要观察的元素
const isIntersectingList = ref([] as Ref<boolean>[]);
const stopObservingList = ref([] as any);

function setRuleTabsFormRef() {
  isIntersectingList.value.length = 0;
  const Els = document.querySelectorAll(`#${id.value} .m-scrollbar-more`);
  if (Els.length) {
    for (let i = 0; i < Els.length; i++) {
      const el: Element = Els[i];
      const { isIntersecting, stopObserving } = useIntersectionObserver(el, {
        // 配置选项
        rootMargin: "0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
        root: scrollBarList.value // 使用视窗作为根元素
      });
      isIntersectingList.value.push(isIntersecting);
      stopObservingList.value.push(stopObserving);
      // if (Els[i].id == `${id.value}-more-${prop.name}`) {
      //   isIntersectingList.value[i] = true;
      // }
    }
  }
}

let lock = false;
function handleCurrentChange(value) {
  if (lock) return (lock = false);
  if (state.tableLoad) return;
  const mpreEl: any = document.querySelector(`#${id.value} #${id.value}-more-${value}`);
  if (mpreEl) setScrollTop(Number(mpreEl?.offsetTop) || 0);
  state.pageable.pageNum = value;
  getTableList(state.pageable.pageNum);
}

watch(
  () => isIntersectingList.value,
  newVal => {
    let showIndex = -1;
    for (let i = 0; i < newVal.length; i++) {
      const isIntersecting = newVal[i].value;
      if (isIntersecting) {
        showIndex = i;
        state.pageNum = showIndex + 1;
        lock = true;
        setTimeout(() => {
          lock = false;
        }, 300);
      }
    }
  },
  {
    deep: true
  }
);

defineExpose({ update, setScrollTop, setScrollLeft, el: mScrollbarListRef });
</script>

<style lang="scss">
.m-scrollbar {
  position: relative;
  width: 100%;
  height: 100%;
  .el-scrollbar__view {
    height: 100%;
  }
  .m-scrollbar-body {
    position: relative;
  }
  .is-scroll {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    transition: var(--m-component-animation, 0.3s);
    z-index: 999;
    box-shadow: 0px 0 10px 1.5px var(--el-color-black);
  }

  .m-scrollbar-is-scroll-end {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    transition: var(--m-component-animation, 0.3s);
    z-index: 999;
    box-shadow: 0px 0 10px 1.5px var(--el-color-black);
  }

  .m-scrollbar-back-top {
    position: absolute;
    right: 24px;
    bottom: 40px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: var(--el-color-info-light-3);
    border-radius: 50%;
    text-align: center;
    color: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    z-index: 22;
    transition: var(--m-component-animation, 0.3s);
  }
  // .el-scrollbar__bar.is-horizontal {
  //   .el-scrollbar__thumb {
  //     background-color: #c1c1c1;
  //     opacity: 1;
  //     &:active,
  //     &:hover {
  //       background-color: var(--el-color-primary);
  //       opacity: 1;
  //     }
  //   }
  // }
  // .el-scrollbar__bar.is-vertical {
  //   .el-scrollbar__thumb {
  //     background-color: #c1c1c1;
  //     opacity: 1;
  //     &:active,
  //     &:hover {
  //       background-color: var(--el-color-primary);
  //       opacity: 1;
  //     }
  //   }
  // }
}

// .m-scrollbar:has(.m-table-styles.use-sticky) {
//   > .el-scrollbar__wrap {
//     > .el-scrollbar__view {
//       > .m-scrollbar-is-scroll-end {
//         display: none;
//       }
//     }
//   }
// }

.m-scrollbar:has(> .el-scrollbar__bar.is-vertical > .el-scrollbar__thumb[style*="translateY(0%)"]) {
  > .el-scrollbar__wrap {
    > .el-scrollbar__view {
      > .is-scroll {
        opacity: 0;
      }
    }
  }
}

.m-scrollbar-use-bar-x {
  .m-scrollbar-body {
    width: calc(100% - var(--el-scrollbar-width) - 7px);
    padding-right: calc(var(--el-scrollbar-width) + 7px);
    > .el-scrollbar__bar.is-vertical {
      right: 0;
      background-color: var(--el-border-color-light);
    }
  }
  .el-scrollbar__bar.is-vertical {
    width: var(--el-scrollbar-width);
    transform: scaleY(0.97);
  }
}

.m-scrollbar-use-bar-y {
  .m-scrollbar-body {
    height: calc(100% - var(--el-scrollbar-width) - 4px);
    padding-bottom: calc(var(--el-scrollbar-width) + 4px);
    > .el-scrollbar__bar.is-horizontal {
      bottom: 0;
      background-color: var(--el-border-color-light);
    }
  }
  .el-scrollbar__bar.is-horizontal {
    height: var(--el-scrollbar-width);
    transform: scaleY(0.97);
  }
}
</style>
