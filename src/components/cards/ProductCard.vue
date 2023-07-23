<script setup>
import {computed} from 'vue';
import PinAngle from '@/components/icons/PinAngle.vue';
import PatchCheck from '@/components/icons/PatchCheck.vue';
import PatchExclamation from '@/components/icons/PatchExclamation.vue';
import Dollar from '@/components/icons/Dollar.vue';
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
  storeName: {
    type: String,
    required: true,
  },
  storeLink: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryHighestPrice: {
    type: Number,
    required: true,
  },
  categoryAveragePrice: {
    type: Number,
    required: true,
  },
  categoryLowestPrice: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const priceDifference = computed(() => (props.categoryAveragePrice - props.price).toFixed(2));
const isPriceProfitable = computed(() => priceDifference.value >= 0);
const isMostExpansiveProduct = computed(() => props.categoryHighestPrice === props.price);
const isCheapestProduct = computed(() => props.categoryLowestPrice === props.price);
</script>

<template>
  <div class="card h-100">
    <a :href="link">
      <div class="card-img-scale">
        <img
            :src="imageURL"
            class="card-img-top"
            alt="product-image"
        >
      </div>
    </a>
    <div class="card-body">
      <h5 class="card-title text-main text-truncate">
        <a class="link-main fw-semibold" :href="link">
          {{ name }}
        </a>
      </h5>
      <p class="card-text">{{ description }}</p>
      <div class="d-flex align-items-center mt-auto">
        <button type="button" class="text-primary btn btn-add-to-compare">
          <pin-angle/>
          <span class="ms-1">Add to Compare</span>
        </button>
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <li v-if="isCheapestProduct" class="text-success list-group-item list-group-item-centered">
        <patch-check/>
        <span class="ms-1 fw-semibold">Lowest Price</span>
      </li>
      <li v-if="isMostExpansiveProduct" class="text-danger list-group-item list-group-item-centered">
        <patch-exclamation/>
        <span class="ms-1 fw-semibold">Highest Price</span>
      </li>
      <li class="text-warning list-group-item list-group-item-centered">
        <dollar/>
        <span class="fw-semibold">{{ price }}$</span>
        <span
            class="text-success fw-semibold"
            :class="isPriceProfitable ? 'text-success' : 'text-danger'"
        >
          ({{ isPriceProfitable ? '-' : '+' }}{{ Math.abs(priceDifference) }}$)
        </span>
      </li>
      <li class="text-primary list-group-item list-group-item-centered">
        <shop/>
        <a
            class="ms-1 link link-store"
           :href="storeLink"
            target="_blank"
        >
          {{ storeName }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/cards'
@import 'bootstrap/scss/bootstrap'

.btn
  &-add-to-compare
    display: flex
    align-items: center
    border: 0
    padding: 0

.link
  &-store
    font-size: 14px
    font-weight: bold
</style>