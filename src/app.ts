import { ApolloServer, gql } from 'apollo-server-koa';
import Koa from 'koa';

const app = new Koa();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});

apollo.applyMiddleware({ app });

export default app;
