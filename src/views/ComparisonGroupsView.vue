<script setup>
import {computed, onMounted, ref} from "vue";
import api from "@/services/api";
import ComparisonGroupCard from "@/components/cards/comparisons/ComparisonGroupCard.vue";
import ComparisonGroupsGreeting from "@/components/greetings/ComparisonGroupsGreeting.vue";
import ComparisonGroupCardPlaceholder from "@/components/cards/comparisons/ComparisonGroupCardPlaceholder.vue";
import {COMPARISON_GROUPS_PAGINATE_BY} from "@/constants";
import CreateComparisonGroupForm from "@/components/comparisons/CreateComparisonGroupForm.vue";
import NotFoundSection from "@/components/NotFoundSection.vue";
import CaretDownIcon from "@/components/icons/CaretDownIcon.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


const comparisonGroups = ref([]);
const isComparisonGroupsLoading = ref(false);
const isNoComparisonGroups = computed(() => {
  return comparisonGroups.value.length === 0 && !isComparisonGroupsLoading.value;
})
const hasMoreComparisonGroups = ref(false);

let currentPage = 1;

async function onClickShowMore() {
  currentPage++;
  await updateComparisonGroups(currentPage);
}

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

onMounted(async () => {
  await updateComparisonGroups();
});
</script>

<template>
  <comparison-groups-greeting/>
  <div class="component-indentation-y min-vh-100">
    <create-comparison-group-form @comparison-group-created="addComparisonGroup" class="mb-3"/>
    <div class="row">
      <comparison-group-card
          v-for="comparisonGroup in comparisonGroups"
          :key="comparisonGroup.id"
          class="comparison-card mb-3"
          :comparison-group="comparisonGroup"
      />
      <comparison-group-card-placeholder
          v-if="isComparisonGroupsLoading"
          v-for="_ in COMPARISON_GROUPS_PAGINATE_BY"
          :key="_"
          class="comparison-card mb-3"
      />
      <div>
        <component-wrapper v-if="hasMoreComparisonGroups" :padding="0">
          <div class="text-center list-group">
            <button
                v-if="!isComparisonGroupsLoading"
                @click="onClickShowMore"
                type="button"
                class="list-group-item list-group-item-action text-primary common-rounding fw-semibold border-0"
            >
              Show more
              <caret-down-icon/>
            </button>
          </div>
        </component-wrapper>
      </div>
    </div>
    <not-found-section
        v-if="isNoComparisonGroups"
        description="It looks like you don’t have a single comparison group yet, so create it."
        :show-go-back-button="false"
    />
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"


.comparison-card:last-child
  margin-bottom: 0 !important
</style>