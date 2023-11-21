<script setup>
import {RouterView} from "vue-router";
import ContentWrapper from "@/components/ContentWrapper.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
</script>

<template>
  <div class="main-component">
    <header-section/>
  </div>
  <content-wrapper>
    <RouterView/>
  </content-wrapper>
  <div class="main-component">
    <footer-section/>
  </div>
</template>

<style lang="sass">
@import 'bootstrap/scss/bootstrap'
@import '@/assets/sass/variables'


body
  font-family: 'Quicksand', 'sans-serif'
  background-color: #f5f4fb

.main-component
  margin: 1rem 1rem
</style>
