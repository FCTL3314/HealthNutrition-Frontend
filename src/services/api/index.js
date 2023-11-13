import commentsModule from "./comments";
import instance from "./instance";
import categoriesModule from "./categories";
import productsModule from "./products";
import usersModule from "./users";

export default {
    categories: categoriesModule(instance),
    products: productsModule(instance),
    users: usersModule(instance),
    comments: commentsModule(instance),
};