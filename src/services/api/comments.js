export default function (instance) {
  return {
    product_comments(product_id, page) {
      return instance.get(`comments/product/`, {
        params: {
          product_id: product_id,
          page: page,
        }
      });
    },
    product_comment_add(product_id, text) {
      return instance.post(`comments/product/`, {
        product_id,
        text,
      });
    },
    product_comment_remove(comment_id) {
      return instance.get(`comments/product/${comment_id}/`);
    },
    store_comments() {
      return instance.get(`comments/store/`);
    },
    store_comment_add(store_id, text) {
      return instance.get(`comments/store/`, {
        store_id,
        text,
      });
    },
    store_comment_remove(comment_id) {
      return instance.get(`comments/store/${comment_id}/`);
    },
  };
}
