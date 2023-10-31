<script setup>
import {computed, ref} from 'vue';
import store from '@/store';
import {getUserImage} from '@/utils';

defineProps({
  commentsCount: {
    type: Number,
    required: true
  },
  isAddingComment: {
    type: Boolean,
    required: true,
  },
})

const user = computed(() => store.getters['auth/user']);

const commentText = ref("");

const emits = defineEmits(["showMoreComments", "addComment"]);

const onClickAddComment = () => {
  emits("addComment", commentText.value);
  commentText.value = "";
}
</script>

<template>
  <div class="mb-3">
    <h3>{{ commentsCount }} {{ commentsCount === 1 ? 'Comment' : 'Comments' }}</h3>
  </div>
  <div class="d-flex">
    <img class="me-3 rounded-circle object-fit-cover"
         :src="getUserImage(user)"
         alt="author-image"
         width="40"
         height="40"
    >
    <form
        v-if="!isAddingComment"
        @submit.prevent="onClickAddComment"
        id="add-comment-form"
        class="w-100">
      <div class="input-group">
        <input
            v-model="commentText"
            class="form-control"
            placeholder="Add a comment..."
            maxlength="516"
            type="text"
            required
            :disabled="!user"
        >
        <button
            class="btn btn-outline-success"
            :class="{disabled: !user || isAddingComment}"
            type="submit"
            id="comment-submit"
        >
          Comment
        </button>
      </div>
      <p v-if="!user">
        <router-link class="link-main" :to="{name: 'logIn'}">Log In</router-link>
        or
        <router-link class="link-main" :to="{name: 'signUp'}">Sign Up</router-link>
        to leave comments.
      </p>
    </form>
    <div v-else class="text-center mx-auto text-main-light">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>