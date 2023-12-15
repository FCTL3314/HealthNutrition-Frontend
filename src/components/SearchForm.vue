<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {replaceURLParams} from "@/utils";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import CrossFillIcon from "@/components/icons/CrossFillIcon.vue";


const route = useRoute();
const router = useRouter();

defineProps({
  placeholderText: {
    type: String,
    default: "Enter a query..."
  },
  showClearSearchButton: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(["searchInput", "clearSearch"])

const searchQuery = ref(route.query.search || "");

const searchTimeoutId = ref(null);

const iconsSize = 32

function clearSearchTimeout() {
  if (searchTimeoutId.value) {
    clearTimeout(searchTimeoutId.value);
    searchTimeoutId.value = null;
  }
}

async function onClearSearch() {
  clearSearchTimeout();
  searchQuery.value = "";
  await replaceURLParams(router, route, {search: null});
  emits("clearSearch");
}

const inactivityTimeForSearchApply = 500

const onSearchInput = async () => {
  clearSearchTimeout();
  searchTimeoutId.value = setTimeout(async () => {
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
          :placeholder="placeholderText"
          autocomplete="off"
          required=""
      >
      <button
          @click="onClearSearch"
          v-show="searchQuery && showClearSearchButton"
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
