import instance from './instance';

import productsModule from './products';
import usersModule from './users';

export default {
  products: productsModule(instance),
  users: usersModule(instance),
};
