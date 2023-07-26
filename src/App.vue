<script setup>
import api from '@/api/index';
import {RouterView} from 'vue-router';
import {onBeforeMount, onMounted} from "vue";
import {useStore} from 'vuex';
import constants from '@/constants/index';
import ContentWrapper from '@/components/ContentWrapper.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';

const store = useStore()

async function getAccessToken() {
  try {
    const response = await api.users.refreshToken({
      refresh: store.getters["auth/refreshToken"],
    });
    localStorage.setItem("accessToken", response.data.access)
    store.commit('auth/setAccessToken', response.data.access)
  } catch (error) {
    console.error(error);
  }
}

onBeforeMount(() => {
  store.commit('auth/initializeStore')
})

onMounted(async () => {
  setInterval(async () => {
    await getAccessToken()
  }, constants.accessTokenLifeTime)
})
</script>

<template>
  <header-section/>
  <content-wrapper>
    <RouterView/>
  </content-wrapper>
  <footer-section/>
</template>
