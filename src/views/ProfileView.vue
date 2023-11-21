<script setup>
import {computed, onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import store from "@/store/index";
import api from "@/services/api/index";
import moment from "moment";
import {getUserImage} from "@/utils";
import LoadingWrapper from "@/components/LoadingWrapper.vue";
import NotFoundSection from "@/components/NotFoundSection.vue";


const route = useRoute();

const user = ref(null);
const userNotFound = ref(false);
const storeUser = store.getters["auth/user"];
const isCurrentUser = computed(() => storeUser?.slug === route.params.userSlug);

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
  <div class="">
    <not-found-section
        v-if="userNotFound"
        description="Oops... Looks like this profile has been deleted or doesn't exist."
    />
    <loading-wrapper v-else :is-loading="!user">
      <div class="container">
        <div class="row justify-content-center">

          <div class="row">
            <div class="text-center">
              <img
                  class="rounded-circle object-fit-cover"
                  :src="getUserImage(user)"
                  width="208"
                  height="208"
                  alt="user_image">
              <h1 class="my-3 text-truncate">{{ user.username }}</h1>
            </div>
          </div>

          <div class="row">
            <div class="container">

              <div>
                <h2>Information</h2>
                <hr class="mb-0">
                <ul class="row mt-4 list-unstyled">
                  <li class="col-6 profile-list-item">
                    <h4 class="mb-4 fw-semibold">Username</h4>
                    <h4 class="text-main-light text-truncate ps-1">{{ user.username }}</h4>
                  </li>
                  <li v-if="isCurrentUser" class="col-6 profile-list-item">
                    <div class="d-flex mb-4 align-items-start">
                      <h4 class="mb-0 me-1 fw-semibold">Email</h4>
                      <span>[<small class="text-main-light">Private</small>]</span>
                    </div>
                    <h4 class="text-main-light text-truncate ps-1">{{ user.email }}</h4>
                  </li>
                  <li class="col-6 profile-list-item">
                    <h3 class="mb-4 fw-semibold">Member since</h3>
                    <h4 class="text-main-light text-truncate ps-1">{{ moment(user.date_joined).format('LLL') }}</h4>
                  </li>
                </ul>
              </div>

              <div class="mt-5">
                <h2>About</h2>
                <hr class="mb-0">
                <ul class="row mt-4 list-unstyled">
                  <li class="col-6 profile-list-item">
                    <h4 class="mb-4 fw-semibold">First name</h4>
                    <h4 class="text-main-light text-truncate ps-1">
                      {{ user.first_name || 'Not specified' }}
                    </h4>
                  </li>
                  <li class="col-6 profile-list-item">
                    <h4 class="mb-4 fw-semibold">Last name</h4>
                    <h4 class="text-main-light text-truncate ps-1">
                      {{ user.last_name || 'Not specified' }}
                    </h4>
                  </li>
                  <li class="col-12 profile-list-item">
                    <h4 class="mb-4 fw-semibold">About me</h4>
                    <h4 class="text-main-light text-break ps-1">
                      {{ user.about || 'Not specified' }}
                    </h4>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </loading-wrapper>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/main.sass'

.profile-list-item:nth-of-type(3)
  margin-top: 50px
</style>