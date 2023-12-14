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
  isInitiallyChecked: {
    type: Boolean,
    default: false,
  }
})

const isProductAdding = ref(false);
const isChecked = ref(props.isInitiallyChecked);

async function handleSaveCheckboxClick() {
  isProductAdding.value = true;
  try {
    if (isChecked.value) {
      await api.comparisons.addProductToComparisonGroup(props.comparisonGroup.id, props.productId);
    } else {
      await api.comparisons.removeProductFromComparisonGroup(props.comparisonGroup.id, props.productId);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isProductAdding.value = false;
  }
}
</script>

<template>
  <div class="save-product-checkbox d-flex">
    <div class="save-checkbox-wrp">
      <input
          v-if="!isProductAdding"
          @change="handleSaveCheckboxClick"
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


.save-checkbox-wrp
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