export default function (instance) {
    return {
        comparisonGroup(slug, withProductsCount = false) {
            return instance.get(`comparisons/groups/${slug}/`, {
                params: {
                    with_products_count: withProductsCount,
                }
            });
        },
        comparisonGroups(limit, offset, selectedProduct = null, withProductsCount = false) {
            const params = {
                limit,
                offset,
                with_products_count: withProductsCount,
            };
            if (selectedProduct) {
                params.selected_product = selectedProduct;
            }
            return instance.get("comparisons/groups/", {params: params});
        },
        createComparisonGroup(name) {
            return instance.post("comparisons/groups/", {name: name});
        },
        deleteComparisonGroup(slug) {
            return instance.delete(`comparisons/groups/${slug}/`);
        },
        addProductToComparisonGroup(comparisonGroupId, productId) {
            return instance.post("/comparisons/add/", {
                comparison_group_id: comparisonGroupId,
                product_id: productId,
            });
        },
        removeProductFromComparisonGroup(comparisonGroupId, productId) {
            return instance.delete("/comparisons/remove/", {
                data: {
                    comparison_group_id: comparisonGroupId,
                    product_id: productId,
                },
            });
        },
        comparedProducts(limit, offset, comparisonGroupId) {
            return instance.get("comparisons/list/", {
                params: {
                    limit,
                    offset,
                    comparison_group_id: comparisonGroupId
                }
            });
        },
    };
}