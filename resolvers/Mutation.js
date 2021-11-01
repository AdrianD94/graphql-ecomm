const { v4: uuid } = require("uuid");
exports.Mutation = {
  createCategory: (parent, args, { categories }) => {
    const newCategory = {
      name: args.input.name,
      id: uuid(),
    };
    categories.push(newCategory);
    return newCategory;
  },
};
