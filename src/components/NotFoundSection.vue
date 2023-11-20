<script setup>
defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
    default: "Looks like we couldn't find what you're looking for.",
  },
})
</script>

<template>
  <div class="text-center min-vh-100">
    <img
        class="text-main magnifying-glass-img mb-3"
        src="@/assets/icons/magnifying-glass.svg"
        alt="magnifying-glass"
        width="100"
        height="100"
    >
    <h2 v-if="title" class="text-main">{{ title }}</h2>
    <h4>{{ description }}</h4>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/main'
@import 'bootstrap/scss/bootstrap'

.magnifying-glass-img
  width: 100px

@media (width < map-get($grid-breakpoints, xl))
  .magnifying-glass-img
    width: 85px

@media (width < map-get($grid-breakpoints, lg))
  .magnifying-glass-img
    width: 75px
</style>