<script setup>
import {computed} from "vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";


const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  maxVisibleButtons: {
    type: Number,
    default: 9,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["pageChanged"])

const onClickFirstPage = () => emits("pageChanged", 1);
const onClickPreviousPage = () => emits("pageChanged", props.currentPage - 1);
const onClickPage = (page) => emits("pageChanged", page);
const onClickNextPage = () => emits("pageChanged", props.currentPage + 1);
const onClickLastPage = () => emits("pageChanged", props.totalPages);

const startPage = computed(() => {
  return props.currentPage === 1 ? props.currentPage : props.currentPage - 1;
});

const pages = computed(() => {
  const range = [];
  for (
      let pageNum = startPage.value;
      pageNum <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
      pageNum++
  ) {
    range.push({
      number: pageNum,
      isDisabled: pageNum === props.currentPage,
    });
  }

  return range;
});

const isInFirstPage = computed(() => props.currentPage === 1);
const isInLastPage = computed(() => props.currentPage === props.totalPages);
</script>

<template>
  <component-wrapper>
    <nav>
      <ul class="pagination pagination-md justify-content-center overflow-x-auto m-0">
        <li class="page-item">
          <button
              type="button"
              class="page-link"
              :class="{disabled: isInFirstPage || isDisabled}"
              @click="onClickFirstPage"
          >
            <span aria-hidden="true">First</span>
          </button>
        </li>
        <li class="page-item">
          <button
              type="button"
              class="page-link"
              :class="{disabled: isInFirstPage || isDisabled}"
              @click="onClickPreviousPage"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li
            v-for="(page, index) in pages"
            :key="index"
            class="page-item"
        >
          <button
              type="button"
              class="page-link"
              :class="{disabled: page.isDisabled || isDisabled}"
              @click="onClickPage(page.number)"
          >
            {{ page.number }}
          </button>
        </li>
        <li class="page-item">
          <button
              type="button"
              class="page-link"
              :class="{disabled: isInLastPage || isDisabled}"
              @click="onClickNextPage"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
        <li class="page-item">
          <button
              type="button"
              class="page-link"
              :class="{disabled: isInLastPage || isDisabled}"
              @click="onClickLastPage"
          >
            <span aria-hidden="true">Last</span>
          </button>
        </li>
      </ul>
    </nav>
  </component-wrapper>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/variables'


.page-item
  margin: 0 .4rem

.page-link
  border-radius: $component-rounding !important
  font-weight: 500
  padding-right: 1rem
  padding-left: 1rem

.page-link:focus
  box-shadow: unset

.page-link:focus:not(.disabled)
  background-color: unset
</style>
