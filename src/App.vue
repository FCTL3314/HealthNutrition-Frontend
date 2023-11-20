<script setup>
import {RouterView} from "vue-router";
import ContentWrapper from "@/components/ContentWrapper.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
</script>

<template>
  <div class="main-component">
    <component-wrapper>
      <header-section/>
    </component-wrapper>
  </div>
  <content-wrapper>
    <RouterView/>
  </content-wrapper>
  <div class="main-component">
    <component-wrapper class="text-white" style="background-color: #14141c">
      <footer-section/>
    </component-wrapper>
  </div>
</template>

<style lang="sass">
@import 'bootstrap/scss/bootstrap'
@import '@/assets/sass/variables'


body
  font-family: 'Quicksand', 'sans-serif'
  background-color: #f5f4fb

.main-component
  margin: 1rem 3rem
</style>
