<script setup>
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
  <div class="input-group">
    <form v-if="!isComparisonGroupCreating" @submit.prevent="createComparisonGroup" class="w-100">
      <div class="input-group">
        <input
            v-model="comparisonGroupName"
            class="form-control bg-transparent p-0 only-bottom-border"
            type="search"
            placeholder="Enter a title for your comparison group..."
            maxlength="32"
            autocomplete="off"
            required
        >
        <button
            class="btn btn-outline-primary common-rounding ms-3"
            type="submit"
        >
          Create
        </button>
      </div>
    </form>
    <div v-else class="text-center mx-auto">
      <loading-spinner/>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>