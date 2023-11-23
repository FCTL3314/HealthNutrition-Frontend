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
const inactivityMillisecondsForSearch = 500

async function clearSearchQuery() {
  searchQuery.value = "";
  await replaceURLParams(router, route, {search: null});
  emits("searchInput", searchQuery.value);
}

const onSearchInput = async () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
    searchTimeout.value = null;
  }
  searchTimeout.value = setTimeout(async () => {
    await replaceURLParams(router, route, {search: searchQuery.value});
    emits("searchInput", searchQuery.value);
  }, inactivityMillisecondsForSearch);
}
</script>

<template>
  <component-wrapper>
    <div class="input-group p-2">
      <magnifying-glass-icon
          :width="iconsSize"
          :height="iconsSize"
          class="me-3"
      />
      <input
          @input="onSearchInput"
          v-model="searchQuery"
          class="form-control p-0 shadow-none input-underline rounded-0"
          type="search"
          :placeholder="searchInputPlaceholderText"
          autocomplete="off"
          required=""
      >
      <button
          @click="clearSearchQuery"
          v-if="searchQuery"
          class="ms-3 border-0 btn btn-clear-search-query p-0"
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


.btn
  &-clear-search-query
    border-radius: $component-rounding !important
    background-color: transparent

  &-clear-search-query:hover
    background-color: $color-main-transparent-bg
</style>
