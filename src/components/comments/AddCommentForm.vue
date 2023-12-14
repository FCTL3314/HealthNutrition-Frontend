<script setup>
import {computed, ref} from "vue";
import {getUserImage} from "@/utils";
import api from "@/services/api";
import {isContentTypeAllowed} from "@/validators";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import LoadingSpinner from "@/components/loading/LoadingSpinner.vue";
import {useStore} from "vuex";


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
  parentId: {
    type: Number,
  },
  isReplyForm: {
    type: Boolean,
    default: false,
  },
  commentsCount: {
    type: Number,
  },
})

const emits = defineEmits(["commentCreated", "cancelButton"]);

const onCommentCreated = (comment) => emits("commentCreated", comment);
const onClickCancelButton = () => emits("cancelButton");

const store = useStore();

const user = computed(() => store.getters["auth/user"]);

const commentText = ref("");

const isCommentAdding = ref(false);
const isCommentCountShown = computed(() => typeof props.commentsCount == "number")

const onClickAddComment = async () => {
  const comment = await createComment(commentText.value)
  commentText.value = "";
  onCommentCreated(comment);
}

async function createComment(text) {
  isCommentAdding.value = true;
  try {
    return (await api.comments.comment_add(props.objectId, props.contentType, text, props.parentId)).data;
  } catch (error) {
    console.error(error);
  } finally {
    isCommentAdding.value = false;
  }
}
</script>

<template>
  <component-wrapper :shadow="!isReplyForm">
    <h3 v-show="isCommentCountShown" class="mb-3">
      {{ commentsCount }} {{ commentsCount === 1 ? "Comment" : "Comments" }}
    </h3>
    <div class="d-flex">
      <template v-if="!isCommentAdding">
        <img class="rounded-circle object-fit-cover"
             :src="getUserImage(user)"
             alt="author-image"
             width="40"
             height="40"
        >
        <form
            @submit.prevent="onClickAddComment"
            class="comment-form w-100"
        >
          <div class="input-group">
            <input
                v-model="commentText"
                class="comment-input form-control only-bottom-border"
                :class="{'pe-none': !user}"
                placeholder="Add a comment..."
                maxlength="516"
                type="text"
                required
            >
            <div class="form-buttons">
              <button
                  class="btn btn-outline-success form-button common-rounding fw-semibold"
                  :class="{disabled: !user}"
                  type="submit"
                  id="comment-submit"
              >
                Comment
              </button>
              <button
                  @click="onClickCancelButton"
                  v-if="isReplyForm"
                  class="btn btn-outline-purple-black form-button common-rounding ms-3 fw-semibold"
                  type="button"
              >
                Cancel
              </button>
            </div>
          </div>
          <p v-if="!user" class="ms-3 mt-2 mb-0">
            <router-link class="link-main" :to="{name: 'logIn'}">Log In</router-link>
            or
            <router-link class="link-main" :to="{name: 'signUp'}">Sign Up</router-link>
            to leave comments.
          </p>
        </form>
      </template>
      <div v-else class="text-center mx-auto">
        <loading-spinner/>
      </div>
    </div>
  </component-wrapper>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/comments"


.comment-input
    margin-left: 1rem !important
    margin-right: 1rem !important

@media (width < map-get($grid-breakpoints, md))
  .form-buttons
    margin-left: auto !important
    margin-top: .75rem !important

  .form-button
    font-size: .7em

  .comment-input
    width: 100% !important
    margin-right: 0 !important

  .comment-form
    display: flex !important
    flex-wrap: wrap !important
</style>