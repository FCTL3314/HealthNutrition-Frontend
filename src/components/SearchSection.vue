<script setup>
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {replaceURLParams} from "@/utils";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


const route = useRoute();
const router = useRouter();

const emits = defineEmits(["searchPerformed"])

const searchQuery = ref(route.query.search || "");
const searchInputPlaceholderText = computed(() => {
  return `Enter a query, for example ${route.name === "categories" ? "fruits" : "mango"}...`
})

const updateURLSearchParam = async (value) => {
  await replaceURLParams(router, route, {search: value});
}

const onSearchButtonClick = async () => {
  await updateURLSearchParam(searchQuery.value);
  emits("searchPerformed", searchQuery.value);
}
</script>

<template>
  <component-wrapper>
    <form
        @submit.prevent="onSearchButtonClick"
        role="search"
    >
      <div class="input-group p-2">
        <magnifying-glass-icon :width="32" :height="32" class="me-3"/>
        <input
            v-model="searchQuery"
            class="form-control p-0 shadow-none custom-input rounded-0"
            type="search"
            :placeholder="searchInputPlaceholderText"
            autocomplete="off"
            required=""
        >
      </div>
    </form>
  </component-wrapper>
</template>

<style lang="sass">
@import "@/assets/sass/main"
</style>
