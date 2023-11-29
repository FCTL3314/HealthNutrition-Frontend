<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import CaretDownIcon from "@/components/icons/CaretDownIcon.vue";


defineProps({
  buttonClasses: {
    type: String,
    default: "list-group-item list-group-item-action text-primary common-rounding fw-semibold border-0",
  },
})

const emits = defineEmits(["showMoreButtonClick"]);

let currentPage = 1;

function onShowMoreButtonClick() {
  currentPage++;
  emits("showMoreButtonClick", currentPage);
}
</script>

<template>
  <div>
    <component-wrapper :padding="0">
      <div class="text-center list-group">
        <button
            @click="onShowMoreButtonClick"
            type="button"
            :class="buttonClasses"
        >
          Show more
          <caret-down-icon/>
        </button>
      </div>
    </component-wrapper>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>