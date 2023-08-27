<script setup>
import {computed, onMounted, ref} from 'vue';
import store from '@/store';
import moment from 'moment';
import {getUserImage} from '@/utils';
import CaretDownIcon from '@/components/icons/CaretDownIcon.vue';
import {useRouter} from "vue-router";

const router = useRouter()

const loggedIn = computed(() => !!store.getters['auth/accessToken']);
const user = computed(() => store.getters['auth/user']);

async function loadComments() {

}

const comments = ref(null);
const commentsCount = ref(0);
const hasMoreComment = ref(false);

onMounted(async () => {
  await loadComments();
})
</script>

<template>
  <div class="mb-3">
    <h3>{{ commentsCount === 1 ? 'Comment' : 'Comments' }}</h3>
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
          <router-link class="link-main" :to="{name: 'registration'}">Sign In</router-link>
          or
          <router-link class="link-main" :to="{name: 'login'}">Sign Up</router-link>
          to leave comments.
        </p>
      </template>
    </form>
  </div>
  <div id="comments-wrp" class="container">
    <template v-if="comments">
      <div
          v-for="(comment, index) in comments"
          :key="index"
          class="d-flex align-items-start mb-4"
      >
        <router-link :to="{name: 'profile', params: {userSlug: comment.author.slug}}">
          <img class="me-3 rounded-circle object-fit-cover"
               :src="getUserImage(comment.author)"
               alt="user-image"
               width="40"
               height="40"
          >
        </router-link>
        <div>
          <router-link
              class="fs-5 me-1 link link-dark text-decoration-none"
              :to="{name: 'profile', params: {userSlug: comment.author.slug}}"
          >
            {{ comment.author.username }}
          </router-link>
          <span class="text-body-secondary">{{ moment(comment.created_at).fromNow() }}</span>
          <p class="text-break">{{ comment.text }}</p>
        </div>
      </div>
    </template>
    <div v-else class="container text-center mb-5">
      <img class="mb-4" src="@/assets/icons/comment.svg" alt="comment" width="125" height="125">
      <h4>Looks like no one has left a comment yet, be the first!</h4>
    </div>
  </div>
  <div v-if="hasMoreComment" class="text-center list-group">
    <button
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