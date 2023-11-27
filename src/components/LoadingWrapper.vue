<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  }
})
</script>

<template>
  <component-wrapper v-if="isLoading" class="loading component-indentation-y">
    <div class="spinner-border spinner-border-lg" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="fs-4 text-main-light">Loading, please wait...</p>
  </component-wrapper>
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