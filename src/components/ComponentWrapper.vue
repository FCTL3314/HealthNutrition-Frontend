<script setup>

</script>

<template>
<div class="component">
  <slot></slot>
</div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/variables.sass'


.component
  background-color: #FFF
  border-radius: $component-rounding
  width: 100%
  padding: 1em
</style>