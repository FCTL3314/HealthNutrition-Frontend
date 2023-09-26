<script setup>
import {computed} from "vue";
import {getUserImage} from "@/utils";
import {logoutWithFlush} from "@/services/auth";
import {useStore} from "vuex";
import HouseFillIcon from '@/components/icons/HouseFillIcon.vue';
import EnvelopeFillIcon from "@/components/icons/EnvelopeFillIcon.vue";
import KeyFillIcon from "@/components/icons/KeyFillIcon.vue";
import DoorOpenIcon from "@/components/icons/DoorOpenIcon.vue";

const store = useStore();
const user = computed(() => store.getters['auth/user']);

const settingsTabs = [
  {
    name: 'Account',
    routeName: 'accountSettingsTab',
    icon: HouseFillIcon,
  },
  {
    name: 'Email',
    routeName: 'emailSettingsTab',
    icon: EnvelopeFillIcon,
  },
  {
    name: 'Password',
    routeName: 'passwordSettingsTab',
    icon: KeyFillIcon,
  },
];
</script>

<template>
  <div class="row py-4">
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
        <a
            class="list-group-item list-group-item-action"
            href="#"
            v-for="(settingsTab, index) in settingsTabs"
            :key="index"
        >
          <component class="me-2" :is="settingsTab.icon"/>
          <span>{{ settingsTab.name }}</span>
        </a>
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