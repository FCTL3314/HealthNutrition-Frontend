<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  }
})
</script>

<template>
  <div v-if="isLoading" class="loading py-4">
    <div class="spinner-border spinner-border-lg" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="fs-4 text-main-light">Loading, please wait...</p>
  </div>
  <slot v-else></slot>
</template>

<style scoped lang="sass">
@import "@/assets/sass/variables"


.loading
  text-align: center
  min-height: 100vh
  color: $color-main-light
  font-weight: bold

.spinner-border
  &-lg
    width: 3rem
    height: 3rem
</style>