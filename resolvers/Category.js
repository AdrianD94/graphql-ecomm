exports.Category = {
  products: ({ id: categoryId }, { filter }, { products }) => {
    const productsCategory = products.filter(
      (product) => product.categoryId === categoryId
    );
    let filteredProducts = productsCategory;
    if (filter && filter.onSale) {
      filteredProducts = filteredProducts.filter((product) => product.onSale);
    }
    return filteredProducts;
  },
};
