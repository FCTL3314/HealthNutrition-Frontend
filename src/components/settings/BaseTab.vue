<script setup>
import FormFlushMessages from "@/components/forms/FormFlushMessages.vue";
import SubmitButton from "@/components/SubmitButton.vue";


defineProps({
  tabName: {
    type: String,
    default: "Settings"
  },
  submitButtonText: {
    type: String,
    default: "Update",
  },
  formSubmitCallback: {
    type: Function,
    required: true,
  },
  isResponseWaiting: {
    type: Boolean,
  },
  errorMessages: {
    type: Array,
  },
  v$: {
    type: Object,
  }
})
</script>

<template>
  <div class="mb-3 text-center">
    <h2 class="text-main-light text-truncate mb-0">{{ tabName }}</h2>
  </div>
  <div class="row">
    <div v-if="errorMessages">
      <form-flush-messages :error-messages="errorMessages"/>
    </div>
    <form @submit.prevent="formSubmitCallback">
      <slot></slot>
      <div class="row justify-content-center">
        <submit-button
            :text="submitButtonText"
            :show-loading="isResponseWaiting"
            :is-disabled="v$?.$invalid"
        />
      </div>
    </form>
  </div>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>