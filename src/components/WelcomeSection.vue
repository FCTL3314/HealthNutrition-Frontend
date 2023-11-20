<template>
  <div class="search-wrapper text-center mx-auto">
    <h1 class="text-main">HealthNutrition</h1>
    <p class="fs-4">
      Explore, compare, and nourish better! Discover, plan, and compare food for a healthier lifestyle.
      Begin your wellness journey here.
    </p>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import 'bootstrap/scss/bootstrap'

.search-wrapper
  width: 75%

@media (width < map-get($grid-breakpoints, lg))
  .search-wrapper
    width: 85%
</style>