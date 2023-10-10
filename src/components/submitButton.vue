<script setup>
defineProps({
  title: {
    type: String,
    default: 'Submit',
  },
  loadingTitle: {
    type: String,
    default: 'Loading...',
  },
  isResponseWaiting: {
    type: Boolean,
    required: true,
  },
  vuelidateData: {
    type: Object,
  },
  columnWidth: {
    type: Number,
    default: 3,
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
      <span>{{ loadingTitle }}</span>
    </template>
    <span v-else>{{ title }}</span>
  </button>
</template>

<style scoped lang="sass">

</style>