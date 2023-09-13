<script setup>
import api from '@/api/index'
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {calculateTotalPages, createTitle} from '@/utils'
import SearchSection from '@/components/SearchSection.vue';
import CardList from '@/components/cards/CardList.vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import ProductCardPlaceholder from '@/components/cards/ProductCardPlaceholder.vue';
import PaginationSection from '@/components/PaginationSection.vue';

const category = ref(null);
const isCategoryLoading = ref(false);

const products = ref(null);
const isProductsLoading = ref(false);

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
  await router.replace({query: {...route.query, page}});
  await updateProducts();

  window.scrollTo({
    top: cardListRef.value.$el.offsetTop,
    behavior: 'smooth',
  });
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
      v-if="!isCategoryLoading"
      ref="cardListRef"
      class="py-3"
      :title="`Products in the category ${category ? category.name : 'Loading...'}`"
      description="Discover a wide range of products available in the selected category."
  >
    <template v-if="!isProductsLoading">
      <div
          v-for="(product, index) in products"
          :key="index"
          class="col-lg-4 col-md-6 mb-3"
      >
        <product-card
            :image-u-r-l="product.image"
            :route="{name: 'product', params: {categorySlug: category.slug, productSlug: product.slug}}"
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
        v-else
        v-for="_ in 9"
        :key="_"
        class="col-lg-4 col-md-6 mb-3"
    >
      <product-card-placeholder/>
    </div>
  </card-list>
  <div v-else class="text-center">
    <img
        class="mb-4 mt-2"
        src="@/assets/icons/magnifying-glass.svg"
        alt="magnifying-glass"
        width="100"
        height="100">
    <h4>Looks like we couldn't find what you're looking for.</h4>
  </div>
</template>