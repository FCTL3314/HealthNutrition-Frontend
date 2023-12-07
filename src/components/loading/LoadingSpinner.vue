<script setup>
defineProps({
  text: {
    type: String,
  },
  colorClass: {
    type: String,
    default: "text-main-light",
  },
  size: {
    type: Number,
    default: 16
  }
})
</script>

<template>
  <div
      class="spinner-border"
      :class="colorClass"
      :style="{height: `${size}px`, width: `${size}px`}"
      role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
  <p v-if="text" class="fs-5 text-main-light">{{ text }}</p>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>