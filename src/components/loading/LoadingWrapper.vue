<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import LoadingSpinner from "@/components/loading/LoadingSpinner.vue";

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  }
})
</script>

<template>
  <component-wrapper v-if="isLoading" class="loading component-indentation-y">
    <loading-spinner text="Loading, please wait..." size="lg"/>
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