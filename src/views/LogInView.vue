<script setup>
import api from '@/api/index'
import {reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useVuelidate} from '@vuelidate/core';
import {useStore} from 'vuex';
import {alphaNum, maxLength, minLength, required} from '@vuelidate/validators';
import FormErrorsFeedback from '@/components/FormErrorsFeedback.vue';
import {getValidationClass} from "@/utils";
import {UsernameValidator, PasswordValidator} from "@/validators";


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

const serverErrors = reactive([])

const resetForm = () => {
  v$.value.$reset();
}

const login = async () => {
  serverErrors.length = 0;
  try {
    const response = await api.users.obtainToken({
      username: formData.username,
      password: formData.password,
    });
    store.commit('auth/setAccessToken', response.data.access)
    store.commit('auth/setRefreshToken', response.data.refresh)
    localStorage.setItem('accessToken', response.data.access)
    localStorage.setItem('refreshToken', response.data.refresh)
    await router.push({name: 'categories'})
  } catch (error) {
    if (error.response.status === 401) {
      serverErrors.push('Invalid username or password.')
    } else {
      serverErrors.push('Unknown error.')
    }
    resetForm()
    console.error(error.response.data);
  }
}
</script>

<template>
  <div class="container rounded-4 col-lg-4 col-md-7 col-sm-8 shadow-lg">
    <form @submit.prevent="login" class="py-2 px-1">
      <div class="mb-4">
        <h2 class="form-title text-center mt-2">Log In</h2>
      </div>
      <div
          v-if="serverErrors.length"
          class="alert alert-warning"
          role="alert"
      >
        <ul class="error-list">
          <li
              v-for="(message, index) in serverErrors"
              :key="index"
          >
            {{ message }}
          </li>
        </ul>
      </div>
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

<style scoped lang="sass">
@import '@/assets/sass/main'
@import '@/assets/sass/forms'
</style>