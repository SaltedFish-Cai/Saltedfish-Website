<template>
  <section class="m-icon" :class="props.class" @click="props.onClick">
    <!-- button ? 'button' : '',
        circle ? 'circle button' : '',
        highlight ? 'highlight' : '' -->
    <span v-if="!tip" :class="['m-iconfont', 'm-iconfont_icon', `icon-${name}`]"></span>
    <template v-else>
      <el-tooltip :content="tip"> <span class="m-iconfont m-iconfont_icon" :class="'icon-' + name"></span> </el-tooltip>
    </template>
  </section>
</template>

<script lang="ts" setup>
import MIconType from "./type";

// # Var
const props = withDefaults(defineProps<MIconType>(), {
  name: "magic_line"
});
</script>

<style lang="scss" scoped>
@use "./iconfont/iconfont.css";

.m-icon {
  display: inline-block;
  font-family: "iconfont";
}
.m-iconfont_icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: inherit;
  line-height: 1em;
}
</style>
