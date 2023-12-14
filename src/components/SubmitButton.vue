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
  showLoading: {
    type: Boolean,
    required: true,
  },
  isDisabled: {
    type: Boolean,
  },
})
</script>

<template>
  <button
      class="btn btn-outline-primary-rounded px-4"
      style="width: max-content"
      :class="{disabled: isDisabled || showLoading}"
      type="submit"
  >
    <template v-if="showLoading">
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
