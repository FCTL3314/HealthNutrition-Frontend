<script setup>
import {computed, onMounted, ref} from "vue";
import api from "@/services/api";
import ComparisonGroupCard from "@/components/cards/comparisons/ComparisonGroupCard.vue";
import ComparisonGroupsGreeting from "@/components/greetings/ComparisonGroupsGreeting.vue";
import ComparisonGroupCardPlaceholder from "@/components/cards/comparisons/ComparisonGroupCardPlaceholder.vue";
import {COMPARISON_GROUPS_PAGINATE_BY} from "@/constants";
import ErrorSection from "@/components/ErrorSection.vue";
import WrappedCreateComparisonGroupForm from "@/components/comparisons/WrappedCreateComparisonGroupForm.vue";
import ShowMoreButton from "@/components/ShowMoreButton.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


const comparisonGroups = ref([]);
const isComparisonGroupsLoading = ref(false);
const isNoComparisonGroups = computed(() => {
  return comparisonGroups.value.length === 0 && !isComparisonGroupsLoading.value;
})
const hasMoreComparisonGroups = ref(false);

async function loadComparisonGroups(offset = 0) {
  isComparisonGroupsLoading.value = true;
  try {
    const data = (
        await api.comparisons.comparisonGroups(
            COMPARISON_GROUPS_PAGINATE_BY, offset, null, true
        )
    ).data;
    hasMoreComparisonGroups.value = data.next !== null;
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    isComparisonGroupsLoading.value = false;
  }
}

let deletedComparisonGroupsCount = 0

async function updateComparisonGroups(offset = 0) {
  comparisonGroups.value.push(...(await loadComparisonGroups(offset - deletedComparisonGroupsCount)).results);
}

const addComparisonGroup = (comparisonGroup) => comparisonGroups.value.unshift(comparisonGroup);

function removeComparisonGroup(comparisonGroup) {
  const indexToRemove = comparisonGroups.value.findIndex(obj => obj.id === comparisonGroup.id);
  comparisonGroups.value.splice(indexToRemove, 1);
  deletedComparisonGroupsCount++;
}

onMounted(async () => {
  await updateComparisonGroups();
});
</script>

<template>
  <comparison-groups-greeting/>
  <div class="component-indentation-y">
    <wrapped-create-comparison-group-form @comparison-group-created="addComparisonGroup" class="mb-3"/>
    <div v-if="!isNoComparisonGroups || hasMoreComparisonGroups" class="row">
      <comparison-group-card
          v-for="comparisonGroup in comparisonGroups"
          :key="comparisonGroup.id"
          class="col-xxl-6 col-lg-12 col-md-12 mb-3"
          :comparison-group="comparisonGroup"
          @delete-click="removeComparisonGroup"
      />
      <comparison-group-card-placeholder
          v-if="isComparisonGroupsLoading"
          v-for="_ in COMPARISON_GROUPS_PAGINATE_BY"
          :key="_"
          class="col-xxl-6 col-lg-12 col-md-12 mb-3"
      />
      <component-wrapper
          v-show="hasMoreComparisonGroups && !isComparisonGroupsLoading"
          :padding="0"
      >
        <show-more-button
            pagination-type="limitOffset"
            :offset-increase="COMPARISON_GROUPS_PAGINATE_BY"
            @show-more-button-click="updateComparisonGroups"
        />
      </component-wrapper>
    </div>
    <error-section
        v-else
        description="It looks like you don’t have a single comparison group yet, so create it."
        :show-go-back-button="false"
    />
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>