<script setup>
import {computed} from "vue";
import CircleFillIcon from "@/components/icons/CircleFillIcon.vue";
import {PRODUCT_NUTRITION_ROUNDING} from "@/constants";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});


const nutritionItems = [
  {
    name: "Calories",
    value: props.category.calories_avg,
    colorClass: "text-warning",
    units: "kcal",
  },
  {
    name: "Protein",
    value: props.category.protein_avg,
    colorClass: "text-success",
    units: "g.",
  },
  {
    name: "Fat",
    value: props.category.fat_avg,
    colorClass: "text-danger",
    units: "g.",
  },
  {
    name: "Carbs",
    value: props.category.carbs_avg,
    colorClass: "text-primary",
    units: "g.",
  },
]


const productsRoute = computed(() => {
  return {name: 'products', params: {categorySlug: props.category.slug}};
})
</script>

<template>
  <component-wrapper class="card common-rounding border-0 h-100">
    <router-link :to="productsRoute">
      <div class="card-img-scale">
        <img
            :src="category.image"
            class="card-img-top"
            alt="category-image"
        >
      </div>
    </router-link>
    <div class="card-body">
      <h5 class="card-title text-main text-truncate">
        <router-link class="link-main fw-semibold" :to="productsRoute">
          {{ category.name }}
        </router-link>
      </h5>
      <p class="card-text">{{ category.description }}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li
          v-for="(item, index) in nutritionItems"
          :key="index"
          class="list-group-item inline-icon-text"
          :class="item.colorClass"
      >
        <circle-fill-icon/>
        &nbsp;
        <span class="fw-semibold">
          {{ item.name }}: {{ item.value.toFixed(PRODUCT_NUTRITION_ROUNDING) }} {{ item.units }}
        </span>
      </li>
    </ul>
  </component-wrapper>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/cards'
</style>