export default function (instance) {
    return {
        products(page = 1, categorySlug= null, searchQuery = null) {
            const params = {
                page: page,
            };
            if (categorySlug) {
                params.category_slug = categorySlug;
            }
            if (searchQuery) {
                params.search = searchQuery;
            }
            return instance.get("products/", {
                params: params,
            });
        },
        product(productSlug) {
            return instance.get(`products/${productSlug}/`);
        },
    };
}