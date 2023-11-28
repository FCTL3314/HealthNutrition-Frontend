<script setup>
import {computed, ref} from "vue";
import store from "@/store";
import {getUserImage} from "@/utils";
import api from "@/services/api";
import {isContentTypeAllowed} from "@/validators";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import LoadingSpinner from "@/components/loading/LoadingSpinner.vue";


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

const user = computed(() => store.getters["auth/user"]);

const commentText = ref("");
const isCommentAdding = ref(false);
const showCommentCount = computed(() => {
  return props.commentsCount !== undefined && props.commentsCount !== null;
})

const emits = defineEmits(["commentCreated", "cancelButton"]);

const onCommentCreated = (comment) => {
  emits("commentCreated", comment);
}

const onClickCancelButton = () => {
  emits("cancelButton");
}

const onClickAddComment = async () => {
  await createComment(commentText.value)
  commentText.value = "";
}

async function createComment(text) {
  isCommentAdding.value = true;
  try {
    const comment = (await api.comments.comment_add(props.objectId, props.contentType, text, props.parentId)).data;
    onCommentCreated(comment);
  } catch (error) {
    console.error(error);
  } finally {
    isCommentAdding.value = false;
  }
}
</script>

<template>
  <component-wrapper :shadow="!isReplyForm">
    <div v-show="showCommentCount" class="mb-3">
      <h3>{{ commentsCount }} {{ commentsCount === 1 ? "Comment" : "Comments" }}</h3>
    </div>
    <div class="d-flex">
      <template v-if="!isCommentAdding">
        <img class="rounded-circle object-fit-cover"
             :src="getUserImage(user)"
             alt="author-image"
             width="40"
             height="40"
        >
        <form @submit.prevent="onClickAddComment" class="w-100">
          <div class="input-group">
            <input
                v-model="commentText"
                class="form-control shadow-none input-underline rounded-0 mx-3"
                placeholder="Add a comment..."
                maxlength="516"
                type="text"
                required
                :disabled="!user"
            >
            <div>
              <button
                  class="btn btn-outline-success common-rounding fw-semibold"
                  :class="{disabled: !user}"
                  type="submit"
                  id="comment-submit"
              >
                Comment
              </button>
              <button
                  @click="onClickCancelButton"
                  v-if="isReplyForm"
                  class="btn btn-outline-purple-black common-rounding ms-3 fw-semibold"
                  type="button"
              >
                Cancel
              </button>
            </div>
          </div>
          <p v-if="!user">
            <router-link class="link-main" :to="{name: 'logIn'}">Log In</router-link>
            or
            <router-link class="link-main" :to="{name: 'signUp'}">Sign Up</router-link>
            to leave comments.
          </p>
        </form>
      </template>
      <div v-else class="text-center mx-auto text-main-light">
        <loading-spinner/>
      </div>
    </div>
  </component-wrapper>
</template>

<style scoped lang="sass">

</style>