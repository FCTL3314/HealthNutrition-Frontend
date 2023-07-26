<script setup>
import {RouterView} from 'vue-router';
import {onBeforeMount} from "vue";
import {useStore} from 'vuex';
import ContentWrapper from '@/components/ContentWrapper.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';

const store = useStore()

onBeforeMount(() => {
  store.commit('auth/initializeTokens')
})

</script>

<template>
  <header-section/>
  <content-wrapper>
    <RouterView/>
  </content-wrapper>
  <footer-section/>
</template>
