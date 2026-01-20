<template>
  <div
    class="m-tabs"
    :class="[
      card ? 'm-tabs-card' : 'm-tabs-default',
      createSize == 'small' ? 'm-tabs_small' : '',
      portrait ? 'm-tab-portrait' : '',
      slider ? 'm-tab-portrait m-tab-slider' : '',
      useSticky ? 'm-tabs-card_sticky' : ''
    ]"
    :style="{ ...props.style, height: useFull ? '' : 'auto' }"
    :id="tabsId"
    ref="tabsRef"
  >
    <div :class="['m-tabs-content', portrait || slider ? 'flex' : 'flex-col']">
      <div
        :class="['m-tab-header', useHeaderLine ? 'm-tab-header_line' : '']"
        :style="{ '--tab-header-over-width': overFixWidth + 'px' }"
      >
        <div v-if="$slots['HeaderLeft']" class="mr5"><slot name="HeaderLeft"></slot></div>
        <!-- 左更多 -->
        <m-icon v-if="scrollValue > 0" class="icons left-icon" name="left_small" @click="minusScroll" />

        <div :class="[card ? 'm-tab-title-list_card' : 'm-tab-title-list']" :id="tabsId + '-tab-titles'">
          <div v-if="portrait || slider" class="m-tab-box flex-col" :style="{ '--tab-header-scroll': '-' + headerScroll + 'px' }">
            <title-item
              :slots="slotsTitle"
              :activeName="state.activeName"
              :changeTabs="changeTabs"
              :card="card"
              :portrait="portrait || slider"
            ></title-item>
            <slot name="tabHeaderFooter"></slot>
          </div>
          <div v-else class="m-tab-box" :style="{ '--tab-header-scroll': '-' + headerScroll + 'px' }">
            <title-item
              :slots="slotsTitle"
              :activeName="state.activeName"
              :changeTabs="changeTabs"
              :card="card"
              :portrait="portrait || slider"
            ></title-item>
            <slot name="tabHeaderFooter"></slot>
          </div>
        </div>

        <!-- 右更多 -->
        <m-icon v-if="scrollValue > 0" class="icons right-icon" name="right_small_fill" @click="addScroll" />
        <div v-if="$slots['HeaderRight']" class="ml5"><slot name="HeaderRight"></slot></div>
      </div>

      <div v-if="slider" class="m-tab-scroll">
        <div
          :id="tabsId + '-tab-contents-slider'"
          class="m-tab-contents m-tab-contents_slider"
          :style="{ transform: `translateX(-${useSticky ? 0 : mode == 'visible' ? slotIndex : 0}00%)` }"
        >
          <m-scrollbar always ref="mScrollRef" @scroll="scrollChange" :useShadow="useShadow">
            <slot></slot>
          </m-scrollbar>
        </div>
      </div>
      <div v-else class="m-tab-scroll">
        <!-- :style="{ transform: `translateX(-${useSticky ? 0 : mode == 'visible' ? slotIndex : 0}00%)` }" -->
        <!-- :style="{ position: 'relative', left: `-${useSticky ? 0 : mode == 'visible' ? slotIndex : 0}00%` }" -->

        <div
          :id="tabsId + '-tab-contents'"
          class="m-tab-contents"
          :style="{ position: 'relative', left: `-${useSticky ? 0 : mode == 'visible' ? slotIndex : 0}00%` }"
        >
          <slot></slot>
        </div>
      </div>

      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// # Import
import { ref, computed, reactive, onMounted, onUnmounted, useSlots, watch, nextTick, provide } from "vue";
import lodashPkg from "lodash";
import { randChar } from "../tools/rand-char";
import titleItem from "./components/title.vue";
import { useBaseStore } from "../store/index";
import { MTabsType } from "./type";
import inBrowser from "../tools/inBrowser";

// # Var
const { debounce } = lodashPkg;

const props = withDefaults(defineProps<MTabsType>(), {
  modelValue: "",
  mode: "visible",
  card: false,
  portrait: false,
  slider: false,
  useHeaderLine: false,
  useShadow: true,
  useSticky: false,
  useFull: true
});

const randId = props.id || String(randChar());
const tabsRef: any = ref();
const slots: any = ref({});
const overFixWidth = ref(0);
const defaultSlot = useSlots().default;
const slotsTitle = ref([] as objectType[]);
const slotIndex = ref(0);
// const lineStyle = ref({ width: 0, left: 0 });
const tabsId = ref(randId);
const scrollValue = ref(0);
const headerScroll = ref(0);
const state = reactive({ activeName: "" });
const globalState = useBaseStore();
const emits = defineEmits(["update:modelValue", "tab-change"]);
const _debounce = debounce(
  () => {
    if (!props.slider) {
      setClick();
      setLine();
    }
  },
  500,
  { trailing: true }
);

const _debounceTitle = debounce(
  () => {
    init(true);
  },
  500,
  { trailing: true }
);

let observer;
let observerScroll;
let tabsTitle: {
  scrollWidth: number;
  clientWidth: number;
} = {
  scrollWidth: 0,
  clientWidth: 0
};

const mScrollRef = ref();
let scrollChangeValue = 0;

// # Computed
const createSize = computed(() => {
  return globalState.getSize == "small" ? "small" : "default";
});

provide("createTabItemObserver", element => {
  setWatch();
  observerScroll?.observe(element);
});

provide("initTitle", () => {
  _debounceTitle();
});

provide("randId", randId);

// # Vue onMounted
onMounted(() => {
  init();
  const defaultValue = props.modelValue;

  if (props.slider) {
    observerScroll?.disconnect && observerScroll?.disconnect();
  } else {
    observer?.disconnect && observer?.disconnect();
  }

  setTimeout(() => {
    watchDom();
    if (props.slider) {
      changeTabs(defaultValue, 0);
    }
  }, 500);
});

// # Vue onUnmounted
onUnmounted(() => {
  observer?.disconnect && observer?.disconnect();
  observerScroll?.disconnect && observerScroll?.disconnect();
});

// #Function 变更Tab
function changeTabs(name, index) {
  if (!props.slider) {
    slotIndex.value = index;
    setLine();
    emits("update:modelValue", name);
  } else {
    const target: any = document.querySelector(`#${tabsId.value}-tab-contents-slider #${randId}-${name}`);
    if (target) {
      mScrollRef.value.setScrollTop(target.offsetTop - 10);
    }
  }
  emits("tab-change", { name, index });
}

// #Function 初始化
function init(Mandatory = false) {
  if (tabsRef.value) {
    if (defaultSlot) {
      slots.value = defaultSlot();
    }

    const arr: any = [];
    function setChild(arrayData) {
      for (let index = 0; index < arrayData.length; index++) {
        const element = arrayData[index];
        if (element.props) {
          arr.push(element);
        } else if (String(element.type) == "Symbol(v-fgt)" && !!element.children?.length) {
          setChild(element.children);
        }
      }
    }
    setChild(slots.value);

    if (arr.length != slotsTitle.value.length || Mandatory) {
      slotsTitle.value = arr;
      const _index = slotsTitle.value.findIndex(item => item?.props?.name == props.modelValue);
      slotIndex.value = _index < 0 ? 0 : _index;
      const name = slotsTitle.value[slotIndex.value]?.props?.name;
      state.activeName = name;
      emits("update:modelValue", name);
      _debounce();
    }
  }
}

// #Function 监听元素节点
function watchDom() {
  if (tabsRef.value) {
    // 观察器的配置（需要观察什么变动）
    const config = { childList: true, subtree: true };

    // 当观察到变动时执行的回调函数(mutationsList, observer)
    const callback = function () {
      init();
    };

    // 创建一个观察器实例并传入回调函数
    observer = new MutationObserver(callback);

    // 开始观察目标节点
    observer.observe(tabsRef.value, config);
  }
}

// #Function 设置滚动位置
function setClick() {
  if (!inBrowser) return;

  setTimeout(() => {
    nextTick(() => {
      // const prEl = window.document?.getElementById(id.value);
      const tabId = tabsRef?.value?.id;
      const _id = `${tabId}-tab-titles`;
      const tabsTitleEl = window.document?.getElementById(_id);
      if (tabsTitleEl) {
        tabsTitle = {
          scrollWidth: tabsTitleEl.scrollWidth,
          clientWidth: tabsTitleEl.clientWidth
        };
        scrollValue.value = tabsTitleEl.scrollWidth - tabsTitleEl.clientWidth;
      }
    });
  }, 100);
}

// #Function 设置底线与动画
function setLine() {
  if (!inBrowser) return;

  setTimeout(() => {
    nextTick(() => {
      const tabId = tabsRef?.value?.id;
      const prEl = window.document?.getElementById(tabId);

      // >-------------> 设置底线 <------------<
      // const el = prEl?.getElementsByClassName("m-tab-title_action");
      // if (prEl && el && el.length) {
      //   const prRect = prEl.getBoundingClientRect();
      //   const rect = el[0].getBoundingClientRect();
      //   lineStyle.value = {
      //     width: Math.floor(rect.width),
      //     left: Math.floor(rect.left - prRect.left)
      //   };
      // }

      // >-------------> 设置过渡动画 <------------<
      const _els = prEl?.getElementsByClassName("tab-item");
      if (_els && _els.length) {
        const _arr = Array.prototype.slice.call(_els, 0);
        const els = _arr.filter(item => item.parentElement.id.indexOf(tabId) > -1);
        for (let index = 0; index < els.length; index++) {
          const element = els[index];
          if (props.mode == "visible") {
            if (index != slotIndex.value) {
              element.style.visibility = "hidden";
              if (props.useSticky) {
                element.style.flex = "0 0 0";
                element.style.width = "0px";
                element.style.height = "0px";
                element.style.overflow = "hidden";
              }
            } else {
              element.style.visibility = "visible";
              const body_el = element.querySelector(".m-tab-item-body_fix");
              if (body_el?.children?.[0]?.innerHTML?.includes("table-flex-ri-embedded")) {
                const _el = body_el.querySelector(".table-flex-ri-embedded");
                overFixWidth.value = _el.clientWidth;
                setClick();
              } else {
                overFixWidth.value = 0;
                setClick();
              }
              if (props.useSticky) {
                element.style.flex = "0 0 100%";
                element.style.width = "100%";
                element.style.height = "100%";
                element.style.overflow = "visible";
              }
            }
          } else {
            if (index != slotIndex.value) element.style.display = "none";
            else element.style.display = "block";
          }
        }
      }
    });
  }, 100);
}

function scrollChange({ scrollTop }) {
  scrollChangeValue = scrollTop <= 0 ? 1 : scrollTop;
}

function setWatch() {
  if (!inBrowser) return;

  const root = document.querySelector(`#${tabsId.value}-tab-contents-slider`);
  if (root) {
    const exTop = root.clientHeight - 180 < 0 ? 0 : root.clientHeight - 180;
    const options = {
      root, //根元素
      rootMargin: `0px 0px -${exTop}px 0px`, //传值形式类似于css的margin 传一个值则四个边都为0
      threshold: 1 //触发条件 表示目标元素刚进入根元素时触发
    };
    if (observerScroll) return;

    //IntersectionObserver对象
    observerScroll = new IntersectionObserver(data => {
      const target: any = data[0].target;
      const name = target?.dataset?.name;
      if (scrollChangeValue != 0) {
        state.activeName = name;
        emits("update:modelValue", name);
      }
    }, options);
  }
}

// #Function 超出标题（左）
function minusScroll() {
  const { clientWidth } = tabsTitle;
  const chr = headerScroll.value - clientWidth;
  headerScroll.value = chr <= 0 ? 0 : chr;
}

// #Function 超出标题（右）
function addScroll() {
  const { scrollWidth, clientWidth } = tabsTitle;
  const chr = headerScroll.value + clientWidth;
  headerScroll.value = clientWidth + chr >= scrollWidth ? scrollWidth - clientWidth + 30 : chr;
}

// #Watch modelValue
watch(
  () => props.modelValue,
  data => {
    state.activeName = data;
    if (slotsTitle.value) {
      const index = slotsTitle.value.findIndex(item => item?.props?.name == props.modelValue);
      slotIndex.value = index;
      setLine();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
@use "./index.scss";
</style>
