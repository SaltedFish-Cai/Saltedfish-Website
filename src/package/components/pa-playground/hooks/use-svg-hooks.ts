import { ref, computed, Ref } from "vue";
import { PaPlaygroundType } from "../type";
import { M_MessageBox } from "../../feedback";

interface UseSvgHooksReturn {
  scale: ReturnType<typeof ref<number>>;
  translateX: ReturnType<typeof ref<number>>;
  translateY: ReturnType<typeof ref<number>>;
  isDragging: ReturnType<typeof ref<boolean>>;
  transform: Ref<string>;
  backgroundStyle: Ref<Record<string, string>>;
  handleWheel: (event: WheelEvent) => void;
  handleMouseDown: (event: MouseEvent) => void;
  handleDeletePage: (index: number) => void;
  handleMouseMove: (event: MouseEvent) => void;
  handleMouseUp: () => void;
  getSvgTransform: () => { adminX: number; adminY: number; adminScale: number };
  updateAdminConfig: () => void;
}

export const useSvgHooks = (lockScroll: Ref<boolean>, adminConfig: Ref<PaPlaygroundType>): UseSvgHooksReturn => {
  // 缩放和平移相关变量
  const scale = ref(adminConfig.value.adminScale || 1);
  const translateX = ref(adminConfig.value.adminX || 0);
  const translateY = ref(adminConfig.value.adminY || 0);
  const isDragging = ref(false);
  const lastMouseX = ref(0);
  const lastMouseY = ref(0);

  // 计算变换矩阵
  const transform: Ref<string> = computed(() => {
    return `translate(${translateX.value}, ${translateY.value}) scale(${scale.value})`;
  });

  // 计算背景样式
  const backgroundStyle = computed(() => {
    // 根据缩放比例调整圆点大小和间距
    const baseSize = 10.68;
    const baseDotSize = 1;
    const scaleFactor = Math.max(0.5, Math.min(2, scale.value)); // 限制缩放因子范围
    const dotSize = baseDotSize * scaleFactor;
    const spacing = baseSize * scaleFactor;

    return {
      "--svg-background-size": `${spacing}px`,
      "--svg-background-font": `${dotSize}px`
    };
  });

  // 处理鼠标滚轮缩放
  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (lockScroll.value) return;

    const svgContainer = event.currentTarget as HTMLElement;
    const rect = svgContainer.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // 计算缩放中心相对于SVG的坐标
    const scaleFactor = event.deltaY > 0 ? 0.98 : 1.02; // 降低缩放速度，每次缩放2%
    const newScale = Math.max(0.1, Math.min(5, scale.value * scaleFactor));

    // 调整平移，使缩放中心保持在鼠标位置
    const scaleRatio = newScale / scale.value;
    translateX.value = mouseX - (mouseX - translateX.value) * scaleRatio;
    translateY.value = mouseY - (mouseY - translateY.value) * scaleRatio;

    scale.value = newScale;

    adminConfig.value.adminScale = newScale;
    adminConfig.value.adminX = translateX.value;
    adminConfig.value.adminY = translateY.value;
  };

  // 处理鼠标按下，开始拖拽
  const handleMouseDown = (event: MouseEvent) => {
    if (lockScroll.value) return;

    if (event.button === 0) {
      // 只处理左键
      isDragging.value = true;
      lastMouseX.value = event.clientX;
      lastMouseY.value = event.clientY;
    }
  };

  // # 删除确认配置
  // 处理鼠标按下，开始拖拽
  const handleDeletePage = (index: number) => {
    M_MessageBox.delete({
      onConfirm: () => {
        // 删除页面配置
        adminConfig.value.pagesConfigs.splice(index, 1);
        updateAdminConfig();
      }
    });
  };

  // 处理鼠标移动，实现拖拽
  const handleMouseMove = (event: MouseEvent) => {
    if (lockScroll.value) return;

    if (isDragging.value) {
      const deltaX = event.clientX - lastMouseX.value;
      const deltaY = event.clientY - lastMouseY.value;

      translateX.value += deltaX;
      translateY.value += deltaY;

      lastMouseX.value = event.clientX;
      lastMouseY.value = event.clientY;

      adminConfig.value.adminX = translateX.value;
      adminConfig.value.adminY = translateY.value;
    }
  };

  // 处理鼠标释放，结束拖拽
  const handleMouseUp = () => {
    if (lockScroll.value) return;

    isDragging.value = false;
  };

  // 获取当前SVG变换矩阵
  const getSvgTransform = () => {
    return {
      adminX: translateX.value,
      adminY: translateY.value,
      adminScale: scale.value
    };
  };

  const updateAdminConfig = () => {
    scale.value = adminConfig.value.adminScale || 1;
    translateX.value = adminConfig.value.adminX || 0;
    translateY.value = adminConfig.value.adminY || 0;
  };

  return {
    scale,
    translateX,
    translateY,
    isDragging,
    transform,
    backgroundStyle,
    updateAdminConfig,
    getSvgTransform,
    handleWheel,
    handleMouseDown,
    handleDeletePage,
    handleMouseMove,
    handleMouseUp
  };
};
