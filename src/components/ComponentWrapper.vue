<script setup>
import {computed} from "vue";

const props = defineProps({
  padding: {
    type: Number,
    default: 1.0,
  },
  shadow: {
    type: Boolean,
    default: true,
  }
})


const cssPadding = computed(() => {
  return {"padding": `${props.padding}em`}
})
</script>

<template>
<div
    class="component"
    :class="{'shadow-sm': shadow}"
    :style="cssPadding"
>
  <slot></slot>
</div>
</template>

<style scoped lang="sass">
@import '@/assets/sass/variables'


.component
  background-color: #FFF !important
  border-radius: $component-rounding !important
</style>