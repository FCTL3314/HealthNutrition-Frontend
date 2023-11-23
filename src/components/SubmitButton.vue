<script setup>
defineProps({
  text: {
    type: String,
    default: "Submit",
  },
  loadingText: {
    type: String,
    default: "Loading...",
  },
  isResponseWaiting: {
    type: Boolean,
    required: true,
  },
  vuelidateData: {
    type: Object,
  },
  columnWidth: {
    type: String,
    default: "3",
  },
})
</script>

<template>
  <button
      class="btn btn-outline-primary"
      :class="[{disabled: vuelidateData?.$invalid || isResponseWaiting}, `col-${columnWidth}`]"
      type="submit"
  >
    <template v-if="isResponseWaiting">
      <span
          class="spinner-border spinner-border-sm me-1"
          role="status"
          aria-hidden="true"
      />
      <span>{{ loadingText }}</span>
    </template>
    <span v-else>{{ text }}</span>
  </button>
</template>
