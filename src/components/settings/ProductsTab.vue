<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import BaseTab from "@/components/settings/BaseTab.vue";
import toaster from "@/plugins/toaster";


const store = useStore();

const user = computed(() => store.getters["auth/user"]);

const isSettingsSaving = ref(false);

const isMoreCaloriesBetter = ref(store.getters["nutrition/isMoreCaloriesBetter"]);
const isMoreProteinBetter = ref(store.getters["nutrition/isMoreProteinBetter"]);
const isMoreFatBetter = ref(store.getters["nutrition/isMoreFatBetter"]);
const isMoreCarbsBetter = ref(store.getters["nutrition/isMoreCarbsBetter"]);

const nutritionPreferenceItems = [
  {
    name: "Is more calories better ?",
    bound_variable: isMoreCaloriesBetter,
  },
  {
    name: "Is more protein better ?",
    bound_variable: isMoreProteinBetter,
  },
  {
    name: "Is more fat better ?",
    bound_variable: isMoreFatBetter,
  },
  {
    name: "Is more carbs better ?",
    bound_variable: isMoreCarbsBetter,
  },
]

async function saveSettings() {
  isSettingsSaving.value = true;
  store.commit("nutrition/setIsMoreCaloriesBetter", isMoreCaloriesBetter.value);
  store.commit("nutrition/setIsMoreProteinBetter", isMoreProteinBetter.value);
  store.commit("nutrition/setIsMoreFatBetter", isMoreFatBetter.value);
  store.commit("nutrition/setIsMoreCarbsBetter", isMoreCarbsBetter.value);

  localStorage.setItem("isMoreCaloriesBetter", isMoreCaloriesBetter.value);
  localStorage.setItem("isMoreProteinBetter", isMoreProteinBetter.value);
  localStorage.setItem("isMoreFatBetter", isMoreFatBetter.value);
  localStorage.setItem("isMoreCarbsBetter", isMoreCarbsBetter.value);

  setTimeout(() => {
    toaster.success("Your nutrition preferences have been successfully saved!");
    isSettingsSaving.value = false;
  }, 400);
}
</script>

<template>
  <base-tab
      tab-name="Products Settings"
      submit-button-text="Save"
      :form-submit-callback="saveSettings"
      :is-response-waiting="isSettingsSaving"
  >
    <div
        v-for="(item, index) in nutritionPreferenceItems"
        :key="index" class="mb-4"
    >
      <label class="form-label text-main" :for="`nutrition-preferences-${index}`">
        {{ item.name }}
      </label>
      <select
          v-model="item.bound_variable.value"
          class="form-select only-bottom-border w-100"
          :id="`nutrition-preferences-${index}`"
      >
        <option
            value="true"
            :selected="item.bound_variable.value === true"
        >
          Yes
        </option>
        <option
            value="false"
            :selected="item.bound_variable.value === false"
        >
          No
        </option>
      </select>
    </div>
  </base-tab>
</template>

<style lang=sass>
@import '@/assets/sass/main'
</style>