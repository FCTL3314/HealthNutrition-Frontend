<script setup>
import {useRoute} from 'vue-router';
import constants from '@/constants'

const route = useRoute();

const navItems = [
  {
    name: 'Categories',
    path: '/',
  },
  {
    name: 'My Comparisons',
    path: '/comparisons',
  },
  {
    name: 'Frontend Repository',
    path: constants.frontendRepositoryURL,
  },
  {
    name: 'Backend Repository',
    path: constants.backendRepositoryURL,
  },
  {
    name: 'About',
    path: '#footer',
  },
];

const isNavItemActive = (navItem) => route.path === navItem.path;
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
            <a
                class="nav-link nav-link-action"
                :class="isNavItemActive(navItem) ? 'active' : 'link-dark'"
                :href="navItem.path"
            >
              {{ navItem.name }}
            </a>
          </li>
        </ul>
        <ul class="nav nav-underline align-items-center">
          <li class="nav-item">
            <a href="#" class="nav-link nav-link-action">Log In</a>
          </li>
          <li class="nav-item">
            <a href="#" class="btn btn-primary sign-up-btn">Sign Up</a>
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

.sign-up-btn
  font-size: 0.88em
  font-weight: bold
  padding: .8em 2em
  border-radius: 1.9em
  transition: 0.1s

.sign-up-btn:hover
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