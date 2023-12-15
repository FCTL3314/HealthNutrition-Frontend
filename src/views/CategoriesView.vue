<script setup>
import api from "@/services/api/index";
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {calculateTotalPages, replaceURLParams, scrollToTop} from "@/utils";
import SearchForm from "@/components/SearchForm.vue";
import CategoryCard from "@/components/cards/category/CategoryCard.vue";
import CategoryCardPlaceholder from "@/components/cards/category/CategoryCardPlaceholder.vue";
import PaginationSection from "@/components/PaginationSection.vue";
import ErrorSection from "@/components/ErrorSection.vue";
import {CATEGORIES_PAGINATE_BY} from "@/constants";
import CategoriesGreeting from "@/components/greetings/CategoriesGreeting.vue";


const route = useRoute();
const router = useRouter();

const categories = ref([]);

const isCategoriesLoading = ref(false);
const isNoCategories = computed(() => !isCategoriesLoading.value && !categories.value.length);

const currentPage = ref(parseInt(route.query.page || 1));
const totalPages = ref(0);

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
  const data = await loadCategories(searchQuery);
  if (data) {
    categories.value = data.results;
    totalPages.value = calculateTotalPages(data.count, CATEGORIES_PAGINATE_BY);
  }
}

async function onPageChange(page) {
  currentPage.value = page;
  await replaceURLParams(router, route, {page: page});
  scrollToTop();
  await updateCategories();
}

onMounted(async () => {
  await updateCategories();
});
</script>

<template>
  <categories-greeting class="component-indentation-y"/>
  <div class="component-indentation-y">
    <SearchForm
        class="mb-3"
        placeholder-text="Enter a query, for example fruits..."
        :show-clear-search-button="!isCategoriesLoading"
        @search-input="updateCategories"
        @clear-search="updateCategories"
    />
    <div class="row">
      <div
          v-if="!isCategoriesLoading"
          v-for="category in categories"
          :key="category.id"
          class="col-lg-4 col-md-6 mb-3 animate__animated animate__fadeIn"
      >
        <category-card
            :category="category"
            :calories_avg="category.calories_avg"
            :protein_avg="category.protein_avg"
            :fat_avg="category.fat_avg"
            :carbs_avg="category.carbs_avg"
        />
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
    <error-section
        v-if="isNoCategories"
        description="Oops... Looks like we couldn't find any categories."
        :show-go-back-button="false"
    />
    <pagination-section
        v-if="!isNoCategories"
        :total-pages="totalPages"
        :current-page="currentPage"
        @page-changed="onPageChange"
    />
  </div>
</template>

<style lang="sass">
@import "@/assets/sass/main"
</style>