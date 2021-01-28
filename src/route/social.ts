import { Context } from 'koa';
import Router from 'koa-router';
import { getRepository } from 'typeorm';
import User from '../entities/User';
import { devClient, isProd, prodClient } from '../libs/constants';
import {
  callback,
  getGithubToken,
  getGithubUser,
  getGoogleAccessToken,
  getGoogleUser,
  url,
} from '../libs/utils/social';
import {
  createAccessToken,
  createRefreshToken,
  setTokenCookie,
} from '../libs/utils/token';

const social = new Router();

// Github Login Callback
social.get('/github/callback', async (ctx: Context) => {
  const { code } = ctx.query;

  try {
    const token = await getGithubToken(code);
    const githubUser = await getGithubUser(token);
    const user = await getRepository(User).findOne({
      githubId: githubUser.id,
    });

    if (user) {
      // Exists User
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      setTokenCookie(ctx, accessToken, refreshToken);

      ctx.redirect(`${isProd ? prodClient : devClient}`);
    } else {
      // New User Create
      const newUser = await getRepository(User).create({
        username: githubUser.name,
        githubId: githubUser.id,
        profile: githubUser.avatar_url,
        verified: true,
      });

      await newUser.save();

      const accessToken = createAccessToken(newUser);
      const refreshToken = createRefreshToken(newUser);

      setTokenCookie(ctx, accessToken, refreshToken);

      ctx.redirect(`${isProd ? prodClient : devClient}`);
    }
  } catch (err) {
    ctx.throw(500, err);
  }
});

// Google Login
social.get('/google/login', async (ctx: Context) => {
  ctx.redirect(url);
});

// Google Login Callback
social.get('/google/callback', async (ctx: Context) => {
  const { code }: { code?: string } = ctx.query;

  if (!code) {
    ctx.status = 400;
    return;
  }

  try {
    const token = await getGoogleAccessToken({
      code,
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectUrl: callback,
    });

    const profile = await getGoogleUser(token);
    const user = await getRepository(User).findOne({
      googleId: profile.googleId,
    });

    if (user) {
      // Exists User
      const accessToken = createAccessToken(user);
      const refreshToken = createRefreshToken(user);

      setTokenCookie(ctx, accessToken, refreshToken);

      ctx.redirect(`${isProd ? prodClient : devClient}`);
    } else {
      // New User Create
      const newUser = await getRepository(User).create({
        username: profile.username,
        googleId: profile.googleId,
        email: profile.email?.toLowerCase(),
        profile: profile.thumbnail,
        verified: true,
      });

      await newUser.save();

      const accessToken = createAccessToken(newUser);
      const refreshToken = createRefreshToken(newUser);

      setTokenCookie(ctx, accessToken, refreshToken);

      ctx.redirect(`${isProd ? prodClient : devClient}`);
    }
  } catch (err) {
    ctx.throw(500, err);
  }
});

export default social;
