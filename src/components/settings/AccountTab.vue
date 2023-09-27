<script setup>
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {maxLength, minLength} from "@vuelidate/validators";
import {UsernameValidator} from "@/validators";
import {appendErrors, getValidationClass, resetForm} from "@/utils";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import api from "@/api";
import toaster from "@/plugins/toaster";
import {authStorage} from "@/services/auth";
import FormFlushMessages from "@/components/forms/FormFlushMessages.vue";
import {ALLOWED_IMAGE_EXTENSIONS} from "@/constants";

const store = useStore();
const user = computed(() => store.getters['auth/user']);

const isUpdateResponseWaiting = ref(false);

const formData = reactive({
  username: user.value.username,
  firstName: user.value.first_name,
  lastName: user.value.last_name,
  image: null,
  about: user.value.about,
});

const rules = {
  username: {
    UsernameValidator,
    minLength: minLength(4),
    maxLength: maxLength(32),
  },
  firstName: {
    minLength: minLength(1),
    maxLength: maxLength(150),
  },
  lastName: {
    minLength: minLength(1),
    maxLength: maxLength(150),
  },
  image: {}, // TODO: File Size
  about: {
    minLength: minLength(1),
    maxLength: maxLength(516),
  },
};

const v$ = useVuelidate(rules, formData);

const handleImageFieldChange = (event) => formData.image = event.target.files[0]

const serverErrorMessages = reactive([]);

async function handleAfterUpdateActions(updatedUser) {
  store.commit('auth/setUser', updatedUser);
  authStorage().setItem('user', JSON.stringify(updatedUser));
  toaster.success('Your account data has been successfully updated!')
}

function handleErrorActions(error) {
  appendErrors(serverErrorMessages, error.request.status, error.request.response);
  console.log(error.request);
}

async function update() {
  isUpdateResponseWaiting.value = true;
  serverErrorMessages.length = 0;
  try {
    const response = await api.users.update({
      username: formData.username,
      first_name: formData.firstName,
      last_name: formData.lastName,
      image: formData.image,
      about: formData.about,
    });
    await handleAfterUpdateActions(response.data)
  } catch (error) {
    handleErrorActions(error)
  } finally {
    resetForm(v$.value);
    isUpdateResponseWaiting.value = false;
  }
}
</script>

<template>
  <div class="mb-4">
    <h2>{{ user.username }}'s Account</h2>
  </div>
  <hr>
  <div class="row">
    <form-flush-messages :error-messages="serverErrorMessages"/>
    <div class="mb-4">
      <form @submit.prevent="update">
        <div class="mb-4">
          <label
              for="username"
              class="form-label"
          >
            Username
          </label>
          <input
              id="username"
              v-model="v$.username.$model"
              class="form-control"
              :class="getValidationClass(v$.username)"
              type="text"
          >
          <form-errors-feedback :field="v$.username"/>
        </div>
        <div class="mb-4">
          <label
              for="first_name"
              class="form-label"
          >
            First Name
          </label>
          <input
              id="first_name"
              v-model="v$.firstName.$model"
              class="form-control"
              :class="getValidationClass(v$.firstName)"
              type="text"
              placeholder="Enter your first name"
          >
          <form-errors-feedback :field="v$.firstName"/>
        </div>
        <div class="mb-4">
          <label for="last_name" class="form-label">Last Name</label>
          <input
              id="last_name"
              v-model="v$.lastName.$model"
              class="form-control"
              :class="getValidationClass(v$.lastName)"
              type="text"
              placeholder="Enter your last name"
          >
          <form-errors-feedback :field="v$.lastName"/>
        </div>
        <div class="mb-4">
          <label for="email" class="form-label">
            <span>Email</span>
            <span v-if="user.is_verified" class="text-primary">
              &check; Verified
            </span>
            <span v-else>
              (Unverified, click <a class="text-decoration-none" href="#">here</a> to send a verification email)
            </span>
          </label>
          <input
              id="email"
              class="form-control"
              type="email"
              :value="user.email"
              readonly
          >
        </div>
        <div class="mb-4">
          <label for="image" class="form-label">Image</label>
          <div class="input-group">
            <input
                id="image"
                :accept="ALLOWED_IMAGE_EXTENSIONS"
                @change="handleImageFieldChange"
                class="form-control"
                type="file"
                aria-label="Upload"
            >
          </div>
        </div>
        <div class="mb-4">
          <label for="about" class="form-label">About me</label>
          <div class="input-group">
            <textarea
                id="about"
                v-model="v$.about.$model"
                class="form-control"
                :class="getValidationClass(v$.about)"
                rows="3"
                placeholder="Enter information about you"
            />
            <form-errors-feedback :field="v$.about"/>
          </div>
        </div>
        <div class="row justify-content-center">
          <button
              class="btn btn-outline-primary col-3"
              :class="{disabled: v$.$invalid || isUpdateResponseWaiting}"
              type="submit"
          >
            {{ isUpdateResponseWaiting ? "Loading..." : "Update Profile" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>