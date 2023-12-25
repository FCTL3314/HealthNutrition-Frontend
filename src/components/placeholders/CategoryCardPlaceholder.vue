<script setup>
import CommonCardWithImagePlaceholder from "@/components/cards/CommonCardWithImagePlaceholder.vue";
</script>

<template>
  <common-card-with-image-placeholder>
    <template v-slot:card-bottom>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7 bg-warning"></span>
        <span class="placeholder col-6 bg-success"></span>
        <span class="placeholder col-8 bg-danger"></span>
        <span class="placeholder col-7 bg-primary"></span>
      </p>
    </template>
  </common-card-with-image-placeholder>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/main"
@import "@/assets/sass/cards"
@import "@/assets/sass/placeholders"
</style>