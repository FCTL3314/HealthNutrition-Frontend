<script setup>
import api from "@/services/api/index";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {calculateTotalPages, replaceURLParams, scrollToElement} from "@/utils";
import SearchSection from "@/components/SearchSection.vue";
import CategoryCard from "@/components/cards/category/CategoryCard.vue";
import CategoryCardPlaceholder from "@/components/cards/category/CategoryCardPlaceholder.vue";
import PaginationSection from "@/components/PaginationSection.vue";
import NotFoundSection from "@/components/NotFoundSection.vue";


const route = useRoute();
const router = useRouter();

const categories = ref([]);

const currentPage = ref(parseInt(route.query.page || 1));
const totalPages = ref(0);
const isCategoriesLoading = ref(false);

async function loadCategories(searchQuery = null) {
  isCategoriesLoading.value = true;
  try {
    return (await api.categories.categories(
        currentPage.value, searchQuery || route.query.search)
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
  totalPages.value = calculateTotalPages(response.count, response.results.length);
}

const cardListRef = ref(null);

async function onPageChange(page) {
  currentPage.value = page;
  await replaceURLParams(router, route, {page: page});
  scrollToElement(cardListRef.value);
  await updateCategories();
}

onMounted(async () => {
  await updateCategories();
});
</script>

<template>
  <search-section @search-button-click="updateCategories" class="pt-4 pb-3"/>
  <hr class="my-2">
  <div
      class="row py-3"
      ref="cardListRef"
  >
    <template v-if="!isCategoriesLoading">
      <div
          v-for="category in categories"
          :key="category.id"
          class="col-lg-4 col-md-6 mb-3"
      >
        <category-card :category="category"/>
      </div>
      <pagination-section
          :total-pages="totalPages"
          :current-page="currentPage"
          @page-changed="onPageChange"
      />
    </template>
    <div
        v-else
        v-for="_ in 9"
        :key="_"
        class="col-lg-4 col-md-6 mb-3"
    >
      <category-card-placeholder/>
    </div>
  </div>
  <not-found-section v-if="!categories.length"/>
</template>