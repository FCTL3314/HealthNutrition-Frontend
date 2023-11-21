<script setup>
import {computed} from "vue";

const props = defineProps({
  padding: {
    type: Number,
    default: 1.0,
  },
})


const cssPadding = computed(() => {
  return {"padding": `${props.padding}em`}
})
</script>

<template>
<div class="component" :style="cssPadding">
  <slot></slot>
</div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/variables'


.component
  background-color: #FFF
  border-radius: $component-rounding
</style>