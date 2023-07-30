<script setup>
import api from '@/api/index'
import {ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {calculateTotalPages} from '@/utils'
import SearchSection from '@/components/SearchSection.vue';
import CardList from '@/components/cards/CardList.vue';
import CategoryCard from '@/components/cards/CategoryCard.vue';
import CategoryCardPlaceholder from '@/components/cards/CategoryCardPlaceholder.vue';
import PaginationSection from '@/components/PaginationSection.vue';

const categories = ref(null);

const route = useRoute();
const router = useRouter();

const currentPage = ref(parseInt(route.query.page || 1));
const totalPages = ref(0);

const loadCategories = async () => setTimeout( async () => {
  try {
    const response = (await api.products.categories(currentPage.value)).data;
    categories.value = response.results;
    totalPages.value = calculateTotalPages(response.count, response.results.length);
  } catch (error) {
    console.error(error);
  }
}, 400);

const cardListRef = ref(null);

async function onPageChange(page) {
  currentPage.value = page;
  await router.replace({query: {...route.query, page}});
  await loadCategories();
  window.scrollTo({
    top: cardListRef.value.$el.offsetTop,
    behavior: 'smooth',
  });
}

onMounted(() => {
  loadCategories();
});
</script>

<template>
  <search-section class="pt-4 pb-3"/>
  <hr class="m-0">
  <card-list
      class="py-3"
      ref="cardListRef"
      title="Discover Popular Product Categories"
      description="Explore our curated list of popular product categories, sorted be their popularity among users."
  >
    <div
        v-if="categories"
        v-for="(category, index) in categories"
        :key="index"
        class="col-lg-4 col-md-6 mb-3"
    >
      <category-card
          :image-u-r-l="category.image"
          :slug="category.slug"
          :name="category.name"
          :description="category.description"
          :average-price="category.product_price_avg"
          :lowest-price="category.product_price_min"
          :highest-price="category.product_price_max"
          :stores-count="category.product_stores_count"
      />
    </div>
    <div
        v-else
        v-for="_ in 9"
        :key="_"
        class="col-lg-4 col-md-6 mb-3"
    >
      <category-card-placeholder/>
    </div>
    <pagination-section
        :total-pages="totalPages"
        :current-page="currentPage"
        @pagechanged="onPageChange"
    />
  </card-list>
</template>