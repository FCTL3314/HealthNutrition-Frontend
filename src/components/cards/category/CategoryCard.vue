<script setup>
import CircleFillIcon from "@/components/icons/CircleFillIcon.vue";
import {CARD_IMAGE_HEIGHT, PRODUCT_NUTRITION_ROUNDING} from "@/constants";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {computed} from "vue";


const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  calories_avg: {
    type: Number,
  },
  protein_avg: {
    type: Number,
  },
  fat_avg: {
    type: Number,
  },
  carbs_avg: {
    type: Number,
  },
});


const nutritionItems = computed(() => {
  const items = []
  if (props.calories_avg) {
    items.push(
        {
          name: "Calories",
          value: props.calories_avg,
          colorClass: "text-warning",
          units: "kcal",
        }
    );
  }
  if (props.protein_avg) {
    items.push(
        {
          name: "Protein",
          value: props.protein_avg,
          colorClass: "text-success",
          units: "g.",
        },
    );
  }
  if (props.fat_avg) {
    items.push(
        {
          name: "Fat",
          value: props.fat_avg,
          colorClass: "text-danger",
          units: "g.",
        },
    );
  }
  if (props.carbs_avg) {
    items.push(
        {
          name: "Carbs",
          value: props.carbs_avg,
          colorClass: "text-primary",
          units: "g.",
        },
    );
  }
  return items;
})

const productsRoute = {name: 'products', params: {categorySlug: props.category.slug}};
</script>

<template>
  <component-wrapper class="card common-rounding h-100">
    <router-link :to="productsRoute">
      <div class="card-img-scale">
        <img
            :src="category.image"
            :height="CARD_IMAGE_HEIGHT"
            class="card-img-top object-fit-cover"
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
          v-if="nutritionItems.length"
          v-for="(item, index) in nutritionItems"
          :key="index"
          class="list-group-item centered-vertically"
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