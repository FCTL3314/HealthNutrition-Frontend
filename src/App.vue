<script setup>
import {RouterView} from "vue-router";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
</script>

<template>
  <div class="headed-indentation">
    <header-section/>
  </div>
  <div class="container position-relative">
    <RouterView/>
  </div>
  <div class="footer-indentation">
    <footer-section/>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/variables'


body
  font-family: 'Quicksand', 'sans-serif' !important
  background-color: $color-pink-light !important

.headed-indentation
  margin: 0.75rem 0.75rem $between-components-indentation 0.75rem !important

.footer-indentation
  margin: $between-components-indentation 0.75rem 0.75rem 0.75rem !important
</style>
