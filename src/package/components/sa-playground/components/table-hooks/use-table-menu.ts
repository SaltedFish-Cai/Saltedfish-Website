import { ComputedRef, ref } from "vue";

export const useMenuHooks = (position: ComputedRef<{ x: number; y: number }>) => {
  const contextMenuVisible = ref(false);
  const contextMenuX = ref(0);
  const contextMenuY = ref(0);
  const selectedColumnIndex = ref(-1);

  // 显示右键菜单
  function showContextMenu(event: MouseEvent, columnIndex: number) {
    event.stopPropagation();
    selectedColumnIndex.value = columnIndex;

    // 计算菜单位置
    const svgElement = document.getElementById("SvgContent");
    if (svgElement) {
      // 获取SVG元素和外部g元素
      const svg = svgElement as any;
      const gElement = svg.querySelector("g") as SVGGElement;

      // 使用SVG的createSVGPoint方法来准确计算鼠标在g元素内部的坐标
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;

      // 将鼠标坐标从屏幕坐标转换为g元素内部的坐标
      if (gElement) {
        // 首先转换为SVG坐标
        const svgPoint = point.matrixTransform(svg.getScreenCTM()!.inverse());
        // 然后转换为g元素内部的坐标
        const gTransform = gElement.getCTM()!;
        const gPoint = svgPoint.matrixTransform(gTransform.inverse());

        // 考虑表格的x和y位置，确保菜单在表格内部正确定位
        const tableX = position.value?.x || 0;
        const tableY = position.value?.y || 0;

        // 使用转换后的坐标作为菜单位置，减去表格的偏移量
        contextMenuX.value = gPoint.x - tableX;
        contextMenuY.value = gPoint.y - tableY;
      }
    }

    contextMenuVisible.value = true;

    // 点击其他地方关闭菜单
    setTimeout(() => {
      document.addEventListener("click", closeContextMenu);
    }, 0);
  }

  // 关闭右键菜单
  function closeContextMenu() {
    contextMenuVisible.value = false;
    document.removeEventListener("click", closeContextMenu);
  }
  return { contextMenuVisible, contextMenuX, contextMenuY, selectedColumnIndex, showContextMenu, closeContextMenu };
};
