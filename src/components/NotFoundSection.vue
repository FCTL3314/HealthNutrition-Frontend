<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {useRouter} from "vue-router";


defineProps({
  description: {
    type: String,
    default: "Oops... Looks like we couldn't find what you're looking for.",
  },
  showGoBackButton: {
    type: Boolean,
    default: true,
  }
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