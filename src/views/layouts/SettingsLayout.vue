<script setup>
import {computed} from "vue";
import {getUserImage} from "@/utils";
import {logoutWithFlush} from "@/services/auth";
import {useStore} from "vuex";
import HouseFillIcon from "@/components/icons/HouseFillIcon.vue";
import EnvelopeFillIcon from "@/components/icons/EnvelopeFillIcon.vue";
import KeyFillIcon from "@/components/icons/KeyFillIcon.vue";
import CollectionFill from "@/components/icons/CollectionFill.vue";
import DoorOpenIcon from "@/components/icons/DoorOpenIcon.vue";
import {useRoute} from "vue-router";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import SecurityWarningBlock from "@/components/settings/SecurityWarningBlock.vue";


const route = useRoute();
const store = useStore();

const user = computed(() => store.getters['auth/user']);

const settingsTabs = [
  {
    name: "Account",
    routeName: "accountSettingsTab",
    icon: HouseFillIcon,
  },
  {
    name: "Email",
    routeName: "emailSettingsTab",
    icon: EnvelopeFillIcon,
  },
  {
    name: "Password",
    routeName: "passwordSettingsTab",
    icon: KeyFillIcon,
  },
  {
    name: "Products",
    routeName: "productsSettingsTab",
    icon: CollectionFill,
  },
];

const isSettingsTabActive = (settingTab) => route.name === settingTab.routeName;
</script>

<template>
  <div class="row component-indentation-y min-vh-100 justify-content-center">
    <div class="settings-tabs col-xxl-3 col-xl-4 col-lg-4">
      <component-wrapper>
        <div class="text-center mb-3">
          <img
              class="rounded-circle object-fit-cover"
              :src="getUserImage(user)"
              width="192"
              height="192"
              alt="profile-image"
          >
          <div class="mt-1">
            <h2 class="text-truncate">{{ user.username }}</h2>
          </div>
        </div>
        <div class="list-group rounded-top-2 rounded-bottom-2 ">
          <router-link
              class="list-group-item list-group-item-action rounded-4 mb-3 border-1"
              :class="{'list-group-item-primary': isSettingsTabActive(settingsTab)}"
              :to="{name: settingsTab.routeName}"
              v-for="(settingsTab, index) in settingsTabs"
              :key="index"
          >
            <component class="me-2" :is="settingsTab.icon"/>
            <span>{{ settingsTab.name }}</span>
          </router-link>
          <button
              class="list-group-item list-group-item-danger list-group-item-action rounded-4 border-1"
              @click="logoutWithFlush"
          >
            <door-open-icon class="me-2"/>
            <span>Logout</span>
          </button>
        </div>
      </component-wrapper>
    </div>
    <div class="col-xxl-9 col-xl-8 col-lg-8">
      <security-warning-block class="mb-3"/>
      <component-wrapper>
        <div class="justify-content-center">
          <router-view/>
        </div>
      </component-wrapper>
    </div>
  </div>
</template>

<style lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/variables"
@import "bootstrap/scss/bootstrap"


.list-group-item-primary:active,
.list-group-item-primary:hover,
.list-group-item-primary:focus
  color: $primary-text-emphasis !important
  background-color: $primary-bg-subtle !important

@media (width < map-get($grid-breakpoints, lg))
  .settings-tabs
    margin-bottom: $between-comments-indentation

</style>