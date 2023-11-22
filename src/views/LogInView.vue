<script setup>
import api from "@/services/api/index";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useVuelidate} from "@vuelidate/core";
import {useStore} from "vuex";
import {required} from "@vuelidate/validators";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import {getValidationClass, handleAuthError} from "@/utils";
import toaster from "@/plugins/toaster";
import {authStorage} from "@/services/auth";
import FormFlushMessages from "@/components/forms/FormFlushMessages.vue";
import SubmitButton from "@/components/submitButton.vue";
import {passwordValidators, usernameValidators} from "@/validators/vuelidate";


const router = useRouter();
const store = useStore();

const isLogInResponseWaiting = ref(false);
const serverErrorMessages = reactive([])

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

async function storeUserData(data) {

  localStorage.setItem('rememberMe', JSON.stringify(formData.rememberMe));
  store.commit('auth/setAccessToken', data.access);

  authStorage().setItem('accessToken', data.access);
  store.commit('auth/setRefreshToken', data.refresh);

  authStorage().setItem('refreshToken', data.refresh);
  const user = (await api.users.me()).data;
  store.commit('auth/setUser', user);
  authStorage().setItem('user', JSON.stringify(user));

}

const logIn = async () => {
  isLogInResponseWaiting.value = true;
  serverErrorMessages.length = 0;
  try {
    const response = await api.users.obtainToken({
      username: formData.username,
      password: formData.password,
    });
    await storeUserData(response.data)
    await router.push({name: 'categories'})
    toaster.success('You have successfully login!')
  } catch (error) {
    handleAuthError(error, serverErrorMessages, v$);
  } finally {
    isLogInResponseWaiting.value = false;
  }
}
</script>

<template>
  <div class="container rounded-4 col-lg-4 col-md-7 col-sm-8 bg-white shadow-lg">
    <form @submit.prevent="logIn" class="py-2 px-1">
      <div class="mb-4">
        <h2 class="form-title text-center mt-2">Log In</h2>
      </div>
      <form-flush-messages :error-messages="serverErrorMessages"/>
      <hr>
      <div class="mb-4">
        <label class="form-label">Username</label>
        <input
            v-model="v$.username.$model"
            type="text"
            class="form-control"
            :class="getValidationClass(v$.username)"
            placeholder="Enter username"
        >
        <form-errors-feedback :field="v$.username"/>
      </div>
      <div class="mb-4">
        <label class="form-label">Password</label>
        <input
            v-model="v$.password.$model"
            type="password"
            class="form-control"
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
          <a href="#" class="link-secondary text-decoration-none">Forgot password ?</a>
        </div>
      </div>
      <hr>
      <div class="text-center">
        <submit-button
            text="Log In"
            :is-response-waiting="isLogInResponseWaiting"
            :vuelidate-data="v$"
            column-width="4"
        />
      </div>
      <div class="text-center mt-2">
        <p>
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
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/main'
</style>