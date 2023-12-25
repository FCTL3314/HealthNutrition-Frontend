<script setup>
import api from "@/services/api/index";
import {computed, reactive, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {email, helpers, required, sameAs} from "@vuelidate/validators";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import router from "@/router";
import FormFlushMessages from "@/components/forms/FormFlushMessages.vue"
import SubmitButton from "@/components/SubmitButton.vue";
import {passwordValidators, usernameValidators} from "@/validators/vuelidate";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {confettiFromTop} from "@/utils/particles";
import {getVuelidateFieldValidationClass} from "@/services/validation";
import {parseErrorsFromResponse} from "@/services/parsers";


const isResponseWaiting = ref(false);
const errorMessages = reactive([]);

const formData = reactive({
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const rules = {
  username: {
    ...usernameValidators,
    required,
  },
  email: {
    required,
    email,
  },
  password: passwordValidators,
  passwordConfirmation: {
    ...passwordValidators,
    sameAs: helpers.withMessage(
        "The two password fields don’t match",
        sameAs(computed(() => formData.password)),
    ),
  },
};

const v$ = useVuelidate(rules, formData);

async function handleAfterSignUp() {
  confettiFromTop();
  await router.push({name: "logIn"});
}

async function signUp() {
  isResponseWaiting.value = true;
  errorMessages.length = 0;
  try {
    await api.users.register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    await handleAfterSignUp();
  } catch (error) {
    errorMessages.push(...parseErrorsFromResponse(error.request.response));
    console.error(error.response);
  } finally {
    isResponseWaiting.value = false;
    v$.value.$reset();
  }
}
</script>

<template>
  <div class="justify-content-center component-indentation-y">
    <component-wrapper class="container col-lg-5 col-md-8 col-sm-10">
      <form @submit.prevent="signUp">
        <h2 class="form-title text-center">Sign Up</h2>
        <form-flush-messages :error-messages="errorMessages"/>
        <div class="mb-4">
          <label class="form-label text-main">Username</label>
          <input
              v-model="v$.username.$model"
              type="text"
              class="form-control only-bottom-border"
              :class="getVuelidateFieldValidationClass(v$.username)"
              placeholder="Enter username"
          >
          <form-errors-feedback :field="v$.username"/>
        </div>
        <div class="mb-4">
          <label class="form-label text-main">Email</label>
          <input
              v-model="v$.email.$model"
              type="email"
              class="form-control only-bottom-border"
              :class="getVuelidateFieldValidationClass(v$.email)"
              placeholder="Enter email"
          >
          <form-errors-feedback :field="v$.email"/>
        </div>
        <div class="mb-4">
          <label class="form-label text-main">Password</label>
          <input
              v-model="v$.password.$model"
              type="password"
              class="form-control only-bottom-border"
              :class="getVuelidateFieldValidationClass(v$.password)"
              placeholder="Enter password"
          >
          <form-errors-feedback :field="v$.password"/>
        </div>
        <div class="mb-4">
          <label class="form-label text-main">Password confirmation</label>
          <input
              v-model="v$.passwordConfirmation.$model"
              type="password"
              class="form-control only-bottom-border"
              :class="getVuelidateFieldValidationClass(v$.passwordConfirmation)"
              placeholder="Confirm password"
          >
          <form-errors-feedback :field="v$.passwordConfirmation"/>
        </div>
        <div class="text-center mb-2">
          <submit-button
              text="Sign Up"
              :show-loading="isResponseWaiting"
              :is-disabled="v$.$invalid"
          />
        </div>
        <div class="text-center">
          <p class="mb-0">
            <span class="my-0 pe-1">Already registered ?</span>
            <router-link
                :to="{name: 'logIn'}"
                class="link-primary text-decoration-none"
            >
              Login to your account
            </router-link>
          </p>
        </div>
      </form>
    </component-wrapper>
  </div>
</template>


<style lang=sass>
@import '@/assets/sass/main'
@import '@/assets/sass/forms'
</style>