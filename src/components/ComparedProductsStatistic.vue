<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import moment from "moment";


const props = defineProps({
  comparedProductsCount: {
    type: Number,
    required: true,
  },
  uniqueCategoriesCount: {
    type: Number,
    required: true,
  },
  lastProductAddedAt: {
    type: String,
    required: true,
  },
  comparisonGroupCreatedAt: {
    type: String,
    required: true,
  },
})

const comparedProductsStatistic = [
  {
    name: "Compared products",
    value: props.uniqueCategoriesCount,
  },
  {
    name: "Unique categories",
    value: props.comparedProductsCount,
  },
  {
    name: "Last product added",
    value: moment(props.lastProductAddedAt).fromNow(),
  },
  {
    name: "Comparison group created",
    value: moment(props.comparisonGroupCreatedAt).fromNow(),
  },
];
</script>

<template>
  <component-wrapper>
    <h2 class="text-main font-big">Statistics</h2>
    <ul class="list-group list-group-flush">
      <li
          v-for="(item, index) in comparedProductsStatistic"
          :key="index"
          class="list-group-item"
      >
        <span class="fw-semibold fs-5">{{ item.name }}:&nbsp;</span>
        <span class="text-main-light fs-5">{{ item.value }}</span>
      </li>
    </ul>
  </component-wrapper>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>