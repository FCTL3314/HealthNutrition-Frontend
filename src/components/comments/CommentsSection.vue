<script setup>
import {computed} from 'vue';
import store from '@/store';
import CaretDownIcon from '@/components/icons/CaretDownIcon.vue';
import CommentBlock from '@/components/comments/CommentBlock.vue';
import CommentBlockPlaceholder from '@/components/comments/CommentBlockPlaceholder.vue';

defineProps({
  comments: {
    type: Object,
    required: true,
  },
  isCommentsLoading: {
    type: Boolean,
    required: true,
  },
  hasMoreComments: {
    type: Boolean,
    required: true,
  },
})

const user = computed(() => store.getters['auth/user']);

let currentPage = 1;

const emits = defineEmits(["showMoreComments", "addComment"]);

const onClickShowMoreComments = () => {
  currentPage++
  emits("showMoreComments", currentPage);
}
</script>

<template>
  <div id="comments-wrp" class="container my-3">
    <comment-block
        v-for="(comment, index) in comments"
        :key="index"
        :text="comment.text"
        :author="comment.author"
        :created-at="comment.created_at"
        :has-replies="comment.has_replies"
        :replies-count="comment.replies_count"
        :edited="comment.edited"
    />
    <comment-block-placeholder
        v-if="isCommentsLoading"
        v-for="_ in 3"
        :key="_"
    />
    <div v-else-if="comments.length === 0" class="container text-center">
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