<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";


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
  <component-wrapper>
    <div class="text-center">
      <h1 class="text-main">{{ title }}</h1>
      <p class="fs-4 mb-0">{{ description }}</p>
    </div>
  </component-wrapper>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
</style>
