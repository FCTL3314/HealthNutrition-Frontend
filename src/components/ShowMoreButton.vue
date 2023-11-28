<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import CaretDownIcon from "@/components/icons/CaretDownIcon.vue";

defineProps({
  callback: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div>
    <component-wrapper :padding="0">
      <div class="text-center list-group">
        <button
            @click="callback"
            type="button"
            class="list-group-item list-group-item-action text-primary common-rounding fw-semibold border-0"
        >
          Show more
          <caret-down-icon/>
        </button>
      </div>
    </component-wrapper>
  </div>
</template>

<style scoped lang="sass">

</style>