<script setup>
import api from "@/services/api";
import {ref} from "vue";
import LoadingSpinner from "@/components/loading/LoadingSpinner.vue";

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
  comparisonGroup: {
    type: Object,
    required: true,
  },
})

const isChecked = ref(props.comparisonGroup.is_contains_selected_product);
const isActionPerforming = ref(false);

async function handleSaveCheckboxClick(comparisonGroupId) {
  isActionPerforming.value = true;
  try {
    const actionsMap = {
      true: api.comparisons.addProductToComparisonGroup,
      false: api.comparisons.removeProductFromComparisonGroup,
    };
    const action = actionsMap[isChecked.value];
    await action(comparisonGroupId, props.productId);
  } catch (error) {
    console.error(error);
  } finally {
    isActionPerforming.value = false;
  }
}
</script>

<template>
  <div class="save-product-checkbox d-flex">
    <div class="test">
      <input
          v-if="!isActionPerforming"
          @change="() => handleSaveCheckboxClick(comparisonGroup.id)"
          v-model="isChecked"
          :id="`${comparisonGroup.name}-${comparisonGroup.id}`"
          class="save-checkbox shadow-none mt-0"
          type="checkbox"
      >
      <loading-spinner v-else :size="24"/>
    </div>
    <label
        class="form-check-label fw-medium ms-3 text-truncate"
        :for="`${comparisonGroup.name}-${comparisonGroup.id}`"
    >
      {{ comparisonGroup.name }}
    </label>
  </div>
</template>

<style scoped lang="sass">
@import "bootstrap/scss/bootstrap"


.test
  width: 24px
  height: 24px
  display: flex
  align-items: center
  justify-content: center

.save-checkbox
  @extend .form-check-input
  width: 24px
  height: 24px

.save-product-checkbox:not(:nth-last-child(-n+2))
  margin-bottom: 1rem
</style>