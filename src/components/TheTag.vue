<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  iconComponent: {
    type: Object,
  },
  classes: {
    type: String,
    default: "tag-primary"
  },
})
</script>

<template>
  <div class="tag centered-vertically" :class="classes">
    <component v-if="iconComponent" :is="iconComponent" class="me-1"/>
    <span class="fw-semibold">{{ text }}</span>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"


.tag
  width: max-content
  border-radius: $component-rounding
  padding: .3em .7em
  color: #FFF
  transition: box-shadow 0.3s ease-out, opacity 0.3s ease-out
  $shadow-radius: 10px

  &-primary
    background-color: $primary

  &-primary:hover,
  &-primary:focus
    box-shadow: 0 0 $shadow-radius $primary

  &-success
    background-color: $success

  &-success:hover,
  &-success:focus
    box-shadow: 0 0 $shadow-radius $success

  &-warning
    background-color: $warning

  &-warning:hover,
  &-warning:focus
    box-shadow: 0 0 $shadow-radius $warning

  &-danger
    background-color: $danger

  &-danger:hover,
  &-danger:focus
    box-shadow: 0 0 $shadow-radius $danger
</style>