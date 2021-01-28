import { Context } from 'koa';
import { LogoutResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import { setTokenCookie } from '../../../libs/utils/token';
import authResolver from '../../../libs/utils/authenticate';

const resolvers: Resolvers = {
  Mutation: {
    Logout: authResolver(
      async (_, __, { ctx }: { ctx: Context }): Promise<LogoutResponse> => {
        setTokenCookie(ctx, '', '');

        return {
          ok: true,
          error: null,
        };
      }
    ),
  },
};

export default resolvers;
