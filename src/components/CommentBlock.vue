<script setup>
import {getUserImage} from '@/utils';
import moment from 'moment';

defineProps({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  edited: {
    type: Boolean,
    required: true,
  }
})

</script>

<template>
  <div class="comment-wrp">
    <router-link :to="{name: 'profile', params: {userSlug: author.slug}}">
      <img class="me-3 rounded-circle object-fit-cover"
           :src="getUserImage(author)"
           alt="user-image"
           width="40"
           height="40"
      >
    </router-link>
    <div>
      <router-link
          class="link link-dark comment-author-name"
          :to="{name: 'profile', params: {userSlug: author.slug}}"
      >
        {{ author.username }}
      </router-link>
      <span class="text-body-secondary">
        <span>{{ moment(created_at).fromNow() }}</span>
        <span class="ms-1" v-if="edited">(edited)</span>
      </span>
      <p class="text-break">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped lang="sass">
.comment-wrp
  display: flex
  align-items: start
  margin-bottom: 16px

.comment-wrp:last-child
  margin-bottom: 0

.comment-author-name
  font-size: 20px
  margin: 0 4px 0 0
  text-decoration: none
</style>