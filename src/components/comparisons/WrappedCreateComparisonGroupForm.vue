<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import CreateComparisonGroupForm from "@/components/comparisons/CreateComparisonGroupForm.vue";


const emits = defineEmits(["comparisonGroupCreated"])
</script>

<template>
  <component-wrapper :padding="1.5">
    <create-comparison-group-form
        @comparison-group-created="emits('comparisonGroupCreated', $event)"
    />
  </component-wrapper>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>