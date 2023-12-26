<script setup>
import CircleFillIcon from "@/components/icons/CircleFillIcon.vue";
import {NUTRITION_FACTS_ROUNDING} from "@/constants";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {computed} from "vue";


const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  caloriesAvg: {
    type: Number,
  },
  proteinAvg: {
    type: Number,
  },
  fatAvg: {
    type: Number,
  },
  carbsAvg: {
    type: Number,
  },
});


const nutritionItems = computed(() => {
  const items = []
  if (props.caloriesAvg) {
    items.push(
        {
          name: "Calories",
          value: props.caloriesAvg,
          colorClass: "text-warning",
          units: "kcal",
        }
    );
  }
  if (props.proteinAvg) {
    items.push(
        {
          name: "Protein",
          value: props.proteinAvg,
          colorClass: "text-success",
          units: "g.",
        },
    );
  }
  if (props.fatAvg) {
    items.push(
        {
          name: "Fat",
          value: props.fatAvg,
          colorClass: "text-danger",
          units: "g.",
        },
    );
  }
  if (props.carbsAvg) {
    items.push(
        {
          name: "Carbs",
          value: props.carbsAvg,
          colorClass: "text-primary",
          units: "g.",
        },
    );
  }
  return items;
})

const productsRoute = {name: 'products', params: {categorySlug: props.category.slug}};
</script>

<template>
  <component-wrapper class="card common-rounding h-100">
    <router-link :to="productsRoute">
      <div class="card-img-wrp">
        <img
            :src="category.image"
            class="card-img-responsive card-img-top object-fit-cover"
            alt="category-image"
        >
      </div>
    </router-link>
    <div class="card-body">
      <h5 class="card-title font-standard text-main text-truncate">
        <router-link class="link-main fw-semibold" :to="productsRoute">
          {{ category.name }}
        </router-link>
      </h5>
      <p class="card-text font-small">{{ category.description }}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li
          v-if="nutritionItems.length"
          v-for="(item, index) in nutritionItems"
          :key="index"
          class="list-group-item centered-vertically"
          :class="item.colorClass"
      >
        <circle-fill-icon/>
        &nbsp;
        <span class="fw-semibold">
          {{ item.name }}: {{ item.value.toFixed(NUTRITION_FACTS_ROUNDING) }} {{ item.units }}
        </span>
      </li>
    </ul>
  </component-wrapper>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/cards'
</style>