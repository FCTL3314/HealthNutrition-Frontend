<script setup>
import api from '@/api/index'
import {computed, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {calculateTotalPages, createTitle, scrollToElement, setParams} from '@/utils'
import SearchSection from '@/components/SearchSection.vue';
import CardList from '@/components/cards/CardList.vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import ProductCardPlaceholder from '@/components/cards/ProductCardPlaceholder.vue';
import PaginationSection from '@/components/PaginationSection.vue';
import NotFoundSection from '@/components/NotFoundSection.vue';

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

const route = useRoute();
const router = useRouter();

const currentPage = ref(parseInt(route.query.page || 1));
const totalPages = ref(0);

async function loadCategory() {
  isCategoryLoading.value = true;
  try {
    return (await api.products.category(route.params.categorySlug)).data;
  } catch (error) {
    console.error(error);
  } finally {
    isCategoryLoading.value = false;
  }
}

async function updateCategory() {
  category.value = await loadCategory()
}

async function loadProducts() {
  isProductsLoading.value = true;
  try {
    return (await api.products.products(currentPage.value, route.params.categorySlug)).data;
  } catch (error) {
    console.error(error);
  } finally {
    isProductsLoading.value = false;
  }
}

async function updateProducts() {
  const data = await loadProducts()
  products.value = data.results;
  totalPages.value = calculateTotalPages(data.count, data.results.length);
}

const cardListRef = ref(null);

async function onPageChange(page) {
  currentPage.value = page;
  await setParams(router, route, {page: page});
  scrollToElement(cardListRef.value);
  await updateProducts();
}

function createProductRoute(productSlug) {
  return {name: 'product', params: {categorySlug: category.value.slug, productSlug: productSlug}}
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
  <search-section class="pt-4 pb-3"/>
  <hr class="m-0">
  <card-list
      ref="cardListRef"
      class="py-3"
      :title="`Products in the category ${category ? category.name : 'Loading...'}`"
      description="Discover a wide range of products available in the selected category."
  >
    <template v-if="isDataLoaded && isProductsExists">
      <div
          v-for="(product, index) in products"
          :key="index"
          class="col-lg-4 col-md-6 mb-3"
      >
        <product-card
            :image-u-r-l="product.image"
            :route="createProductRoute(product.slug)"
            :name="product.name"
            :description="product.card_description"
            :store-name="product.store.name"
            :store-link="product.store.url"
            :price="product.price"
            :category-average-price="category.product_price_avg"
            :category-highest-price="category.product_price_max"
            :category-lowest-price="category.product_price_min"
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
  </card-list>
  <not-found-section v-if="isDataLoaded && !isProductsExists"/>
</template>