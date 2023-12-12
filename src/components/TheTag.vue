<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
  },
  bgColorClass: {
    type: String,
    default: "bg-primary",
  },
  textColorClass : {
    type: String,
    default: "text-white",
  },
})
</script>

<template>
  <div class="tag inline-icon-text" :class="[bgColorClass, textColorClass]">
    <component v-if="icon" :is="icon" class="me-1"/>
    <span class="fw-semibold">{{ text }}</span>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"


.tag
  width: max-content
  border-radius: $component-rounding
  padding: .3em .7em
</style>