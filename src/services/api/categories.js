export default function (instance) {
    return {
        category(slug) {
            return instance.get(`categories/${slug}/`);
        },
        categories(page = 1) {
            return instance.get("categories/", {
                params: {
                    page: page,
                },
            });
        },
    };
}