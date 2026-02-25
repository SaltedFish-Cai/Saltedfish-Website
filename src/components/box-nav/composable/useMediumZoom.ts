import type { Router } from "vitepress";
import type { App, InjectionKey } from "vue";
import type { Zoom } from "medium-zoom";

import { inject, onMounted, watch, nextTick } from "vue";
import mediumZoom from "medium-zoom";

declare module "medium-zoom" {
  interface Zoom {
    refresh: (selector?: string) => void;
  }
}

const defaultSelector = ":not(a) > img:not(.image-src, .visitor, .vp-sponsor-grid-image)";

export const mediumZoomSymbol: InjectionKey<Zoom> = Symbol("medium-zoom");

export const createMediumZoomProvider = (app: App, router: Router) => {
  if (import.meta.env.SSR) {
    return;
  }

  const zoom = mediumZoom({
    margin: 24, // 图片放大后距离视口边界的距离 (默认 0)
    background: "#000", // 遮罩层背景色 (建议使用变量，见下方)
    scrollOffset: 40, // 向上滑动多少距离自动退出缩放 (默认 40)
    container: null, // 指定缩放容器，默认为 body
    template: null // 自定义 HTML 模板
  });
  zoom.refresh = (selector = defaultSelector) => {
    zoom.detach();
    zoom.attach(selector);
  };

  app.provide(mediumZoomSymbol, zoom);

  watch(
    () => router.route.path,
    () =>
      nextTick(() => {
        setTimeout(() => {
          zoom.refresh();
        }, 300);
      })
  );
};

export function useMediumZoom() {
  return onMounted(() => inject(mediumZoomSymbol)?.refresh());
}
