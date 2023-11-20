<script setup>
import {FRONTEND_REPOSITORY_URL} from "@/constants";


const currentDate = new Date()
</script>

<template>
  <footer id="footer">
    <div class="container text-center">
      <h3>About</h3>
      <p>
        The project is designed for educational purposes. The product information displayed may
        not precisely reflect their real-world values or compositions. The details provided are for learning purposes
        and might not entirely align with practical applications.
      </p>
      <hr class="divider border-2">
      <small>
        All rights reserved &copy; 2022 - {{ currentDate.getFullYear() }}
        <a
            :href="FRONTEND_REPOSITORY_URL"
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
  box-shadow: 0 -0.025rem 1rem rgba(0, 0, 0, 0.075) !important
</style>