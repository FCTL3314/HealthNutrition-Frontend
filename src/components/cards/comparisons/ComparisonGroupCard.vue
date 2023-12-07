<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {computed} from "vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import api from "@/services/api";
import moment from "moment/moment";

const props = defineProps({
  comparisonGroup: {
    type: Object,
    required: true,
  }
})

const emits = defineEmits(["deleteClick"])

const onDeleteButtonClick = async () => {
  emits("deleteClick", props.comparisonGroup);
  await api.comparisons.deleteComparisonGroup(props.comparisonGroup.slug);
}

const humanizedCreatedAt = computed(() => moment(props.comparisonGroup.created_at).fromNow())

const productsComparisonRoute = computed(() => {
  return {name: "productsComparison", params: {comparisonGroupSlug: props.comparisonGroup.slug}};
});
</script>

<template>
  <div>
    <component-wrapper class="card common-rounding">
      <div class="card-body inline-icon-text">
        <div class="text-break">
          <router-link
              class="fw-bold text-decoration-none d-flex align-items-end"
              :to="productsComparisonRoute"
          >
            <h5 class="card-title text-main mb-0">
              {{ comparisonGroup.name }} ({{ comparisonGroup.products_count || 0 }})&nbsp;
            </h5>
            <span class="fs-6 text-secondary">Created {{ humanizedCreatedAt }}</span>
          </router-link>
        </div>
        <div class="ms-auto d-flex justify-content-center align-items-center">
          <button class="btn btn-trash" @click="onDeleteButtonClick">
            <trash-icon :width="20" :height="20"/>
          </button>
        </div>
      </div>
    </component-wrapper>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/cards'
@import 'bootstrap/scss/bootstrap'

.card:hover
  transform: scale(1.01)
</style>