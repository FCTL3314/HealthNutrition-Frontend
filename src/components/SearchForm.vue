<script setup>
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {replaceURLParams} from "@/utils";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import CrossFillIcon from "@/components/icons/CrossFillIcon.vue";


const route = useRoute();
const router = useRouter();

const emits = defineEmits(["searchInput"])

const searchQuery = ref(route.query.search || "");
const searchTimeout = ref(null);
const searchInputPlaceholderText = computed(() => {
  return `Enter a query, for example ${route.name === "categories" ? "fruits" : "mango"}...`
})

const iconsSize = 32

const searchInput = ref(null);

async function clearSearch() {
  searchQuery.value = "";
  await replaceURLParams(router, route, {search: null});
  emits("searchInput", searchQuery.value);
}

const inactivityTimeForSearchApply = 500

const onSearchInput = async () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
    searchTimeout.value = null;
  }
  searchTimeout.value = setTimeout(async () => {
    await replaceURLParams(router, route, {search: searchQuery.value});
    emits("searchInput", searchQuery.value);
  }, inactivityTimeForSearchApply);
}
</script>

<template>
  <component-wrapper :padding="1.5">
    <div class="input-group">
      <magnifying-glass-icon
          :width="iconsSize"
          :height="iconsSize"
          class="me-3"
      />
      <input
          @input="onSearchInput"
          v-model="searchQuery"
          class="form-control p-0 only-bottom-border"
          type="search"
          :placeholder="searchInputPlaceholderText"
          autocomplete="off"
          required=""
      >
      <button
          @click="clearSearch"
          v-if="searchQuery"
          class="btn btn-light-blue ms-3"
      >
        <cross-fill-icon
            :width="iconsSize"
            :height="iconsSize"
        />
      </button>
    </div>
  </component-wrapper>
</template>

<style lang="sass">
@import "@/assets/sass/main"
</style>
