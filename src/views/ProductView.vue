<script setup>
import {onMounted, reactive, ref} from "vue";
import api from "@/services/api";
import {useRoute} from "vue-router";
import CommentsSection from "@/components/comments/CommentsSection.vue";
import {createTitle} from "@/utils";
import CommentsForm from "@/components/comments/CommentsForm.vue";
import LoadingWrapper from "@/components/LoadingWrapper.vue";


const route = useRoute()

const product = ref(null);

const comments = reactive([]);
const commentsCount = ref(0);

async function loadProduct() {
  try {
    return (await api.products.product(route.params.productSlug)).data;
  } catch (error) {
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
      });
})
</script>

<template>
  <div class="py-4">
    <loading-wrapper :is-loading="!product">
      <div class="px-2 mx-auto text-center">
        <h1 class="text-main">{{ product.name }}</h1>
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-light">
            <span class="fs-5">
              <span class="fw-semibold text-main-light">Calories: </span>
              <span>{{ product.nutrition.calories }} kcal</span>
            </span>
          </li>
          <li class="list-group-item bg-light">
            <span class="fs-5">
              <span class="fw-semibold text-main-light">Protein: </span>
              <span>{{ product.nutrition.protein }} g.</span>
            </span>
          </li>
          <li class="list-group-item bg-light">
            <span class="fs-5">
              <span class="fw-semibold text-main-light">Fat: </span>
              <span>{{ product.nutrition.fat }} g.</span>
            </span>
          </li>
          <li class="list-group-item bg-light">
            <span class="fs-5">
              <span class="fw-semibold text-main-light">Carbs: </span>
              <span>{{ product.nutrition.carbs }} g.</span>
            </span>
          </li>
          <li class="list-group-item bg-light">
            <span class="fs-5">
              <span class="fw-semibold text-main-light">Category: </span>
              <span>{{ product.category.name }}</span>
            </span>
          </li>
        </ul>
        <hr>
        <h2 class="text-main mb-4">Description</h2>
        <p class="fs-5">{{ product.short_description }}</p>
      </div>
      <hr>
      <div class="row">
        <div class="col-12">
          <comments-form
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
        </div>
      </div>
    </loading-wrapper>
  </div>
</template>

<style lang="sass">
@import "@/assets/sass/main"
</style>
