exports.Review = {
  product: ({ productId }, args, { products }) => {
    return products.find((product) => product.id === productId);
  },
};
