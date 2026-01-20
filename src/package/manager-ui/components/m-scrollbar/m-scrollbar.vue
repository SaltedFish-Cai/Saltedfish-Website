<template>
  <section :id="id" class="flex-col" style="width: 100%; height: 100%; box-sizing: border-box">
    <el-scrollbar class="m-scrollbar m-position-sticky" ref="mScrollbarRef" v-bind="prop" @scroll="scrollFn">
      <div v-if="useShadow" class="is-scroll"></div>
      <!-- <div v-if="!noPadding" class="pt7">
        <slot></slot>
      </div>
      <template v-else><slot></slot></template> -->
      <slot></slot>
      <m-icon
        v-if="!noBackTop"
        :style="{ opacity: scrollValue > 10 ? '1' : '0', right: `${scrollValue > 10 ? '24px' : '-20px'}` }"
        name="arow_to_up_line"
        class="m-scrollbar-back-top m-hand"
        @click="setScrollTop(0)"
      />
      <div v-if="useShadow" class="m-scrollbar-is-scroll-end" :style="{ opacity: !isScrollEnd ? '1' : '0' }"></div>
    </el-scrollbar>
    <slot name="footer"></slot>
  </section>
</template>

<script lang="ts" setup>
// # import
import { ref, onMounted, onBeforeUnmount } from "vue";
import lodashPkg from "lodash";
import { randChar } from "../tools/rand-char";
import { ScrollbarPropsType } from "./type";

const { debounce } = lodashPkg;
const emits = defineEmits(["bodyHeight", "scroll", "scrollEnd"]);

const prop = withDefaults(defineProps<ScrollbarPropsType>(), {
  useShadow: true,
  noPadding: false,
  noBackTop: false
});
const id = ref(randChar());
const mScrollbarRef = ref();

const scrollValue = ref(0);
const isScrollEnd = ref(true);
const _debounce = debounce(update, 100, { trailing: true });
let observer;

// # onMounted
onMounted(() => {
  watchDom();
  if (window.MScrollbarObject) {
    window.MScrollbarObject[id.value] = mScrollbarRef.value;
  } else {
    window.MScrollbarObject = {};
    window.MScrollbarObject[id.value] = mScrollbarRef.value;
  }

  if (!window.MScrollbarToError) {
    window.MScrollbarToError = () => {
      if (window.MScrollbarObject) {
        for (const key in window.MScrollbarObject) {
          const errorElBox = document.querySelector(`#${key}`);
          const errorEl = document.querySelector(`#${key} .el-form-item.is-error`);
          const errorElBoxRect = errorElBox?.getBoundingClientRect?.();
          const errorElRect = errorEl?.getBoundingClientRect?.();
          if (errorEl && errorElBoxRect && errorElRect) {
            window.MScrollbarObject[key]?.scrollTo({
              top: errorElRect.top - (errorElBoxRect.top - scrollValue.value),
              behavior: "smooth"
            });
          }
        }
      }
    };
  }

  emits("bodyHeight", mScrollbarRef.value?.wrapRef?.clientHeight - 1);
});

// # onBeforeUnmount
onBeforeUnmount(() => {
  if (observer?.disconnect) observer?.disconnect();
  if (window.MScrollbarObject) {
    delete window.MScrollbarObject[id.value];
  }
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
        emits("scrollEnd", false);
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
  mScrollbarRef?.value?.update();
}

// #Function 设置左距离
function setScrollLeft(value: number) {
  mScrollbarRef?.value?.scrollTo({ left: value, behavior: "smooth" });
}

// #Function 设置高距离
function setScrollTop(value: number) {
  mScrollbarRef?.value?.scrollTo({ top: value, behavior: "smooth" });
}

// #Function 滚动回调
function scrollFn({ scrollTop, scrollLeft }) {
  scrollValue.value = scrollTop;
  emits("scroll", { scrollTop, scrollLeft });

  // 判断滚动条是否到底部
  const scrollbar = mScrollbarRef.value;
  if (scrollbar) {
    const { scrollHeight, clientHeight } = scrollbar.$el.querySelector(".el-scrollbar__wrap");
    const isAtBottom = scrollTop + clientHeight + 15 >= scrollHeight;
    if (isAtBottom) {
      isScrollEnd.value = true;
      emits("scrollEnd", true);
    } else {
      isScrollEnd.value = false;
      emits("scrollEnd", false);
    }
  }
}

defineExpose({ update, setScrollTop, setScrollLeft, el: mScrollbarRef });
</script>

<style lang="scss">
.m-scrollbar {
  position: relative;
  width: 100%;
  height: 100%;
  .el-scrollbar__view {
    padding: 0 var(--m-component-padding-size, 10px);
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

.m-table-styles {
  .el-scrollbar__view {
    padding: 0 !important;
  }
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

.m-position-sticky {
  position: relative;
  .m-table-styles .table_body,
  .m-table-styles .table_body .el-table,
  .dialog__body {
    overflow: visible !important;
  }
  .no-sticky.m-table-styles {
    .table_body {
      overflow: hidden !important;
    }
  }
}
</style>
