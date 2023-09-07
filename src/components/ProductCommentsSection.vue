<script setup>
import {computed, onMounted, ref} from 'vue';
import store from '@/store';
import {getUserImage} from '@/utils';
import CaretDownIcon from '@/components/icons/CaretDownIcon.vue';
import CommentBlock from '@/components/CommentBlock.vue';
import {useRouter} from "vue-router";
import api from "@/api";

const router = useRouter()

const loggedIn = computed(() => !!store.getters['auth/accessToken']);
const user = computed(() => store.getters['auth/user']);

const comments = ref([]);
const commentsCount = ref(0);
const hasMoreComment = ref(false);
const currentPage = ref(1);

const isCommentsLoading = ref(false);

async function loadComments() {
  setTimeout(async () => {
    try {
      const response = (await api.comments.product_comments(1, currentPage.value)).data;
      comments.value.push(...response.results);
      commentsCount.value = response.count;
      hasMoreComment.value = response.next !== null;
      currentPage.value++;
      isCommentsLoading.value = false;
    } catch (error) {
      console.error(error);
    }
  }, 400)
}

async function loadMoreComments() {
  isCommentsLoading.value = true;
  await loadComments();
}

onMounted(async () => {
  isCommentsLoading.value = true;
  await loadComments();
})
</script>

<template>
  <div class="mb-3">
    <h3>{{ commentsCount }} {{ commentsCount === 1 ? 'Comment' : 'Comments' }}</h3>
  </div>
  <div class="d-flex mb-3">
    <img class="me-3 rounded-circle object-fit-cover"
         :src="getUserImage(user)"
         alt="author-image"
         width="40"
         height="40"
    >
    <form id="add-comment-form" class="w-100">
      <div v-if="loggedIn" class="input-group">
        <input
            class="form-control"
            placeholder="Add a comment..."
            maxlength="516"
            type="text"
        >
        <button class="btn btn-outline-success" type="submit" id="comment-submit">Comment</button>
      </div>
      <template v-else>
        <div class="input-group">
          <input
              class="form-control"
              placeholder="Add a comment..."
              maxlength="516"
              type="text"
              disabled=""
          >
          <button class="btn btn-outline-success" type="submit" id="comment-submit" disabled="">Comment</button>
        </div>
        <p>
          <router-link class="link-main" :to="{name: 'login'}">Log In</router-link>
          or
          <router-link class="link-main" :to="{name: 'registration'}">Sign Up</router-link>
          to leave comments.
        </p>
      </template>
    </form>
  </div>
  <div id="comments-wrp" class="container">
    <comment-block
        v-for="(comment, index) in comments"
        :key="index"
        :text="comment.text"
        :author="comment.author"
        :created_at="comment.created_at"
        :edited="comment.edited"
    />
    <div v-if="isCommentsLoading" class="text-center">
    <span
        class="spinner-border text-primary"
        role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </span>
    </div>
    <div v-if="commentsCount === 0 && !isCommentsLoading" class="container text-center mb-5">
      <img class="mb-4" src="@/assets/icons/comment.svg" alt="comment" width="125" height="125">
      <h4>Looks like no one has left a comment yet, be the first!</h4>
    </div>
  </div>
  <div
      v-if="hasMoreComment"
      @click="loadMoreComments"
      class="text-center list-group"
  >
    <button
        v-if="!isCommentsLoading"
        type="button"
        class="list-group-item list-group-item-action text-primary"
    >
      Show more
      <caret-down-icon/>
    </button>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>