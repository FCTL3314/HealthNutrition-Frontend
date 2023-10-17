<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
import FormFlushMessages from "@/components/forms/FormFlushMessages.vue";
import SubmitButton from "@/components/submitButton.vue";

defineProps({
  formSubmitCallback: {
    type: Function,
    required: true,
  },
  isUpdateResponseWaiting: {
    type: Boolean,
    required: true,
  },
  serverErrorMessages: {
    type: Array,
    required: true,
  },
  vuelidateData: {
    type: Object,
    required: true,
  }
})

const store = useStore();
const user = computed(() => store.getters['auth/user']);
</script>

<template>
  <div class="mb-4">
    <h2>{{ user.username }}'s Account</h2>
  </div>
  <hr>
  <div class="row">
    <form-flush-messages :error-messages="serverErrorMessages"/>
    <div class="mb-4">
      <form @submit.prevent="formSubmitCallback">
        <slot></slot>
        <div class="row justify-content-center">
          <submit-button
              text="Update"
              :is-response-waiting="isUpdateResponseWaiting"
              :vuelidate-data="vuelidateData"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>