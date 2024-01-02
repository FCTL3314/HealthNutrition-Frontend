<script setup>
import {onMounted, ref} from "vue";
import {ANIMATION_DELAY, NUTRITION_FACTS_ROUNDING, PRODUCT_HEALTHFULNESS_REFERENCE} from "@/constants";
import CircleFillIcon from "@/components/icons/CircleFillIcon.vue";
import {useStore} from "vuex";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MinusIcon from "@/components/icons/MinusIcon.vue";
import TheTag from "@/components/TheTag.vue";
import api from "@/services/api";
import CheckIcon from "@/components/icons/CheckIcon.vue";
import LoadingSpinner from "@/components/loading/LoadingSpinner.vue";
import router from "@/router";
import toaster from "@/plugins/toaster";


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
  comparisonGroup: {
    type: Object,
  },
  tags: {
    type: Object,
  },
});

const store = useStore();

const user = store.getters["auth/user"];

const emits = defineEmits(["saveButtonClick", "removeButtonClick"])

const isComparedProductRemoving = ref(false);
const isComparedProductRemoved = ref(false);

const logInRoute = {name: "logIn"};

async function onSaveButtonClick() {
  if (!user) {
    await router.push(logInRoute);
    toaster.error("Please log in so you can save products.");
    return;
  }
  emits("saveButtonClick", props.product.id);
}

const cardComponent = ref(null);

async function onRemoveButtonClick() {
  isComparedProductRemoving.value = true;
  try {
    const response = await api.comparisons.removeProductFromComparisonGroup(props.comparisonGroup.id, props.product.id)
    if (response.status === 204) {
      isComparedProductRemoved.value = true;

      setTimeout(() => {
        cardComponent.value.$el.classList.add('animate__animated', 'animate__bounceOut');
        cardComponent.value.$el.addEventListener('animationend', async () => {
          emits("removeButtonClick", props.product);
        });
      }, ANIMATION_DELAY)
    }
  } catch (error) {
    console.error(error);
  }
}

const healthfulnessPercents = Math.round((props.product.healthfulness / PRODUCT_HEALTHFULNESS_REFERENCE) * 100);

function getNutritionDifferenceColorClass(isMoreBetter, isDifferencePositive) {
  return isMoreBetter
      ? isDifferencePositive
          ? "text-success"
          : "text-danger"
      : isDifferencePositive
          ? "text-danger"
          : "text-success";
}

function createNutritionItem(name, colorClass, units, value, avgValue, isMoreBetter) {
  const difference = parseFloat((value - avgValue).toFixed(NUTRITION_FACTS_ROUNDING));
  const isDifferencePositive = difference >= 0;
  const normalizedDifference = Math.abs(difference);
  const differenceColorClass = getNutritionDifferenceColorClass(isMoreBetter, isDifferencePositive);
  const differenceSymbol = isDifferencePositive ? '+' : '-';

  return {
    name,
    colorClass,
    differenceColorClass,
    differenceSymbol,
    units,
    value,
    avgValue,
    difference,
    normalizedDifference,
    isDifferencePositive,
    isMoreBetter,
  };
}

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

const productRoute = {
  name: "product",
  params: {categorySlug: props.categorySlug, productSlug: props.product.slug},
};

onMounted(() => {
  if (props.isComparisonProduct && !props.comparisonGroup) {
    console.error(
        `Property 'comparisonGroup' is required when isComparisonProduct is set to true.`
    );
  }
})
</script>

<template>
  <component-wrapper ref="cardComponent" class="card common-rounding h-100 z-0">
    <router-link :to="productRoute">
      <div class="card-img-wrp">
        <img
            :src="product.image"
            class="card-img-responsive card-img-top object-fit-cover"
            alt="product-image"
        >
      </div>
    </router-link>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title font-standard text-main text-truncate">
        <router-link class="link-main fw-semibold" :to="productRoute">
          {{ product.name }}
        </router-link>
      </h5>
      <p class="card-text font-small">{{ product.shortDescription }}</p>
    </div>
    <div v-if="tags" class="tags px-3">
      <the-tag
          v-for="(tag, index) in tags"
          :key="index"
          :text="tag.text"
          :icon-component="tag.iconComponent"
          :classes="tag.classes"
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
          class="list-group-item centered-vertically"
          :class="item.colorClass"
      >
        <circle-fill-icon/>
        <span class="fw-semibold">
          &nbsp;{{ item.name }}: {{ item.value }} {{ item.units }}&nbsp;
        </span>
        <span :class="item.differenceColorClass">
          {{ item.differenceSymbol }}{{ item.normalizedDifference }} {{ item.units }}
        </span>
      </li>
      <li class="list-group-item text-center px-0 pb-0">
        <template v-if="isComparisonProduct">
          <button
              v-if="!isComparedProductRemoved"
              @click="onRemoveButtonClick"
              class="btn btn-outline-danger centered-vertically justify-content-center common-rounding w-100 m-0"
              :class="{disabled: isComparedProductRemoving}"
          >
            <template v-if="isComparedProductRemoving">
              <loading-spinner :size="24" color-class="text-danger"/>
              <span class="ms-1">Removing...</span>
            </template>
            <template v-else>
              <minus-icon :width="24" :height="24"/>
              <span class="ms-1">Remove</span>
            </template>
          </button>
          <check-icon
              v-else
              :width="38"
              :height="38"
              class="mx-auto centered text-success animate__animated animate__zoomIn animate__faster"
          />
        </template>
        <button
            v-else
            @click="onSaveButtonClick"
            class="btn btn-outline-primary centered-vertically justify-content-center common-rounding w-100 m-0"
            data-bs-toggle="modal"
            :data-bs-target="user ? '#saveProductModal' : ''"
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