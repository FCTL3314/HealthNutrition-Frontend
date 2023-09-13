<script setup>
import {computed} from 'vue';


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
});

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1;
  }
  return props.currentPage - 1;
});

const pages = computed(() => {
  const range = [];
  for (
      let i = startPage.value;
      i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
      i++
  ) {
    range.push({
      number: i,
      isDisabled: i === props.currentPage,
    });
  }

  return range;
});

const isInFirstPage = computed(() => props.currentPage === 1);
const isInLastPage = computed(() => props.currentPage === props.totalPages);

const emits = defineEmits(['pageChanged'])

const onClickFirstPage = () => {
  emits('pageChanged', 1);
};

const onClickPreviousPage = () => {
  emits('pageChanged', props.currentPage - 1);
};

const onClickPage = (page) => {
  emits('pageChanged', page);
};

const onClickNextPage = () => {
  emits('pageChanged', props.currentPage + 1);
};

const onClickLastPage = () => {
  emits('pageChanged', props.totalPages);
};

</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center m-0">
      <li class="page-item">
        <button
            type="button"
            class="page-link"
            :class="{disabled: isInFirstPage}"
            @click="onClickFirstPage"
        >
          <span aria-hidden="true">First</span>
        </button>
      </li>
      <li class="page-item">
        <button
            type="button"
            class="page-link"
            :class="{disabled: isInFirstPage}"
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
            :class="{disabled: page.isDisabled}"
            @click="onClickPage(page.number)"
        >
          {{ page.number }}
        </button>
      </li>
      <li class="page-item">
        <button
            type="button"
            class="page-link"
            :class="{disabled: isInLastPage}"
            @click="onClickNextPage"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
      <li class="page-item">
        <button
            type="button"
            class="page-link"
            :class="{disabled: isInLastPage}"
            @click="onClickLastPage"
        >
          <span aria-hidden="true">Last</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style lang="sass" scoped>
.page-link:focus
  box-shadow: unset

.page-link:focus:not(.disabled)
  background-color: unset
</style>
