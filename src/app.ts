import { ApolloServer } from 'apollo-server-koa';
import Koa, { Context } from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import schema from './libs/schema';
import social from './route/social';
import upload from './route/upload';
import verifyEmail from './route/verifyEmail';
import { isProd, prodClient, devClient } from './libs/constants';

const app = new Koa();
const router = new Router();

app.use(
  cors({
    origin: isProd ? prodClient : devClient,
    credentials: true,
  })
);
app.use(bodyParser({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());

const apollo = new ApolloServer({
  schema,
  context: ({ ctx }: { ctx: Context }) => ({ ctx }),
});

router.use('/social', social.routes());
router.use('/upload', upload.routes());
router.use('/verify-email', verifyEmail.routes());
router.get('/graphql', apollo.getMiddleware());
router.post('/graphql', apollo.getMiddleware());

apollo.applyMiddleware({ app, cors: false });

export default app;
