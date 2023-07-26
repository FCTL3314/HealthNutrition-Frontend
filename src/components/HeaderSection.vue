<script setup>
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import constants from '@/constants'
import {scrollToBottom} from "@/utils";
import HouseIcon from '@/components/icons/HouseIcon.vue';
import PenIcon from '@/components/icons/PenIcon.vue';
import GearIcon from '@/components/icons/GearIcon.vue';
import DoorOpenIcon from '@/components/icons/DoorOpenIcon.vue';
import router from "@/router";

const route = useRoute();
const store = useStore();

const loggedIn = ref(!!store.getters['auth/accessToken'])
const user = ref(store.getters['auth/user'])

function logout() {
  store.commit('auth/removeAccessToken');
  store.commit('auth/removeRefreshToken')
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  router.push({name: 'login'})
}

const navItems = [
  {
    name: 'Categories',
    routeName: 'categories',
  },
  {
    name: 'My Comparisons',
    routeName: '',
  },
];

const isNavItemActive = (navItem) => route.name === navItem.routeName;
</script>

<template>
  <nav class="navbar navbar-expand-xl sticky-top shadow-bottom bg-white p-3">
    <div class="container-fluid px-4">
    <span class="logo navbar-brand d-flex align-items-center mb-1">
      <img
          class="img-fluid"
          src="@/assets/icons/logo.png"
          alt="logo"
      >
      <span class="fs-4">StoreTracker</span>
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
                class="nav-link nav-link-action"
                :class="isNavItemActive(navItem) ? 'active' : 'link-dark'"
                :to="{name: navItem.routeName}"
            >
              {{ navItem.name }}
            </router-link>
          </li>
          <li class="nav-item">
            <a
                :href="constants.FRONTEND_REPOSITORY_URL"
                class="nav-link nav-link-action link-dark"
                target="_blank"
            >
              Frontend Repository
            </a>
          </li>
          <li class="nav-item">
            <a
                :href="constants.BACKEND_REPOSITORY_URL"
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
        <div v-if="loggedIn && user" class="dropdown">
          <a
              class="dropdown-toggle link-dark text-decoration-none"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
          >
            <span>{{ user.username }}</span>
            <img
                class="rounded-circle object-fit-cover mb-1 ms-1"
                :src="user.image || '/src/assets/images/default_user.png'"
                alt="user-image"
                width="36"
                height="36"
            >
          </a>
          <ul class="dropdown-menu dropdown-menu-md-end dropdown-menu-sm-start">
            <li>
              <p class="text-center m-0">Menubar</p>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <a href="#" class="dropdown-item inline-icon-text">
                <house-icon/>
                <span class="ps-1">Profile</span>
              </a>
            </li>
            <li>
              <a href="#" class="dropdown-item inline-icon-text">
                <pen-icon/>
                <span class="ps-1">Settings & Privacy</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li v-if="user.is_staff">
              <a
                  :href="constants.DJANGO_ADMIN_URL"
                  class="dropdown-item inline-icon-text"
                  target="_blank"
              >
                <gear-icon/>
                <span class="ps-1">Administration</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <button @click="logout" class="dropdown-item inline-icon-text text-danger">
                <door-open-icon/>
                <span class="ps-1">Logout</span>
              </button>
            </li>
          </ul>
        </div>
        <ul v-else class="nav nav-underline align-items-center">
          <li class="nav-item">
            <router-link
                :to="{name: 'login'}"
                class="nav-link nav-link-action"
                :class="isNavItemActive({routeName: 'login'}) ? 'active' : 'link-dark'"
            >
              Log In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
                :to="{name: 'registration'}"
                class="btn btn-sign-up"
            >
              Sign Up
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="sass" scoped>
@import 'bootstrap/scss/bootstrap'
@import '@/assets/sass/main'
@import '@/assets/sass/variables'

.shadow-bottom
  box-shadow: 0 0.125rem 1rem rgba(0, 0, 0, 0.075) !important

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

@media (width < map-get($grid-breakpoints, xl))
  ul.nav:not(:last-child)
    margin-bottom: 20px

  ul.nav
    flex-direction: column

  li.nav-item
    width: max-content
</style>