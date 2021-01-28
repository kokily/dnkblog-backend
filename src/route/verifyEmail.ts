import { Context } from 'koa';
import Router from 'koa-router';
import { getRepository } from 'typeorm';
import User from '../entities/User';
import { devClient, isProd, prodClient } from '../libs/constants';

const verifyEmail = new Router();

verifyEmail.get('/', async (ctx: Context) => {
  const { email, key }: { email: string; key: string } = ctx.query;

  try {
    const user = await getRepository(User).findOne({ email });

    if (!user) {
      ctx.status = 401;
      return;
    }

    if (user.verify_key === key) {
      await getRepository(User).update(
        { id: user.id },
        { verify_key: null, verified: true }
      );

      ctx.redirect(`${isProd ? prodClient : devClient}/login`);
    } else {
      ctx.status = 400;
      return;
    }
  } catch (err) {
    ctx.throw(500, err);
  }
});

export default verifyEmail;
