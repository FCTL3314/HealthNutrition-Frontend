<script setup>
import {reactive, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {email, required} from "@vuelidate/validators";
import api from "@/services/api";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import BaseTab from "@/components/settings/BaseTab.vue";
import {passwordValidators} from "@/validators/vuelidate";
import toaster from "@/plugins/toaster";
import {getVuelidateFieldValidationClass} from "@/services/validation";
import {parseErrorsFromResponse} from "@/services/parsers";
import {useStore} from "vuex";


const store = useStore();

const isUpdateResponseWaiting = ref(false);

const formData = reactive({
  newEmail: '',
  password: '',
});

const rules = {
  newEmail: {
    email,
    required,
  },
  password: passwordValidators,
};

const v$ = useVuelidate(rules, formData);

const errorMessages = reactive([]);

async function changeEmail() {
  isUpdateResponseWaiting.value = true;
  errorMessages.length = 0;
  try {
    const updatedUser = (await api.users.changeEmail({
      newEmail: formData.newEmail,
      password: formData.password,
    })).data;
    store.commit("auth/setEmail", updatedUser.email);
    toaster.success("Your email has been successfully changed.");
  } catch (error) {
    errorMessages.push(...parseErrorsFromResponse(error.request.response));
    console.log(error.request);
  } finally {
    v$.value.$reset();
    isUpdateResponseWaiting.value = false;
  }
}
</script>

<template>
  <base-tab
      tab-name="Email Settings"
      :v$="v$"
      :error-messages="errorMessages"
      :is-response-waiting="isUpdateResponseWaiting"
      :form-submit-callback="changeEmail"
  >
    <div class="mb-4">
      <label for="email" class="form-label text-main">New email</label>
      <input
          id="email"
          v-model="v$.newEmail.$model"
          type="email"
          class="form-control only-bottom-border"
          :class="getVuelidateFieldValidationClass(v$.newEmail)"
          placeholder="Enter email"
      >
      <form-errors-feedback :field="v$.newEmail"/>
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
  </base-tab>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>