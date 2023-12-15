<script setup>
import api from "@/services/api/index";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useVuelidate} from "@vuelidate/core";
import {useStore} from "vuex";
import {required} from "@vuelidate/validators";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import {appendResponseErrorMessages, getValidationClass} from "@/utils";
import toaster from "@/plugins/toaster";
import {authStorage} from "@/services/auth";
import FormFlushMessages from "@/components/forms/FormFlushMessages.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import {passwordValidators, usernameValidators} from "@/validators/vuelidate";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


const router = useRouter();
const store = useStore();

const isResponseWaiting = ref(false);
const errorMessages = reactive([]);

const formData = reactive({
  username: '',
  password: '',
  rememberMe: false,
});

const rules = {
  username: {
    ...usernameValidators,
    required,
  },
  password: passwordValidators,
};

const v$ = useVuelidate(rules, formData)

async function saveUserDataLocally(data) {
  localStorage.setItem('rememberMe', JSON.stringify(formData.rememberMe));
  store.commit('auth/setAccessToken', data.access);

  authStorage().setItem('accessToken', data.access);
  store.commit('auth/setRefreshToken', data.refresh);

  authStorage().setItem('refreshToken', data.refresh);
  const user = (await api.users.me()).data;
  store.commit('auth/setUser', user);
  authStorage().setItem('user', JSON.stringify(user));

}

async function handleAfterLogIn() {
  toaster.success('You have successfully login!')
  await router.push({name: 'categories'})
}

async function logIn() {
  isResponseWaiting.value = true;
  errorMessages.length = 0;
  try {
    const response = await api.users.obtainToken({
      username: formData.username,
      password: formData.password,
    });
    await saveUserDataLocally(response.data)
    await handleAfterLogIn()
  } catch (error) {
    appendResponseErrorMessages(errorMessages, error.request.response);
    console.error(error.response);
  } finally {
    isResponseWaiting.value = false;
    v$.value.$reset();
  }
}

const passwordResetRoute = {name: "passwordReset"}
</script>

<template>
  <div class="justify-content-center component-indentation-y">
    <component-wrapper class="container col-lg-4 col-md-6 col-sm-8">
      <form @submit.prevent="logIn">
        <h2 class="form-title text-center">Log In</h2>
        <form-flush-messages :error-messages="errorMessages"/>
        <div class="mb-4">
          <label class="form-label text-main">Username</label>
          <input
              v-model="v$.username.$model"
              type="text"
              class="form-control only-bottom-border"
              :class="getValidationClass(v$.username)"
              placeholder="Enter username"
          >
          <form-errors-feedback :field="v$.username"/>
        </div>
        <div class="mb-4">
          <label class="form-label text-main">Password</label>
          <input
              v-model="v$.password.$model"
              type="password"
              class="form-control only-bottom-border"
              :class="getValidationClass(v$.password)"
              placeholder="Enter password"
          >
          <form-errors-feedback :field="v$.password"/>
        </div>
        <div class="d-flex">
          <div class="form-check me-auto">
            <input
                id="remember-me"
                v-model="formData.rememberMe"
                type="checkbox"
                class="form-check-input"
            >
            <label for="remember-me" class="form-check-label">
              Remember me
            </label>
          </div>
          <div>
            <router-link
                class="link-secondary text-decoration-none"
                :to="passwordResetRoute"
            >
              Forgot password ?
            </router-link>
          </div>
        </div>
        <div class="text-center my-2">
          <submit-button
              text="Log In"
              :show-loading="isResponseWaiting"
              :is-disabled="v$.$invalid"
          />
        </div>
        <div class="text-center">
          <p class="mb-0">
            <span class="my-0 pe-1">Not registered ?</span>
            <router-link
                :to="{name: 'signUp'}"
                class="link-primary text-decoration-none"
            >
              Create an account
            </router-link>
          </p>
        </div>
      </form>
    </component-wrapper>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/main'
@import '@/assets/sass/forms'
</style>