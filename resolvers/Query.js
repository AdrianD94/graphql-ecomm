const { reviews } = require("../db");

exports.Query = {
  hello: () => "hello world!",
  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;
    if (filter) {
      const { onSale, averageRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
      if ([1, 2, 3, 4, 5].includes(averageRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach((review) => {
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
  product: (parent, { id }, { db }) => {
    return db.products.find((p) => p.id === id);
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, { id: categoryId }, { db }) => {
    return db.categories.find((c) => c.id === categoryId);
  },
  reviews: (parent, args, { db }) => {
    return db.reviews;
  },
  review: (parent, { id }, { db }) => {
    return db.reviews.find((review) => review.id === id);
  },
};
