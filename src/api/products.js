export default function (instance) {
  return {
    categories(page = 1) {
      return instance.get('products/product-types/', {
        params: {
          page: page,
        },
      });
    },
  };
};