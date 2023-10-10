<script setup>
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {email, required} from "@vuelidate/validators";
import {passwordValidators} from "@/validators";
import {appendResponseErrors, getValidationClass, resetForm} from "@/utils";
import api from "@/api";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import BaseTab from "@/components/settings/BaseTab.vue";
import {afterUpdateActions} from "@/services/userUpdate"

const store = useStore();
const user = computed(() => store.getters['auth/user']);

const isUpdateResponseWaiting = ref(false);

const formData = reactive({
  newEmail: '',
  password: '',
});

const rules = {
  newEmail: {
    required,
    email,
  },
  password: passwordValidators,
};

const v$ = useVuelidate(rules, formData);

const serverErrorMessages = reactive([]);

async function update() {
  isUpdateResponseWaiting.value = true;
  serverErrorMessages.length = 0;
  try {
    const response = await api.users.changeEmail({
      new_email: formData.newEmail,
      password: formData.password,
    });
    await afterUpdateActions(
        response.data,
        'Your email has been successfully changed.',
    )
  } catch (error) {
    appendResponseErrors(serverErrorMessages, error.request.response);
    console.log(error.request);
  } finally {
    resetForm(v$.value);
    isUpdateResponseWaiting.value = false;
  }
}
</script>

<template>
  <base-tab
      :vuelidate-data="v$"
      :server-error-messages="serverErrorMessages"
      :is-update-response-waiting="isUpdateResponseWaiting"
      :form-submit-callback="update"
  >
    <div class="mb-4">
      <label for="email" class="form-label">New email</label>
      <input
          id="email"
          v-model="v$.newEmail.$model"
          type="email"
          class="form-control"
          :class="getValidationClass(v$.newEmail)"
          placeholder="Enter email"
      >
      <form-errors-feedback :field="v$.newEmail"/>
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
  </base-tab>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>