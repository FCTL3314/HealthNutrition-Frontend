<script setup>
import api from "@/services/api/index"
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {calculateTotalPages, createTitle, replaceURLParams, scrollToElement} from "@/utils";
import SearchSection from "@/components/SearchSection.vue";
import ProductCard from "@/components/cards/product/ProductCard.vue";
import ProductCardPlaceholder from "@/components/cards/product/ProductCardPlaceholder.vue";
import PaginationSection from "@/components/PaginationSection.vue";
import NotFoundSection from "@/components/NotFoundSection.vue";


const route = useRoute();
const router = useRouter();

const category = ref(null);
const isCategoryLoading = ref(false);

const products = ref([]);
const isProductsLoading = ref(false);

const isDataLoaded = computed(() => {
  return !isCategoryLoading.value && !isProductsLoading.value;
})
const isProductsExists = computed(() => {
  return products.value.length > 0;
})

const currentPage = ref(parseInt(route.query.page || 1));
const totalPages = ref(0);

async function loadCategory() {
  isCategoryLoading.value = true;
  try {
    return (await api.categories.category(route.params.categorySlug)).data;
  } catch (error) {
    console.error(error);
  } finally {
    isCategoryLoading.value = false;
  }
}

async function updateCategory() {
  category.value = await loadCategory()
}

async function loadProducts(searchQuery = null) {
  isProductsLoading.value = true;
  try {
    if (searchQuery || route.query.search) {
      return (await api.products.products(
              currentPage.value, null, searchQuery || route.query.search)
      ).data;
    } else {
      return (await api.products.products(currentPage.value, route.params.categorySlug)).data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isProductsLoading.value = false;
  }
}

async function updateProducts(searchQuery = null) {
  if (searchQuery) {
    currentPage.value = 1;
    await replaceURLParams(router, route, {page: 1});
  }
  const data = await loadProducts(searchQuery);
  products.value = data.results;
  totalPages.value = calculateTotalPages(data.count, data.results.length);
}

const cardListRef = ref(null);

async function onPageChange(page) {
  currentPage.value = page;
  await replaceURLParams(router, route, {page: page});
  scrollToElement(cardListRef.value);
  await updateProducts();
}

onMounted(async () => {
  await updateCategory()
      .then(async () => {
        await updateProducts();
        document.title = createTitle(category.value.name);
      });
});
</script>

<template>
  <search-section @search-button-click="updateProducts" class="pt-4 pb-3"/>
  <hr class="my-2">
  <div
      class="row py-3"
      ref="cardListRef"
  >
    <template v-if="isDataLoaded && isProductsExists">
      <div
          v-for="product in products"
          :key="product.id"
          class="col-lg-4 col-md-6 mb-3"
      >
        <product-card
            :product="product"
            :category="category"
        />
      </div>
      <pagination-section
          :total-pages="totalPages"
          :current-page="currentPage"
          @page-changed="onPageChange"
      />
    </template>
    <div
        v-else-if="!isDataLoaded"
        v-for="_ in 9"
        :key="_"
        class="col-lg-4 col-md-6 mb-3"
    >
      <product-card-placeholder/>
    </div>
  </div>
</template>