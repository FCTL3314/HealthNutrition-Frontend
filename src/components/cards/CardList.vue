<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <div class="row justify-content-center">
      <div class="text-center py-3">
        <h2 class="text-main">
          {{ title }}
        </h2>
        <p class="fs-4">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="row">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
</style>