<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {computed, onMounted, reactive, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {getValidationClass} from "@/utils";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import api from "@/services/api";
import toaster from "@/plugins/toaster";
import {passwordValidators} from "@/validators/vuelidate";
import router from "@/router";
import {helpers, sameAs} from "@vuelidate/validators";
import {useRoute} from "vue-router";
import WrappedLoadingSpinner from "@/components/loading/WrappedLoadingSpinner.vue";
import ErrorSection from "@/components/ErrorSection.vue";


const route = useRoute();

const isUIDAndTokenChecking = ref(true);
const isUIDAndTokenValid = ref(false);
const isResponseWaiting = ref(false);

const uid = route.params.uid;
const token = route.params.token;

const formData = reactive({
  newPassword: "",
  newPasswordConfirmation: "",
});

const rules = {
  newPassword: passwordValidators,
  newPasswordConfirmation: {
    ...passwordValidators,
    sameAs: helpers.withMessage(
        "The two password fields don’t match",
        sameAs(computed(() => formData.newPassword)),
    ),
  },
};

const v$ = useVuelidate(rules, formData)

async function checkUIDAndToken() {
  isUIDAndTokenChecking.value = true;
  try {
    return (await api.auth.checkUIDAndToken({uid, token})).request.status === 204;
  } catch (error) {
    console.error(error);
  } finally {
    isUIDAndTokenChecking.value = false;
  }
}

const logInRoute = {name: "logIn"}

async function resetPassword() {
  isResponseWaiting.value = true;
  try {
    await api.users.resetPasswordConfirm({uid, token, new_password: formData.newPassword});
    await router.push(logInRoute);
    toaster.success("Your password has been successfully updated, use it to log in.");
  } catch (error) {
    console.error(error);
  } finally {
    isResponseWaiting.value = false;
  }
}

onMounted(async () => {
  isUIDAndTokenValid.value = await checkUIDAndToken();
})
</script>

<template>
  <wrapped-loading-spinner text="Check the validity of the link..." :is-loading="isUIDAndTokenChecking">
    <div v-if="isUIDAndTokenValid" class="justify-content-center component-indentation-y">
      <component-wrapper class="container col-xxl-4 col-lg-5 col-md-7 col-sm-9">
        <form @submit.prevent="resetPassword">
          <h2 class="form-title text-center">Password Reset</h2>
          <p>
            Please provide a new password for your account. In the future, you will have to use this new password to log
            in.
          </p>
          <div class="mb-4">
            <label class="form-label text-main">New password</label>
            <input
                v-model="v$.newPassword.$model"
                type="password"
                class="form-control only-bottom-border"
                :class="getValidationClass(v$.newPassword)"
                placeholder="Enter new password"
            >
            <form-errors-feedback :field="v$.newPassword"/>
          </div>
          <div class="mb-4">
            <label class="form-label text-main">New password confirmation</label>
            <input
                v-model="v$.newPasswordConfirmation.$model"
                type="password"
                class="form-control only-bottom-border"
                :class="getValidationClass(v$.newPasswordConfirmation)"
                placeholder="Confirm new password"
            >
            <form-errors-feedback :field="v$.newPasswordConfirmation"/>
          </div>
          <div class="text-center my-2">
            <submit-button text="Reset" :is-response-waiting="isResponseWaiting"/>
          </div>
          <div class="text-center">
            <p class="mb-0">
              <span class="my-0 pe-1">Don't want to reset ?</span>
              <router-link
                  :to="logInRoute"
                  class="link link-primary text-decoration-none"
              >
                Log In
              </router-link>
            </p>
          </div>
        </form>
      </component-wrapper>
    </div>
    <error-section
        v-else
        :show-sad-emoji="true"
        description="Ouch... This link has expired or is not valid."
        :show-go-back-button="false"
    />
  </wrapped-loading-spinner>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/forms"
</style>