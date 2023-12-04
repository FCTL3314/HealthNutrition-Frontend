export default function (instance) {
    return {
        comparisonGroups(page, selectedProduct = null) {
            const params = {page: page}
            if (selectedProduct) {
                params.selected_product = selectedProduct
            }
            return instance.get("comparisons/groups/", {params: params});
        },
        createComparisonGroup(name) {
            return instance.post(`comparisons/groups/`, {name: name});
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
            return instance.delete(`/comparisons/remove/`, {
                data: {
                    comparison_group_id: comparisonGroupId,
                    product_id: productId,
                },
            });
        },
    };
}