<script setup>
import {onMounted, ref} from "vue";
import api from "@/api";
import {useRoute} from "vue-router";
import moment from 'moment';
import CommentsSection from "@/components/comments/CommentsSection.vue";
import {getImageFullPath, createTitle} from "@/utils";

const route = useRoute()

const product = ref(null);
const isProductLoaded = ref(false);

const comments = ref([]);
const commentsCount = ref(0);
const hasMoreComment = ref(false);
const isCommentsLoading = ref(false);
const isAddingComment = ref(false);


async function loadProduct() {
  isProductLoaded.value = true;
  try {
    return (await api.products.product(route.params.productSlug)).data;
  } catch (error) {
    console.error(error.response);
  } finally {
    isProductLoaded.value = false;
  }
}

async function updateProduct() {
  product.value = await loadProduct();
}

async function loadComments(page = 1) {
  isCommentsLoading.value = true;
  try {
    return (await api.comments.product_comments(product.value.id, page)).data;
  } catch (error) {
    console.error(error);
  } finally {
    isCommentsLoading.value = false;
  }
}

async function updateComments(page = 1) {
  const response = await loadComments(page);
  comments.value.push(...response.results);
  commentsCount.value = response.count;
  hasMoreComment.value = response.next !== null;
}

async function createComment(text) {
  isAddingComment.value = true;
  try {
    return (await api.comments.product_comment_add(product.value.id, text)).data;
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
        await updateComments()
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
        <comments-section
            :comments="comments"
            :comments-count="commentsCount"
            :is-comments-loading="isCommentsLoading"
            :has-more-comments="hasMoreComment"
            :is-adding-comment="isAddingComment"
            @show-more-comments="updateComments"
            @add-comment="async (text) => AddCommentToTop(await createComment(text))"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import "@/assets/sass/main"
</style>
