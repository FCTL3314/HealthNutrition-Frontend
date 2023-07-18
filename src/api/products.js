export default function (instance) {
  return {
    categories() {
      return instance.get('products/product-types/');
    },
  };
};