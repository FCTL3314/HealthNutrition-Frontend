<script setup>
const isProfitable = Math.random() >= 0.5;
const bgPriceColorClass = isProfitable ? "bg-success" : "bg-danger"
</script>

<template>
  <div class="card h-100">
    <svg
        class="bd-placeholder-img card-img-scale"
        width="100%"
        height="260"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
    >
      <rect width="100%" height="100%" fill="#868e96"></rect>
    </svg>
    <div class="card-body">
      <h5 class="h5 card-title placeholder-glow">
        <span class="placeholder placeholder-lg col-12 bg-primary"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-8"></span>
        <span class="placeholder col-3"></span>
        <span class="placeholder col-7"></span>
        <span class="placeholder col-2"></span>
        <span class="placeholder col-8"></span>
        <span class="placeholder col-3"></span>
        <span class="placeholder col-8"></span>
        <span class="placeholder col-2"></span>
      </p>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-9 bg-primary"></span>
        <span class="placeholder col-7" :class="bgPriceColorClass"></span>
        <span class="placeholder col-6 bg-warning"></span>
        <span class="placeholder col-2" :class="bgPriceColorClass"></span>
        <span class="placeholder col-6 bg-primary"></span>
      </p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import "@/assets/sass/cards"
</style>