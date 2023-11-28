<script setup>
defineProps({
  text: {
    type: String,
  },
  size: {
    type: String,
    validator(value) {
      return value in ["lg", "sm"]
    }
  }
})
</script>

<template>
  <div class="spinner-border" :class="`spinner-border-${size}`" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <p v-if="text" class="fs-5 text-main-light">{{ text }}</p>
</template>

<style scoped lang="sass">

</style>