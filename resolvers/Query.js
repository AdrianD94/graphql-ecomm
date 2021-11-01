const { reviews } = require("../db");

exports.Query = {
  hello: () => "hello world!",
  products: (parent, { filter }, { products, reviews }) => {
    let filteredProducts = products;
    if (filter) {
      const { onSale, averageRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
      if ([1, 2, 3, 4, 5].includes(averageRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;
          
          return avgProductRating >= averageRating;
        });
      }
    }
    return filteredProducts;
  },
  product: (parent, { id }, { products }) => {
    return products.find((p) => p.id === id);
  },
  categories: (parent, args, { categories }) => categories,
  category: (parent, { id: categoryId }, { categories }) => {
    return categories.find((c) => c.id === categoryId);
  },
  reviews: (parent, args, { reviews }) => {
    return reviews;
  },
  review: (parent, { id }, { reviews }) => {
    return reviews.find((review) => review.id === id);
  },
};
