import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import User from '../../entities/User';
import { isProd } from '../constants';

export function createAccessToken(user: User) {
  const token = {
    userId: user.id,
    username: user.username,
    email: user.email,
    profile: user.profile,
    admin: user.admin,
    githubId: user.githubId,
    googleId: user.googleId,
  };

  return jwt.sign(token, process.env.ACCESS_SECRET!, {
    expiresIn: '15m',
  });
}

export function createRefreshToken(user: User) {
  const token = {
    userId: user.id,
  };

  return jwt.sign(token, process.env.REFRESH_SECRET!, {
    expiresIn: '7d',
  });
}

export function setTokenCookie(ctx: Context, accessToken: string, refreshToken: string) {
  ctx.cookies.set('accessToken', accessToken, {
    httpOnly: false,
    domain: isProd ? '.dnkdream.com' : undefined,
    sameSite: 'lax',
    secure: true,
  });

  ctx.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    domain: isProd ? '.dnkdream.com' : undefined,
    sameSite: 'lax',
    secure: true,
  });
}
