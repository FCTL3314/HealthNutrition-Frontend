<script setup>
import {computed, onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import api from "@/services/api/index";
import moment from "moment";
import {getUserImage} from "@/utils";
import WrappedLoadingSpinner from "@/components/loading/WrappedLoadingSpinner.vue";
import ErrorSection from "@/components/ErrorSection.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {useStore} from "vuex";
import {createTitle} from "@/services/text";


const route = useRoute();
const store = useStore();

const user = ref(null);
const localUser = computed(() => store.getters["auth/user"]);

const isSlugMatchesLocalUserSlug = (slug) => {
  if (!localUser.value) {
    return false;
  }
  return slug === localUser.value?.slug;
}
const isUserNotFound = ref(false);

const loadUser = async (userSlug) => {
  try {
    return (await api.users.specificUser(userSlug)).data;
  } catch (error) {
    if (error.response.status === 404) {
      isUserNotFound.value = true;
    }
    console.error(error.response);
  }
}

async function setUser(userSlug) {
  if (isSlugMatchesLocalUserSlug(userSlug)) {
    user.value = localUser.value;
  } else {
    user.value = await loadUser(userSlug);
  }
}

const initials = computed(() => {
  let result = "";
  if (user.value?.firstName) {
    result += user.value?.firstName;
  }
  if (user.value?.lastName) {
    result += " " + user.value?.lastName;
  }
  return result;
})

const userFieldsToDisplay = computed(() => {
  return [
    {
      label: "Username",
      value: user.value?.username,
    },
    {
      label: "First name",
      value: user.value?.firstName,
    },
    {
      label: "Last name",
      value: user.value?.lastName,
    },
    {
      label: "Email",
      value: isSlugMatchesLocalUserSlug(route.params.userSlug) ? user.value?.email : 'Hidden',
    },
    {
      label: "Member since",
      value: moment(user.value?.dateJoined).format('LLL'),
    },
  ];
})


const setDocumentTitle = () => {
  user.value?.username
      ? document.title = createTitle(`${user.value.username}'s Profile`)
      : document.title = createTitle("Profile");
}

onMounted(async () => await setUser(route.params.userSlug).then(() => setDocumentTitle()))

onBeforeRouteUpdate(async (to, from, next) => {
  await setUser(to.params.userSlug).then(() => setDocumentTitle());
  next();
});
</script>

<template>
  <error-section
      v-if="isUserNotFound"
      description="Oops... Looks like this profile does not exist or has been deleted."
  />
  <wrapped-loading-spinner v-else :is-loading="!user">
    <component-wrapper class="component-indentation-y text-center">
      <img
          class="rounded-circle object-fit-cover mb-3"
          :src="getUserImage(user)"
          width="210"
          height="210"
          alt="userImage">
      <h1 class="text-truncate font-large mb-0">{{ user.username }}</h1>
      <h3 v-if="initials" class="text-secondary mb-0">{{ initials }}</h3>
    </component-wrapper>
    <component-wrapper
        v-if="user.profile.about"
        class="component-indentation-y"
    >
      <h2 class="text-main font-big text-center">About</h2>
      <p class="font-medium mb-0 text-break">{{ user.profile.about }}</p>
    </component-wrapper>
    <component-wrapper class="text-center">
      <h2 class="text-main font-big">Account Information</h2>
      <ul class="list-group list-group-flush text-start">
        <li
            v-for="(field, index) in userFieldsToDisplay"
            :key="index"
            class="list-group-item"
        >
          <h3 class="font-medium fw-semibold text-main-light text-truncate">
            {{ field.label }}:&nbsp;
          </h3>
          <p class="text-break font-standard mb-0">
            {{ field.value || 'Not specified' }}
          </p>
        </li>
      </ul>
    </component-wrapper>
  </wrapped-loading-spinner>
</template>

<style scoped lang="sass">
@import '@/assets/sass/main'


.list-group-item:not(:nth-last-child(-n + 1))
  margin-bottom: 1.5rem
</style>