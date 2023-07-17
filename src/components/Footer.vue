<template>
  <footer id="footer" class="bg-white shadow-top">
    <div class="container text-center py-4">
      <h3 class="text-main">About</h3>
      <p>
        The project serves educational purposes and is not intended for practical use. The products featured herein do
        not represent their actual value, description, or composition. The information provided is purely fictional and
        should not be relied upon for any real-world applications.
      </p>
      <hr class="divider border-2">
      <small>
        Copyright &copy; 2022 - 2023
        <a
            href="https://github.com/FCTL3314/ShopTracker"
            class="project-ref text-main-light"
            target="_blank"
        >
          StoreTracker
        </a>
      </small>
    </div>
  </footer>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/variables'

.project-ref
  font-weight: 600
  color: $color-main-light
  text-decoration: none

.project-ref:hover
  color: $color-main-lighter
  text-decoration: underline

.shadow-top
  box-shadow: 0 -0.125rem 1rem rgba(0, 0, 0, 0.075) !important
</style>