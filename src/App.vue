<script setup>
import {RouterView} from 'vue-router';
import Content from '@/components/Content.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <Header/>
  <content>
    <RouterView/>
  </content>
  <Footer/>
</template>
