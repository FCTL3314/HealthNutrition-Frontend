<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {computed} from "vue";
import store from "@/store";


const user = computed(() => store.getters['auth/user']);

const unsecuredAttributes = [
  {
    isSecured: user.value.is_verified,
    text: "Your email is not verified, please verify it to increase the security of your account.",
    resolutionLink: {
      text: "Verify my email",
      to: {name: "emailVerification"},
    }
  },
];
const hasSecurityWarnings = unsecuredAttributes.some(el => el.isSecured === false);
</script>

<template>
  <component-wrapper v-if="hasSecurityWarnings" class="text-danger">
    <h3 class="text-center">Security Warnings</h3>
    <p
        v-for="(unsecuredAttribute, index) in unsecuredAttributes"
        :key="index"
        v-show="!unsecuredAttribute.isSecured"
        class="mb-0"
    >
      <span class="fw-semibold">{{ index + 1 }}.</span>
      {{ unsecuredAttribute.text }}
      <router-link
          v-if="unsecuredAttribute.resolutionLink"
          :to="unsecuredAttribute.resolutionLink.to"
          class="link link-danger">
        {{ unsecuredAttribute.resolutionLink.text }}
      </router-link>
      .
    </p>
  </component-wrapper>
</template>

<style scoped lang="sass">

</style>