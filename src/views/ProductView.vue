<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import api from "@/services/api";
import {useRoute} from "vue-router";
import CommentsSection from "@/components/comments/CommentsSection.vue";
import AddCommentForm from "@/components/comments/AddCommentForm.vue";
import WrappedLoadingSpinner from "@/components/loading/WrappedLoadingSpinner.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import ErrorSection from "@/components/ErrorSection.vue";
import {createTitle} from "@/services/text";
import {useStore} from "vuex";


const store = useStore();
const user = computed(() => store.getters['auth/user']);

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

const loginRoute = {name: "logIn"};

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
    <div class="row component-indentation-y">
      <component-wrapper class="text-center">
        <h1 class="product-name font-large">
          {{ product.category.name }} - {{ product.name }}
        </h1>
        <p class="fs-5 mb-0">{{ product.shortDescription }}</p>
      </component-wrapper>
      <component-wrapper class="component-indentation-y">
        <h2 class="section-title">Description</h2>
        <p class="fs-5 mb-0" v-html="product.description"/>
      </component-wrapper>
      <div class="nutrition-facts-section col-xxl-6 col-xl-6 col-lg-6">
        <component-wrapper class="text-center">
          <h2 class="section-title">Nutritional facts</h2>
          <ul class="list-group list-group-flush">
            <li
                v-for="(nutritionValue, index) in nutritionValues"
                :key="index"
                class="list-group-item font-standard"
            >
              <span class="fw-semibold">{{ nutritionValue.title }}</span>
              <span class="text-main-light">{{ nutritionValue.value }} {{ nutritionValue.units }}</span>
            </li>
          </ul>
        </component-wrapper>
      </div>
      <div class="col-xxl-6 col-xl-6 col-lg-6">
        <component-wrapper class="text-center">
          <h2 class="section-title">
            Time to burn {{ product.nutrition.calories }} kcal
          </h2>
          <ul class="list-group list-group-flush font-standard">
            <li class="list-group-item">
              <span class="fw-semibold">Walking (3mph): </span>
              <span class="text-main-light">{{ product.caloriesBurningTime.walking }}</span>
            </li>
            <li class="list-group-item">
              <span class="fw-semibold">Running (6mph): </span>
              <span class="text-main-light">{{ product.caloriesBurningTime.running }}</span>
            </li>
            <li class="list-group-item">
              <span class="fw-semibold">Cycling (10mph): </span>
              <span class="text-main-light">{{ product.caloriesBurningTime.cycling }}</span>
            </li>
            <li class="list-group-item font-small">
              <span v-if="user">
                The values are calculated based on your weight ({{ user.bodyWeight }} kg).
              </span>
              <template v-else>
                <span>Values estimated based on person weighing 70 kg.</span>
                <router-link :to="loginRoute" class="link-primary text-decoration-none">
                  Log In
                </router-link>
                <span>to personalize.</span>
              </template>
            </li>
          </ul>
        </component-wrapper>
      </div>
      <add-comment-form
          class="component-indentation-top mb-3"
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
    </div>
  </wrapped-loading-spinner>
</template>

<style lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/variables"


.section-title
  color: $color-main
  font-weight: bold
  font-size: $font-size-big
  text-align: center

.product-name
  @extend .section-title
  font-size: $font-size-large

@media (width < map-get($grid-breakpoints, lg))
  .nutrition-facts-section
    margin-bottom: $between-components-indentation
</style>
