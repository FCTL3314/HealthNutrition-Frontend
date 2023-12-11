<script setup>
defineProps({
  text: {
    type: String,
    required: true,
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
  <div class="tag" :class="[bgColorClass, textColorClass]">
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