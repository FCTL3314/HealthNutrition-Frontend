<script setup>
import {onMounted, reactive, ref} from "vue";
import api from "@/services/api";
import {useRoute} from "vue-router";
import CommentsSection from "@/components/comments/CommentsSection.vue";
import {createTitle} from "@/utils";
import CommentsForm from "@/components/comments/CommentsForm.vue";
import WrappedLoadingSpinner from "@/components/loading/WrappedLoadingSpinner.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import ErrorSection from "@/components/ErrorSection.vue";


const route = useRoute()

const product = ref(null);
const productNotFound = ref(false);

const comments = reactive([]);
const commentsCount = ref(0);

const nutritionValues = reactive([]);

function pushNutritionValues() {
  nutritionValues.push(
      {
        title: "Calories: ",
        value: product.value.nutrition.calories,
        units: "kcal",
      },
      {
        title: "Protein: ",
        value: product.value.nutrition.protein,
        units: "g.",
      },
      {
        title: "Fat: ",
        value: product.value.nutrition.fat,
        units: "g.",
      },
      {
        title: "Carbs: ",
        value: product.value.nutrition.carbs,
        units: "g.",
      },
  )
}

async function loadProduct() {
  try {
    return (await api.products.product(route.params.productSlug)).data;
  } catch (error) {
    if (error.response.status === 404) {
      productNotFound.value = true;
    }
    console.error(error.response);
  }
}

async function updateProduct() {
  product.value = await loadProduct();
}

function onCommentsLoaded(data) {
  comments.push(...data.results)
  commentsCount.value = data.count
}

async function onCommentCreated(comment) {
  comments.unshift(comment);
  commentsCount.value++;
}

onMounted(async () => {
  await updateProduct()
      .then(async () => {
        document.title = createTitle(product.value.name);
        pushNutritionValues();
      });
})
</script>

<template>
  <error-section
      v-if="productNotFound"
      description="Oops... Looks like there is no such product or it has been removed."
  />
  <wrapped-loading-spinner :is-loading="!product">
    <component-wrapper class="component-indentation-y text-center">
      <h1 class="text-main product-name">
        {{ product.category.name }} - {{ product.name }}
      </h1>
      <p class="fs-5 mb-0">{{ product.short_description }}</p>
    </component-wrapper>
    <component-wrapper class="component-indentation-y text-center">
      <h2 class="text-main">Nutritional value</h2>
      <ul class="list-group list-group-flush">
        <li
            v-for="(nutritionValue, index) in nutritionValues"
            :key="index"
            class="list-group-item"
        >
            <span class="fs-5">
              <span class="fw-semibold">{{ nutritionValue.title }}</span>
              <span class="text-main-light">{{ nutritionValue.value }} {{ nutritionValue.units }}</span>
            </span>
        </li>
      </ul>
    </component-wrapper>
    <comments-form
        class="mb-3"
        :object-id="product.id"
        :content-type="'product'"
        :comments-count="commentsCount"
        @comment-created="onCommentCreated"
    />
    <comments-section
        :comments="comments"
        :object-id="product.id"
        :content-type="'product'"
        @comments-loaded="onCommentsLoaded"
    />
  </wrapped-loading-spinner>
</template>

<style lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/variables"


.product-name
  color: $color-main
  font-size: 3em
</style>
