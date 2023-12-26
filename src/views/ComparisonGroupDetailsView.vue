<script setup>
import api from "@/services/api";
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import WrappedLoadingSpinner from "@/components/loading/WrappedLoadingSpinner.vue";
import ComponentWrapper from "@/components/ComponentWrapper.vue";
import {PRODUCTS_PAGINATE_BY} from "@/constants";
import ErrorSection from "@/components/ErrorSection.vue";
import ShowMoreButton from "@/components/ShowMoreButton.vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import ProductCardPlaceholder from "@/components/placeholders/ProductCardPlaceholder.vue";
import ComparisonGroupGreeting from "@/components/greetings/ComparisonGroupGreeting.vue";
import CaretUpFillIcon from "@/components/icons/CaretUpFillIcon.vue";
import CaretDownFillIcon from "@/components/icons/CaretDownFillIcon.vue";
import {createTitle} from "@/services/text";
import NutritionFacts from "@/components/NutritionFacts.vue";
import ComparedProductsStatistic from "@/components/ComparedProductsStatistic.vue";


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
          <nutrition-facts
              title="Averages"
              :calories="comparisonGroup.caloriesAvg"
              :protein="comparisonGroup.proteinAvg"
              :fat="comparisonGroup.fatAvg"
              :carbs="comparisonGroup.carbsAvg"
          />
        </div>
        <div class="col-xl-6">
          <compared-products-statistic
              :comparison-group-created-at="comparisonGroup.createdAt"
              :last-product-added-at="comparisonGroup.lastAddedProductDatetime"
              :unique-categories-count="comparisonGroup.uniqueCategoriesCount"
              :compared-products-count="comparisonGroup.productsCount"/>
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