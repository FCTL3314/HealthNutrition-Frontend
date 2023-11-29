<script setup>
import PlusIcon from "@/components/icons/PlusIcon.vue";
</script>

<template>
  <button
      type="button"
      class="btn btn-save"
      data-bs-toggle="modal"
      data-bs-target="#saveProductModal"
  >
    <plus-icon :width="24" :height="24"/>
    <span class="fw-semibold">Save</span>
  </button>
</template>

<style scoped lang="sass">

</style>