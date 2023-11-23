<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {BACKEND_ADMIN_URL, BACKEND_REPOSITORY_URL, FRONTEND_REPOSITORY_URL} from '@/constants'
import {getUserImage, scrollToBottom} from "@/utils";
import HouseIcon from "@/components/icons/HouseIcon.vue";
import PenIcon from "@/components/icons/PenIcon.vue";
import GearIcon from "@/components/icons/GearIcon.vue";
import DoorOpenIcon from "@/components/icons/DoorOpenIcon.vue";
import {logoutWithFlush} from "@/services/auth";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


const route = useRoute();
const store = useStore();

const user = computed(() => store.getters['auth/user']);

const profileRoute = computed(() => {
  return {name: 'profile', params: {userSlug: user.value?.slug}};
})

const navItems = [
  {
    name: "Categories",
    routeName: "categories",
    to: {name: "categories"},
  },
  {
    name: "Comparisons",
    routeName: "comparisons",
    to: {name: "categories"}
  },
  {
    name: "Profile",
    routeName: "profile",
    to: user.value ? profileRoute.value : {name: 'logIn'},
  },
];

const isNavItemActive = (navItem) => route.name === navItem.routeName;
</script>

<template>
  <component-wrapper>
    <nav class="navbar navbar-expand-xl p-0">
      <div class="container-fluid">
    <span class="logo navbar-brand d-flex align-items-center mb-1">
      <img
          class="img-fluid"
          src="@/assets/icons/logo.png"
          alt="logo"
      >
      <span class="fs-4">HealthNutrition</span>
    </span>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav nav-underline me-auto">
            <li
                v-for="(navItem, index) in navItems"
                :key="index"
                class="nav-item"
            >
              <router-link
                  class="nav-link link-dark nav-link-action"
                  :class="{'active': isNavItemActive(navItem)}"
                  :to="navItem.to"
              >
                {{ navItem.name }}
              </router-link>
            </li>
            <li class="nav-item">
              <a
                  :href="FRONTEND_REPOSITORY_URL"
                  class="nav-link nav-link-action link-dark"
                  target="_blank"
              >
                Frontend Repository
              </a>
            </li>
            <li class="nav-item">
              <a
                  :href="BACKEND_REPOSITORY_URL"
                  class="nav-link nav-link-action link-dark"
                  target="_blank"
              >
                Backend Repository
              </a>
            </li>
            <li class="nav-item">
              <button type="button" @click="scrollToBottom" class="nav-link nav-link-action link-dark">
                About
              </button>
            </li>
          </ul>
          <div v-if="user" class="dropdown">
            <a
                class="dropdown-toggle link-dark text-decoration-none"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              <span class="dropdown-username">{{ user.username }}</span>
              <img
                  class="rounded-circle object-fit-cover mb-1 ms-1"
                  :src="getUserImage(user)"
                  alt="user-image"
                  width="36"
                  height="36"
              >
            </a>
            <component-wrapper class="dropdown-menu border-0 dropdown-menu-md-end dropdown-menu-sm-start">
              <li>
                <p class="text-center m-0">Menubar</p>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <router-link
                    :to="profileRoute"
                    class="dropdown-item inline-icon-text rounded-2"
                >
                  <house-icon/>
                  <span class="ps-1">Profile</span>
                </router-link>
              </li>
              <li>
                <router-link
                    :to="{name: 'accountSettingsTab'}"
                    class="dropdown-item inline-icon-text rounded-2"
                >
                  <pen-icon/>
                  <span class="ps-1">Settings & Privacy</span>
                </router-link>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <template v-if="user.is_staff">
                <li>
                  <a
                      :href="BACKEND_ADMIN_URL"
                      class="dropdown-item inline-icon-text rounded-2"
                      target="_blank"
                  >
                    <gear-icon/>
                    <span class="ps-1">Administration</span>
                  </a>
                </li>
                <li v-if="user.is_staff">
                  <hr class="dropdown-divider">
                </li>
              </template>
              <li>
                <button
                    @click="logoutWithFlush"
                    class="dropdown-item dropdown-item-logout inline-icon-text rounded-2"
                >
                  <door-open-icon/>
                  <span class="ps-1">Logout</span>
                </button>
              </li>
            </component-wrapper>
          </div>
          <ul v-else class="nav nav-underline align-items-center">
            <li class="nav-item">
              <router-link
                  :to="{name: 'logIn'}"
                  class="nav-link link-dark nav-link-action"
                  :class="{'active': isNavItemActive({routeName: 'logIn'})}"
              >
                Log In
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                  :to="{name: 'signUp'}"
                  class="btn btn-sign-up"
                  :class="isNavItemActive({routeName: 'signUp'}) ? 'active' : ''"
              >
                Sign Up
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </component-wrapper>
</template>

<style lang="sass" scoped>
@import 'bootstrap/scss/bootstrap'
@import '@/assets/sass/main'
@import '@/assets/sass/variables'

.shadow-bottom
  box-shadow: 0 0.025rem 1rem rgba(0, 0, 0, 0.075) !important

.logo
  @extend .text-main
  font-size: 18px
  transition-duration: 0.3s
  cursor: default

.logo:hover
  color: $color-main-lighter !important

.nav-underline .nav-link.active
  color: $primary !important

.nav-link-action
  transition: transform 0.1s

.nav-link-action:hover,
.nav-link-action:focus
  transform: scale(1.065)
  color: $primary !important

.dropdown-item
  &-logout
    color: $danger !important

  &-logout:active
    color: white !important
    background-color: $danger !important

.btn
  &-sign-up
    @extend .btn-primary
    font-size: 0.88em
    font-weight: bold
    padding: .8em 2em
    border-radius: 1.9em
    transition: 0.1s

  &-sign-up:hover
    background-color: $white
    color: $primary
    outline: 0.0002em solid $primary
    transform: scale(1.01)

.dropdown-username
  font-weight: 500


@media (width < map-get($grid-breakpoints, xl))
  ul.nav:not(:last-child)
    margin-bottom: 20px

  ul.nav
    flex-direction: column

  li.nav-item
    width: max-content
</style>