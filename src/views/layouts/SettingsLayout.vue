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
    <div class="settings-tabs col-xxl-3 col-xl-4 col-lg-4 p-0">
      <component-wrapper>
        <div class="text-center">
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
        <hr>
        <div class="list-group rounded-top-2 rounded-bottom-2 ">
          <router-link
              class="list-group-item list-group-item-action"
              :class="{'list-group-item-primary pe-none': isSettingsTabActive(settingsTab)}"
              :to="{name: settingsTab.routeName}"
              v-for="(settingsTab, index) in settingsTabs"
              :key="index"
          >
            <component class="me-2" :is="settingsTab.icon"/>
            <span>{{ settingsTab.name }}</span>
          </router-link>
        </div>
        <hr>
        <div class="text-center inline-icon-text justify-content-center">
          <a
              class="btn btn-outline-danger"
              @click="logoutWithFlush"
          >
            <door-open-icon class="me-2"/>
            <span>Logout</span>
          </a>
        </div>
      </component-wrapper>
    </div>
    <component-wrapper class="col-xxl-8 col-xl-7 col-lg-7">
      <div class="justify-content-center">
        <router-view/>
      </div>
    </component-wrapper>
  </div>
</template>

<style lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/variables"
@import "bootstrap/scss/bootstrap"


.settings-tabs
    margin-right: $between-comments-indentation

@media (width < map-get($grid-breakpoints, lg))
  .settings-tabs
    margin-right: 0
    margin-bottom: $between-comments-indentation

</style>