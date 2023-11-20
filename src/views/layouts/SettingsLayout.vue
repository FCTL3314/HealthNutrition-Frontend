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
  <div class="row py-4 min-vh-100">
    <div class="col-lg-3">
      <div class="text-center">
        <img
            class="rounded-circle object-fit-cover"
            :src="getUserImage(user)"
            width="192"
            height="192"
            alt="profile-image"
        >
      </div>
      <div class="mt-1">
        <h2 class="text-center text-truncate">{{ user.username }}</h2>
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
    </div>
    <div class="col-lg-9">
      <div class="row justify-content-center">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import "@/assets/sass/main"
</style>