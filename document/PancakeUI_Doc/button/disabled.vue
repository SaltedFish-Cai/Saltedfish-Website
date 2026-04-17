<template>
  <div class="mb-4">
    <pa-button iconName="star_arc_line" disabled :plain="false" type="primary">Primary</pa-button>
    <pa-button iconName="star_arc_line" disabled :plain="false" type="success">Success</pa-button>
    <pa-button iconName="star_arc_line" disabled :plain="false" type="info">Info</pa-button>
    <pa-button iconName="star_arc_line" disabled :plain="false" type="warning">Warning</pa-button>
    <pa-button iconName="star_arc_line" disabled :plain="false" type="danger">Danger</pa-button>
  </div>
</template>

<script lang="ts" setup></script>

<style>
.mb-4 {
  margin-bottom: 1rem;
}
</style>
