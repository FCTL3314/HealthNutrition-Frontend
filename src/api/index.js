import instance from './instance';

import productsModule from './products';

export default {
  products: productsModule(instance),
};
