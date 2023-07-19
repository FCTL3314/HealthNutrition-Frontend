<script setup>
import {ref, onMounted} from 'vue';
import api from '@/api/index'
import constants from '@/constants'
import calculateTotalPages from '@/utils/pagination'
import Search from '@/components/Search.vue';
import CardList from '@/components/cards/CardList.vue';
import CategoryCard from '@/components/cards/CategoryCard.vue';
import CategoryCardPlaceholder from '@/components/cards/CategoryCardPlaceholder.vue';
import Pagination from '@/components/Pagination.vue';

const currentPage = ref(1);
const totalPages = ref(0);
const categories = ref(null);

const loadCategories = async () => {
  try {
    const response = (await api.products.categories(currentPage.value)).data;
    categories.value = response;

    totalPages.value = calculateTotalPages(response.count, constants.categoriesPaginateBy);
  } catch (error) {
    console.error(error);
  }
};

const dividerRef = ref(null);

const onPageChange = async (page) => {
  currentPage.value = page
  await loadCategories()
  window.scrollTo({
    top: dividerRef.value.offsetTop + 1,
    behavior: 'smooth',
  })
}

onMounted(() => {
  loadCategories();
});
</script>

<template>
  <search/>
  <hr ref="dividerRef" class="m-0">
  <card-list
      title="Discover Popular Product Categories"
      description="Explore our curated list of popular product categories, sorted be their popularity among users."
  >
    <div
        v-if="categories"
        v-for="(category, index) in categories.results"
        :key="index"
        class="col-lg-4 col-md-6 mb-3"
    >
      <category-card
          :image-u-r-l="category.image"
          link="#"
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
        v-for="_ in constants.categoriesPaginateBy"
        :key="_"
        class="col-lg-4 col-md-6 mb-3"
    >
      <category-card-placeholder/>
    </div>
  </card-list>
  <pagination
      :total-pages="totalPages"
      :current-page="currentPage"
      @pagechanged="onPageChange"
  />
</template>