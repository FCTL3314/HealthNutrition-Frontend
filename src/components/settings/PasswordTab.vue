<script setup>
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {appendResponseFieldErrors, getValidationClass} from "@/utils";
import api from "@/services/api";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import BaseTab from "@/components/settings/BaseTab.vue";
import {passwordValidators} from "@/validators/vuelidate";
import toaster from "@/plugins/toaster";


const store = useStore();
const user = computed(() => store.getters["auth/user"]);

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

const serverErrorMessages = reactive([]);

async function changePassword() {
  isResponseWaiting.value = true;
  serverErrorMessages.length = 0;
  try {
    await api.users.setPassword({
      current_password: formData.currentPassword,
      new_password: formData.newPassword,
    });
    toaster.success("Your password has been successfully changed.");
  } catch (error) {
    appendResponseFieldErrors(serverErrorMessages, error.request.response);
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
      :vuelidate-data="v$"
      :server-error-messages="serverErrorMessages"
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
          :class="getValidationClass(v$.currentPassword)"
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
          :class="getValidationClass(v$.newPassword)"
          placeholder="Enter new password"
      >
      <form-errors-feedback :field="v$.newPassword"/>
    </div>
  </base-tab>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>