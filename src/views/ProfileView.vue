<script setup>
import {computed, onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import store from "@/store/index";
import api from "@/services/api/index";
import moment from "moment";
import {getUserImage} from "@/utils";
import LoadingWrapper from "@/components/LoadingWrapper.vue";
import NotFoundSection from "@/components/NotFoundSection.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


const route = useRoute();

const user = ref(null);
const userNotFound = ref(false);
const storeUser = store.getters["auth/user"];
const isCurrentUser = computed(() => storeUser?.slug === route.params.userSlug);

const informationData = computed(() => {
  return [
    {
      label: "Username",
      value: user.value?.username,
    },
    {
      label: "Email",
      value: user.value?.email,
    },
    {
      label: "Member since",
      value: moment(user.value?.date_joined).format('LLL'),
    },
    {
      label: "First name",
      value: user.value?.first_name,
    },
    {
      label: "Last name",
      value: user.value?.last_name,
    },
    {
      label: "About",
      value: user.value?.about,
    },
  ]
})

const loadUser = async (userSlug) => {
  try {
    return (await api.users.specificUser(userSlug)).data;
  } catch (error) {
    if (error.response.status === 404) {
      userNotFound.value = true;
    }
    console.error(error.response);
  }
}

const setUser = async (userSlug) => {
  if (isCurrentUser.value) {
    user.value = storeUser;
  } else {
    user.value = await loadUser(userSlug);
  }
}

onMounted(async () => {
  await setUser(route.params.userSlug);
})

onBeforeRouteUpdate(async (to, from, next) => {
  await setUser(to.params.userSlug);
  next()
})
</script>

<template>
  <not-found-section
      v-if="userNotFound"
      description="Oops... Looks like this profile has been deleted or doesn't exist."
  />
  <loading-wrapper v-else :is-loading="!user">
    <component-wrapper class="text-center">
      <img
          class="rounded-circle object-fit-cover mb-3"
          :src="getUserImage(user)"
          width="210"
          height="210"
          alt="user_image">
      <h1 class="text-truncate mb-0">{{ user.username }}</h1>
    </component-wrapper>
    <component-wrapper class="component-indentation">
      <ul class="row list-unstyled mb-0">
        <li
            v-for="(item, index) in informationData"
            :key="index"
            class="col-6 profile-list-item"
        >
          <h4 class="mb-4 fw-semibold">{{ item.label }}</h4>
          <h4 class="text-main-light text-truncate ps-1">{{ item.value || 'Not specified' }}</h4>
        </li>
      </ul>
    </component-wrapper>
  </loading-wrapper>
</template>

<style scoped lang="sass">
@import '@/assets/sass/main.sass'


.profile-list-item:not(:nth-last-child(-n+2))
  margin-bottom: 3rem
</style>