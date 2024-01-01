export default function (instance) {
    return {
        products(page = 1, categorySlug = null, searchQuery = null) {
            const params = {
                page: page,
            };
            if (categorySlug) {
                params.categorySlug = categorySlug;
            }
            if (searchQuery) {
                params.search = searchQuery;
            }
            return instance.get("products/", {
                params: params,
            });
        },
        product(productSlug, bodyWeight = null) {
            const params = {};
            if (bodyWeight !== null) {
                params.bodyWeight = bodyWeight;
            }
            return instance.get(`products/${productSlug}/`, {params: params});
        },
    };
}