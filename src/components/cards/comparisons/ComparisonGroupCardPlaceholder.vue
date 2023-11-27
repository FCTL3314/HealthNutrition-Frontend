<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
</script>

<template>
  <div>
    <component-wrapper class="card common-rounding">
      <div class="card-body">
        <div class="card-title placeholder-glow mb-0">
          <span class="placeholder placeholder-lg col-3 bg-primary"></span>
          <span class="placeholder placeholder-sm col-2 bg-secondary"></span>
        </div>
      </div>
    </component-wrapper>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/cards'
@import "@/assets/sass/placeholders"
</style>