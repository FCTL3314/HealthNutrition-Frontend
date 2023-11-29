<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
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
  serverErrorMessages: {
    type: Array,
  },
  vuelidateData: {
    type: Object,
  }
})

const store = useStore();
const user = computed(() => store.getters["auth/user"]);
</script>

<template>
  <div class="mb-3 text-center">
    <h2 class="text-main-light text-truncate mb-0">{{ tabName }}</h2>
  </div>
  <div class="row">
    <template v-if="serverErrorMessages">
      <form-flush-messages :error-messages="serverErrorMessages"/>
    </template>
    <form @submit.prevent="formSubmitCallback">
      <slot></slot>
      <div class="row justify-content-center">
        <submit-button
            :text="submitButtonText"
            :is-response-waiting="isResponseWaiting"
            :vuelidate-data="vuelidateData"
        />
      </div>
    </form>
  </div>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>