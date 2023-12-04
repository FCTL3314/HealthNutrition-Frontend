<script setup>
import {computed} from "vue";
import {PRODUCT_HEALTHFULNESS_REFERENCE, PRODUCT_NUTRITION_ROUNDING} from "@/constants";
import CircleFillIcon from "@/components/icons/CircleFillIcon.vue";
import {useStore} from "vuex";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";


const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  category: {
    type: Object,
    required: true,
  }
});

const emits = defineEmits(["saveButtonClick"])
const onSaveButtonClick = () => emits("saveButtonClick", props.product.id);

const store = useStore();

const healthfulnessPercents = computed(() => {
  return Math.round((props.product.healthfulness / PRODUCT_HEALTHFULNESS_REFERENCE) * 100);
})

const createNutritionItem = (name, colorClass, units, value, maxValue, avgValue, minValue, isMoreBetter) => {
  const difference = parseFloat((value - avgValue).toFixed(PRODUCT_NUTRITION_ROUNDING));
  const isDifferencePositive = difference >= 0;
  const normalizedDifference = Math.abs(difference);

  return {
    name,
    colorClass,
    units,
    value,
    maxValue,
    avgValue,
    minValue,
    difference,
    normalizedDifference,
    isDifferencePositive,
    isMoreBetter,
  };
};

const nutritionItems = [
  createNutritionItem(
      "Calories",
      "text-warning",
      "kcal",
      props.product.nutrition.calories,
      props.category.calories_max,
      props.category.calories_avg,
      props.category.calories_min,
      store.getters["nutrition/isMoreCaloriesBetter"],
  ),
  createNutritionItem(
      "Protein",
      "text-success",
      "g.",
      props.product.nutrition.protein,
      props.category.protein_max,
      props.category.protein_avg,
      props.category.protein_min,
      store.getters["nutrition/isMoreProteinBetter"],
  ),
  createNutritionItem(
      "Fat",
      "text-danger",
      "g.",
      props.product.nutrition.fat,
      props.category.fat_max,
      props.category.fat_avg,
      props.category.fat_min,
      store.getters["nutrition/isMoreFatBetter"],
  ),
  createNutritionItem(
      "Carbs",
      "text-primary",
      "g.",
      props.product.nutrition.carbs,
      props.category.carbs_max,
      props.category.carbs_avg,
      props.category.carbs_min,
      store.getters["nutrition/isMoreCarbsBetter"],
  ),
];

const productRoute = computed(() => {
  return {name: "product", params: {categorySlug: props.category.slug, productSlug: props.product.slug}};
});
</script>

<template>
  <component-wrapper class="card common-rounding h-100">
    <router-link :to="productRoute">
      <div class="card-img-scale">
        <img
            :src="product.image"
            class="card-img-top"
            alt="product-image"
        >
      </div>
    </router-link>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-main text-truncate">
        <router-link class="link-main fw-semibold" :to="productRoute">
          {{ product.name }}
        </router-link>
      </h5>
      <p class="card-text">{{ product.short_description }}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item fw-semibold  text-center">
        <span class="text-main-light">Healthfulness</span>
        <div class="progress">
          <div class="progress-bar" :style="{width: `${healthfulnessPercents}%`}">{{ healthfulnessPercents }}%</div>
        </div>
      </li>
      <li
          v-for="(item, index) in nutritionItems"
          :key="index"
          class="list-group-item inline-icon-text"
          :class="item.colorClass"
      >
        <circle-fill-icon/>
        <span class="fw-semibold">
          &nbsp;{{ item.name }}: {{ item.value }} {{ item.units }}&nbsp;
        </span>
        <span
            :class="item.isMoreBetter && item.isDifferencePositive ? 'text-success' : 'text-danger'"
        >
          {{ item.isDifferencePositive ? '+' : '-' }}{{ item.normalizedDifference }} {{ item.units }}
        </span>
      </li>
      <li class="list-group-item text-center px-0 pb-0">
        <button
            @click="onSaveButtonClick"
            class="btn btn-outline-primary inline-icon-text justify-content-center common-rounding w-100 m-0"
            data-bs-toggle="modal"
            data-bs-target="#saveProductModal"
        >
          <plus-icon :width="24" :height="24"/>
          Save
        </button>
      </li>
    </ul>
  </component-wrapper>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/cards'
</style>