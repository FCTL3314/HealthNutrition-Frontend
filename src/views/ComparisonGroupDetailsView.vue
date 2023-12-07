<script setup>
import api from "@/services/api";
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {createTitle} from "@/utils";
import WrappedLoadingSpinner from "@/components/loading/WrappedLoadingSpinner.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {PRODUCT_NUTRITION_ROUNDING, PRODUCTS_PAGINATE_BY} from "@/constants";
import moment from "moment";
import NotFoundSection from "@/components/NotFoundSection.vue";
import ShowMoreButton from "@/components/ShowMoreButton.vue";
import ProductCard from "@/components/cards/product/ProductCard.vue";
import ProductCardPlaceholder from "@/components/cards/product/ProductCardPlaceholder.vue";


const route = useRoute();
const router = useRouter();

const comparisonGroup = ref(null);
const products = ref([]);

const isComparisonGroupLoading = ref(true);
const isProductsLoading = ref(true);

const isNoProducts = ref(false);
const hasMoreProducts = ref(false);

async function loadComparisonGroup() {
  isComparisonGroupLoading.value = true;
  try {
    return (await api.comparisons.comparisonGroup(route.params.comparisonGroupSlug, true)).data;
  } catch (error) {
    console.error(error);
  } finally {
    isComparisonGroupLoading.value = false;
  }
}

async function updateComparisonGroup() {
  comparisonGroup.value = await loadComparisonGroup();
}

async function loadProducts(offset = 0) {
  isProductsLoading.value = true;
  try {
    const data = (
        await api.comparisons.comparedProducts(PRODUCTS_PAGINATE_BY, offset, comparisonGroup.value.id)
    ).data;
    hasMoreProducts.value = data.next !== null;
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    isProductsLoading.value = false;
  }
}

let removedProductsCount = 0;

async function updateProducts(offset = 0) {
  products.value.push(...(await loadProducts(offset - removedProductsCount)).results);
}

async function removeProduct(productId) {
  const indexToRemove = products.value.findIndex(obj => obj.id === productId);
  products.value.splice(indexToRemove, 1);
  await api.comparisons.removeProductFromComparisonGroup(comparisonGroup.value.id, productId);
  removedProductsCount++;
}

const averages = reactive([]);

async function pushAverages() {
  averages.push(
      {
        title: "Calories: ",
        value: comparisonGroup.value.calories_avg,
        units: "kcal",
      },
      {
        title: "Protein: ",
        value: comparisonGroup.value.protein_avg,
        units: "g.",
      },
      {
        title: "Fat: ",
        value: comparisonGroup.value.fat_avg,
        units: "g.",
      },
      {
        title: "Carbs: ",
        value: comparisonGroup.value.carbs_avg,
        units: "g.",
      },
  )
  averages.forEach(obj => obj.value = obj.value.toFixed(PRODUCT_NUTRITION_ROUNDING));
}

const statistics = reactive([]);

async function pushStatistics() {
  statistics.push(
      {
        title: "Compared products: ",
        value: comparisonGroup.value.products_count,
      },
      {
        title: "Unique categories: ",
        value: comparisonGroup.value.unique_categories_count,
      },
      {
        title: "Last product added: ",
        value: moment(comparisonGroup.value.last_added_product_datetime).fromNow(),
      },
      {
        title: "Comparison group created: ",
        value: moment(comparisonGroup.value.created_at).fromNow(),
      },
  )
}

onMounted(async () => {
  await updateComparisonGroup()
      .then(async () => {
        document.title = createTitle(comparisonGroup.value.name);
        if (comparisonGroup.value.products_count > 0) {
          await pushStatistics();
          await pushAverages();
          await updateProducts();
        } else {
          isNoProducts.value = true;
        }
      });
});
</script>

<template>
  <wrapped-loading-spinner :is-loading="!comparisonGroup">
    <component-wrapper class="text-center">
      <h1 class="text-main mb-0">{{ comparisonGroup.name }}</h1>
    </component-wrapper>
    <template v-if="!isNoProducts">
      <div class="row component-indentation-y text-center">
        <div class="col-xl-6 mb-3 mb-xl-0 mb-xxl-0">
          <component-wrapper>
            <h1 class="text-main">Averages</h1>
            <ul class="list-group list-group-flush">
              <li
                  v-for="(item, index) in averages"
                  :key="index"
                  class="list-group-item"
              >
                <span class="fw-semibold fs-5">{{ item.title }}</span>
                <span class="text-main-light fs-5">{{ item.value }} {{ item.units }}</span>
              </li>
            </ul>
          </component-wrapper>
        </div>
        <div class="col-xl-6">
          <component-wrapper>
            <h1 class="text-main">Statistics</h1>
            <ul class="list-group list-group-flush">
              <li
                  v-for="(item, index) in statistics"
                  :key="index"
                  class="list-group-item"
              >
                <span class="fw-semibold fs-5">{{ item.title }}&nbsp;</span>
                <span class="text-main-light fs-5">{{ item.value }}</span>
              </li>
            </ul>
          </component-wrapper>
        </div>
      </div>
      <div class="row component-indentation-y">
        <div
            v-for="product in products"
            :key="product.id"
            class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-3"
        >
          <product-card
              :product="product"
              :category-slug="product.category.slug"
              :calories-avg="comparisonGroup.calories_avg"
              :protein-avg="comparisonGroup.protein_avg"
              :fat-avg="comparisonGroup.fat_avg"
              :carbs-avg="comparisonGroup.carbs_avg"
              :is-comparison-product="true"
              @remove-button-click="removeProduct"
          />
        </div>
        <div
            v-if="isProductsLoading"
            v-for="_ in PRODUCTS_PAGINATE_BY"
            :key="_"
            class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-3"
        >
          <product-card-placeholder/>
        </div>
        <component-wrapper v-show="!isProductsLoading && hasMoreProducts" :padding="0">
          <show-more-button
              pagination-type="limitOffset"
              :offset-increase="PRODUCTS_PAGINATE_BY"
              @show-more-button-click="updateProducts"
          />
        </component-wrapper>
      </div>
    </template>
    <not-found-section
        v-else
        description="Apparently you haven't added products to this comparison group yet,
                     so we don't have details for it."
        class="component-indentation-y"
    />
  </wrapped-loading-spinner>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>