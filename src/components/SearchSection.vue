<script setup>
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {replaceURLParams} from "@/utils";


const route = useRoute();
const router = useRouter();

const emits = defineEmits(["searchButtonClick"])

const searchQuery = ref(route.query.search || "");
const searchButtonText = ref(route.name === "categories" ? "Search Categories" : "Search Products")
const searchInputPlaceholderText = computed(() => {
  return `Enter a query to search for ${"categories" ? "categories" : "products"}...`
})

const updateURLSearchParam = async (value) => {
  await replaceURLParams(router, route, {search: value});
}

const onSearchButtonClick = async () => {
  await updateURLSearchParam(searchQuery.value);
  emits("searchButtonClick", searchQuery.value);
}
</script>

<template>
  <div class="search-wrapper text-center mx-auto">
    <h1 class="text-main">HealthNutrition</h1>
    <p class="fs-4">
      Explore, compare, and nourish better! Discover, plan, and compare food for a healthier lifestyle.
      Begin your wellness journey here.
    </p>
    <form
        @submit.prevent="onSearchButtonClick"
        role="search"
    >
      <div class="row">
        <div class="search-input col-lg-9">
          <div class="input-group">
            <input
                v-model="searchQuery"
                class="form-control"
                type="search"
                :placeholder="searchInputPlaceholderText"
                autocomplete="off"
                required=""
            >
          </div>
        </div>
        <button
            class="col-lg-3 col-md-4 col-sm-4 btn btn-outline-primary"
            type="submit"
        >
          {{ searchButtonText }}
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