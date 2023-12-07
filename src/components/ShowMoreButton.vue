<script setup>
import CaretDownIcon from "@/components/icons/CaretDownIcon.vue";
import {onMounted} from "vue";


const pageNumberPaginationType = "pageNumber";
const limitOffsetPaginationType = "limitOffset";

const props = defineProps({
  buttonClasses: {
    type: String,
    default: "list-group-item list-group-item-action text-primary common-rounding fw-semibold border-0",
  },
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

const paginationTypeToPaginationStartIndexMap = {};
paginationTypeToPaginationStartIndexMap[pageNumberPaginationType] = 1;
paginationTypeToPaginationStartIndexMap[limitOffsetPaginationType] = 0;

let paginationStartIndex = paginationTypeToPaginationStartIndexMap[props.paginationType];

function onShowMoreButtonClick() {
  switch (props.paginationType) {
    case pageNumberPaginationType:
      paginationStartIndex++;
      break;
    case limitOffsetPaginationType:
      paginationStartIndex += props.offsetIncrease;
      break;
  }
  emits("showMoreButtonClick", paginationStartIndex);
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
        :class="buttonClasses"
    >
      Show more
      <caret-down-icon/>
    </button>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>