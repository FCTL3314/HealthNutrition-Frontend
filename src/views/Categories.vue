<script setup>
import {ref, onMounted} from 'vue';
import constants from '@/constants'
import Content from '@/components/Content.vue';
import Search from '@/components/Search.vue';
import CardList from '@/components/CardList.vue';
import CategoryCard from '@/components/cards/CategoryCard.vue';
import CategoryCardPlaceholder from '@/components/cards/CategoryCardPlaceholder.vue';

const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/products/product-types/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    categories.value = await response.json();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <content>
    <search>
      <h1 class="text-main">StoreTracker</h1>
      <p class="fs-4">
        Discover unbeatable deals and unlock the power of price comparison across global leading retailers on our
        platform!
      </p>
    </search>
    <hr class="m-0">
    <card-list
        title="Discover Popular Product Categories"
        description="Explore our curated list of popular product categories, sorted be their popularity among users."
    >
      <div
          v-if="categories.count"
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
  </content>
</template>

<style scoped lang="sass">
@import '@/assets/sass/main'
</style>