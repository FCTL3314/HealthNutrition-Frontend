import categoriesModule from "./categories";
import commentsModule from "./comments";
import comparisonsModule from "./comparisons";
import instance from "./instance";
import productsModule from "./products";
import usersModule from "./users";
import authModule from "./auth";

export default {
    categories: categoriesModule(instance),
    products: productsModule(instance),
    comparisons: comparisonsModule(instance),
    users: usersModule(instance),
    auth: authModule(instance),
    comments: commentsModule(instance),
};
