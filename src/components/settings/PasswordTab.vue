<script setup>
import {reactive, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import api from "@/services/api";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import BaseTab from "@/components/settings/BaseTab.vue";
import {passwordValidators} from "@/validators/vuelidate";
import toaster from "@/plugins/toaster";
import {getVuelidateFieldValidationClass} from "@/services/validation";
import {parseErrorsFromResponse} from "@/services/parsers";


const isResponseWaiting = ref(false);

const formData = reactive({
  currentPassword: '',
  newPassword: '',
});

const rules = {
  currentPassword: passwordValidators,
  newPassword: passwordValidators,
};

const v$ = useVuelidate(rules, formData);

const errorMessages = reactive([]);

async function changePassword() {
  isResponseWaiting.value = true;
  errorMessages.length = 0;
  try {
    await api.users.setPassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
    toaster.success("Your password has been successfully changed.");
  } catch (error) {
    errorMessages.push(...parseErrorsFromResponse(error.request.response));
    console.log(error.request);
  } finally {
    v$.value.$reset();
    isResponseWaiting.value = false;
  }
}
</script>

<template>
  <base-tab
      tab-name="Password Settings"
      :v$="v$"
      :error-messages="errorMessages"
      :is-response-waiting="isResponseWaiting"
      :form-submit-callback="changePassword"
  >
    <div class="mb-4">
      <label for="email" class="form-label text-main">Current password</label>
      <input
          id="password"
          v-model="v$.currentPassword.$model"
          type="password"
          class="form-control only-bottom-border"
          :class="getVuelidateFieldValidationClass(v$.currentPassword)"
          placeholder="Enter your current password"
      >
      <form-errors-feedback :field="v$.currentPassword"/>
    </div>
    <div class="mb-4">
      <label class="form-label text-main">New password</label>
      <input
          v-model="v$.newPassword.$model"
          type="password"
          class="form-control only-bottom-border"
          :class="getVuelidateFieldValidationClass(v$.newPassword)"
          placeholder="Enter new password"
      >
      <form-errors-feedback :field="v$.newPassword"/>
    </div>
  </base-tab>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>