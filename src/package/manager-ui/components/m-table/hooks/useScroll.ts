import { ref } from "vue";

export const useScroll = id => {
  const isScrollEnd = ref(true);
  let scrollWrap;
  // #Function 初始化滚动条是否到底部
  function initScrollEnd() {
    const targetNode = document.getElementById(id);
    if (targetNode) {
      scrollWrap = targetNode.querySelector(".el-scrollbar__wrap");
      if (scrollWrap && scrollWrap.scrollHeight > scrollWrap.clientHeight) {
        isScrollEnd.value = false;
      } else {
        isScrollEnd.value = true;
      }
    }
  }

  // #Function 滚动回调
  function handleScroll({ scrollTop }) {
    // 判断滚动条是否到底部
    if (scrollWrap) {
      const { scrollHeight, clientHeight } = scrollWrap;
      const isAtBottom = scrollTop + clientHeight + 5 >= scrollHeight;
      if (isAtBottom) {
        isScrollEnd.value = true;
      } else {
        isScrollEnd.value = false;
      }
    }
  }

  return { isScrollEnd, initScrollEnd, handleScroll };
};
