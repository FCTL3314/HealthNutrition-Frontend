<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {useStore} from "vuex";

const store = useStore();
const user = store.getters["auth/user"];

const props = defineProps({
  calories: {
    type: Number,
    required: true,
  },
  walkingTime: {
    type: String,
    required: true,
  },
  runningTime: {
    type: String,
    required: true,
  },
  cyclingTime: {
    type: String,
    required: true,
  },
});

const timesToBurnCalories = [
  {
    name: "Walking (3mph)",
    value: props.walkingTime,
  },
  {
    name: "Running (6mph)",
    value: props.runningTime,
  },
  {
    name: "Cycling (10mph)",
    value: props.cyclingTime,
  },
];

const loginRoute = {name: "logIn"};
</script>

<template>
  <component-wrapper class="text-center">
    <h2 class="text-main font-big">
      Time to burn {{ calories }} kcal
    </h2>
    <ul class="list-group list-group-flush font-standard">
      <li
          v-for="(item, index) in timesToBurnCalories"
          :key="index"
          class="list-group-item"
      >
        <span class="fw-semibold">{{ item.name }}:&nbsp;</span>
        <span class="text-main-light">{{ item.value }}</span>
      </li>
      <li class="list-group-item font-small">
        <span v-if="user">
          The values are calculated based on your weight (<b>{{ user.profile.bodyWeight }} kg</b>).
        </span>
        <template v-else>
          <span>Values estimated based on person weighing 70 kg.</span>
          <router-link :to="loginRoute" class="link-primary text-decoration-none">
            Log In
          </router-link>
          <span>to personalize.</span>
        </template>
      </li>
    </ul>
  </component-wrapper>
</template>

<style scoped lang="sass">

</style>