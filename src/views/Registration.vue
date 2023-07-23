<script setup>
import {reactive, computed} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import {alphaNum, maxLength, minLength, email, required, sameAs, helpers} from '@vuelidate/validators';
import FormErrorsFeedback from '@/components/FormErrorsFeedback.vue';
import {getValidationClass} from "@/utils";
import {UsernameValidator, PasswordValidator} from "@/validators";


const formData = reactive({
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const rules = {
  username: {
    required,
    UsernameValidator,
    minLength: minLength(4),
    maxLength: maxLength(32),
  },
  email: {
    required,
    email,
  },
  password: {
    required,
    alphaNum,
    minLength: minLength(8),
    maxLength: maxLength(32),
    PasswordValidator,
  },
  password_confirmation: {
    required,
    alphaNum,
    minLength: minLength(8),
    maxLength: maxLength(32),
    PasswordValidator,
    sameAs: helpers.withMessage(
        "The two password fields didn’t match",
        sameAs(computed(() => formData.password)),
    ),
  },
};

const v$ = useVuelidate(rules, formData)
</script>

<template>
  <div class="container rounded-4 col-lg-5 col-md-8 shadow-lg">
    <form class="py-2 px-1" action="" method="post">
      <div class="mb-4">
        <h2 class="form-title text-center mt-2">Sign Up</h2>
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
        <label class="form-label">Email</label>
        <input
            v-model="v$.email.$model"
            type="email"
            class="form-control"
            :class="getValidationClass(v$.email)"
            placeholder="Enter email"
        >
        <form-errors-feedback :field="v$.email"/>
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
      <div class="mb-4">
        <label class="form-label">Password confirmation</label>
        <input
            v-model="v$.password_confirmation.$model"
            type="password"
            class="form-control"
            :class="getValidationClass(v$.password_confirmation)"
            placeholder="Enter password confirmation"
        >
        <form-errors-feedback :field="v$.password_confirmation"/>
      </div>
      <hr>
      <div class="text-center">
        <button
            type="submit"
            class="btn btn-outline-primary"
            :class="{disabled: v$.$invalid}"
        >
          Sign Up
        </button>
      </div>
      <div class="text-center mt-2">
        <p>
          <span class="my-0 pe-1">Already registered ?</span>
          <router-link
              :to="{name: 'login'}"
              class="link-primary text-decoration-none"
          >
            Login to your account
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped lang="sass">

</style>