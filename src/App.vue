<script setup>
import {RouterView} from 'vue-router';
import ContentWrapper from '@/components/ContentWrapper.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';
</script>

<template>
  <header-section/>
  <content-wrapper>
    <RouterView/>
  </content-wrapper>
  <footer-section/>
</template>
