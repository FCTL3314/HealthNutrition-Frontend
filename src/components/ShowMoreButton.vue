<script setup>
import CaretDownIcon from "@/components/icons/CaretDownIcon.vue";
import {onMounted} from "vue";


const pageNumberPaginationType = "pageNumber";
const limitOffsetPaginationType = "limitOffset";

const props = defineProps({
  paginationType: {
    type: String,
    default: pageNumberPaginationType,
    validator(value) {
      return [pageNumberPaginationType, limitOffsetPaginationType].includes(value);
    }
  },
  offsetIncrease: {
    type: Number,
  }
})

const emits = defineEmits(["showMoreButtonClick"]);

const paginationStartIndexMap = {};
paginationStartIndexMap[pageNumberPaginationType] = 1;
paginationStartIndexMap[limitOffsetPaginationType] = 0;

let paginationIndex = paginationStartIndexMap[props.paginationType];

function onShowMoreButtonClick() {
  switch (props.paginationType) {
    case pageNumberPaginationType:
      paginationIndex++;
      break;
    case limitOffsetPaginationType:
      paginationIndex += props.offsetIncrease;
      break;
  }
  emits("showMoreButtonClick", paginationIndex);
}

onMounted(() => {
  if (props.paginationType === limitOffsetPaginationType && !props.offsetIncrease) {
    console.error(
        `Property 'offsetIncrease' is required when paginationType is set to ${limitOffsetPaginationType}.`
    );
  }
})
</script>

<template>
  <div class="text-center list-group">
    <button
        @click="onShowMoreButtonClick"
        type="button"
        class="list-group-item list-group-item-action text-primary common-rounding fw-semibold border-0"
    >
      Show more
      <caret-down-icon/>
    </button>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>