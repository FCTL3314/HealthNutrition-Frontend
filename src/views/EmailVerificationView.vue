<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {useStore} from "vuex";
import {onMounted, reactive, ref} from "vue";
import api from "@/services/api";
import {useRouter} from "vue-router";
import WrappedLoadingSpinner from "@/components/loading/WrappedLoadingSpinner.vue";
import moment from "moment";
import SubmitButton from "@/components/SubmitButton.vue";
import {maxLength, minLength, numeric, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import FormErrorsFeedback from "@/components/forms/FormErrorsFeedback.vue";
import {EMAIL_VERIFICATION_CODE_LENGTH} from "@/constants";
import toaster from "@/plugins/toaster";
import {confettiFromTop} from "@/utils/particles";
import {getVuelidateFieldValidationClass} from "@/services/validation";


const router = useRouter();
const store = useStore();

const user = reactive(store.getters["auth/user"]);

const isResponseWaiting = ref(false);
const isVerificationSending = ref(false);
const isAlreadyVerified = user.isVerified;

const formData = reactive({
  code: "",
});

const rules = {
  code: {
    minLength: minLength(EMAIL_VERIFICATION_CODE_LENGTH),
    maxLength: maxLength(EMAIL_VERIFICATION_CODE_LENGTH),
    numeric,
    required,
  },
};

const v$ = useVuelidate(rules, formData)

const validUntil = ref(null);
const resentRemainingSeconds = ref(0);

const getResentRemainingSeconds = (nextSendingDate) => moment(Date.parse(nextSendingDate) - new Date()).seconds();

const refreshPage = () => router.go(0);

function startResentRemainingSecondsCountdown() {
  const intervalId = setInterval(async () => {
    if (resentRemainingSeconds.value > 0) {
      resentRemainingSeconds.value--;
    } else {
      clearInterval(intervalId);
      await sendEmailVerification();
    }
  }, 1000);
}

async function sendEmailVerification() {
  isVerificationSending.value = true;
  try {
    if (!isAlreadyVerified) {
      const response = await api.users.sendEmailVerification();
      const data = response.data
      if (response.status === 201) {
        validUntil.value = moment(data.expiration).format('LLL');
      }
    }
  } catch (error) {
    if (error.response.status === 429) {
      resentRemainingSeconds.value = getResentRemainingSeconds(error.response.data.messages.retryAfter);
      startResentRemainingSecondsCountdown();
    } else {
      console.error(error);
    }
  } finally {
    isVerificationSending.value = false;
  }
}

const accountSettingsRoute = {name: "accountSettingsTab"}

async function afterSuccessfulVerification() {
  store.commit("auth/verifyUser");
  confettiFromTop();
  toaster.success("Your email has been successfully verified.");
  await router.push(accountSettingsRoute);
}

function afterUnsuccessfulVerification(error) {
  if (error.response.status === 400 && error.response.data.code === "invalid_verification_code") {
    toaster.error(
        "The entered code is incorrect, please make sure you entered it correctly, or send a new email."
    );
  } else {
    console.error(error);
  }
}

async function verifyUser() {
  isResponseWaiting.value = true;
  try {
    const response = await api.users.verifyUser({code: formData.code});
    if (response.status === 200) {
      await afterSuccessfulVerification();
    }
  } catch (error) {
    afterUnsuccessfulVerification(error);
  } finally {
    isResponseWaiting.value = false;
  }
}

onMounted(async () => {
  await sendEmailVerification();
})
</script>

<template>
  <wrapped-loading-spinner text="Sending you an email..." :is-loading="isVerificationSending">
    <component-wrapper class="container text-center col-xxl-6 col-lg-7 col-md-10 col-sm-12">
      <h2 class="text-main">Email Verification</h2>
      <div
          class="alert alert-primary common-rounding mb-0 fs-5 fw-medium"
          :class="isAlreadyVerified ? 'alert-warning': 'alert-primary'"
      >
        <span v-if="isAlreadyVerified">Your email has already been verified.</span>
        <template v-else-if="resentRemainingSeconds > 0">
          <p class="fs-2 fw-semibold mb-0">
            {{ resentRemainingSeconds }}
          </p>
          <span>
            You have tried to send an email too many times, please wait until the timer expires and then the email will
            be automatically resent.
          </span>
        </template>
        <span v-else>
          You're almost there! You will receive an email within a couple of minutes. Just enter the code from the
          email into the form to complete your verification if you don't see it, you may need to check your spam
          folder. The code will be valid until: <span class="fw-semibold">{{ validUntil }}</span>
        </span>
      </div>
      <form
          v-if="!isAlreadyVerified"
          @submit.prevent="verifyUser"
          class="mt-3"
      >
        <div class="text-start">
          <label class="form-label text-main">Verification code</label>
          <input
              v-model="v$.code.$model"
              type="text"
              class="form-control only-bottom-border"
              :class="getVuelidateFieldValidationClass(v$.code)"
              placeholder="Enter a verification code"
          >
          <form-errors-feedback :field="v$.code"/>
        </div>
        <div class="text-center mt-3 mb-2">
          <submit-button :show-loading="isResponseWaiting"/>
        </div>
        <div class="text-center">
          <p class="mb-0">
            <span class="me-1">Didn't receive an email ?</span>
            <a @click="refreshPage" href="" class="link link-primary text-decoration-none">
              Get a new one.
            </a>
          </p>
        </div>
      </form>
    </component-wrapper>
  </wrapped-loading-spinner>
</template>

<style lang="sass">
@import '@/assets/sass/main'
@import '@/assets/sass/forms'
</style>