<script setup>
import {onMounted, ref} from "vue";
import api from "@/services/api";
import {useRoute} from "vue-router";
import moment from "moment";
import CommentsSection from "@/components/comments/CommentsSection.vue";
import {createTitle, getImageFullPath} from "@/utils";
import CommentsForm from "@/components/comments/CommentsForm.vue";


const route = useRoute()

const product = ref(null);
const isProductLoading = ref(false);

const comments = ref([]);
const commentsCount = ref(0);
const isAddingComment = ref(false);

async function loadProduct() {
  isProductLoading.value = true;
  try {
    return (await api.products.product(route.params.productSlug)).data;
  } catch (error) {
    console.error(error.response);
  } finally {
    isProductLoading.value = false;
  }
}

async function updateProduct() {
  product.value = await loadProduct();
}

function onCommentsLoaded(data) {
  comments.value.push(...data.results)
  commentsCount.value = data.count
}

async function createComment(text) {
  isAddingComment.value = true;
  try {
    return (await api.comments.comment_add(product.value.id, 'product', text)).data;
  } catch (error) {
    console.error(error);
  } finally {
    isAddingComment.value = false;
  }
}

async function AddCommentToTop(comment) {
  comments.value.unshift(comment);
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
  <div v-if="product" class="py-4 px-2 mx-auto">
    <div class="text-center">
      <img
          width="332"
          height="332"
          class="img-fluid mb-2"
          :src="getImageFullPath(product.image)"
          alt="product-logo"
      >
      <h2 class="text-main">{{ product.name }}</h2>
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-light">
          <span class="fs-5">
            <span class="fw-semibold">Price: </span>
            <span>{{ product.price }}$</span>
          </span>
        </li>
        <li class="list-group-item bg-light">
          <span class="fs-5">
            <span class="fw-semibold">Category: </span>
            <span>{{ product.product_type.name }}</span>
          </span>
        </li>
        <li class="list-group-item bg-light">
          <span class="fs-5">
            <span class="fw-semibold">Store: </span>
            <a
                class="link-main text-decoration-underline"
                :href="product.store.url"
                target="_blank"
            >
              <span>{{ product.store.name }}</span>
            </a>
          </span>
        </li>
        <li class="list-group-item bg-light">
          <span class="fs-5">
            <span class="fw-semibold">Views: </span>
            <span>{{ product.views }}</span>
          </span>
        </li>
        <li class="list-group-item bg-light">
          <span class="fs-5">
            <span class="fw-semibold">Added: </span>
            <span>{{ moment(product.created_at).format('LLL') }}</span>
          </span>
        </li>
      </ul>
      <hr>
      <h2 class="text-main mb-4">Description</h2>
      <p class="fs-5">{{ product.description }}</p>
    </div>
    <hr>
    <div class="row">
      <div class="col-12">
        <comments-form
            :is-adding-comment="isAddingComment"
            :comments-count="commentsCount"
            @add-comment="async (text) => AddCommentToTop(await createComment(text))"
        />
        <comments-section
            :comments="comments"
            :object-id="product.id"
            :content-type="'product'"
            @comments-loaded="onCommentsLoaded"
        />
      </div>
    </div>
  </div>
  <div v-else class="loading-spinner-wrp">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="fs-4 text-main-light">Loading...</p>
  </div>
</template>

<style lang="sass">
@import "@/assets/sass/main"

.loading-spinner-wrp
  text-align: center
  padding: 6em 0 0 0
  color: $color-main-light
</style>
