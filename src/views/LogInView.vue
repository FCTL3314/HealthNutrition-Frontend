<script setup>
import api from '@/api/index'
import {reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useVuelidate} from '@vuelidate/core';
import {useStore} from 'vuex';
import {alphaNum, maxLength, minLength, required} from '@vuelidate/validators';
import FormErrorsFeedback from '@/components/forms/FormErrorsFeedback.vue';
import {getValidationClass, resetForm} from "@/utils";
import {PasswordValidator, UsernameValidator} from "@/validators";
import toaster from '@/plugins/toaster';
import {authStorage} from "@/services/auth";
import FormFlushMessages from '@/components/forms/FormFlushMessages.vue'


const router = useRouter();
const store = useStore();

const formData = reactive({
  username: '',
  password: '',
  rememberMe: false,
});

const rules = {
  username: {
    required,
    UsernameValidator,
    minLength: minLength(4),
    maxLength: maxLength(32),
  },
  password: {
    required,
    alphaNum,
    minLength: minLength(8),
    maxLength: maxLength(32),
    PasswordValidator,
  },
};

const v$ = useVuelidate(rules, formData)

const serverErrorMessages = reactive([])

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

function handleServerError(statusCode) {
  if (statusCode === 401) {
    serverErrorMessages.push('Invalid username or password.')
  } else {
    serverErrorMessages.push('Unknown error, please try again later.')
  }
}

const login = async () => {
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
    handleServerError(error.response.status)
    resetForm(v$.value)
    console.error(error.response);
  }
}
</script>

<template>
  <div class="container rounded-4 col-lg-4 col-md-7 col-sm-8 shadow-lg">
    <form @submit.prevent="login" class="py-2 px-1">
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
        <button
            type="submit"
            class="btn btn-outline-primary"
            :class="{disabled: v$.$invalid}"
        >
          Log In
        </button>
      </div>
      <div class="text-center mt-2">
        <p>
          <span class="my-0 pe-1">Not registered ?</span>
          <router-link
              :to="{name: 'registration'}"
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