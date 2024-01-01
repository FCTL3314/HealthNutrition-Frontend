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
import NutritionFacts from "@/components/NutritionFacts.vue";
import TimeToBurnCalories from "@/components/TimeToBurnCalories.vue";


const store = useStore();
const user = computed(() => store.getters['auth/user']);

const route = useRoute()

const product = ref(null);
const comments = reactive([]);

const isProductNotFound = ref(false);

const commentsCount = ref(0);

async function loadProduct() {
  try {
    return (await api.products.product(route.params.productSlug, user.value.profile.bodyWeight)).data;
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
      });
})
</script>

<template>
  <error-section
      v-if="isProductNotFound"
      description="Oops... Looks like there is no such product or it has been removed."
  />
  <wrapped-loading-spinner :is-loading="!product">
    <component-wrapper class="text-center">
      <h1 class="text-main font-large">
        {{ product.category.name }} - {{ product.name }}
      </h1>
      <p class="fs-5 mb-0">{{ product.shortDescription }}</p>
    </component-wrapper>
    <component-wrapper class="component-indentation-y">
      <h2 class="text-main font-big text-center">Description</h2>
      <p class="fs-5 mb-0" v-html="product.description"/>
    </component-wrapper>
    <div class="row justify-content-center component-indentation-bottom">
      <div class="col-xxl-6 col-xl-6 col-lg-6 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
        <nutrition-facts
            class="h-100"
            :calories="product.nutrition.calories"
            :protein="parseFloat(product.nutrition.protein)"
            :fat="parseFloat(product.nutrition.fat)"
            :carbs="parseFloat(product.nutrition.carbs)"
        />
      </div>
      <div class="col-xxl-6 col-xl-6 col-lg-6">
        <time-to-burn-calories
            class="h-100"
            :cycling-time="product.caloriesBurningTime.cycling"
            :running-time="product.caloriesBurningTime.running"
            :walking-time="product.caloriesBurningTime.walking"
            :calories="product.nutrition.calories"
        />
      </div>
    </div>
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
</style>
