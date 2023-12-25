<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {ref} from "vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import moment from "moment/moment";
import ListIcon from "@/components/icons/ListIcon.vue";
import api from "@/services/api";
import LoadingSpinner from "@/components/loading/LoadingSpinner.vue";
import {ANIMATION_DELAY} from "@/constants";


const props = defineProps({
  comparisonGroup: {
    type: Object,
    required: true,
  }
})

const emits = defineEmits(["deleteClick"])

const isComparisonGroupDeleting = ref(false);
const isComparisonGroupDeleted = ref(false);

const cardComponent = ref(null);

async function onDeleteButtonClick() {
  isComparisonGroupDeleting.value = true;
  try {
    const response = await api.comparisons.deleteComparisonGroup(props.comparisonGroup.slug)
    if (response.status === 204) {
      isComparisonGroupDeleted.value = true;

      setTimeout(() => {
        cardComponent.value.$el.classList.add('animate__animated', 'animate__bounceOut');
        cardComponent.value.$el.addEventListener('animationend', async () => {
          emits("deleteClick", props.comparisonGroup);
        });
      }, ANIMATION_DELAY)
    }
  } catch (error) {
    console.error(error);
  }
}

const humanizedCreatedAt = moment(props.comparisonGroup.createdAt).fromNow()

const productsComparisonRoute = {
  name: "productsComparison",
  params: {comparisonGroupSlug: props.comparisonGroup.slug},
};
</script>

<template>
  <component-wrapper ref="cardComponent" class="card common-rounding">
    <div class="card-body p-0 centered-vertically">
      <div class="dragging-handle centered justify-content-center p-2">
        <list-icon :width="20" :height="20"/>
      </div>
      <div class="text-break ms-2 me-auto">
        <router-link
            class="fw-bold text-decoration-none"
            :to="productsComparisonRoute"
        >
          <span class="link-main font-standard">
            {{ comparisonGroup.name }} ({{ comparisonGroup.productsCount || 0 }})&nbsp;
          </span>
          <span class="font-small text-secondary">Created {{ humanizedCreatedAt }}</span>
        </router-link>
      </div>
      <div class="centered p-2">
        <button
            v-if="!isComparisonGroupDeleting"
            @click="onDeleteButtonClick"
            class="btn btn-transparent centered p-0"
        >
          <trash-icon :width="20" :height="20"/>
        </button>
        <span
            v-else-if="isComparisonGroupDeleted"
            class="fs-4 fw-semibold centered text-success animate__animated animate__zoomIn animate__faster"
            style="height: 20px; width: 20px"
        >
          &check;
        </span>
        <loading-spinner v-else :size="20"/>
      </div>
    </div>
  </component-wrapper>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/cards'
@import '@/assets/sass/dragging'


.btn-transparent:hover
  color: $danger
</style>