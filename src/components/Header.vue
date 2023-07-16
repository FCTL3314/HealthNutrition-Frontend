<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const navItems = [
  {
    path: '/',
    name: 'Categories',
  },
  {
    path: '/comparisons',
    name: 'My Comparisons',
  },
  {
    path: 'https://github.com/FCTL3314/StoreTracker',
    name: 'GitHub',
  },
  {
    path: '#about',
    name: 'About',
  },
];

const isNavItemActive = (navItem) => route.path === navItem.path;
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top shadow-sm p-3">
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
              v-for="(item, index) in navItems"
              :key="index"
              class="nav-item"
          >
            <a
                class="nav-link nav-link-action"
                :class="isNavItemActive(item) ? 'active' : 'link-dark'"
                :href="item.path"
            >
              {{ item.name }}
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
.logo
  @extend .text-main
  font-size: 18px
  transition-duration: 0.2s
  cursor: default

.logo:hover
  color: $color-main-light !important

.nav-underline .nav-link.active
  color: $primary !important

.nav-link-action
  transition: transform 0.1s

.nav-link-action:hover,
.nav-link-action:focus
  transform: scale(1.05)
  color: $primary !important

.sign-up-btn
  font-size: 14px
  font-weight: bold
  padding: .8em 2em
  border-radius: 1.9em
  transition: transform 0.1s

.sign-up-btn:hover
  transform: scale(1.025)

@media (width < map-get($grid-breakpoints, lg))
  ul.nav:not(:last-child)
    margin-bottom: 20px

  ul.nav
    flex-direction: column

  li.nav-item
    width: max-content
</style>