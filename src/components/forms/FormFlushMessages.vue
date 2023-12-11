<script setup>
defineProps({
  flushClass: {
    type: String,
    default: "alert-warning",
  },
  errorMessages: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <div
      v-if="errorMessages.length"
      class="alert common-rounding"
      :class="flushClass"
      role="alert"
  >
    <ul class="error-list">
      <li
          v-for="(message, index) in errorMessages"
          :key="index"
      >
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/forms'
</style>