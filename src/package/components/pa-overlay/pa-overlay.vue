<template>
  <teleport :to="teleportTo || 'body'">
    <transition name="mo-dialog-overlay-fade">
      <div v-show="state.visible" class="pa-overlay" :class="props.class" :style="{ ...props.style, zIndex: zIndex }">
        <div class="pa-overlay-content" :style="{ opacity: useBlock ? 1 : 0 }" @click="closeOverlay"></div>
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, inject } from "vue";
import { PaOverlayType } from "./type";

const props = withDefaults(defineProps<PaOverlayType>(), {
  useBlock: true
});
const emits = defineEmits(["update:modelValue", "clickOverlay"]);
const getPaAnagerGlobalZIndex = inject("getPaAnagerGlobalZIndex") as () => number;
const zIndex = ref(getPaAnagerGlobalZIndex());

const state = reactive({
  visible: false
});

// #Function 关闭弹窗回调
function closeMenu() {
  emits("update:modelValue", false);
}

// #Function 关闭弹窗
function closeOverlay() {
  closeMenu();
  emits("clickOverlay");
}

defineExpose({ closeMenu });

watch(
  () => props.modelValue,
  data => {
    state.visible = data;
  },
  { immediate: true }
);
</script>

<style lang="scss">
@use "./index.scss";
</style>
