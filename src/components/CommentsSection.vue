<script setup>
import {computed, ref} from 'vue';
import store from '@/store';
import {getUserImage} from '@/utils';
import CaretDownIcon from '@/components/icons/CaretDownIcon.vue';
import CommentBlock from '@/components/CommentBlock.vue';

defineProps({
  comments: {
    type: Object,
    required: true,
  },
  commentsCount: {
    type: Number,
    required: true
  },
  isCommentsLoading: {
    type: Boolean,
    required: true,
  },
  hasMoreComments: {
    type: Boolean,
    required: true,
  },
  isAddingComment: {
    type: Boolean,
    required: true,
  }
})

const commentText = ref("");

let currentPage = 1;

const emits = defineEmits(["showMoreComments", "addComment"]);

const onClickShowMoreComments = () => {
  currentPage++
  emits("showMoreComments", currentPage);
}

const onClickAddComment = () => {
  emits("addComment", commentText.value);
  commentText.value = "";
}
const loggedIn = computed(() => !!store.getters['auth/accessToken']);
const user = computed(() => store.getters['auth/user']);
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
    <form @submit.prevent="onClickAddComment" id="add-comment-form" class="w-100">
        <div class="input-group">
          <input
              v-model="commentText"
              class="form-control"
              placeholder="Add a comment..."
              maxlength="516"
              type="text"
              :disabled="!loggedIn"
          >
          <button
              class="btn btn-outline-success"
              :class="{disabled: !loggedIn || isAddingComment}"
              type="submit"
              id="comment-submit"
          >
            {{ isAddingComment ? "Loading..." : "Comment" }}
          </button>
        </div>
        <p v-if="!loggedIn">
          <router-link class="link-main" :to="{name: 'logIn'}">Log In</router-link>
          or
          <router-link class="link-main" :to="{name: 'registration'}">Sign Up</router-link>
          to leave comments.
        </p>
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
    <div v-if="comments.length === 0 && !isCommentsLoading" class="container text-center mb-5">
      <img class="mb-4" src="@/assets/icons/comment.svg" alt="comment" width="125" height="125">
      <h4>Looks like no one has left a comment yet, be the first!</h4>
    </div>
  </div>
  <div v-if="hasMoreComments" class="text-center list-group">
    <button
        v-if="!isCommentsLoading"
        @click="onClickShowMoreComments"
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