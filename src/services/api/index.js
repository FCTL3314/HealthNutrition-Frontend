import instance from './instance';

import productsModule from './products';
import usersModule from './users';
import commentsModule from './comments';

export default {
  products: productsModule(instance),
  users: usersModule(instance),
  comments: commentsModule(instance),
};
