<template>
  <div class="text-center pt-5">
    <h1 class="text-main">404 Not Found</h1>
    <hr>
    <img
        class="text-main magnifying-glass-img"
        src="@/assets/icons/magnifying-glass.svg"
        alt="magnifying-glass"
    >
    <h4>Looks like we couldn't find what you're looking for. </h4>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/main'
@import 'bootstrap/scss/bootstrap'

.magnifying-glass-img
  width: 100px

@media (width < map-get($grid-breakpoints, xl))
  .magnifying-glass-img
    width: 85px

@media (width < map-get($grid-breakpoints, lg))
  .magnifying-glass-img
    width: 75px
</style>