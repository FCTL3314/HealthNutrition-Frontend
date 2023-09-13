<script setup>

import {onMounted, ref} from "vue";
import api from "@/api";
import {useRoute} from "vue-router";
import moment from 'moment';
import ProductCommentsSection from "@/components/ProductCommentsSection.vue";


const route = useRoute()

const product = ref(null);


async function loadProduct() {
  try {
    return (await api.products.product(route.params.productSlug)).data;
  } catch (error) {
    console.error(error.response);
  }
}

onMounted(async () => {
  product.value = await loadProduct();
})
</script>

<template>
  <div v-if="product" class="py-4 px-2 mx-auto">
    <div class="text-center">
      <img
          width="332"
          height="332"
          class="img-fluid mb-2"
          :src="product.image"
          alt="product-logo"
      >
      <h2 class="text-main">{{ product.name }}</h2>
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-light">
          <span class="fs-5">
            <span class="fw-semibold">Price: </span>
            <span>{{ product.price }}$</span>
          </span>
        </li>
        <li class="list-group-item bg-light">
          <span class="fs-5">
            <span class="fw-semibold">Category: </span>
            <span>{{ product.product_type.name }}</span>
          </span>
        </li>
        <li class="list-group-item bg-light">
          <span class="fs-5">
            <span class="fw-semibold">Store: </span>
            <a
                class="link-main text-decoration-underline"
                :href="product.store.url"
                target="_blank"
            >
              <span>{{ product.store.name }}</span>
            </a>
          </span>
        </li>
        <li class="list-group-item bg-light">
          <span class="fs-5">
            <span class="fw-semibold">Views: </span>
            <span>{{ product.views }}</span>
          </span>
        </li>
        <li class="list-group-item bg-light">
          <span class="fs-5">
            <span class="fw-semibold">Added: </span>
            <span>{{ moment(product.created_at).format('LLL') }}</span>
          </span>
        </li>
      </ul>
      <hr>
      <h2 class="text-main mb-4">Description</h2>
      <p class="fs-5">{{ product.description }}</p>
    </div>
    <hr>
    <div class="row">
      <div class="col-12">
        <product-comments-section/>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import "@/assets/sass/main"
</style>