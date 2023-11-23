<script setup>
import {getUserImage} from "@/utils";
import moment from "moment";
import CaretDownFillIcon from "@/components/icons/CaretDownFillIcon.vue";
import {computed, reactive, ref} from "vue";
import CaretUpFillIcon from "@/components/icons/CaretUpFillIcon.vue";
import CommentsSection from "@/components/comments/CommentsSection.vue";
import {isContentTypeAllowed} from "@/validators";
import CommentsForm from "@/components/comments/CommentsForm.vue";


const props = defineProps({
  objectId: {
    type: Number,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
    validator: isContentTypeAllowed,
  },
  comment: {
    type: Object,
    required: true,
  },
})

const replies = reactive([]);
const isRepliesOpened = ref(false);
const isRepliesOpenedAtLeastOnce = ref(false);
const isReplyFormShown = ref(false);
const showReplies = computed(() => !props.comment.parent)
const humanizedCreatedAt = computed(() => moment(props.comment.created_at).fromNow())

const commentAuthorProfileRoute = computed(() => {
  return {name: 'profile', params: {userSlug: props.comment.author.slug}};
})
const commentParentAuthorProfileRoute = computed(() => {
  return {name: 'profile', params: {userSlug: props.comment.parent.author.slug}};
})

const commentAuthorImageSize = 40

const emits = defineEmits(["replyCreated"])

const hasParentCommentAuthorPrefix = computed(() => {
  return props.comment.parent !== null && props.comment.parent.parent_id !== null;
})

function getParentCommentAuthorPrefix() {
  if (hasParentCommentAuthorPrefix) {
    return `@${props.comment.parent.author.slug}`;
  }
  return ''

}

async function onRepliesLoaded(data) {
  replies.push(...data.results);
}

function toggleReplies() {
  isRepliesOpened.value = !isRepliesOpened.value;
  if (!isRepliesOpenedAtLeastOnce.value) {
    isRepliesOpenedAtLeastOnce.value = true;
  }
}

function hideReplyForm() {
  isReplyFormShown.value = false;
}

function toggleReplyForm() {
  isReplyFormShown.value = !isReplyFormShown.value;
}

async function onReplyCreated(reply) {
  hideReplyForm();
  props.comment.replies_count += 1;
  props.comment.has_replies = true;

  if (isRepliesOpenedAtLeastOnce.value) {
    replies.unshift(reply);
  } else if (props.comment.parent) {
    emits("replyCreated", reply);
  } else {
    toggleReplies();
  }
}
</script>

<template>
  <div class="comment-wrp">
    <div class="comment-body">
      <router-link :to="commentAuthorProfileRoute">
        <img class="comment-avatar object-fit-cover"
             :src="getUserImage(comment.author)"
             alt="comment-author-image"
             :width="commentAuthorImageSize"
             :height="commentAuthorImageSize"
        >
      </router-link>
      <div id="text-wrp">
        <router-link
            class="link link-dark comment-author-name"
            :to="commentAuthorProfileRoute"
        >
          {{ comment.author.username }}
        </router-link>
        <span class="text-body-secondary">
          <span>{{ humanizedCreatedAt }}</span>
          <span class="ms-1" v-if="comment.edited">(edited)</span>
        </span>
        <p class="text-break mb-0">
          <template v-if="hasParentCommentAuthorPrefix">
            <router-link
                class="comment-author-prefix-link"
                :to="commentParentAuthorProfileRoute"
            >
              {{ getParentCommentAuthorPrefix() }}
            </router-link>
            <span>&nbsp;</span>
          </template>
          <span>{{ comment.text }}</span>
        </p>
      </div>
    </div>
    <div class="replies">
      <comments-form
          v-if="isReplyFormShown"
          :object-id="objectId"
          :content-type="contentType"
          :is-reply-form="true"
          :parent-id="comment.id"
          @cancel-button="hideReplyForm"
          @comment-created="onReplyCreated"
      />
      <div class="replies-buttons">
        <template v-if="showReplies">
          <button
              @click="comment.has_replies && toggleReplies()"
              class="btn btn-comment"
          >
            <template v-if="comment.has_replies">
              <caret-up-fill-icon v-if="isRepliesOpened"/>
              <caret-down-fill-icon v-else/>
            </template>
            <span class="ms-1">
            {{ comment.replies_count }} Replies
          </span>
          </button>
          <span class="mx-1">&middot;</span>
        </template>
        <button @click="toggleReplyForm" class="btn btn-comment">
          Reply
        </button>
      </div>
      <div v-if="isRepliesOpenedAtLeastOnce">
        <div v-show="isRepliesOpened">
          <comments-section
              :comments="replies"
              :object-id="objectId"
              :content-type="'product'"
              :parent-id="comment.id"
              :is-replies-section="true"
              @comments-loaded="onRepliesLoaded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/comments"


.comment-body
  display: flex
  align-items: flex-start

.btn
  &-comment
    color: $color-main-lighter
    font-weight: 600
    background: transparent
    border-radius: $component-rounding

  &-comment:hover
    background: $color-main-transparent-bg

  &-comment:active
    color: $color-main-lighter

.replies
  margin-left: 56px

.replies-buttons
  color: $color-main-light
  display: flex
  align-items: center

.comment-author-prefix-link
  color: $color-main-light
  font-weight: 500
  text-decoration: none
</style>