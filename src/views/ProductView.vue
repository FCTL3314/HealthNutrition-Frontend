<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import api from "@/services/api";
import {useRoute} from "vue-router";
import moment from "moment";
import CommentsSection from "@/components/comments/CommentsSection.vue";
import {createTitle, getImageFullPath} from "@/utils";
import CommentsForm from "@/components/comments/CommentsForm.vue";
import LoadingWrapper from "@/components/LoadingWrapper.vue";


const route = useRoute()

const product = ref(null);

const comments = reactive([]);
const commentsCount = ref(0);

const productImageSize = 332
const humanizedCreatedAt = computed(() => moment(product.created_at).format('LLL'))

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
  <loading-wrapper :is-loading="!product">
    <div class="py-4 px-2 mx-auto">
      <div class="text-center">
        <img
            :width="productImageSize"
            :height="productImageSize"
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
            <span>{{ humanizedCreatedAt }}</span>
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
    </div>
  </loading-wrapper>
</template>

<style lang="sass">

</style>
