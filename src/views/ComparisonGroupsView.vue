<script setup>
import {onMounted, ref} from "vue";
import api from "@/services/api";
import ComparisonGroupCard from "@/components/cards/comparisons/ComparisonGroupCard.vue";
import ComparisonGroupsGreeting from "@/components/greetings/ComparisonGroupsGreeting.vue";
import ComparisonGroupCardPlaceholder from "@/components/cards/comparisons/ComparisonGroupCardPlaceholder.vue";
import {COMPARISON_GROUPS_PAGINATE_BY} from "@/constants";


const comparisonGroups = ref([]);
const isComparisonGroupsLoading = ref(false);


async function loadComparisonGroups() {
  isComparisonGroupsLoading.value = true;
  try {
    return (await api.comparisons.comparisonGroups()).data;
  } catch (error) {
    console.error(error);
  } finally {
    isComparisonGroupsLoading.value = false;
  }
}

async function updateComparisonGroups() {
  comparisonGroups.value = await loadComparisonGroups();
}

onMounted(async () => {
  await updateComparisonGroups();
});
</script>

<template>
  <comparison-groups-greeting/>
  <div class="component-indentation-y min-vh-100">
    <div class="row">
      <comparison-group-card
          v-if="comparisonGroups.length"
          v-for="comparisonGroup in comparisonGroups"
          :key="comparisonGroup.id"
          class="comparison-card mb-3"
          :comparison-group="comparisonGroup"
      />
      <comparison-group-card-placeholder
          v-else
          v-for="_ in COMPARISON_GROUPS_PAGINATE_BY"
          :key="_"
          class="comparison-card mb-3"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"


.comparison-card:last-child
  margin-bottom: 0 !important
</style>