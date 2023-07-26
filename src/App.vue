<script setup>
import {RouterView} from 'vue-router';
import {onBeforeMount} from "vue";
import {useStore} from 'vuex';
import {getAuthStorage} from "@/services/auth";
import ContentWrapper from '@/components/ContentWrapper.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import FooterSection from '@/components/FooterSection.vue';


const store = useStore()

function initializeAuth() {
  const storage = getAuthStorage()

  const accessToken = storage.getItem('accessToken')
  const refreshToken = storage.getItem('refreshToken')
  const user = JSON.parse(storage.getItem('user'))
  if (user) {
    store.commit('auth/setUser', user)
  }
  if (accessToken) {
    store.commit('auth/setAccessToken', accessToken)
  }
  if (refreshToken) {
    store.commit('auth/setRefreshToken', refreshToken)
  }
}


onBeforeMount(() => {
  initializeAuth()
})

</script>

<template>
  <header-section/>
  <content-wrapper>
    <RouterView/>
  </content-wrapper>
  <footer-section/>
</template>
