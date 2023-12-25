<script setup>
import api from "@/services/api";
import {computed, onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import WrappedLoadingSpinner from "@/components/loading/WrappedLoadingSpinner.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {PRODUCT_NUTRITION_ROUNDING, PRODUCTS_PAGINATE_BY} from "@/constants";
import moment from "moment";
import ErrorSection from "@/components/ErrorSection.vue";
import ShowMoreButton from "@/components/ShowMoreButton.vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import ProductCardPlaceholder from "@/components/placeholders/ProductCardPlaceholder.vue";
import ComparisonGroupGreeting from "@/components/greetings/ComparisonGroupGreeting.vue";
import CaretUpFillIcon from "@/components/icons/CaretUpFillIcon.vue";
import CaretDownFillIcon from "@/components/icons/CaretDownFillIcon.vue";
import {createTitle} from "@/services/text";


const route = useRoute();
const router = useRouter();

const comparisonGroup = ref(null);
const products = ref([]);

const isProductsLoading = ref(false);
const isNoProducts = computed(() => products.value.length === 0 && !isProductsLoading.value);
const hasMoreProducts = ref(false);

let removedProductsCount = 0;

async function loadComparisonGroup() {
  try {
    return (await api.comparisons.comparisonGroup(route.params.comparisonGroupSlug, true)).data;
  } catch (error) {
    console.error(error);
  }
}

const setComparisonGroup = async () => comparisonGroup.value = await loadComparisonGroup();

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

async function updateProducts(offset = 0) {
  products.value.push(...(await loadProducts(offset - removedProductsCount)).results);
}

async function removeProduct(productToRemove) {
  products.value = products.value.filter(product => product.id !== productToRemove.id)
  removedProductsCount++;
}

const averages = reactive([]);

async function pushAverages() {
  averages.push(
      {
        title: "Calories: ",
        value: comparisonGroup.value.caloriesAvg,
        units: "kcal",
      },
      {
        title: "Protein: ",
        value: comparisonGroup.value.proteinAvg,
        units: "g.",
      },
      {
        title: "Fat: ",
        value: comparisonGroup.value.fatAvg,
        units: "g.",
      },
      {
        title: "Carbs: ",
        value: comparisonGroup.value.carbsAvg,
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
        value: comparisonGroup.value.productsCount,
      },
      {
        title: "Unique categories: ",
        value: comparisonGroup.value.uniqueCategoriesCount,
      },
      {
        title: "Last product added: ",
        value: moment(comparisonGroup.value.lastAddedProductDatetime).fromNow(),
      },
      {
        title: "Comparison group created: ",
        value: moment(comparisonGroup.value.createdAt).fromNow(),
      },
  )
}

function getTags(productSlug) {
  const tagData = {
    maxCalorieProductSlug: {text: "Max calorie", iconComponent: CaretUpFillIcon, classes: "tag-warning"},
    minCalorieProductSlug: {text: "Min calorie", iconComponent: CaretDownFillIcon, classes: "tag-warning"},
    maxProteinProductSlug: {text: "Max protein", iconComponent: CaretUpFillIcon, classes: "tag-success"},
    minProteinProductSlug: {text: "Min protein", iconComponent: CaretDownFillIcon, classes: "tag-success"},
    maxFatProductSlug: {text: "Max fat", iconComponent: CaretUpFillIcon, classes: "tag-danger"},
    minFatProductSlug: {text: "Min fat", iconComponent: CaretDownFillIcon, classes: "tag-danger"},
    maxCarbsProductSlug: {text: "Max carbs", iconComponent: CaretUpFillIcon, classes: "tag-primary"},
    minCarbsProductSlug: {text: "Min carbs", iconComponent: CaretDownFillIcon, classes: "tag-primary"},
  };

  const tags = [];

  for (const key in tagData) {
    if (productSlug === comparisonGroup.value[key]) {
      tags.push(tagData[key]);
    }
  }

  return tags;
}

onMounted(async () => {
  await setComparisonGroup()
      .then(async () => {
        document.title = createTitle(comparisonGroup.value.name);
        if (comparisonGroup.value.productsCount > 0) {
          await pushStatistics();
          await pushAverages();
          await updateProducts();
        }
      });
});
</script>

<template>
  <wrapped-loading-spinner :is-loading="!comparisonGroup">
    <comparison-group-greeting class="component-indentation-y" :comparison-group-name="comparisonGroup.name"/>
    <template v-if="!isNoProducts">
      <div class="row text-center component-indentation-bottom">
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
      <div class="row">
        <div
            v-for="product in products"
            :key="product.id"
            :id="`product-card-${product.id}`"
            class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-3 position-relative
            animate__animated animate__fadeIn"
        >
          <product-card
              :product="product"
              :category-slug="product.category.slug"
              :calories-avg="comparisonGroup.caloriesAvg"
              :protein-avg="comparisonGroup.proteinAvg"
              :fat-avg="comparisonGroup.fatAvg"
              :carbs-avg="comparisonGroup.carbsAvg"
              :is-comparison-product="true"
              :comparison-group="comparisonGroup"
              :tags="getTags(product.slug)"
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
    <error-section
        v-else
        description="There are no products in this comparison group to display statistics for..."
        class="component-indentation-y"
    />
  </wrapped-loading-spinner>
</template>

<style scoped lang="sass">
@import "@/assets/sass/main"
</style>