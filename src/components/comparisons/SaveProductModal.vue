<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {computed, onMounted, ref} from "vue";
import api from "@/services/api";
import ShowMoreButton from "@/components/ShowMoreButton.vue";
import LoadingSpinner from "@/components/loading/LoadingSpinner.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import CreateComparisonGroupForm from "@/components/comparisons/CreateComparisonGroupForm.vue";


const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

const comparisonGroups = ref([]);
const isNoComparisonGroups = computed(() => {
  return comparisonGroups.value.length === 0 && !isComparisonGroupsLoading.value;
})
const isComparisonGroupsLoading = ref(false);
const hasMoreComparisonGroups = ref(false);
const isAddGroupFormShown = ref(false);

const showAddGroup = () => isAddGroupFormShown.value = true;

async function loadComparisonGroups(page = 1) {
  isComparisonGroupsLoading.value = true;
  try {
    const data = (await api.comparisons.comparisonGroups(page)).data;
    hasMoreComparisonGroups.value = data.next !== null;
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    isComparisonGroupsLoading.value = false;
  }
}

async function updateComparisonGroups(page = 1) {
  comparisonGroups.value.push(...(await loadComparisonGroups(page)).results);
}

const addComparisonGroup = (comparisonGroup) => comparisonGroups.value.unshift(comparisonGroup);

async function handleSaveCheckboxClick(isChecked, comparisonGroupId) {
  if (isChecked) {
    await api.comparisons.addProductToComparisonGroup(comparisonGroupId, props.productId);
  } else {
    await api.comparisons.removeProductFromComparisonGroup(comparisonGroupId, props.productId);
  }
}

onMounted(async () => {
  await updateComparisonGroups();
});
</script>

<template>
  <div class="modal fade" id="saveProductModal" tabindex="-1" aria-labelledby="saveProductModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <component-wrapper class="modal-content">
        <div class="modal-header">
          <h1 class="text-main fs-5 mb-0" id="saveProductModalLabel">
            Save product to...
          </h1>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"/>
        </div>
        <div class="modal-body">
          <div
              v-for="comparisonGroup in comparisonGroups"
              class="form-check"
          >
            <input
                @change="(event) => handleSaveCheckboxClick(event.target.checked, comparisonGroup.id)"
                :id="`${comparisonGroup.name}-${comparisonGroup.id}`"
                class="save-checkbox shadow-none me-3"
                type="checkbox"
            >
            <label
                class="form-check-label fw-medium"
                :for="`${comparisonGroup.name}-${comparisonGroup.id}`"
            >
              {{ comparisonGroup.name }}
            </label>
          </div>
          <p class="fw-medium mb-0" v-if="isNoComparisonGroups">
            It looks like you don't have any comparison group yet, you can create it below.
          </p>
          <show-more-button
              class="mt-3"
              v-show="hasMoreComparisonGroups && !isComparisonGroupsLoading"
              @show-more-button-click="updateComparisonGroups"
          />
          <div v-if="isComparisonGroupsLoading" class="text-center mx-auto text-main-light">
            <loading-spinner/>
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
              class="btn text-main inline-icon-text justify-content-center m-0"
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
@import "bootstrap/scss/bootstrap"


.modal-dialog
  max-width: 300px

.save-checkbox
  @extend .form-check-input
  width: 1.2em
  height: 1.2em

.form-check:not(:nth-last-child(-n+2))
  margin-bottom: 1rem
</style>