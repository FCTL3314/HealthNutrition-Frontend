export default function (instance) {
    return {
        comparisonGroup(slug) {
            return instance.get(`comparisons/groups/${slug}/`);
        },
        comparisonGroups(page, selectedProduct = null, withProductsCount = false) {
            const params = {
                page: page,
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
        deleteComparisonGroup(id) {
            return instance.delete(`comparisons/groups/${id}/`);
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
        comparedProducts(comparisonGroupId) {
            return instance.get("comparisons/list/", {params: {comparison_group_id: comparisonGroupId}});
        },
    };
}