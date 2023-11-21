<script setup>
import api from "@/services/api/index";
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {calculateTotalPages, replaceURLParams, scrollToElement} from "@/utils";
import SearchSection from "@/components/SearchSection.vue";
import CategoryCard from "@/components/cards/category/CategoryCard.vue";
import CategoryCardPlaceholder from "@/components/cards/category/CategoryCardPlaceholder.vue";
import PaginationSection from "@/components/PaginationSection.vue";
import NotFoundSection from "@/components/NotFoundSection.vue";
import {CATEGORIES_PAGINATE_BY} from "@/constants";
import WelcomeSection from "@/components/WelcomeSection.vue";


const route = useRoute();
const router = useRouter();

const categories = ref([]);
const categoriesCount = ref(0);

const currentPage = ref(parseInt(route.query.page || 1));
const totalPages = ref(0);
const isCategoriesLoading = ref(false);
const isNoCategories = computed(() => !categories.value.length & !isCategoriesLoading.value)

async function loadCategories(searchQuery = null) {
  isCategoriesLoading.value = true;
  try {
    return (
        await api.categories.categories(currentPage.value, searchQuery || route.query.search)
    ).data;
  } catch (error) {
    console.error(error.response);
  } finally {
    isCategoriesLoading.value = false;
  }
}

async function updateCategories(searchQuery = null) {
  if (searchQuery) {
    currentPage.value = 1;
    await replaceURLParams(router, route, {page: 1});
  }
  const response = await loadCategories(searchQuery);
  categories.value = response.results;
  categoriesCount.value = response.count;
  totalPages.value = calculateTotalPages(response.count, CATEGORIES_PAGINATE_BY);
}

const searchComponentRef = ref(null);

async function onPageChange(page) {
  currentPage.value = page;
  await replaceURLParams(router, route, {page: page});
  scrollToElement(searchComponentRef.value.$el);
  await updateCategories();
}

onMounted(async () => {
  await updateCategories();
});
</script>

<template>
  <welcome-section class="my-4"/>
  <div class="my-4">
    <search-section
        class="mb-3"
        ref="searchComponentRef"
        @search-button-click="updateCategories"
    />
    <div class="row">
      <div
          v-if="!isCategoriesLoading"
          v-for="category in categories"
          :key="category.id"
          class="col-lg-4 col-md-6 mb-3"
      >
        <category-card :category="category"/>
      </div>
      <div
          v-else
          v-for="_ in CATEGORIES_PAGINATE_BY"
          :key="_"
          class="col-lg-4 col-md-6 mb-3"
      >
        <category-card-placeholder/>
      </div>
    </div>
    <pagination-section
        v-if="!isNoCategories"
        :total-pages="totalPages"
        :current-page="currentPage"
        @page-changed="onPageChange"
    />
  </div>
  <not-found-section v-if="isNoCategories"/>
</template>

<style lang="sass">

</style>