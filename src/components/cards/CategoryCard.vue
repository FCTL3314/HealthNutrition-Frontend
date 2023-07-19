<script setup>
import Dollar from '@/components/icons/Dollar.vue';
import PatchCheck from '@/components/icons/PatchCheck.vue';
import PatchExclamation from '@/components/icons/PatchExclamation.vue';
import Shop from '@/components/icons/Shop.vue';

const props = defineProps({
  imageURL: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  averagePrice: {
    type: Number,
  },
  lowestPrice: {
    type: Number,
  },
  highestPrice: {
    type: Number,
  },
  storesCount: {
    type: Number,
  },
  slug: {
    type: String,
    required: true,
  },
});

const productRouterLink = {name: 'products', params: {categorySlug: props.slug}}

</script>

<template>
  <div class="card h-100">
    <router-link :to="productRouterLink">
      <div class="card-img-scale">
        <img
            :src="imageURL"
            class="card-img-top"
            alt="category-image"
        >
      </div>
    </router-link>
    <div class="card-body">
      <h5 class="card-title text-main text-truncate">
        <router-link class="link-main fw-semibold" :to="productRouterLink">
          {{ name }}
        </router-link>
      </h5>
      <p class="card-text">{{ description }}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li v-if="averagePrice" class="text-warning list-group-item list-group-item-centered">
        <dollar/>
        <span class="ms-1 fw-semibold">Average: {{ averagePrice }}$</span>
      </li>
      <li v-if="lowestPrice" class="text-success list-group-item list-group-item-centered">
        <PatchCheck/>
        <span class="ms-1 fw-semibold">Lowest: {{ lowestPrice }}$</span>
      </li>
      <li v-if="highestPrice" class="text-danger list-group-item list-group-item-centered">
        <PatchExclamation/>
        <span class="ms-1 fw-semibold">Highest: {{ highestPrice }}$</span>
      </li>
      <li v-if="storesCount" class="text-primary list-group-item list-group-item-centered">
        <shop/>
        <span class="ms-1 fw-semibold">Stores: {{ storesCount }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/cards'
@import 'bootstrap/scss/bootstrap'
</style>