<script setup>
import {getUserImage} from "@/utils";
import moment from "moment";
import CaretDownFillIcon from "@/components/icons/CaretDownFillIcon.vue";
import {reactive, ref} from "vue";
import CaretUpFillIcon from "@/components/icons/CaretUpFillIcon.vue";
import CommentsSection from "@/components/comments/CommentsSection.vue";
import {isContentTypeAllowed} from "@/validators";
import AddCommentForm from "@/components/comments/AddCommentForm.vue";


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

const emits = defineEmits(["replyCreated"])

async function onReplyCreated(reply) {
  hideAddReplyForm();
  props.comment.replies_count += 1;
  props.comment.has_replies = true;

  if (isRepliesOpenedAtLeastOnce.value) {
    replies.unshift(reply);
    openReplies();
  } else if (props.comment.parent) {
    emits("replyCreated", reply);
  } else {
    openReplies();
  }
}

const replies = reactive([]);

const isRepliesOpened = ref(false);
const isRepliesOpenedAtLeastOnce = ref(false);
const isAddReplyFormShown = ref(false);
const showRepliesButton = !props.comment.parent;

const parentCommentAuthorPrefix = props.comment.parent && props.comment.parent.parent_id !== null
    ? `@${props.comment.parent.author.slug}`
    : "";
const humanizedCreatedAt = moment(props.comment.created_at).fromNow();

const commentAuthorImageSize = 40

const commentAuthorProfileRoute = {name: 'profile', params: {userSlug: props.comment.author.slug}};
const commentParentAuthorProfileRoute = {name: 'profile', params: {userSlug: props.comment.parent?.author.slug}};

const addReplies = async (data) => replies.push(...data.results);

function toggleReplies() {
  if (isRepliesOpened.value) {
    closeReplies();
  } else {
    openReplies();
  }
}

function openReplies() {
  isRepliesOpenedAtLeastOnce.value = true;
  isRepliesOpened.value = true;
}

function closeReplies() {
  isRepliesOpened.value = false;
}

function hideAddReplyForm() {
  isAddReplyFormShown.value = false;
}

function toggleReplyForm() {
  isAddReplyFormShown.value = !isAddReplyFormShown.value;
}
</script>

<template>
  <div class="comment-wrp">
    <div class="comment-body">
      <router-link :to="commentAuthorProfileRoute">
        <img
            class="comment-avatar object-fit-cover"
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
          <router-link
              v-if="parentCommentAuthorPrefix"
              class="comment-author-prefix-link"
              :to="commentParentAuthorProfileRoute"
          >
            {{ parentCommentAuthorPrefix }}&nbsp;
          </router-link>
          <span>{{ comment.text }}</span>
        </p>
      </div>
    </div>
    <div class="replies">
      <add-comment-form
          v-if="isAddReplyFormShown"
          :object-id="objectId"
          :content-type="contentType"
          :is-reply-form="true"
          :parent-id="comment.id"
          @cancel-button="hideAddReplyForm"
          @comment-created="onReplyCreated"
      />
      <div class="replies-buttons">
        <template v-if="showRepliesButton">
          <button
              @click="comment.has_replies && toggleReplies()"
              class="btn btn-replies"
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
        <button @click="toggleReplyForm" class="btn btn-reply">Reply</button>
      </div>
      <template v-if="isRepliesOpenedAtLeastOnce">
        <div v-show="isRepliesOpened">
          <comments-section
              :comments="replies"
              :object-id="objectId"
              :content-type="'product'"
              :parent-id="comment.id"
              :is-replies-section="true"
              @comments-loaded="addReplies"
          />
        </div>
      </template>
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
  &-replies,
  &-reply
    color: $color-main-lighter
    font-weight: 600
    background: transparent
    border-radius: $component-rounding

  &-replies:hover,
  &-reply:hover
    background: $color-main-transparent-bg

  &-replies:active,
  &-reply:active
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

@media (width < map-get($grid-breakpoints, md))
  .replies
    margin-left: 0
</style>