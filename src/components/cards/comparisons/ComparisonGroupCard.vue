<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {computed, ref} from "vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import api from "@/services/api";
import moment from "moment/moment";

const props = defineProps({
  comparisonGroup: {
    type: Object,
    required: true,
  }
})

const emits = defineEmits(["comparisonGroupDeleted"])

const humanizedCreatedAt = computed(() => moment(props.comparisonGroup.created_at).fromNow())

const isComparisonGroupDeleting = ref(false);
const isComparisonGroupDeleted = ref(false);

async function deleteComparisonGroup() {
  isComparisonGroupDeleting.value = true;
  try {
    await api.comparisons.deleteComparisonGroup(props.comparisonGroup.id);
    isComparisonGroupDeleted.value = true;
    emits("comparisonGroupDeleted", props.comparisonGroup.id)
  } catch (error) {
    isComparisonGroupDeleting.value = false;
    console.error(error);
  }
}

const comparisonGroupRoute = computed(() => {
  return {name: "comparisons"};
})

</script>

<template>
  <div v-if="!isComparisonGroupDeleted">
    <component-wrapper class="card common-rounding">
      <div class="card-body inline-icon-text">
        <div class="text-truncate">
          <router-link class="fw-bold text-decoration-none" :to="comparisonGroupRoute">
            <h5 class="card-title text-main mb-0">
              <span>{{ comparisonGroup.name }}&nbsp;</span>
              <span class="fs-6 text-secondary">Created {{ humanizedCreatedAt }}</span>
            </h5>
          </router-link>
        </div>
        <div class="ms-auto d-flex justify-content-center align-items-center">
          <div
              v-if="isComparisonGroupDeleting"
              class="text-main-light spinner-border"
              role="status"
          >
          </div>
          <button v-else class="btn btn-trash" @click="deleteComparisonGroup()">
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

.btn
  &-trash
    border-radius: $component-rounding !important
    background-color: transparent !important
    border: none !important

  &-trash:hover
    color: $danger !important
</style>