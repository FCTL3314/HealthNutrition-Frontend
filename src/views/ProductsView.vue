<script setup>
import api from '@/api/index'
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {calculateTotalPages} from '@/utils'
import {createTitle} from '@/utils';
import SearchSection from '@/components/SearchSection.vue';
import CardList from '@/components/cards/CardList.vue';
import ProductCard from '@/components/cards/ProductCard.vue';
import ProductCardPlaceholder from '@/components/cards/ProductCardPlaceholder.vue';
import Pagination from '@/components/Pagination.vue';

const isCategoryLoaded = ref(false);

const category = ref(null);
const products = ref(null);

const route = useRoute();
const router = useRouter();

const currentPage = ref(parseInt(route.query.page || 1));
const totalPages = ref(0);

async function loadCategory() {
  try {
    category.value = (await api.products.category(route.params.categorySlug)).data;
    isCategoryLoaded.value = true;
  } catch (error) {
    console.error(error);
  }
}

const loadProducts = async () => setTimeout(async () => {
  try {
    const response = (await api.products.products(currentPage.value, route.params.categorySlug)).data;
    products.value = response.results;
    totalPages.value = calculateTotalPages(response.count, response.results.length);
  } catch (error) {
    console.error(error);
  }
}, 400);

const cardListRef = ref(null);

async function onPageChange(page) {
  await loadProducts()

  currentPage.value = page;
  await router.replace({query: {...route.query, page}});

  window.scrollTo({
    top: cardListRef.value.$el.offsetTop,
    behavior: 'smooth',
  });
}

onMounted(async () => {
  await loadCategory();
  if (isCategoryLoaded.value) {
    document.title = createTitle(category.value.name);
    await loadProducts();
  }
});
</script>

<template>
  <search-section/>
  <hr class="m-0">
  <card-list
      v-if="isCategoryLoaded"
      ref="cardListRef"
      :title="`Products in the category ${category ? category.name : 'Loading...'}`"
      description="Discover a wide range of products available in the selected category."
  >
    <div
        v-if="products"
        v-for="(product, index) in products"
        :key="index"
        class="col-lg-4 col-md-6 mb-3"
    >
      <product-card
          :image-u-r-l="product.image"
          link="#"
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
    <div
        v-else
        v-for="_ in 9"
        :key="_"
        class="col-lg-4 col-md-6 mb-3"
    >
      <product-card-placeholder/>
    </div>
    <pagination
        v-if="isCategoryLoaded"
        :total-pages="totalPages"
        :current-page="currentPage"
        @pagechanged="onPageChange"
    />
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