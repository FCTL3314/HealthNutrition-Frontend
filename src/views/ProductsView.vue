<script setup>
import api from "@/services/api/index"
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {replaceURLParams, scrollToElement} from "@/utils";
import SearchForm from "@/components/SearchForm.vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import ProductCardPlaceholder from "@/components/placeholders/ProductCardPlaceholder.vue";
import PaginationSection from "@/components/PaginationSection.vue";
import {PRODUCTS_PAGINATE_BY} from "@/constants";
import ErrorSection from "@/components/ErrorSection.vue";
import ProductsGreeting from "@/components/greetings/ProductsGreeting.vue";
import AddProductToComparisonGroupsModal from "@/components/comparisons/AddProductToComparisonGroupsModal.vue";
import {calculateTotalPaginationPages} from "@/services/pagination";
import {createTitle} from "@/services/text";


const route = useRoute();
const router = useRouter();

const category = ref(null);
const products = ref([]);

const isCategoryLoading = ref(false);
const isProductsLoading = ref(false);
const isDataLoading = computed(() => {
  return isCategoryLoading.value || isProductsLoading.value;
})
const isNoProducts = computed(() => !isDataLoading.value & !products.value.length)

const selectedProductId = ref(-1);

const currentPage = ref(parseInt(route.query.page || 1));
const totalPages = ref(0);

const setSelectedProductId = (productId) => selectedProductId.value = productId;

async function loadCategory() {
  isCategoryLoading.value = true;
  try {
    return (await api.categories.category(route.params.categorySlug)).data;
  } catch (error) {
    console.error(error);
  } finally {
    isCategoryLoading.value = false;
  }
}

async function updateCategory() {
  category.value = await loadCategory();
}

async function loadProducts(searchQuery = null) {
  isProductsLoading.value = true;
  try {
    if (searchQuery || route.query.search) {
      return (
          await api.products.products(
              currentPage.value, null, searchQuery || route.query.search
          )
      ).data;
    } else {
      return (await api.products.products(currentPage.value, route.params.categorySlug)).data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    isProductsLoading.value = false;
  }
}

async function updateProducts(searchQuery = null) {
  if (searchQuery) {
    currentPage.value = 1;
    await replaceURLParams(router, route, {page: 1});
  }
  const data = await loadProducts(searchQuery);
  if (data) {
    products.value = data.results;
    totalPages.value = calculateTotalPaginationPages(data.count, PRODUCTS_PAGINATE_BY);
  }
}

const productsWrapperElement = ref(null);

async function onPageChange(page) {
  currentPage.value = page;
  await replaceURLParams(router, route, {page: page});
  scrollToElement(productsWrapperElement.value);
  await updateProducts();
}

onMounted(async () => {
  await updateCategory()
      .then(async () => {
        await updateProducts();
        document.title = createTitle(category.value.name);
      });
});
</script>

<template>
  <add-product-to-comparison-groups-modal :product-id="selectedProductId"/>
  <products-greeting class="component-indentation-y"/>
  <div class="component-indentation-y">
    <search-form
        class="mb-3"
        placeholder-text="Enter a query, for example mango..."
        :show-clear-search-button="!isProductsLoading"
        @search-input="updateProducts"
        @clear-search="updateProducts"
    />
    <div class="row" ref="productsWrapperElement">
      <div
          v-if="!isDataLoading"
          v-for="product in products"
          :key="product.id"
          class="col-lg-4 col-md-6 mb-3 animate__animated animate__fadeIn"
      >
        <product-card
            :product="product"
            :category-slug="category.slug"
            :calories-avg="category.caloriesAvg"
            :protein-avg="category.proteinAvg"
            :fat-avg="category.fatAvg"
            :carbs-avg="category.carbsAvg"
            @save-button-click="setSelectedProductId"
        />
      </div>
      <div
          v-else
          v-for="_ in PRODUCTS_PAGINATE_BY"
          :key="_"
          class="col-lg-4 col-md-6 mb-3"
      >
        <product-card-placeholder/>
      </div>
    </div>
    <error-section
        v-if="isNoProducts"
        description="Oops... Looks like we couldn't find any products."
        :show-go-back-button="false"
    />
    <pagination-section
        v-if="!isNoProducts"
        :total-pages="totalPages"
        :current-page="currentPage"
        :is-disabled="isProductsLoading"
        @page-changed="onPageChange"
    />
  </div>
</template>

<style lang="sass" scoped>

</style>