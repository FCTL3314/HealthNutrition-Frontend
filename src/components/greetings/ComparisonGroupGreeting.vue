<script setup>
import BaseGreeting from "@/components/greetings/BaseGreeting.vue";


defineProps({
  comparisonGroupName: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <base-greeting
      :title="comparisonGroupName"
      description="The statistics for this comparison group are displayed here, as well as average indicators for the
      products of this comparison group. Products that stand out e.g. the most high-calorie product, marked with tags."
  />
</template>

<style scoped lang="sass">
@import '@/assets/sass/main'
</style>