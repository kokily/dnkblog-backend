import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { serializeUser } from '.';
import User from '../../entities/User';
import { devClient, devServer, isProd, prodClient, prodServer } from '../constants';
import { createAccessToken, createRefreshToken, setTokenCookie } from './token';

const decodeToken = async (token: string): Promise<User | undefined> => {
  const decoded: any = jwt.verify(token, process.env.ACCESS_SECRET!);
  const user = await getRepository(User).findOne({ id: decoded.userId });

  if (user) {
    return user;
  } else {
    return undefined;
  }
};

const authResolver = (resolverFunction) => async (parent, args, context, info) => {
  const { ctx }: { ctx: Context } = context;
  const token = ctx.req.headers['authorization'];

  if (!token) {
    setTokenCookie(ctx, '', '');
    throw new Error('Not Authenticated');
  }

  try {
    const user = await decodeToken(token.split(' ')[1]);

    if (user) {
      ctx.state.user = {
        userId: user.id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        admin: user.admin,
        githubId: user.githubId,
        googleId: user.googleId,
      };
    } else {
      ctx.state.user = undefined;
    }
  } catch (err) {
    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;

    if (message === 'jwt expired') {
      const token = ctx.cookies.get('refreshToken');

      if (!token) {
        setTokenCookie(ctx, '', '');
      } else {
        try {
          const payload: any = jwt.verify(token, process.env.REFRESH_SECRET!);
          const user = await getRepository(User).findOne({ id: payload.userId });

          if (!user) {
            setTokenCookie(ctx, '', '');
          } else {
            const accessToken = createAccessToken(user);
            const refreshToken = createRefreshToken(user);

            setTokenCookie(ctx, accessToken, refreshToken);

            ctx.state.user = {
              userId: user.id,
              username: user.username,
              email: user.email,
              profile: user.profile,
              admin: user.admin,
              githubId: user.githubId,
              googleId: user.googleId,
            };
          }
        } catch (err) {
          setTokenCookie(ctx, '', '');
        }
      }
    }
  }

  const resolved = await resolverFunction(parent, args, context, info);

  return resolved;
};

export default authResolver;
