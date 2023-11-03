<script setup>
import {computed, ref, onMounted} from "vue";
import store from "@/store";
import CaretDownIcon from "@/components/icons/CaretDownIcon.vue";
import CommentBlock from "@/components/comments/CommentBlock.vue";
import CommentBlockPlaceholder from "@/components/comments/CommentBlockPlaceholder.vue";
import {COMMENTS_ALLOWED_CONTENT_TYPES} from "@/constants";
import api from "@/services/api";

const props = defineProps({
  comments: {
    type: Object,
    required: true,
  },
  objectId: {
    type: Number,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
    validator: (value) => {
      return COMMENTS_ALLOWED_CONTENT_TYPES.includes(value);
    },
  }
})

const user = computed(() => store.getters["auth/user"]);

const isCommentsLoading = ref(false);
const hasMoreComments = ref(false);

let currentPage = 1;

const emits = defineEmits(["commentsLoaded", "showMoreComments"]);

function onCommentsLoaded(data) {
  emits("commentsLoaded", data);
}

async function onClickShowMoreComments() {
  currentPage++
  await loadComments(currentPage)
}

async function loadComments(page = 1) {
  isCommentsLoading.value = true;
  try {
    const data = (await api.comments.comments(props.objectId, props.contentType, page)).data;
    hasMoreComments.value = data.next !== null;
    onCommentsLoaded(data)
  } catch (error) {
    console.error(error);
  } finally {
    isCommentsLoading.value = false;
  }
}

onMounted(async () => {
  await loadComments()
})
</script>

<template>
  <div id="comments-wrp" class="container comments-wrp">
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
@import "@/assets/sass/comments"
</style>