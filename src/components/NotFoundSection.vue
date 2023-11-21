<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";

defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
    default: "Looks like we couldn't find what you're looking for.",
  },
})


const emojis = [
  "(o^^)o",
  "(>_<)",
  "(≥o≤)",
  "(·_·)",
  "(;-;)",
  "\\(^Д^)/",
  "(^-^*)",
  "(˚Δ˚)b",
]

function getRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}

</script>

<template>
  <component-wrapper>
    <div class="text-center min-vh-100">
      <div class="error-emoji mb-3">{{ getRandomEmoji() }}</div>
      <h2 v-if="title" class="text-main">{{ title }}</h2>
      <p class="mb-0 fw-semibold fs-4">{{ description }}</p>
    </div>
  </component-wrapper>
</template>

<style scoped lang="sass">
@import '@/assets/sass/main'
@import 'bootstrap/scss/bootstrap'


.error-emoji
  font-size: 140px
  font-weight: 600

.magnifying-glass-img
  width: 100px

@media (width < map-get($grid-breakpoints, xl))
  .magnifying-glass-img
    width: 85px

@media (width < map-get($grid-breakpoints, lg))
  .magnifying-glass-img
    width: 75px
</style>