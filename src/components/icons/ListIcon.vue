<script setup>
defineProps({
  width: {
    type: Number,
    default: 16
  },
  height: {
    type: Number,
    default: 16
  },
})
</script>

<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      fill="currentColor"
      class="bi bi-list"
      viewBox="0 0 16 16"
  >
    <path
        fill-rule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
    />
  </svg>
</template>

<style scoped lang="sass">

</style>