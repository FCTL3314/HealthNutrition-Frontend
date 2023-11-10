<script setup>
import api from "@/services/api/index";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {calculateTotalPages, scrollToElement, setParams} from "@/utils";
import SearchSection from "@/components/SearchSection.vue";
import CardList from "@/components/cards/CardList.vue";
import CategoryCard from "@/components/cards/category/CategoryCard.vue";
import CategoryCardPlaceholder from "@/components/cards/category/CategoryCardPlaceholder.vue";
import PaginationSection from "@/components/PaginationSection.vue";


const route = useRoute();
const router = useRouter();

const categories = ref([]);

const currentPage = ref(parseInt(route.query.page || 1));
const totalPages = ref(0);
const isCategoriesLoading = ref(false);

async function loadCategories() {
  isCategoriesLoading.value = true;
  try {
    return (await api.categories.categories(currentPage.value)).data;
  } catch (error) {
    console.error(error.response);
  } finally {
    isCategoriesLoading.value = false;
  }
}

async function updateCategories() {
  const response = await loadCategories();
  categories.value = response.results;
  totalPages.value = calculateTotalPages(response.count, response.results.length);
}

const cardListRef = ref(null);

async function onPageChange(page) {
  currentPage.value = page;
  await setParams(router, route, {page: page});
  scrollToElement(cardListRef.value);
  await updateCategories();
}

onMounted(async () => {
  await updateCategories();
});
</script>

<template>
  <search-section class="pt-4 pb-3"/>
  <hr class="m-0">
  <card-list
      class="py-3"
      ref="cardListRef"
      title="Discover popular product categories"
      description="Explore our curated list of popular product categories, sorted be their popularity among users."
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
  </card-list>
</template>