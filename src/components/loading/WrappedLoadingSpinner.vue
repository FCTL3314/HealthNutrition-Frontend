<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import LoadingSpinner from "@/components/loading/LoadingSpinner.vue";

defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  colorClass: {
    type: String,
    default: "text-main-light",
  },
})
</script>

<template>
  <template v-if="isLoading">
    <component-wrapper class="loading component-indentation-y" :class="colorClass">
      <loading-spinner
          :color-class="colorClass"
          text="Loading, please wait..."
          :size="32"
      />
    </component-wrapper>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/variables"


.loading
  text-align: center
  min-height: 100vh
  font-weight: bold

.spinner-border
  &-lg
    width: 3rem
    height: 3rem
</style>