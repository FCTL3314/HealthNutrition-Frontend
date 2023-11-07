<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  }
})
</script>

<template>
  <div v-if="isLoading" class="loading">
    <div class="spinner-border spinner-border-lg" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="fs-4 text-main-light">Loading</p>
  </div>
  <slot v-else></slot>
</template>

<style scoped lang="sass">
@import "@/assets/sass/variables"


.loading
  text-align: center
  padding: 6em 0 0 0
  color: $color-main-light

.spinner-border
  &-lg
    width: 3rem
    height: 3rem
</style>