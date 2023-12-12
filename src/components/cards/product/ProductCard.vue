<script setup>
import {computed, ref} from "vue";
import {CARD_IMAGE_HEIGHT, PRODUCT_HEALTHFULNESS_REFERENCE, PRODUCT_NUTRITION_ROUNDING} from "@/constants";
import CircleFillIcon from "@/components/icons/CircleFillIcon.vue";
import {useStore} from "vuex";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MinusIcon from "@/components/icons/MinusIcon.vue";
import TheTag from "@/components/TheTag.vue";


const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  caloriesAvg: {
    type: Number,
  },
  proteinAvg: {
    type: Number,
  },
  fatAvg: {
    type: Number,
  },
  carbsAvg: {
    type: Number,
  },
  categorySlug: {
    type: String,
    required: true,
  },
  isComparisonProduct: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: Object,
  }
});

const store = useStore();

const emits = defineEmits(["saveButtonClick", "removeButtonClick"])
const onSaveButtonClick = () => emits("saveButtonClick", props.product.id);

const cardElement = ref(null);

const onRemoveButtonClick = () => {
  cardElement.value.$el.classList.add('animate__animated', 'animate__bounceOut');
  cardElement.value.$el.addEventListener('animationend', async () => {
    emits("removeButtonClick", props.product.id);
  });
}

const healthfulnessPercents = computed(() => {
  return Math.round((props.product.healthfulness / PRODUCT_HEALTHFULNESS_REFERENCE) * 100);
})

const createNutritionItem = (name, colorClass, units, value, avgValue, isMoreBetter) => {
  const difference = parseFloat((value - avgValue).toFixed(PRODUCT_NUTRITION_ROUNDING));
  const isDifferencePositive = difference >= 0;
  const normalizedDifference = Math.abs(difference);

  return {
    name,
    colorClass,
    units,
    value,
    avgValue,
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
      props.caloriesAvg,
      store.getters["nutrition/isMoreCaloriesBetter"],
  ),
  createNutritionItem(
      "Protein",
      "text-success",
      "g.",
      props.product.nutrition.protein,
      props.proteinAvg,
      store.getters["nutrition/isMoreProteinBetter"],
  ),
  createNutritionItem(
      "Fat",
      "text-danger",
      "g.",
      props.product.nutrition.fat,
      props.fatAvg,
      store.getters["nutrition/isMoreFatBetter"],
  ),
  createNutritionItem(
      "Carbs",
      "text-primary",
      "g.",
      props.product.nutrition.carbs,
      props.carbsAvg,
      store.getters["nutrition/isMoreCarbsBetter"],
  ),
];

const productRoute = computed(() => {
  return {name: "product", params: {categorySlug: props.categorySlug, productSlug: props.product.slug}};
});
</script>

<template>
  <component-wrapper ref="cardElement" class="card common-rounding h-100 z-0">
    <router-link :to="productRoute">
      <div class="card-img-scale">
        <img
            :src="product.image"
            :height="CARD_IMAGE_HEIGHT"
            class="card-img-top object-fit-cover"
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
    <div v-if="tags" class="tags px-3">
      <the-tag
          v-for="(tag, index) in tags"
          :key="index"
          :text="tag.text"
          :icon="tag.icon"
          :bg-color-class="tag.color"
          class="mb-2 me-2"
      />
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item fw-semibold  text-center">
        <span class="text-main-light">Healthfulness</span>
        <div class="progress">
          <div class="progress-bar" :style="{width: `${healthfulnessPercents}%`}">
            {{ healthfulnessPercents }}%
          </div>
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
            v-if="isComparisonProduct"
            @click="onRemoveButtonClick"
            class="btn btn-outline-danger inline-icon-text justify-content-center common-rounding w-100 m-0"
        >
          <minus-icon class="me-1" :width="24" :height="24"/>
          Remove
        </button>
        <button
            v-else
            @click="onSaveButtonClick"
            class="btn btn-outline-primary inline-icon-text justify-content-center common-rounding w-100 m-0"
            data-bs-toggle="modal"
            data-bs-target="#saveProductModal"
        >
          <plus-icon class="me-1" :width="24" :height="24"/>
          Save
        </button>
      </li>
    </ul>
  </component-wrapper>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/cards'


.tags
  display: flex
  flex-wrap: wrap
</style>