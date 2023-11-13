export default function (instance) {
    return {
        category(slug) {
            return instance.get(`categories/${slug}/`);
        },
        categories(page = 1, searchQuery = null) {
            const params = {
                page: page,
            }
            if (searchQuery !== null) {
                params.search = searchQuery;
            }
            return instance.get("categories/", {
                params: params,
            });
        },
    };
}