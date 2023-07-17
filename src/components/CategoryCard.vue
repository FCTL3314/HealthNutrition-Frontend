<script setup>
import Dollar from '@/components/icons/Dollar.vue'
import PatchCheck from '@/components/icons/PatchCheck.vue'
import PatchExclamation from '@/components/icons/PatchExclamation.vue'
import Shop from '@/components/icons/Shop.vue'

defineProps({
  imageURL: {
    type: String,
    required: true,
  },
  linkURL: {
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
})
</script>

<template>
  <div class="card h-100">
    <a :href="linkURL">
      <div class="card-img-scale">
        <img
            :src="imageURL"
            class="card-img-top"
            alt="category-image"
        >
      </div>
    </a>
    <div class="card-body">
      <h5 class="card-title text-main text-truncate">
        <a class="link-main fw-semibold" :href="linkURL">
          {{ name }}
        </a>
      </h5>
      <p class="card-text">{{ description }}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li v-if="averagePrice" class="list-group-item text-warning d-flex align-items-center">
        <dollar/>
        <span class="ms-1 fw-semibold">Average: {{ averagePrice }}$</span>
      </li>
      <li v-if="lowestPrice" class="list-group-item text-success d-flex align-items-center">
        <PatchCheck/>
        <span class="ms-1 fw-semibold">Lowest: {{ lowestPrice }}$</span>
      </li>
      <li v-if="highestPrice" class="list-group-item text-danger d-flex align-items-center">
        <PatchExclamation/>
        <span class="ms-1 fw-semibold">Highest: {{ highestPrice }}$</span>
      </li>
      <li v-if="storesCount" class="list-group-item d-flex align-items-center text-primary">
        <shop/>
        <span class="ms-1 fw-semibold">Stores: {{ storesCount }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import 'bootstrap/scss/bootstrap'

.card
  transition-duration: 0.3s

  &-img-scale
    border-top-left-radius: $card-inner-border-radius
    border-top-right-radius: $card-inner-border-radius
    overflow: hidden

  &-img-top
    transition: 0.4s

.card:hover .card-img-top
  transform: scale(1.05)
</style>