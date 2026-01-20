<template>
  <div :data-name="name" :data-label="label" class="tab-item flex-col" :class="[animation ? 'animation' : '']" ref="box">
    <div
      v-if="isSlider"
      ref="tabItemLine"
      class="tab-item_line pl-size"
      :data-label="label"
      :data-name="name"
      :id="tabId + '-' + name"
    >
      <img class="tab-item_line_load" src="../imgs/load.png" @load="loadElement" />
      <m-title :tips="tips">
        {{ label }}
        <template #tips v-if="$slots['tips']">
          <slot name="tips"></slot>
        </template>
      </m-title>
    </div>
    <div class="flex-height-1" v-if="init" :id="tabId + '-' + name">
      <m-scrollbar always v-if="scroll" ref="scrollbarRef" class="m-tab-item-body">
        <slot></slot>
      </m-scrollbar>
      <div v-else class="m-tab-item-body_fix">
        <slot></slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts" setup>
// #
import { ref, onMounted, onUnmounted, inject, watch } from "vue";
import { MTabsItemType } from "./type";
// import { randChar } from "../tools/rand-char";
import inBrowser from "../tools/inBrowser";

const scrollbarRef = ref();
const tabId = ref("");
const isSlider = ref(false);
const createTabItemObserver: any = inject("createTabItemObserver");
const initTitle: any = inject("initTitle");
const randId: any = inject("randId");

// # Var
const props = withDefaults(defineProps<MTabsItemType>(), {
  label: "",
  name: "",
  scroll: false,
  lazy: false
});

const tabItemLine = ref();
const box = ref();

const animation = ref(false);
const init = ref(false);

// 观察器的配置（需要观察什么变动）
const config = { attributes: true };
// 创建一个观察器实例并传入回调函数
let observer;

// # onMounted
onMounted(() => {
  if (props.lazy == true) {
    init.value = false;
  } else if (props.lazy == false) {
    init.value = true;
  } else {
    setTimeout(
      () => {
        init.value = true;
      },
      typeof props.lazy === "number" ? props.lazy : 3000
    );
  }

  if (inBrowser) {
    observer = new window.MutationObserver(callback);

    // 开始观察已配置的目标节点
    observer.observe(box.value, config);
    const tabsList = window.document.querySelector(`#` + randId);
    if (tabsList) {
      isSlider.value = tabsList.className?.indexOf("m-tab-portrait") > -1;
      tabId.value = randId;
    }
    // if (tabsList) {
    //   for (let index = 0; index < tabsList.length; index++) {
    //     const element: any = tabsList[index];
    //     if (element.innerHTML.indexOf(`tab-item-${randId}`) > -1) {
    //       console.log("++++++++++> element:", element);
    //       tabId.value = element.id;
    //       const classArr = [...element.classList];
    //       if (classArr?.findIndex(item => item == "m-tab-slider") > -1) {
    //         isSlider.value = true;
    //       }
    //     }
    //   }
    // }
  }
});

// # Vue onUnmounted
onUnmounted(() => {
  observer?.disconnect && observer?.disconnect();
});

// #Function 当观察到变动时执行的回调函数
function callback(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "attributes") {
      if (mutation.target.style.visibility.length) {
        if (mutation.target.style.visibility == "visible") {
          animation.value = true;
          init.value = true;
          scrollbarRef?.value?.update();
        } else {
          animation.value = false;
        }
      } else {
        scrollbarRef?.value?.update();
        animation.value = true;
        init.value = true;
      }
    }
  }
}

function loadElement() {
  createTabItemObserver(tabItemLine.value);
}

// #Watch modelValue
watch(
  () => props.name,
  () => {
    initTitle();
  },
  { immediate: true }
);
// #Watch modelValue
watch(
  () => props.label,
  () => {
    initTitle();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.tab-item_line {
  position: relative;
  .tab-item_line_load {
    position: absolute;
    display: none;
  }
}
.flex-height-1 {
  height: 1px;
  flex: 1;
}
.tab-item {
  display: flex;
  flex: 0 0 100%;
  width: 100%;
  visibility: hidden;
  .m-tab-item-body {
    // width: calc(100% - 20px);
    // padding-right: 10px;
    // padding-left: 10px;
    width: initial;
  }
  .m-tab-item-body_fix {
    --m-scroll-padding: 0px;
    height: calc(100% - 0px);
    // padding-right: 9px;
    // padding-bottom: 7px;
    // padding-left: 9px;
  }
}

.animation {
  animation: in-page var(--m-component-animation, 0.3s);
}

@keyframes in-page {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
