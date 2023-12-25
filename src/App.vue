<script setup>
import {RouterView} from "vue-router";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import {onMounted} from "vue";
import {getEventBackgroundClass} from "@/services/holidayEvents";


onMounted(() => {
  const eventBackgroundClass = getEventBackgroundClass()
  document.body.classList.add(eventBackgroundClass);
})
</script>

<template>
  <div id="header" class="header-indentation">
    <header-section/>
  </div>
  <div class="container min-vh-100 position-relative">
    <RouterView/>
  </div>
  <div id="footer" class="footer-indentation">
    <footer-section/>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/events'
@import '@/assets/sass/variables'


body
  font-family: 'Quicksand', 'sans-serif' !important
  background-color: $color-pink-light !important

.header-indentation
  margin: 0.75rem 0.75rem $between-components-indentation 0.75rem !important

.footer-indentation
  margin: $between-components-indentation 0.75rem 0.75rem 0.75rem !important
</style>