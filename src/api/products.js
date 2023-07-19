export default function (instance) {
  return {
    category(slug) {
      return instance.get(`products/product-types/${slug}/`);
    },
    categories(page = 1) {
      return instance.get('products/product-types/', {
        params: {
          page: page,
        },
      });
    },
    products(page = 1, categorySlug) {
      return instance.get('products/products/', {
        params: {
          page: page,
          product_type_slug: categorySlug,
        },
      });
    },
  };
};