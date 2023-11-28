<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {ref} from "vue";
import api from "@/services/api";
import LoadingSpinner from "@/components/loading/LoadingSpinner.vue";


const isComparisonGroupCreating = ref(false);
const comparisonGroupName = ref("");

const emits = defineEmits(["comparisonGroupCreated"])

async function createComparisonGroup() {
  isComparisonGroupCreating.value = true;
  try {
    const comparisonGroup = (await api.comparisons.createComparisonGroup(comparisonGroupName.value)).data;
    emits("comparisonGroupCreated", comparisonGroup);
    comparisonGroupName.value = "";
  } catch (error) {
    console.error(error);
  } finally {
    isComparisonGroupCreating.value = false;
  }
}
</script>

<template>
  <component-wrapper>
    <div class="input-group p-2">
      <form v-if="!isComparisonGroupCreating" @submit.prevent="createComparisonGroup" class="w-100">
        <div class="input-group">
          <input
              v-model="comparisonGroupName"
              class="form-control me-3 p-0 shadow-none input-underline rounded-0"
              type="search"
              placeholder="Enter a name for your comparison group."
              maxlength="32"
              autocomplete="off"
              required
          >
          <button
              class="btn btn-outline-primary common-rounding"
              type="submit"
          >
            Create
          </button>
        </div>
      </form>
      <div v-else class="text-center mx-auto text-main-light">
        <loading-spinner/>
      </div>
    </div>
  </component-wrapper>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>