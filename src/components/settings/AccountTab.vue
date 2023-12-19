<script setup>
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {maxLength, minLength} from "@vuelidate/validators";
import {parseErrorsFromResponse, parseFieldMessagesFromResponse, getValidationClass} from "@/utils";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import api from "@/services/api";
import {ALLOWED_IMAGE_EXTENSIONS} from "@/constants";
import BaseTab from "@/components/settings/BaseTab.vue";
import {updateLocalUser} from "@/services/userUpdate";
import {usernameValidators} from "@/validators/vuelidate";
import toaster from "@/plugins/toaster";


const store = useStore();

const user = computed(() => store.getters["auth/user"]);

const isResponseWaiting = ref(false);

const formData = reactive({
  username: user.value.username,
  firstName: user.value.first_name,
  lastName: user.value.last_name,
  image: null,
  about: user.value.about,
});

const rules = {
  username: usernameValidators,
  firstName: {
    minLength: minLength(1),
    maxLength: maxLength(150),
  },
  lastName: {
    minLength: minLength(1),
    maxLength: maxLength(150),
  },
  about: {
    minLength: minLength(1),
    maxLength: maxLength(516),
  },
};

const v$ = useVuelidate(rules, formData);

const handleImageFieldChange = (event) => formData.image = event.target.files[0];

const errorMessages = reactive([]);

async function updateUser() {
  isResponseWaiting.value = true;
  errorMessages.length = 0;
  try {
    const response = await api.users.update({
      username: formData.username,
      first_name: formData.firstName,
      last_name: formData.lastName,
      image: formData.image,
      about: formData.about,
    });
    await updateLocalUser(response.data);
    toaster.success("Your account data has been successfully updated.");
  } catch (error) {
    errorMessages.push(...parseErrorsFromResponse(error.request.response));
    console.error(error);
  } finally {
    v$.value.$reset();
    isResponseWaiting.value = false;
  }
}
</script>

<template>
  <base-tab
      tab-name="Account Settings"
      :form-submit-callback="updateUser"
      :is-response-waiting="isResponseWaiting"
      :error-messages="errorMessages"
      :v$="v$"
  >
    <div class="mb-4">
      <label for="username" class="form-label text-main">
        Username
      </label>
      <input
          id="username"
          v-model="v$.username.$model"
          class="form-control only-bottom-border"
          :class="getValidationClass(v$.username)"
          type="text"
      >
      <form-errors-feedback :field="v$.username"/>
    </div>
    <div class="mb-4">
      <label for="first_name" class="form-label text-main">
        First Name
      </label>
      <input
          id="first_name"
          v-model="v$.firstName.$model"
          class="form-control only-bottom-border"
          :class="getValidationClass(v$.firstName)"
          type="text"
          placeholder="Enter your first name"
      >
      <form-errors-feedback :field="v$.firstName"/>
    </div>
    <div class="mb-4">
      <label for="last_name" class="form-label text-main">Last Name</label>
      <input
          id="last_name"
          v-model="v$.lastName.$model"
          class="form-control only-bottom-border"
          :class="getValidationClass(v$.lastName)"
          type="text"
          placeholder="Enter your last name"
      >
      <form-errors-feedback :field="v$.lastName"/>
    </div>
    <div class="mb-4">
      <label for="email" class="form-label">
        <span class="text-main">Email</span>
        <span v-if="user.is_verified" class="text-success">
          &check; Verified
        </span>
      </label>
      <input
          id="email"
          class="form-control only-bottom-border"
          type="email"
          :value="user.email"
          readonly
      >
    </div>
    <div class="mb-4">
      <label for="image" class="form-label text-main">Image</label>
      <div class="input-group">
        <input
            id="image"
            :accept="ALLOWED_IMAGE_EXTENSIONS.join(', ')"
            @change="handleImageFieldChange"
            class="form-control common-rounding shadow-none"
            type="file"
            aria-label="Upload"
        >
      </div>
    </div>
    <div class="mb-4">
      <label for="about" class="form-label text-main">About me</label>
      <div class="input-group">
            <textarea
                id="about"
                v-model="v$.about.$model"
                class="form-control only-bottom-border"
                :class="getValidationClass(v$.about)"
                rows="3"
                placeholder="Tell a little about yourself"
            />
        <form-errors-feedback :field="v$.about"/>
      </div>
    </div>
  </base-tab>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>