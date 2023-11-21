<script setup>
import {RouterView} from "vue-router";
import ContentWrapper from "@/components/ContentWrapper.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
</script>

<template>
  <div class="headed-indentation">
    <header-section/>
  </div>
  <content-wrapper>
    <RouterView/>
  </content-wrapper>
  <div class="footer-indentation">
    <footer-section/>
  </div>
</template>

<style lang="sass">
@import 'bootstrap/scss/bootstrap'
@import '@/assets/sass/variables'


body
  font-family: 'Quicksand', 'sans-serif'
  background-color: $color-light

.headed-indentation
  margin: 1rem 1rem 1rem $between-components-indentation

.footer-indentation
  margin: $between-components-indentation 1rem 1rem 1rem
</style>
