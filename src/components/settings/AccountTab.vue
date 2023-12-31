<script setup>
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {maxLength, maxValue, minLength, minValue} from "@vuelidate/validators";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import api from "@/services/api";
import {ALLOWED_USER_IMAGE_EXTENSIONS, MAX_USER_BODY_WEIGHT_KG, MIN_USER_BODY_WEIGHT_KG} from "@/constants";
import BaseTab from "@/components/settings/BaseTab.vue";
import {updateLocalUser} from "@/services/user";
import {usernameValidators} from "@/validators/vuelidate";
import toaster from "@/plugins/toaster";
import {getVuelidateFieldValidationClass} from "@/services/validation";
import {parseErrorsFromResponse} from "@/services/parsers";


const store = useStore();

const user = reactive(store.getters["auth/user"]);

const isResponseWaiting = ref(false);

const formData = reactive({
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  image: null,
  about: user.profile.about,
  bodyWeight: user.profile.bodyWeight,
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
  bodyWeight: {
    minValue: minValue(MIN_USER_BODY_WEIGHT_KG),
    maxValue: maxValue(MAX_USER_BODY_WEIGHT_KG),
  }
};

const v$ = useVuelidate(rules, formData);

const handleImageFieldChange = (event) => formData.image = event.target.files[0];

const errorMessages = reactive([]);

async function updateUser() {
  isResponseWaiting.value = true;
  errorMessages.length = 0;
  try {
    const updateUser = (await api.users.update({
      username: formData.username,
      first_name: formData.firstName,
      last_name: formData.lastName,
    })).data;
    const updateUserProfile = (await api.users.updateProfile({
      image: formData.image,
      about: formData.about,
      bodyWeight: formData.bodyWeight,
    })).data;
    await updateLocalUser(updateUser, updateUserProfile);
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
          :class="getVuelidateFieldValidationClass(v$.username)"
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
          :class="getVuelidateFieldValidationClass(v$.firstName)"
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
          :class="getVuelidateFieldValidationClass(v$.lastName)"
          type="text"
          placeholder="Enter your last name"
      >
      <form-errors-feedback :field="v$.lastName"/>
    </div>
    <div class="mb-4">
      <label for="email" class="form-label">
        <span class="text-main">Email</span>
        <span v-if="user.isVerified" class="text-success">
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
            :accept="ALLOWED_USER_IMAGE_EXTENSIONS.join(', ')"
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
                :class="getVuelidateFieldValidationClass(v$.about)"
                rows="3"
                placeholder="Tell a little about yourself"
            />
        <form-errors-feedback :field="v$.about"/>
      </div>
    </div>
    <div class="mb-4">
      <label for="first_name" class="form-label text-main">
        Body Weight
      </label>
      <input
          id="first_name"
          v-model="v$.bodyWeight.$model"
          class="form-control only-bottom-border"
          :class="getVuelidateFieldValidationClass(v$.bodyWeight)"
          type="number"
          step="0.5"
          placeholder="Enter your body weight"
      >
      <form-errors-feedback :field="v$.bodyWeight"/>
    </div>
  </base-tab>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>