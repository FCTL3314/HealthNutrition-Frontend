<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
</script>

<template>
  <div>
    <component-wrapper class="card common-rounding">
      <div class="card-body d-flex align-items-center">
        <div class="card-title placeholder-glow mb-0 w-100">
          <span class="placeholder placeholder-lg col-5 bg-primary"></span>
          <span class="placeholder placeholder-sm col-4 bg-secondary"></span>
        </div>
        <svg
            class="bd-placeholder-img card-img-scale ms-auto"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
        >
          <rect width="100%" height="100%" fill="#868e96"></rect>
        </svg>
      </div>
    </component-wrapper>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/cards'
@import "@/assets/sass/placeholders"
</style>