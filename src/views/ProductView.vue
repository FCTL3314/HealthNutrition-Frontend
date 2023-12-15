<script setup>
import {onMounted, reactive, ref} from "vue";
import api from "@/services/api";
import {useRoute} from "vue-router";
import CommentsSection from "@/components/comments/CommentsSection.vue";
import {createTitle} from "@/utils";
import AddCommentForm from "@/components/comments/AddCommentForm.vue";
import WrappedLoadingSpinner from "@/components/loading/WrappedLoadingSpinner.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import ErrorSection from "@/components/ErrorSection.vue";


const route = useRoute()

const product = ref(null);
const comments = reactive([]);  // TODO: Move comments variable to the comment component.

const isProductNotFound = ref(false);

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
      isProductNotFound.value = true;
    }
    console.error(error.response);
  }
}

async function setProduct() {
  product.value = await loadProduct();
}

function addComments(data) {
  comments.push(...data.results)
  commentsCount.value = data.count
}

async function addComment(comment) {
  comments.unshift(comment);
  commentsCount.value++;
}

onMounted(async () => {
  await setProduct()
      .then(async () => {
        document.title = createTitle(product.value.name);
        pushNutritionValues();
      });
})
</script>

<template>
  <error-section
      v-if="isProductNotFound"
      description="Oops... Looks like there is no such product or it has been removed."
  />
  <wrapped-loading-spinner :is-loading="!product">
    <component-wrapper class="component-indentation-y text-center">
      <h1 class="product-name">
        {{ product.category.name }} - {{ product.name }}
      </h1>
      <p class="fs-5 mb-0">{{ product.short_description }}</p>
    </component-wrapper>
    <component-wrapper>
      <h2 class="component-title">Description</h2>
      <p class="fs-5 mb-0" v-html="product.description"/>
    </component-wrapper>
    <component-wrapper class="component-indentation-y text-center">
      <h2 class="text-main fs-1">Nutritional value</h2>
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
    <add-comment-form
        class="mb-3"
        :object-id="product.id"
        :content-type="'product'"
        :comments-count="commentsCount"
        @comment-created="addComment"
    />
    <comments-section
        :comments="comments"
        :object-id="product.id"
        :content-type="'product'"
        @comments-loaded="addComments"
    />
  </wrapped-loading-spinner>
</template>

<style lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/variables"


.component-title
  color: $color-main
  font-weight: bold
  font-size: 2.6rem
  text-align: center

.product-name
  @extend .component-title
  font-size: 3rem
</style>
