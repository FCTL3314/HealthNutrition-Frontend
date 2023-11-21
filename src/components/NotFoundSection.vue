<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {useRouter} from "vue-router";

defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
    default: "Oops... Looks like we couldn't find what you're looking for.",
  },
})


const router = useRouter();

const emojis = [
  "(o^^)o",
  "(>_<)",
  "(≥o≤)",
  "(;-;)",
  "(^-^*)",
]

function getRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}


function onGoBackClick() {
  router.go(-1);
}

</script>

<template>
  <component-wrapper>
    <div class="text-center min-vh-100">
      <div class="error-emoji mb-3">{{ getRandomEmoji() }}</div>
      <h2 v-if="title" class="text-main">{{ title }}</h2>
      <p class="mb-3 fw-semibold fs-4">{{ description }}</p>
      <button
          class="btn btn-dark to-main-btn"
          @click="onGoBackClick"
      >
        Go back
      </button>
    </div>
  </component-wrapper>
</template>

<style scoped lang="sass">
@import '@/assets/sass/main'
@import '@/assets/sass/variables'
@import 'bootstrap/scss/bootstrap'


.to-main-btn
  border-radius: $component-rounding
  padding: 1rem 3rem
  font-weight: 500


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