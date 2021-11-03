const { v4: uuid } = require("uuid");
const { db } = require("../db");
exports.Mutation = {
  createCategory: (parent, args, { db }) => {
    const newCategory = {
      name: args.input.name,
      id: uuid(),
    };
    db.categories.push(newCategory);
    return newCategory;
  },
  createProduct: (parent, { input }, { db }) => {
    const { name, description, quantity, price, onSale, image, categoryId } =
      input;
    const newProduct = {
      name,
      description,
      quantity,
      price,
      onSale,
      image,
      categoryId,
      id: uuid(),
    };
    db.products.push(newProduct);
    return newProduct;
  },
  createReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productId } = input;
    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };
    db.reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((category) => {
      return id !== category.id;
    });
    db.products = db.products.map((product) => {
      if (id === product.categoryId) {
        return {
          ...product,
          categoryId: null,
        };
      } else return product;
    });
    return true;
  },
  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter((product) => {
      return product.id !== id;
    });
    db.reviews = db.reviews.filter((review) => {
      return review.productId !== id;
    });
    return true;
  },
  deleteReview: (parent, { id }, { reviews }) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);
    return true;
  },
  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);
    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };
    return true;
  },
  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((product) => product.id === id);
    db.products[index] = {
      ...db.products[index],
      ...input,
    };
    return true;
  },
  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex((review) => review.id === id);
    db.reviews[index] = {
      ...db.reviews[index],
      ...input,
    };
    return true;
  },
};
