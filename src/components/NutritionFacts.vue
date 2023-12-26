<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {NUTRITION_FACTS_ROUNDING} from "@/constants";

const props = defineProps({
  title: {
    type: String,
    default: "Nutritional facts"
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
})

const nutritionFacts = [
  {
    name: "Calorie",
    value: props.calories,
    unit: "kcal",
  },
  {
    name: "Protein",
    value: props.protein,
    unit: "g.",
  },
  {
    name: "Fat",
    value: props.fat,
    unit: "g.",
  },
  {
    name: "Carbs",
    value: props.carbs,
    unit: "g.",
  },
];
</script>

<template>
  <component-wrapper class="text-center">
    <h2 class="text-main font-big">{{ title }}</h2>
    <ul class="list-group list-group-flush">
      <li
          v-for="(nutritionFact, index) in nutritionFacts"
          :key="index"
          class="list-group-item font-standard"
      >
        <span class="fw-semibold">{{ nutritionFact.name }}:&nbsp;</span>
        <span class="text-main-light">
          {{ nutritionFact.value.toFixed(NUTRITION_FACTS_ROUNDING) }} {{ nutritionFact.unit }}
        </span>
      </li>
    </ul>
  </component-wrapper>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>