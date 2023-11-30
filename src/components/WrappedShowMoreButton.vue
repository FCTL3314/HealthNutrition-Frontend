<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import ShowMoreButton from "@/components/ShowMoreButton.vue";


const emits = defineEmits(["showMoreButtonClick"])
</script>

<template>
  <div>
    <component-wrapper :padding="0">
      <show-more-button @show-more-button-click="emits('showMoreButtonClick', $event)"/>
    </component-wrapper>
  </div>
</template>

<style scoped lang="sass">

</style>