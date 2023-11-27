export default function (instance) {
    return {
        comparisonGroups() {
            return instance.get("comparisons/groups/");
        },
        deleteComparisonGroup(id) {
            return instance.delete(`comparisons/groups/${id}/`);
        },
    };
}