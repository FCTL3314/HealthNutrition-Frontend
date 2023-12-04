<script setup>
import {RouterView} from "vue-router";
import HeaderSection from "@/components/HeaderSection.vue";
import FooterSection from "@/components/FooterSection.vue";
import {computed, onMounted} from "vue";


const currentDate = new Date()
const currentMonth = currentDate.getMonth() + 1

const eventBackgroundClass = computed(() => {
  const monthEventBackgroundClassMap = {
    "12": "event-background-christmas",
    "1": "event-background-christmas",
  };
  return monthEventBackgroundClassMap[currentMonth];
})

onMounted(() => {
  document.body.classList.add(eventBackgroundClass.value);
})
</script>

<template>
  <div class="header-indentation">
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

.event-background
  background-repeat: repeat !important

  &-christmas
    background-image: url("@/assets/images/christmas-tiling.png") !important

.header-indentation
  margin: 0.75rem 0.75rem $between-components-indentation 0.75rem !important

.footer-indentation
  margin: $between-components-indentation 0.75rem 0.75rem 0.75rem !important
</style>