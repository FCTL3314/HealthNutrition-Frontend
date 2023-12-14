<script setup>
import {FRONTEND_REPOSITORY_URL} from "@/constants";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


const currentDate = new Date()
</script>

<template>
  <component-wrapper class="bg-purple-black">
    <footer
        id="footer"
        class="container text-center text-white"
    >
      <h3>About</h3>
      <p>
        The project is designed for educational purposes. The product information displayed may not precisely reflect
        their real-world values or compositions. The details provided are for learning purposes and might not entirely
        align with practical applications. The nutritional value of each product is calculated per 100 grams.
      </p>
      <hr class="divider border-2">
      <small>
        All rights reserved &copy; 2022 - {{ currentDate.getFullYear() }}
        <a
            :href="FRONTEND_REPOSITORY_URL"
            class="repository-link"
            target="_blank"
        >
          HealthNutrition
        </a>
      </small>
    </footer>
  </component-wrapper>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/variables'

.repository-link
  font-weight: 500
  color: $color-main-light
  text-decoration: none

.repository-link:hover
  color: $color-main-lighter
  text-decoration: underline
</style>