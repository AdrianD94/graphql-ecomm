const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { Query } = require("./resolvers/Query");
const { Product } = require("./resolvers/Product");
const { Category } = require("./resolvers/Category");
const { products, categories, reviews } = require("./db");
const { Review } = require("./resolvers/Review");
const { Mutation } = require("./resolvers/Mutation");

const resolvers = {
  Query,
  Mutation,
  Product,
  Category,
  Review,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { products, categories, reviews },
});

server.listen().then(({ url }) => console.log(`Server started at ${url}`));
