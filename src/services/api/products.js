export default function (instance) {
    return {
        products(page = 1, categorySlug) {
            return instance.get("products/", {
                params: {
                    page: page,
                    category_slug: categorySlug,
                },
            });
        },
        product(productSlug) {
            return instance.get(`products/${productSlug}/`);
        },
    };
}