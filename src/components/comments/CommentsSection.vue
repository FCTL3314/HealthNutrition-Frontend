<script setup>
import {computed, onMounted, ref} from "vue";
import store from "@/store";
import CommentCard from "@/components/comments/CommentCard.vue";
import CommentCardPlaceholder from "@/components/comments/CommentCardPlaceholder.vue";
import api from "@/services/api";
import {isContentTypeAllowed} from "@/validators";
import NoCommentsSection from "@/components/comments/NoCommentsSection.vue";
import {COMMENTS_PAGINATE_BY} from "@/constants";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import ShowMoreButton from "@/components/ShowMoreButton.vue";


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
  isRepliesSection: {
    type: Boolean,
    default: false,
  }
})

const user = computed(() => store.getters["auth/user"]);

const isCommentsLoading = ref(false);
const hasMoreComments = ref(false);
const isShowMoreCommentsBtnShown = computed(() => hasMoreComments.value && !isCommentsLoading.value);

const emits = defineEmits(["commentsLoaded"]);

function onCommentsLoaded(data) {
  emits("commentsLoaded", data);
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
  const parentCommentIndex = props.comments.findIndex(comment => comment.id === reply.parentId);
  props.comments.splice(parentCommentIndex + 1, 0, reply);
}

onMounted(async () => {
  await loadComments();
})
</script>

<template>
  <component-wrapper
      :class="[{'mb-3': !isRepliesSection && isShowMoreCommentsBtnShown}, {'pb-0': isRepliesSection}]"
      :shadow="!isRepliesSection">
    <div id="comments-wrp" class="container overflow-scroll">
      <comment-card
          v-for="comment in comments"
          :key="comment.id"
          :object-id="objectId"
          :content-type="contentType"
          :comment="comment"
          @reply-created="addReplyComment"
          class="animate__animated animate__fadeIn"
      />
      <comment-card-placeholder
          v-if="isCommentsLoading"
          v-for="_ in COMMENTS_PAGINATE_BY"
          :key="_"
      />
      <no-comments-section v-else-if="comments.length === 0"/>
    </div>
  </component-wrapper>
  <component-wrapper :padding="0">
    <show-more-button
        v-show="isShowMoreCommentsBtnShown"
        pagination-type="pageNumber"
        @show-more-button-click="loadComments"
    />
  </component-wrapper>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/comments"
</style>