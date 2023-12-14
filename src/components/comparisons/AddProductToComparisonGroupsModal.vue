<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {computed, onMounted, ref, watch} from "vue";
import api from "@/services/api";
import ShowMoreButton from "@/components/ShowMoreButton.vue";
import LoadingSpinner from "@/components/loading/LoadingSpinner.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import CreateComparisonGroupForm from "@/components/comparisons/CreateComparisonGroupForm.vue";
import AddProductToComparisonGroupCheckbox from "@/components/comparisons/AddProductToComparisonGroupCheckbox.vue";
import {COMPARISON_GROUPS_PAGINATE_BY} from "@/constants";


const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

watch(() => props.productId, async () => {
  comparisonGroups.value.length = 0;
  await updateComparisonGroups();
})

const comparisonGroups = ref([]);
const isNoComparisonGroups = computed(() => {
  return comparisonGroups.value.length === 0 && !isComparisonGroupsLoading.value;
})
const isComparisonGroupsLoading = ref(false);
const hasMoreComparisonGroups = ref(false);
const isAddGroupFormShown = ref(false);

const showAddGroup = () => isAddGroupFormShown.value = true;

async function loadComparisonGroups(offset = 0) {
  isComparisonGroupsLoading.value = true;
  try {
    const data = (
        await api.comparisons.comparisonGroups(COMPARISON_GROUPS_PAGINATE_BY, offset, props.productId)
    ).data;
    hasMoreComparisonGroups.value = data.next !== null;
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    isComparisonGroupsLoading.value = false;
  }
}

async function updateComparisonGroups(offset = 0) {
  comparisonGroups.value.push(...(await loadComparisonGroups(offset)).results);
}

const addComparisonGroup = (comparisonGroup) => comparisonGroups.value.unshift(comparisonGroup);

onMounted(async () => {
  if (props.productId >= 0) {
    await updateComparisonGroups();
  }
});
</script>

<template>
  <div
      class="modal fade"
      id="saveProductModal"
      tabindex="-1"
      aria-labelledby="saveProductModalLabel"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable mx-auto">
      <component-wrapper class="modal-content">
        <div class="modal-header">
          <h1 class="text-main fs-5 mb-0" id="saveProductModalLabel">
            Save product to...
          </h1>
          <button
              type="button"
              class="btn-close shadow-none"
              data-bs-dismiss="modal"
              aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <add-product-to-comparison-group-checkbox
              v-for="comparisonGroup in comparisonGroups"
              :key="comparisonGroup.id"
              :product-id="productId"
              :comparison-group="comparisonGroup"
              :is-initially-checked="comparisonGroup.is_contains_selected_product"
          />
          <p class="fw-medium mb-0" v-if="isNoComparisonGroups">
            It looks like you don't have any comparison group yet, you can create it below.
          </p>
          <show-more-button
              class="mt-3"
              v-show="hasMoreComparisonGroups && !isComparisonGroupsLoading"
              pagination-type="limitOffset"
              :offset-increase="COMPARISON_GROUPS_PAGINATE_BY"
              :key="productId"
              @show-more-button-click="updateComparisonGroups"
          />
          <div v-if="isComparisonGroupsLoading" class="text-center mx-auto">
            <loading-spinner :size="24"/>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <create-comparison-group-form
              v-if="isAddGroupFormShown"
              @comparison-group-created="addComparisonGroup"
              class="m-0"
          />
          <button
              v-else
              @click="showAddGroup"
              class="btn text-main inline-icon-text justify-content-center common-rounding w-100 m-0"
          >
            <plus-icon class="me-1" :height="24" :width="24"/>
            Create new group
          </button>
        </div>
      </component-wrapper>
    </div>
  </div>
</template>

<style scoped lang="sass">
.modal-dialog
  max-width: 300px
</style>