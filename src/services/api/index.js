import categoriesModule from "./categories";
import comparisonsModule from "./comparisons";
import commentsModule from "./comments";
import instance from "./instance";
import productsModule from "./products";
import usersModule from "./users";

export default {
    categories: categoriesModule(instance),
    products: productsModule(instance),
    comparisons: comparisonsModule(instance),
    users: usersModule(instance),
    comments: commentsModule(instance),
};
