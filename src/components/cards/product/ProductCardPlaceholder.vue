<script setup>
import CardPlaceholder from "@/components/cards/CardPlaceholder.vue";

const getBGColorClass = () => Math.random() >= 0.5 ? "bg-success" : "bg-danger";
</script>

<template>
  <card-placeholder>
    <template v-slot:card-bottom>
      <p class="card-text placeholder-glow mb-1">
        <span class="placeholder col-12 bg-primary"></span>
      </p>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7 bg-warning"></span>
        <span class="placeholder col-1" :class="getBGColorClass()"></span>
        <span class="placeholder col-6 bg-success"></span>
        <span class="placeholder col-1" :class="getBGColorClass()"></span>
        <span class="placeholder col-8 bg-danger"></span>
        <span class="placeholder col-1" :class="getBGColorClass()"></span>
        <span class="placeholder col-7 bg-primary"></span>
        <span class="placeholder col-1" :class="getBGColorClass()"></span>
      </p>
    </template>
  </card-placeholder>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/main"
@import "@/assets/sass/cards"
@import "@/assets/sass/placeholders"
</style>