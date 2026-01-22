<script setup lang="ts">
import VPHomeHero from "./VPHomeHero.vue";
import VPHomeFeatures from "./VPHomeFeatures.vue";
import VPStar from "./VPStar.vue";
// import { useData } from "../composables/data";
// import VPImage from "./VPImage.vue";

// const { frontmatter: fm } = useData();
// const icon = fm.value.hero.image;
</script>

<template>
  <VPStar></VPStar>
  <!-- <div class="hover-background">
    <VPImage :image="icon" :alt="icon.alt" :height="icon.height || 48" :width="icon.width || 48"></VPImage>
  </div> -->
  <div class="VPHome">
    <slot name="home-hero-before" />
    <VPHomeHero>
      <template #home-hero-info-before><slot name="home-hero-info-before" /></template>
      <template #home-hero-info><slot name="home-hero-info" /></template>
      <template #home-hero-info-after><slot name="home-hero-info-after" /></template>
      <template #home-hero-actions-after><slot name="home-hero-actions-after" /></template>
      <template #home-hero-image><slot name="home-hero-image" /></template>
    </VPHomeHero>
    <slot name="home-hero-after" />

    <slot name="home-features-before" />
    <VPHomeFeatures />
    <slot name="home-features-after" />

    <Content />
  </div>
</template>

<style scoped>
.VPHome {
  margin-bottom: 96px;
}

@media (min-width: 768px) {
  .VPHome {
    margin-bottom: 128px;
  }
}
</style>
