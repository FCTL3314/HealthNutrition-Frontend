<script setup>
import {computed, onMounted, ref} from "vue";
import api from "@/services/api";
import ComparisonGroupCard from "@/components/cards/ComparisonGroupCard.vue";
import ComparisonGroupsGreeting from "@/components/greetings/ComparisonGroupsGreeting.vue";
import ComparisonGroupCardPlaceholder from "@/components/placeholders/ComparisonGroupCardPlaceholder.vue";
import {COMPARISON_GROUPS_PAGINATE_BY} from "@/constants";
import ErrorSection from "@/components/ErrorSection.vue";
import WrappedCreateComparisonGroupForm from "@/components/comparisons/WrappedCreateComparisonGroupForm.vue";
import ShowMoreButton from "@/components/ShowMoreButton.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import draggable from "vuedraggable";

import {calculateOffsetAdjustment} from "@/services/pagination";


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

let createdComparisonGroupsCount = 0
let deletedComparisonGroupsCount = 0

async function updateComparisonGroups(offset = 0) {
  const data = await loadComparisonGroups(
      calculateOffsetAdjustment(offset, createdComparisonGroupsCount, deletedComparisonGroupsCount)
  );
  comparisonGroups.value.push(...data.results);
}

const addComparisonGroup = (comparisonGroup) => {
  comparisonGroups.value.unshift(comparisonGroup);
  createdComparisonGroupsCount++;
}

async function removeComparisonGroup(comparisonGroupToRemove) {
  comparisonGroups.value = comparisonGroups.value.filter(comparisonGroup => {
    return comparisonGroup.id !== comparisonGroupToRemove.id;
  })
  deletedComparisonGroupsCount++;
}

async function changeComparisonGroupsOrder() {
  const orderedIds = comparisonGroups.value.map((comparisonGroup) => comparisonGroup.id);
  await api.comparisons.changeComparisonGroupsOrder({orderedIds});
}

onMounted(async () => {
  await updateComparisonGroups();
});
</script>

<template>
  <comparison-groups-greeting/>
  <div class="component-indentation-y">
    <wrapped-create-comparison-group-form @comparison-group-created="addComparisonGroup" class="mb-3"/>
    <template v-if="!isNoComparisonGroups || hasMoreComparisonGroups">
      <draggable
          v-if="!isNoComparisonGroups"
          v-model="comparisonGroups"
          item-key="position"
          ghost-class="dragging"
          handle=".dragging-handle"
          :force-fallback="true"
          @change="changeComparisonGroupsOrder"
          class="row"
      >
        <template #item="{ element: comparisonGroup }">
          <div class="col-xxl-6 col-lg-12 col-md-12 mb-3 animate__animated animate__fadeIn">
            <comparison-group-card
                :comparison-group="comparisonGroup"
                @delete-click="removeComparisonGroup"
            />
          </div>
        </template>
        <template #footer>
          <div
              v-if="isComparisonGroupsLoading"
              v-for="_ in COMPARISON_GROUPS_PAGINATE_BY"
              :key="_"
              class="col-xxl-6 col-lg-12 col-md-12 mb-3"
          >
            <comparison-group-card-placeholder/>
          </div>
        </template>
      </draggable>
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
    </template>
    <error-section
        v-else
        description="It looks like you don’t have a single comparison group yet, so create it."
        :show-go-back-button="false"
    />
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
@import '@/assets/sass/dragging'
</style>