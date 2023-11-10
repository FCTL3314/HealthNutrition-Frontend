<script setup>
import {ref} from "vue";


const searchTypes = [
  {
    label: "Category",
    value: "category",
  },
  {
    label: "Product",
    value: "product",
  },
];
const selectedSearchType = ref("category");
const searchQuery = ref("");
</script>

<template>
  <div class="search-wrapper text-center mx-auto">
    <h1 class="text-main">HealthNutrition</h1>
    <p class="fs-4">
      Welcome to a hub for healthier choices. Discover, compare, and create personalized diets. Your go-to for
      nutritional insights. Let's build a healthier future, one bite at a time.
    </p>
    <form role="search" action="#" method="GET">
      <div class="row">
        <div class="search-input col-lg-9">
          <div class="input-group">
            <input
                v-model="searchQuery"
                class="form-control"
                type="search"
                placeholder="Enter a query to search for the item of your choice..."
                autocomplete="off"
                required=""
            >
          </div>
        </div>
        <div class="col-lg-3">
          <select v-model="selectedSearchType" class="form-select">
            <option
                :value="searchType.value"
                v-for="(searchType, index) in searchTypes"
                :key="index"
            >
              {{ searchType.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="row justify-content-center py-3">
        <button class="col-lg-3 col-md-4 col-sm-4 btn btn-outline-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import 'bootstrap/scss/bootstrap'

.search-wrapper
  width: 75%

@media (width < map-get($grid-breakpoints, lg))
  .search-input
    margin-bottom: .25rem

  .search-wrapper
    width: 85%
</style>