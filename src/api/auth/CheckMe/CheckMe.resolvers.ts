import { Context } from 'koa';
import { CheckMeResponse } from '../../../types/graphql';
import { Resolvers } from '../../../types/resolvers';
import authResolver from '../../../libs/utils/authenticate';

const resolvers: Resolvers = {
  Query: {
    CheckMe: authResolver(
      async (_, __, { ctx }: { ctx: Context }): Promise<CheckMeResponse> => {
        const { user } = ctx.state;

        if (user === undefined) {
          return {
            ok: false,
            error: 'Not Authenticate',
            user: null,
          };
        } else {
          return {
            ok: true,
            error: null,
            user: {
              id: user.userId,
              username: user.username,
              profile: user.profile,
              admin: user.admin,
              githubId: user.githubId,
              googleId: user.googleId,
              kakaoId: user.kakaoId,
              email: user.email,
            },
          };
        }
      }
    ),
  },
};

export default resolvers;
