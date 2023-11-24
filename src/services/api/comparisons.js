export default function (instance) {
    return {
        comparisonGroups() {
            return instance.get(`comparisons/groups/`);
        },
    };
}