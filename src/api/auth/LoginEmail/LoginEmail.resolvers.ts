import { Context } from 'koa';
import { getRepository } from 'typeorm';
import User from '../../../entities/User';
import {
  createAccessToken,
  createRefreshToken,
  setTokenCookie,
} from '../../../libs/utils/token';
import { LoginEmailMutationArgs, LoginEmailResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
  Mutation: {
    LoginEmail: async (
      _,
      args: LoginEmailMutationArgs,
      { ctx }: { ctx: Context }
    ): Promise<LoginEmailResponse> => {
      const { email, password } = args;

      try {
        const user = await getRepository(User).findOne({ email });

        if (!user) {
          return {
            ok: false,
            error: '해당 사용자가 존재하지 않습니다',
          };
        }

        const valid = await user.validPassword(password);

        if (!valid) {
          return {
            ok: false,
            error: '비밀번호가 일치하지 않습니다.',
          };
        }

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        setTokenCookie(ctx, accessToken, refreshToken);

        return {
          ok: true,
          error: null,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
        };
      }
    },
  },
};

export default resolvers;
