<script setup>
defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  colorHex: {
    type: String,
    default: "#A2A3A5",
  },
  classes: {
    type: String,
  }
})
</script>

<template>
  <svg
      class="bd-placeholder-img"
      :class="classes"
      :width="width"
      :height="height"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Placeholder"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
  >
    <rect width="100%" height="100%" :fill="colorHex"/>
  </svg>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/cards"
</style>