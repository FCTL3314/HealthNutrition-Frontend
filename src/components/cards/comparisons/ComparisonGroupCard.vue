<script setup>
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {ref} from "vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import moment from "moment/moment";


const props = defineProps({
  comparisonGroup: {
    type: Object,
    required: true,
  }
})

const emits = defineEmits(["deleteClick"])

const cardComponent = ref(null);

const onDeleteButtonClick = async () => {
  cardComponent.value.$el.classList.add('animate__animated', 'animate__bounceOut');
  cardComponent.value.$el.addEventListener('animationend', async () => {
    emits("deleteClick", props.comparisonGroup);
  });
}

const humanizedCreatedAt = moment(props.comparisonGroup.created_at).fromNow()

const productsComparisonRoute = {
  name: "productsComparison",
  params: {comparisonGroupSlug: props.comparisonGroup.slug},
};
</script>

<template>
  <component-wrapper ref="cardComponent" class="card common-rounding">
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
</template>

<style lang="sass" scoped>
@import '@/assets/sass/main'
@import '@/assets/sass/cards'
</style>