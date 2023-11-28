export default function (instance) {
    return {
        comparisonGroups(page) {
            return instance.get("comparisons/groups/", {params: {page: page}});
        },
        createComparisonGroup(name) {
            return instance.post(`comparisons/groups/`, {name: name});
        },
        deleteComparisonGroup(id) {
            return instance.delete(`comparisons/groups/${id}/`);
        },
    };
}