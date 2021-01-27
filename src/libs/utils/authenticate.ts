import { Context } from 'koa';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import fetch from 'isomorphic-unfetch';
import User from '../../entities/User';

// Social Github
interface GithubUserTypes {
  id: string;
  name: string;
  avatar_url: string;
}

export async function getGithubToken(code: string): Promise<string> {
  try {
    const data = await fetch('https://github.com/login/oauth/access_token', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    return 'test';
  } catch (err) {
    throw new Error(err);
  }
}

async function decodeToken(token: string): Promise<User | undefined> {
  const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
  const user = await getRepository(User).findOne({ id: decoded.userId });

  if (user) {
    return user;
  } else {
    return undefined;
  }
}

const authResolver = (resolverFunction) => async (parent, args, context, info) => {
  const { ctx }: { ctx: Context } = context;
  const token = ctx.request.headers['authorization'];

  if (!token) {
    throw new Error('Not authenticated!');
  }

  try {
    const user = await decodeToken(token.split(' ')[1]);

    if (user) {
      ctx.state.user = {
        userId: user.id,
      };
    } else {
      ctx.state.user = undefined;
    }
  } catch (err) {
    throw new Error('Not Authenticated');
  }

  const resolved = await resolverFunction(parent, args, context, info);

  return resolved;
};

export default authResolver;
