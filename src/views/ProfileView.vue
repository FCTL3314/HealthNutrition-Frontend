<script setup>
import {computed, onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import api from "@/services/api/index";
import moment from "moment";
import {createTitle, getUserImage} from "@/utils";
import LoadingWrapper from "@/components/loading/LoadingWrapper.vue";
import NotFoundSection from "@/components/NotFoundSection.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


const route = useRoute();

const user = ref(null);
const userMe = computed(async () => {
  try {
    return (await api.users.me()).data;
  } catch (error) {
    console.error(error);
  }
})
const isCurrentUser = computed(async () => {
  try {
    return (await userMe.value).slug === route.params.userSlug;
  } catch (error) {
    return false;
  }
});

const userNotFound = ref(false);

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
  if (await isCurrentUser.value) {
    user.value = await userMe.value;
  } else {
    user.value = await loadUser(userSlug);
  }
}

const initials = computed(() => {
  let result = "";
  if (user.value?.first_name) {
    result += user.value?.first_name;
  }
  if (user.value?.last_name) {
    result += " " + user.value?.last_name;
  }
  return result;
})

const informationFields = computed(() => {
  return [
    {
      label: "Username",
      value: user.value?.username,
    },
    {
      label: "Email",
      value: isCurrentUser.value ? user.value?.email : 'Hidden',
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
  ];
})


onMounted(async () => {
  await setUser(route.params.userSlug)
      .then(() => {
        document.title = createTitle(`${user.value.username} Profile`);
      });
})

onBeforeRouteUpdate(async (to, from, next) => {
  await setUser(to.params.userSlug);
  next();
})
</script>

<template>
  <not-found-section
      v-if="userNotFound"
      description="Oops... Looks like this profile does not exist or has been deleted."
  />
  <loading-wrapper v-else :is-loading="!user">
    <component-wrapper class="component-indentation-y text-center">
      <img
          class="rounded-circle object-fit-cover mb-3"
          :src="getUserImage(user)"
          width="210"
          height="210"
          alt="user_image">
      <h1 class="text-truncate mb-0">
        {{ user.username }}
      </h1>
      <h3 v-if="initials" class="text-secondary mb-0">{{ initials }}</h3>
    </component-wrapper>
    <component-wrapper
        v-if="user.about"
        class="component-indentation-y text-center"
    >
      <h2 class="text-main">About</h2>
      <p class="fs-4 mb-0 text-break">{{ user.about }}</p>
    </component-wrapper>
    <component-wrapper class="text-center">
      <h2 class="text-main">Account Information</h2>
      <ul class="list-group list-group-flush text-start">
        <li
            v-for="(field, index) in informationFields"
            :key="index"
            class="list-group-item mb-3"
        >
          <h3 class="fw-semibold text-main-light text-truncate">
            {{ field.label }}:&nbsp;
          </h3>
          <h4 class="text-break mb-0">
            {{ field.value || 'Not specified' }}
          </h4>
        </li>
      </ul>
    </component-wrapper>
  </loading-wrapper>
</template>

<style scoped lang="sass">
@import '@/assets/sass/main'


.profile-list-item:not(:nth-last-child(-n+2))
  margin-bottom: 3rem
</style>