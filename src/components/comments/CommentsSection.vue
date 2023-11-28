<script setup>
import {computed, onMounted, ref} from "vue";
import store from "@/store";
import CaretDownIcon from "@/components/icons/CaretDownIcon.vue";
import CommentCard from "@/components/comments/CommentCard.vue";
import CommentCardPlaceholder from "@/components/comments/CommentCardPlaceholder.vue";
import api from "@/services/api";
import {isContentTypeAllowed} from "@/validators";
import NoCommentsSection from "@/components/comments/NoCommentsSection.vue";
import {COMMENTS_PAGINATE_BY} from "@/constants";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


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

let currentPage = 1;

const emits = defineEmits(["commentsLoaded"]);

function onCommentsLoaded(data) {
  emits("commentsLoaded", data);
}

async function onClickShowMore() {
  currentPage++;
  await loadComments(currentPage);
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
  <component-wrapper :class="[{'mb-3': !isRepliesSection}, {'pb-0': isRepliesSection}]" :shadow="!isRepliesSection">
    <div id="comments-wrp" class="container overflow-scroll">
      <CommentCard
          v-for="comment in comments"
          :key="comment.id"
          :object-id="objectId"
          :content-type="contentType"
          :comment="comment"
          @reply-created="addReplyComment"
      />
      <CommentCardPlaceholder
          v-if="isCommentsLoading"
          v-for="_ in COMMENTS_PAGINATE_BY"
          :key="_"
      />
      <no-comments-section v-else-if="comments.length === 0"/>
    </div>
  </component-wrapper>
  <component-wrapper v-if="hasMoreComments" :padding="0">
    <div class="text-center list-group">
      <button
          v-if="!isCommentsLoading"
          @click="onClickShowMore"
          type="button"
          class="list-group-item list-group-item-action text-primary common-rounding fw-semibold border-0"
      >
        Show more
        <caret-down-icon/>
      </button>
    </div>
  </component-wrapper>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/comments"
</style>