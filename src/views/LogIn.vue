<script setup>
import {reactive} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import {minLength, maxLength, required} from '@vuelidate/validators';
import FormErrorsFeedback from '@/components/FormErrorsFeedback.vue';


const formData = reactive({
  username: '',
  password: '',
  rememberMe: false,
});

const rules = {
  username: {
    required,
    minLength: minLength(4),
    maxLength: maxLength(32),
  },
  password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(32),
  },
}

const v$ = useVuelidate(rules, formData)

function getValidationClass(field) {
  let validationClass = '';
  if (field.$dirty) {
    if (field.$errors.length) {
      validationClass = 'is-invalid';
    } else {
      validationClass = 'is-valid';
    }
  }
  return validationClass;
}

</script>

<template>
  <div class="container rounded-4 col-lg-4 col-md-7 col-sm-8 shadow-lg">
    <form class="py-2 px-1" action="" method="post">
      <div class="mb-4">
        <h2 class="form-title text-center mt-2">Log In</h2>
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
              v-model="formData.rememberMe"
              type="checkbox"
              class="form-check-input"
          >
          <label class="form-check-label">
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
</style>