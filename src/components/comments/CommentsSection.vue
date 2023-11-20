<script setup>
import {computed, onMounted, ref} from "vue";
import store from "@/store";
import CaretDownIcon from "@/components/icons/CaretDownIcon.vue";
import CommentBlock from "@/components/comments/CommentBlock.vue";
import CommentBlockPlaceholder from "@/components/comments/CommentBlockPlaceholder.vue";
import api from "@/services/api";
import {isContentTypeAllowed} from "@/validators";
import NoCommentsSection from "@/components/comments/NoCommentsSection.vue";
import {COMMENTS_PAGINATE_BY} from "@/constants";


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
    validator: isContentTypeAllowed,
  },
  parentId: {
    type: Number,
  },
})

const user = computed(() => store.getters["auth/user"]);

const isCommentsLoading = ref(false);
const hasMoreComments = ref(false);

let currentPage = 1;

const emits = defineEmits(["commentsLoaded"]);

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
    const data = (await api.comments.comments(props.objectId, props.contentType, page, props.parentId)).data;
    hasMoreComments.value = data.next !== null;
    onCommentsLoaded(data)
  } catch (error) {
    console.error(error);
  } finally {
    isCommentsLoading.value = false;
  }
}

function addReplyComment(reply) {
  const parentComment = props.comments.find(comment => comment.id === reply.parent_id);
  const parentCommentIndex = props.comments.indexOf(parentComment);
  const indexToInsertReply = parentCommentIndex + 1;
  props.comments.splice(indexToInsertReply, 0, reply);
}

onMounted(async () => {
  await loadComments();
})
</script>

<template>
  <div id="comments-wrp" class="container comments-wrp">
    <comment-block
        v-for="comment in comments"
        :key="comment.id"
        :object-id="objectId"
        :content-type="contentType"
        :comment="comment"
        @reply-created="addReplyComment"
    />
    <comment-block-placeholder
        v-if="isCommentsLoading"
        v-for="_ in COMMENTS_PAGINATE_BY"
        :key="_"
    />
    <no-comments-section v-else-if="comments.length === 0"/>
  </div>
  <div v-if="hasMoreComments" class="show-more-comments-wrp list-group">
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


.show-more-comments-wrp
  margin-top: $between-comments-margin
  text-align: center

.comments-wrp
  margin-top: $between-comments-margin

</style>