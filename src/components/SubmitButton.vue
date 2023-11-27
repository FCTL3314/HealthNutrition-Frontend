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
})
</script>

<template>
  <button
      class="btn btn-outline-primary px-4"
      style="width: max-content"
      :class="{disabled: vuelidateData?.$invalid || isResponseWaiting}"
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
