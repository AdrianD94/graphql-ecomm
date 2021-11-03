exports.Review = {
  product: ({ productId }, args, { db }) => {
    return db.products.find((product) => product.id === productId);
  },
};
