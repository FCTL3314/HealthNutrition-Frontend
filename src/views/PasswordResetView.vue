<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {reactive, ref} from "vue";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {getValidationClass} from "@/utils";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import api from "@/services/api";
import toaster from "@/plugins/toaster";
import router from "@/router";


const isResponseWaiting = ref(false);

const formData = reactive({
  email: "",
});

const rules = {
  email: {
    required,
    email,
  },
};

const v$ = useVuelidate(rules, formData)

const logInRoute = {name: "logIn"}

const sendResetEmail = async () => {
  isResponseWaiting.value = true;
  try {
    await api.users.resetPassword({email: formData.email});
    await router.push(logInRoute);
    toaster.success(
        "We’ve emailed you instructions for setting your password, if an account exists with the email you " +
        "entered. You should receive them shortly. If you don’t receive an email, please make sure you’ve entered " +
        "the address you registered with, and check your spam folder."
    );
  } catch (error) {
    console.error(error);
  } finally {
    isResponseWaiting.value = false;
    formData.email = ""
    v$.value.$reset()
  }
}
</script>

<template>
  <div class="justify-content-center component-indentation-y">
    <component-wrapper class="container col-xxl-4 col-lg-5 col-md-7 col-sm-9">
      <form @submit.prevent="sendResetEmail">
        <h2 class="form-title text-center">Password Reset</h2>
        <p>
          Forgot your password? No worries! Use our reset password form to regain access to your account. Simply enter
          the email associated with your account, and we'll send you an email to reset your password.
        </p>
        <div>
          <label class="form-label text-main">Email</label>
          <input
              v-model="v$.email.$model"
              type="email"
              class="form-control only-bottom-border"
              :class="getValidationClass(v$.email)"
              placeholder="Enter email"
          >
          <form-errors-feedback :field="v$.email"/>
        </div>
        <div class="text-center mt-3 mb-2">
          <submit-button :is-response-waiting="isResponseWaiting"/>
        </div>
        <div class="text-center">
          <p class="mb-0">
            <span class="me-1">Don't want to reset ?</span>
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
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
@import "@/assets/sass/forms"
</style>