<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import PlaceholderImg from "@/components/placeholders/PlaceholderImg.vue";
</script>

<template>
  <div>
    <component-wrapper class="card">
      <div class="card-body p-0 centered-vertically">
        <placeholder-img width="18" height="18" classes="rounded-2 m-2"/>
        <div class="card-title placeholder-glow centered ms-2 me-auto mb-0 p-1 w-100">
          <span class="placeholder placeholder-lg col-5 bg-primary"/>
          <span class="placeholder placeholder-sm col-4 bg-secondary"/>
        </div>
        <placeholder-img width="20" height="20" classes="common-rounding"/>
      </div>
    </component-wrapper>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/main'
@import '@/assets/sass/cards'
@import "@/assets/sass/placeholders"
</style>