<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import PlaceholderImg from "@/components/placeholders/PlaceholderImg.vue";
</script>

<template>
  <component-wrapper class="common-rounding card">
    <placeholder-img classes="card-img-responsive card-img-wrp"/>
    <div class="card-body">
      <h5 class="h5 card-title placeholder-glow">
        <span class="placeholder placeholder-lg col-6 bg-primary"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-4"></span>
        <span class="placeholder col-4"></span>
        <span class="placeholder col-5"></span>
        <span class="placeholder col-8"></span>
        <span class="placeholder col-5"></span>
        <span class="placeholder col-5"></span>
      </p>
      <slot name="card-bottom"></slot>
    </div>
  </component-wrapper>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/main"
@import "@/assets/sass/cards"
@import "@/assets/sass/placeholders"
</style>