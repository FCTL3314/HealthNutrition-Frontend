<script setup>
import {getUserImage} from '@/utils';
import moment from 'moment';
import CaretDownFillIcon from "@/components/icons/CaretDownFillIcon.vue";
import {ref} from "vue";
import CaretUpFillIcon from "@/components/icons/CaretUpFillIcon.vue";

defineProps({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  hasReplies: {
    type: Boolean,
    required: true,
  },
  repliesCount: {
    type: Number,
    required: true,
  },
  edited: {
    type: Boolean,
    required: true,
  }
})

const isRepliesOpened = ref(false);

function toggleReplies() {
  isRepliesOpened.value = !isRepliesOpened.value;
}
</script>

<template>
  <div class="comment-wrp">
    <div class="commend-body">
      <router-link :to="{name: 'profile', params: {userSlug: author.slug}}">
        <img class="me-3 rounded-circle object-fit-cover"
             :src="getUserImage(author)"
             alt="user-image"
             width="40"
             height="40"
        >
      </router-link>
      <div id="text-wrp">
        <router-link
            class="link link-dark comment-author-name"
            :to="{name: 'profile', params: {userSlug: author.slug}}"
        >
          {{ author.username }}
        </router-link>
        <span class="text-body-secondary">
          <span>{{ moment(createdAt).fromNow() }}</span>
          <span class="ms-1" v-if="edited">(edited)</span>
        </span>
        <p class="text-break mb-0">{{ text }}</p>
      </div>
    </div>
    <div class="replies text-main-light">
      <div id="replies-buttons">
        <button
            @click="hasReplies && toggleReplies()"
            class="btn btn-comment"
        >
          <template v-if="hasReplies">
            <caret-up-fill-icon v-if="isRepliesOpened"/>
            <caret-down-fill-icon v-else/>
          </template>
          <span class="ms-1">
            {{ repliesCount }} Replies
          </span>
        </button>
        <span class="mx-1">&middot;</span>
        <button class="btn btn-comment">
          Reply
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/comments"
</style>