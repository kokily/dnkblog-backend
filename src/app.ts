import { ApolloServer } from 'apollo-server-koa';
import Koa, { Context } from 'koa';
import schema from './libs/schema';

const app = new Koa();

const apollo = new ApolloServer({
  schema,
  context: ({ ctx }: { ctx: Context }) => ({ ctx }),
});

apollo.applyMiddleware({ app });

export default app;
