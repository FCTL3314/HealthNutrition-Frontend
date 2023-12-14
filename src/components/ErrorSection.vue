<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {useRouter} from "vue-router";


const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
    default: "Oops... Looks like we couldn't find what you're looking for.",
  },
  showEmoji: {
    type: Boolean,
    default: true,
  },
  showSadEmoji: {
    type: Boolean,
    default: false,
  },
  showGoBackButton: {
    type: Boolean,
    default: true,
  }
})

const router = useRouter();

const funnyEmojis = [
  "(o^^)o",
  "(^-^*)",
  "(^_^)b",
  "\\(^_^)/",
]

const sadEmojis = [
  "(>_<)",
  "(≥o≤)",
  "(;-;)",
  "\\(o_o)/",
]

function getRandomEmoji() {
  const emojis = props.showSadEmoji ? sadEmojis : funnyEmojis

  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}

function onGoBackClick() {
  router.go(-1);
}
</script>

<template>
  <component-wrapper class="text-center min-vh-100 d-flex justify-content-center">
    <div class="w-75">
      <div v-if="showEmoji" class="error-emoji mb-3">{{ getRandomEmoji() }}</div>
      <h1 class="text-main">{{ title }}</h1>
      <p class="mb-3 fw-semibold fs-4">{{ description }}</p>
      <button
          v-if="showGoBackButton"
          class="btn btn-dark-rounded"
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


.error-emoji
  font-size: 7em
  font-weight: 600
</style>