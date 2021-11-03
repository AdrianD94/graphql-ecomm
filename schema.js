const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    hello: String
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
    reviews: [Review!]!
    review(id: ID!): Review
  }
  type Mutation {
    createCategory(input: createCategoryInput!): Category!
    createProduct(input: createProductInput): Product!
    createReview(input: createReviewInput): Review!
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    deleteReview(id: ID!): Boolean!
    updateCategory(id: ID!,input:updateCategoryInput!): Boolean!
    updateProduct(id: ID!,input:updateProductInput!): Boolean!
    updateReview(id: ID!,input:updateReviewInput!): Boolean!
  }
  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    category: Category
    reviews: [Review!]
  }
  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
    product: Product!
  }

  input ProductsFilterInput {
    onSale: Boolean
    averageRating: Int
  }
  input createCategoryInput {
    name: String!
  }
  input createProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    categoryId: ID!
  }
  input createReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
  input updateCategoryInput {
    name: String!
  }
  input updateProductInput {
    name: String
    description: String
    quantity: Int
    price: Float
    image: String
    onSale: Boolean
    categoryId: ID
  }
  input updateReviewInput {
    date: String
    title: String
    comment: String
    rating: Int
    productId: ID
  }
`;
